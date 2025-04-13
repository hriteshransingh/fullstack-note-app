import { useState } from "react";

const NoteForm = ({ noteData, onSubmit, onCancel, onLogout }) => {
  const [formData, setFormData] = useState({
    title: noteData?.title || "",
    content: noteData?.content || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: "", content: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <input
          type="text"
          name="title"
          spellCheck="false"
          placeholder="Title (optional)"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 transition-all"
        />
      </div>
      <div className="mb-4">
        <textarea
          name="content"
          spellCheck="false"
          placeholder="Write your note here..."
          rows="4"
          value={formData.content}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 transition-all"
          required
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium bg-purple-500  hover:bg-purple-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            {noteData ? "Update Note" : "Save Note"}
          </button>
          {noteData && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="px-4 py-2 text-sm font-medium bg-red-400 text-white rounded-lg hover:bg-red-600 transition-all flex items-center gap-1"
          title="Logout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
