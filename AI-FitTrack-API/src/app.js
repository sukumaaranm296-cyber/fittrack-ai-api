const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const workoutRoutes = require("./routes/workout.routes");
const aiRoutes = require("./routes/ai.routes");
const { notFound, errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to FitTrack AI API",
    version: "1.0.0"
  });
});

app.get("/api", (req, res) => {
  res.json({
    success: true,
    endpoints: {
      register: "POST /api/auth/register",
      login: "POST /api/auth/login",
      profile: "GET /api/auth/me",
      createWorkout: "POST /api/workouts",
      workouts: "GET /api/workouts",
      workoutSearch: "GET /api/workouts/search?q=running",
      workoutStats: "GET /api/workouts/stats",
      recommendations: "POST /api/ai/recommendations",
      insights: "GET /api/ai/insights"
    }
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/ai", aiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;