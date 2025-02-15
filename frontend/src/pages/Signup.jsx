import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signup(name, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#121212] p-6">
      <div className="w-full max-w-md bg-[#1e1e1e] p-8 rounded-xl shadow-lg text-white border border-[#e60073]">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#ff66a3]">Create an Account</h2>
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-[#ff66a3] bg-[#2a2a2a] rounded-lg text-white outline-none focus:ring-2 focus:ring-[#e60073]"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-[#ff66a3] bg-[#2a2a2a] rounded-lg text-white outline-none focus:ring-2 focus:ring-[#e60073]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-[#ff66a3] bg-[#2a2a2a] rounded-lg text-white outline-none focus:ring-2 focus:ring-[#e60073]"
            required
          />
          <button className="w-full bg-[#e60073] text-white p-3 rounded-lg font-semibold hover:bg-[#b3005c] transition">
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-300 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#ff66a3] font-semibold hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
