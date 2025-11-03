import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Citizen from "../models/Citizen.js";

dotenv.config();

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Citizen registration
export const registerCitizen = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Citizen.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const citizen = await Citizen.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "citizen"
    });

    const token = createToken(citizen._id, "citizen");

    res.status(201).json({
      user: {
        id: citizen._id,
        name: citizen.name,
        email: citizen.email,
        role: citizen.role
      },
      token
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Citizen login
export const loginCitizen = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Please provide email and password" });

    const citizen = await Citizen.findOne({ email });
    if (!citizen)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, citizen.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = createToken(citizen._id, "citizen");

    res.json({
      user: {
        id: citizen._id,
        name: citizen.name,
        email: citizen.email,
        role: citizen.role
      },
      token
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
