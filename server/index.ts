import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import tasksRouter from "./routes/tasks";
import moodsRouter from "./routes/moods";
import habitsRouter from "./routes/habits";
import eventsRouter from "./routes/events";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));
app.use(express.json());
app.use(morgan("dev")); // Logs HTTP requests

// API Routes
app.use("/api/tasks", tasksRouter);
app.use("/api/moods", moodsRouter);
app.use("/api/habits", habitsRouter);
app.use("/api/events", eventsRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
});