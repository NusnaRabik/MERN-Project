import Note from '../models/Note.js';

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // newset 1st
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({ message: "Note not found" });
        res.json(note);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function createNotes (req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title:title, content:content });
        await newNote.save();
        res.status(201).json({ message: "Note created successfully", note: newNote });
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export async function updateNotes (req, res) {
    try {
        const { title, content } = req.body;
        const updateNotes = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updateNotes) {
          return res.status(404).json({ message: "Note not found" });  
        }
        res.status(200).json(updateNotes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function deleteNotes (req, res) {
    try {
        const deleteNotes = await Note.findByIdAndDelete(req.params.id);
        if(!deleteNotes) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Server Error" });
    }
}