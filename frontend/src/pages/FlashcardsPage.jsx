import { useState, useEffect } from "react";
import axios from "axios";
import Flashcard from "../components/Flashcard";

const FlashcardsPage = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("❌ No token found. Please log in.");
          return;
        }

        const res = await axios.get("/api/flashcards/getFlashcards", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("📌 Fetched Flashcards:", res.data);
        setFlashcards(res.data);
      } catch (error) {
        console.error("❌ Error fetching flashcards:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, []);

  const handleDeleteFlashcard = (deletedId) => {
    setFlashcards((prevFlashcards) => prevFlashcards.filter((fc) => fc._id !== deletedId));
    setCurrentIndex(0);
  };

  const isLastFlashcard = currentIndex === flashcards.length - 1;

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#121212] text-white">
      <div className="w-full max-w-lg bg-[#1b0c15] shadow-lg rounded-lg p-6 border border-[#ff66a3]">
        <h1 className="text-3xl font-bold text-[#ff66a3] text-center">Your Question Is:</h1>

        {loading ? (
          <p className="text-center text-lg text-gray-300 mt-4">Loading flashcards...</p>
        ) : flashcards.length > 0 ? (
          <div className="flex flex-col items-center mt-6">
            <Flashcard
              key={flashcards[currentIndex]._id}
              flashcard={flashcards[currentIndex]}
              onNextFlashcard={(gotItRight) =>
                setCurrentIndex((prevIndex) => (gotItRight ? prevIndex + 1 : 0))
              }
              onDelete={handleDeleteFlashcard}
              isLastFlashcard={isLastFlashcard}
            />
          </div>
        ) : (
          <p className="text-center text-lg text-gray-300 mt-4">No flashcards found.</p>
        )}
      </div>
    </div>
  );
};

export default FlashcardsPage;
