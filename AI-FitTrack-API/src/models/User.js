const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  age: { type: Number, min: 10, max: 120 },
  fitnessGoal: {
    type: String,
    enum: ["weight_loss", "muscle_gain", "endurance", "general_fitness"],
    default: "general_fitness"
  },
  experience: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner"
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);