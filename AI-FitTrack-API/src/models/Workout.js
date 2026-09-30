const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  name: { type: String, required: true, trim: true },
  type: { type: String, default: "general", trim: true },
  duration: { type: Number, required: true, min: 1 },
  caloriesBurned: { type: Number, default: 0, min: 0 },
  exercises: [{
    name: String,
    sets: { type: Number, min: 0 },
    reps: { type: Number, min: 0 },
    weight: { type: Number, min: 0 }
  }],
  notes: { type: String, maxlength: 1000 }
}, { timestamps: true });

module.exports = mongoose.model("Workout", workoutSchema);