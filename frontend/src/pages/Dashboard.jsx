import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [totalFlashcards, setTotalFlashcards] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axios.get("/api/flashcards/getFlashcards", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("📌 API Response:", response.data);

      const flashcards = response.data.flashcards || response.data || [];
      console.log("📌 Extracted Flashcards:", flashcards);

      if (Array.isArray(flashcards)) {
        setTotalFlashcards(flashcards.length);
      } else {
        console.error("❌ Expected an array but got:", flashcards);
        setTotalFlashcards(0);
      }
    } catch (error) {
      console.error("❌ Error fetching flashcards:", error);
      setError(error.response?.data?.message || error.message);
    }
  };

  const handleAddFlashcard = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      await axios.post(
        "/api/flashcards",
        { question, answer },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setQuestion("");
      setAnswer("");
      fetchFlashcards();
    } catch (error) {
      console.error("Error adding flashcard:", error);
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#121212] text-white">
      <div className="w-full max-w-lg bg-[#1b0c15] shadow-lg rounded-lg p-6 border border-[#ff66a3]">
        <h1 className="text-3xl font-bold text-[#ff66a3] text-center">Create a Flashcard</h1>
        
        {error && (
          <p className="bg-red-500 text-white text-center p-2 rounded-lg mt-3">
            {error}
          </p>
        )}

        <p className="mt-4 text-center text-lg">
          📌 You have <span className="text-[#ff66a3] font-semibold">{totalFlashcards}</span> flashcards
        </p>

        <form onSubmit={handleAddFlashcard} className="mt-6">
          <input
            type="text"
            placeholder="Enter question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="w-full p-3 bg-[#2a1b2e] text-white border border-[#ff66a3] rounded-lg mb-3 focus:outline-none focus:border-[#e60073]"
          />
          <input
            type="text"
            placeholder="Enter answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            className="w-full p-3 bg-[#2a1b2e] text-white border border-[#ff66a3] rounded-lg mb-3 focus:outline-none focus:border-[#e60073]"
          />
          <button
            type="submit"
            className="w-full bg-[#ff66a3] hover:bg-[#e60073] text-white font-semibold py-3 rounded-lg transition-all"
          >
            Add Flashcard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
