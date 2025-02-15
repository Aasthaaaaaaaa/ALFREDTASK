import mongoose from "mongoose";

const FlashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  box: { type: Number, default: 1 }, // The box number (1-5)
  nextReviewDate: { type: Date, default: Date.now }, // Next review date
});

const Flashcard = mongoose.model("Flashcard", FlashcardSchema);
export default Flashcard;
