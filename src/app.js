const cors = require("cors");
const express = require("express");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173,http://127.0.0.1:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
}));
app.use(express.json());
app.use("/api/students", studentRoutes);

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ message: "Request body must contain valid JSON" });
  }

  console.error("Unexpected request error:", error);
  return res.status(500).json({ message: "An unexpected server error occurred" });
});

module.exports = app;
