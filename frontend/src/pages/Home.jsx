import { useState, useEffect } from "react";
import axios from "axios";
import NoteForm from "../components/NoteForm.jsx";
import NoteList from "../components/NoteList.jsx";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

const Home = ({ setIsAuthenticated }) => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/notes", {
        withCredentials: true,
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Create or Update note
  const handleSubmit = async (formData) => {
    try {
      if (currentNote) {
        await axiosInstance.put(
          `/notes/${currentNote._id}`,
          formData,
          {
            withCredentials: true,
          }
        );
        toast.success("Note updated successfully");
      } else {
        await axiosInstance.post("/notes", formData, {
          withCredentials: true,
        });
        toast.success("Note created successfully");
      }
      fetchNotes();
      setCurrentNote(null);
    } catch (error) {
      toast.error("Error saving note");
      console.error("Error saving note:", error);
    }
  };

  // Delete note
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/notes/${id}`, {
        withCredentials: true,
      });
      toast.success("Note deleted successfully");
      fetchNotes();
    } catch (error) {
      toast.error("Error deleting note");
      console.error("Error deleting note:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("Logged out successfully");
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging out");
      console.log("Error logging out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/80 via-orange-50/80 to-rose-50/80 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-amber-100/50">
          {/* Header with decorative elements */}
          <div className="mb-6 text-center relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-amber-200/30"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-rose-200/30"></div>
            <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-amber-600 to-rose-500 bg-clip-text text-transparent">
              My Notes
            </h1>
            <p className="text-amber-600/70 text-sm">Capture your thoughts</p>
          </div>

          <NoteForm
            noteData={currentNote}
            onSubmit={handleSubmit}
            onCancel={() => {
              setCurrentNote(null);
              toast("Edit cancelled", { icon: "✏️" });
            }}
            onLogout={handleLogout}
          />

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-400"></div>
            </div>
          ) : (
            <NoteList
              notes={notes}
              onEdit={(note) => {
                setCurrentNote(note);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onDelete={handleDelete}
            />
          )}

          {/* Footer */}
          {notes.length > 0 && (
            <div className="mt-6 text-center text-sm text-amber-600/50">
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;