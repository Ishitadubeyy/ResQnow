import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Citizen from "../models/Citizen.js";

// Register Citizen
export const registerCitizen = async (req, res) => {
  console.log("📩 Received citizen registration data:", req.body);
  try {
    const { fullName, email, phoneNumber, password } = req.body;

    if (!fullName || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    const existingCitizen = await Citizen.findOne({ email });
    if (existingCitizen) {
      return res.status(400).json({ message: "Citizen already registered with this email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const citizen = await Citizen.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "Citizen registered successfully",
      citizen: {
        id: citizen._id,
        fullName: citizen.fullName,
        email: citizen.email,
        phoneNumber: citizen.phoneNumber,
      },
    });
  } catch (error) {
    console.error("❌ Citizen registration error:", error.message);
    res.status(500).json({ message: "Server error during citizen registration" });
  }
};

// Login Citizen
export const loginCitizen = async (req, res) => {
  try {
    const { email, password } = req.body;
    const citizen = await Citizen.findOne({ email });

    if (!citizen) return res.status(404).json({ message: "Citizen not found" });

    const isMatch = await bcrypt.compare(password, citizen.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: citizen._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("❌ Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
