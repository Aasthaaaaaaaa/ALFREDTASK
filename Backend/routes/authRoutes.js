import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose"; // Ensure Mongoose is imported properly
import User from "../models/User.js";
import Flashcard from "../models/Flashcard.js"; // ✅ Import Flashcard model
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * ✅ User Signup Route
 */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * ✅ User Login Route
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * ✅ Add a new flashcard (POST /api/flashcards)
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: "Question and answer are required" });
    }

    const flashcard = new Flashcard({
      question,
      answer,
      userId: req.user.userId, // ✅ Ensure correct user association
      box: 1, // Start in Box 1
      nextReviewDate: new Date(), // Due immediately
    });

    await flashcard.save();
    res.status(201).json({ message: "Flashcard created successfully", flashcard });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * ✅ Get all flashcards for the logged-in user (GET /api/flashcards)
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ userId: req.user.userId }).sort({ nextReviewDate: 1 });
    res.status(200).json(flashcards);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * ✅ Update flashcard - Apply Leitner System logic (PUT /api/flashcards/:id)
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { correct } = req.body; // Boolean value: true if correct, false if incorrect

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Flashcard ID" });
    }

    const flashcard = await Flashcard.findById(id);
    if (!flashcard) return res.status(404).json({ message: "Flashcard not found" });

    // Leitner System Logic
    if (correct) {
      flashcard.box = Math.min(flashcard.box + 1, 5); // Move to next box, max 5
    } else {
      flashcard.box = 1; // Reset to Box 1 if incorrect
    }

    // Set next review date based on the box
    const reviewIntervals = [1, 2, 5, 10, 30]; // Days for each box
    flashcard.nextReviewDate = new Date();
    flashcard.nextReviewDate.setDate(flashcard.nextReviewDate.getDate() + reviewIntervals[flashcard.box - 1]);

    await flashcard.save();
    res.status(200).json({ message: "Flashcard updated successfully", flashcard });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * ✅ Delete flashcard (DELETE /api/flashcards/:id)
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Flashcard ID format" });
    }

    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard) return res.status(404).json({ message: "Flashcard not found" });

    await Flashcard.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Flashcard deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
