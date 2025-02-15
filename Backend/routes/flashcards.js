const express = require("express");
const router = express.Router();
const Flashcard = require("../models/Flashcard");

// Update Flashcard Level (Spaced Repetition)
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard) return res.status(404).json({ message: "Flashcard not found" });

    // Update flashcard level logic
    if (status === "correct") {
      flashcard.level = Math.min(flashcard.level + 1, 5); // Max level is 5
    } else if (status === "wrong") {
      flashcard.level = Math.max(flashcard.level - 1, 1); // Min level is 1
    }

    flashcard.nextReview = new Date(Date.now() + flashcard.level * 24 * 60 * 60 * 1000); // Update review date
    await flashcard.save();

    res.json(flashcard);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
