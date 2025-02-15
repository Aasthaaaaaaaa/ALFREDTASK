import mongoose from "mongoose";
import express from "express";
import { addFlashcard, getFlashcards, updateFlashcard, deleteFlashcard } from "../controllers/flashcardController.js";
import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();

router.post("/", authMiddleware, addFlashcard);
router.get("/getFlashcards", authMiddleware, getFlashcards);
router.put("/updateFlashcards/:id", authMiddleware, updateFlashcard);
router.delete("/deleteFlashcard:id", authMiddleware, deleteFlashcard);

export default router;
