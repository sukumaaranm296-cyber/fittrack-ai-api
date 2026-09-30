const Workout = require("../models/Workout");
const askGemini = require("../services/gemini.service");

exports.recommendations = async (req, res) => {
  const { age, fitnessGoal, experience, preferences = "" } = req.body;

  if (!age || !fitnessGoal || !experience) {
    return res.status(400).json({
      success: false,
      message: "age, fitnessGoal and experience are required"
    });
  }

  const prompt = `
You are a fitness planning assistant.
Create a practical, beginner-safe workout recommendation.
User age: ${age}
Fitness goal: ${fitnessGoal}
Experience: ${experience}
Preferences: ${preferences}

Return:
1. Weekly structure
2. Example workouts
3. Warm-up and cool-down
4. Progression advice
5. Recovery advice
Do not diagnose medical conditions. Recommend professional medical advice for injuries or health concerns.
`;

  const recommendation = await askGemini(prompt);

  res.json({
    success: true,
    data: { recommendation }
  });
};

exports.insights = async (req, res) => {
  const [stats] = await Workout.aggregate([
    { $match: { user: req.user._id } },
    {
      $group: {
        _id: null,
        totalWorkouts: { $sum: 1 },
        averageDuration: { $avg: "$duration" },
        caloriesBurned: { $sum: "$caloriesBurned" }
      }
    }
  ]);

  const safeStats = stats || {
    totalWorkouts: 0,
    averageDuration: 0,
    caloriesBurned: 0
  };

  const prompt = `
Analyze these workout statistics and provide concise fitness insights.
Total workouts: ${safeStats.totalWorkouts}
Average duration: ${safeStats.averageDuration?.toFixed?.(1) || 0} minutes
Calories burned: ${safeStats.caloriesBurned}

Give:
- progress observation
- consistency observation
- one practical improvement
- one recovery suggestion

Do not diagnose medical conditions.
`;

  const insight = await askGemini(prompt);

  res.json({
    success: true,
    data: { stats: safeStats, insight }
  });
};