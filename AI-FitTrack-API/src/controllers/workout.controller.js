const Workout = require("../models/Workout");

exports.create = async (req, res) => {
  const workout = await Workout.create({
    ...req.body,
    user: req.user._id
  });

  res.status(201).json({
    success: true,
    message: "Workout created",
    data: { workout }
  });
};

exports.list = async (req, res) => {
  const workouts = await Workout.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.json({
    success: true,
    count: workouts.length,
    data: { workouts }
  });
};

exports.search = async (req, res) => {
  const q = (req.query.q || "").trim();

  if (!q) {
    return res.status(400).json({
      success: false,
      message: "Search query q is required"
    });
  }

  const workouts = await Workout.find({
    user: req.user._id,
    $or: [
      { name: { $regex: q, $options: "i" } },
      { type: { $regex: q, $options: "i" } }
    ]
  }).sort({ createdAt: -1 });

  res.json({ success: true, count: workouts.length, data: { workouts } });
};

exports.stats = async (req, res) => {
  const [summary] = await Workout.aggregate([
    { $match: { user: req.user._id } },
    {
      $group: {
        _id: null,
        totalWorkouts: { $sum: 1 },
        totalDuration: { $sum: "$duration" },
        totalCalories: { $sum: "$caloriesBurned" },
        averageDuration: { $avg: "$duration" }
      }
    }
  ]);

  res.json({
    success: true,
    data: {
      stats: summary || {
        totalWorkouts: 0,
        totalDuration: 0,
        totalCalories: 0,
        averageDuration: 0
      }
    }
  });
};

exports.remove = async (req, res) => {
  const workout = await Workout.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });

  if (!workout) {
    return res.status(404).json({ success: false, message: "Workout not found" });
  }

  res.json({ success: true, message: "Workout deleted" });
};