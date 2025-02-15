import mongoose from "mongoose";
import Flashcard from "../models/Flashcard.js";

// ✅ Add new flashcard
export const addFlashcard = async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Debugging

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const { question, answer } = req.body; // ⛔️ Don't take 'box' from frontend

    if (!question || !answer) {
      return res.status(400).json({ message: "Question and Answer are required." });
    }

    const flashcard = new Flashcard({
      user: req.user.id,
      question,
      answer,
      box: 1, // ✅ Always start with Box 1
      nextReviewDate: new Date(), // ✅ Default review date is today
    });

    await flashcard.save();
    res.status(201).json(flashcard);
  } catch (error) {
    console.error("Error adding flashcard:", error);
    res.status(500).json({ error: error.message });
  }
};


// ✅ Get user's flashcards
export const getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ user: req.user.id });
    res.json(flashcards);
  } catch (error) {
    console.error("❌ Error fetching flashcards:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update flashcard
export const updateFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    const { isCorrect } = req.body; // ✅ User only provides whether the answer was correct

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Flashcard ID format" });
    }

    const flashcard = await Flashcard.findOne({ _id: id, user: req.user.id });
    if (!flashcard) return res.status(404).json({ message: "Flashcard not found" });

    // ✅ Auto-update box number:
    let newBox = isCorrect ? flashcard.box + 1 : 1; // Increment on correct, reset on wrong

    const nextReviewDate = new Date(Date.now() + newBox * 24 * 60 * 60 * 1000); // New review date

    const updatedFlashcard = await Flashcard.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { box: newBox, nextReviewDate },
      { new: true, runValidators: true }
    );

    res.json(updatedFlashcard);
  } catch (error) {
    console.error("Update Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete flashcard
export const deleteFlashcard = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Flashcard ID format" });
    }

    const flashcard = await Flashcard.findById(id);
    if (!flashcard) return res.status(404).json({ message: "Flashcard not found" });

    // ✅ Ensure user is the owner before deleting
    if (flashcard.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this flashcard" });
    }

    // ✅ Use findByIdAndDelete
    await Flashcard.findByIdAndDelete(id);
    res.json({ message: "Flashcard deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting flashcard:", error);
    res.status(500).json({ error: error.message });
  }
};
