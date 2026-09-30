const bcrypt = require("bcryptjs");
const User = require("../models/User");
const signToken = require("../utils/jwt");

exports.register = async (req, res) => {
  const { name, email, password, age, fitnessGoal, experience } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "name, email and password are required"
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must contain at least 6 characters"
    });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(409).json({
      success: false,
      message: "Email already registered"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    age,
    fitnessGoal,
    experience
  });

  const token = signToken(user._id);

  res.status(201).json({
    success: true,
    message: "Registration successful",
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        fitnessGoal: user.fitnessGoal,
        experience: user.experience
      }
    }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await bcrypt.compare(password || "", user.password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password"
    });
  }

  res.json({
    success: true,
    message: "Login successful",
    data: {
      token: signToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        fitnessGoal: user.fitnessGoal,
        experience: user.experience
      }
    }
  });
};

exports.me = async (req, res) => {
  res.json({ success: true, data: { user: req.user } });
};