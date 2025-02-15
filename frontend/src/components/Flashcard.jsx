import { useState } from "react";
import axios from "axios";

const Flashcard = ({ flashcard, isLastFlashcard, onNextFlashcard, onDelete }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async (flashcardId, isCorrect) => {
    if (!flashcardId) {
      setError("❌ Flashcard ID is missing.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      console.log("📌 Updating Flashcard ID:", flashcardId, "Correct:", isCorrect);

      const response = await axios.put(
        `http://localhost:5000/api/flashcards/updateFlashcards/${flashcardId}`,
        { isCorrect },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ Flashcard updated:", response.data);

      onNextFlashcard(isCorrect);
      setShowAnswer(false);
    } catch (error) {
      console.error("❌ Error updating flashcard:", error.response?.data || error);
      setError("Failed to update flashcard.");
    }
  };

  const handleDelete = async (flashcardId) => {
    if (!flashcardId) {
      setError("❌ Flashcard ID is missing.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      console.log("🗑️ Deleting Flashcard ID:", flashcardId);

      await axios.delete(`http://localhost:5000/api/flashcards/deleteFlashcard${flashcardId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Flashcard deleted");

      if (onDelete) onDelete(flashcardId);
    } catch (error) {
      console.error("❌ Error deleting flashcard:", error.response?.data || error);
      setError("Failed to delete flashcard.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 text-white">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {flashcard ? (
        <>
          <h2 className="text-xl font-semibold text-[#ff66a3] text-center">{flashcard.question}</h2>

          {showAnswer ? (
            <p className="text-lg text-gray-300">{flashcard.answer}</p>
          ) : (
            <button
              className="text-sm px-3 py-1 bg-[#ff66a3] text-white rounded-lg shadow-md hover:bg-[#ff3385] transition"
              onClick={() => setShowAnswer(true)}
            >
              Show Answer
            </button>
          )}

          <div className="flex gap-3">
            <button
              className="text-sm px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              onClick={() => handleUpdate(flashcard._id, true)}
              disabled={isLastFlashcard}
            >
              ✅ Right
            </button>
            <button
              className="text-sm px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              onClick={() => handleUpdate(flashcard._id, false)}
              disabled={isLastFlashcard}
            >
              ❌ Wrong
            </button>
            <button
              className="text-sm px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
              onClick={() => handleDelete(flashcard._id)}
            >
              🗑️ Delete
            </button>
          </div>

          {isLastFlashcard && (
            <p className="mt-2 text-lg font-semibold text-[#ff66a3]">
              🎉 You've completed all flashcards!
            </p>
          )}
        </>
      ) : (
        <p className="text-center text-lg text-gray-300">No more flashcards available.</p>
      )}
    </div>
  );
};

export default Flashcard;
