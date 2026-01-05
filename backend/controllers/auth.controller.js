const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const usersCount = await User.countDocuments();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: usersCount === 0 ? "admin" : "user",
    });

    res.status(201).json({
      message: "Registered successfully",
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
    email: user.email,
  },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);


    res.status(200).json({
      token,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

