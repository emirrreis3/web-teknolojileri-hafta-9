import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: process.env.STUDENT_ID || "2416501048"
  });
});

app.use("/events", eventRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

// Error Handler
app.use((err, req, res, next) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({ error: { message: err.message || "Bad Request" } });
  }
  res.status(err.status || 500).json({ error: { message: err.message || "Internal server error" } });
});

export default app;
