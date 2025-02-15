import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Load user from localStorage safely
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      localStorage.removeItem("user");
    }
  }, []);

  // ✅ Signup function (returns errors if any)
  const signup = async (name, email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      console.log("Signup Response:", res);

      if (!res.data?.token) {
        throw new Error("Invalid response from server");
      }

      const userData = res.data.user || { name, email };
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", res.data.token);
      setUser(userData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "Signup failed.");
    }
  };

  // ✅ Login function (returns errors if any)
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      console.log("Login Response:", res);

      if (!res.data?.token) {
        throw new Error("Invalid response from server");
      }

      const userData = res.data.user || { email };
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", res.data.token);
      setUser(userData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "Incorrect email or password.");
    }
  };

  // ✅ Logout function
  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
