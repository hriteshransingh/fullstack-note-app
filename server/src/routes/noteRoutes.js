import express from "express";
import Note from "../models/Note.js";
import {protectRoute} from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);

// Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id }).sort({
      updatedAt: -1,
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new note
router.post("/", async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
    userId: req.user._id,
  });

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update note
router.put("/:id", async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      {
        title: req.body.title,
        content: req.body.content,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete({ _id: req.params.id, userId: req.user._id });
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
