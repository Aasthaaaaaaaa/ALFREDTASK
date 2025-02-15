import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import connectDB from "./config/db.js";
import flashcardRoutes from "./routes/flashcardRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // ✅ Import Auth Routes
import path from "path";
const __dirname = path.resolve();

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*", // Allow both local and deployed frontend
    credentials: true,
  }));
  
app.use(helmet());
app.use(compression());

// ✅ Register Routes
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/auth", authRoutes); // ✅ Add Auth Routes

const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// 404 Handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


