import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#121212] text-white px-6 text-center font-[Poppins]">
      {/* ✅ Brand Title */}
      <h1 className="text-6xl font-extrabold text-[#ff66a3] mb-6 tracking-wide">
        FlashLearn
      </h1>

      {/* 🚀 Refined Tagline */}
      <p className="text-xl text-gray-300 max-w-2xl leading-relaxed mb-4">
        "Supercharge your learning with AI-powered flashcards – Learn smarter, retain better!"
      </p>

      {/* ✅ Call to Action */}
      <div className="mt-6 space-x-4">
        <Link
          to="/signup"
          className="bg-[#e60073] hover:bg-[#b3005c] text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="border border-[#ff66a3] text-[#ff66a3] hover:bg-[#2a2a2a] hover:text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Home;
