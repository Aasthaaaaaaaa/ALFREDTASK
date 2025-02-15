import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for menu

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false); // State to toggle menu

  return (
    <nav className="bg-[#121212] shadow-md text-white py-4 px-6 border-b border-[#ff66a3]">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* ✅ Logo */}
        <Link to="/dashboard" className="text-2xl font-bold text-[#ff66a3] hover:text-white transition-all">
          FlashLearn
        </Link>

        {/* ✅ Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-lg font-medium">
          <Link to="/dashboard" className="hover:text-[#ff66a3] transition-all">Create Flashcard</Link>
          <Link to="/flashcards" className="hover:text-[#ff66a3] transition-all">Your Flashcards</Link>
        </div>

        {/* ✅ Auth Section for Desktop */}
        <div className="hidden md:flex">
          {user ? (
            <button
              onClick={logout}
              className="bg-[#ff66a3] hover:bg-[#e60073] text-white px-5 py-2 rounded-lg font-semibold transition-all"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-[#ff66a3] hover:bg-[#e60073] text-white px-5 py-2 rounded-lg font-semibold transition-all"
            >
              Login
            </Link>
          )}
        </div>

        {/* ✅ Mobile Menu Button */}
        <button
          className="md:hidden text-[#ff66a3] text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ✅ Mobile Dropdown Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#1b0c15] bg-opacity-95 flex flex-col items-center justify-center z-50">
          <button
            className="absolute top-6 right-6 text-3xl text-[#ff66a3] focus:outline-none"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </button>
          <Link
            to="/dashboard"
            className="text-2xl py-3 hover:text-[#ff66a3] transition-all"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/flashcards"
            className="text-2xl py-3 hover:text-[#ff66a3] transition-all"
            onClick={() => setIsOpen(false)}
          >
            Flashcards
          </Link>
          <Link
            to="/profile"
            className="text-2xl py-3 hover:text-[#ff66a3] transition-all"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          {user ? (
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="mt-6 bg-[#ff66a3] hover:bg-[#e60073] text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="mt-6 bg-[#ff66a3] hover:bg-[#e60073] text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
