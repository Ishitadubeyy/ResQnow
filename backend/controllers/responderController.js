// backend/controllers/responderController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Responder from "../models/Responder.js";
import Emergency from "../models/Emergency.js";

dotenv.config();

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const registerResponder = async (req, res, next) => {
  try {
    const { name, email, password, phone, certificationType, certificationNumber, field, experience } = req.body;
    if (!name || !email || !password || !phone || !certificationType || !certificationNumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existing = await Responder.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const responder = await Responder.create({
      name, email, password: hashed, phone, certificationType, certificationNumber, field, experience
    });

    const token = createToken(responder._id, responder.role);

    res.status(201).json({
      user: { id: responder._id, name: responder.name, email: responder.email, role: responder.role },
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const loginResponder = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Please provide email and password" });

    const responder = await Responder.findOne({ email });
    if (!responder) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, responder.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = createToken(responder._id, responder.role);
    res.json({ user: { id: responder._id, name: responder.name, email: responder.email }, token });
  } catch (err) {
    next(err);
  }
};

export const getResponderDashboard = async (req, res, next) => {
  try {
    const responderId = req.user.id;

    const totalReports = await Emergency.countDocuments();
    const active = await Emergency.countDocuments({ status: "Active" });
    const inProgress = await Emergency.countDocuments({ status: "In-Progress" });
    const resolved = await Emergency.countDocuments({ status: "Resolved" });

    const assigned = await Emergency.find({ responderId }).populate("citizenId", "name phone email");

    res.json({
      totalReports,
      active,
      inProgress,
      resolved,
      assigned
    });
  } catch (err) {
    next(err);
  }
};

export const listAssignedEmergencies = async (req, res, next) => {
  try {
    const responderId = req.user.id;
    const emergencies = await Emergency.find({ responderId }).populate("citizenId", "name phone");
    res.json(emergencies);
  } catch (err) {
    next(err);
  }
};

export const getAllResponders = async (req, res) => {
  try {
    const responders = await Responder.find().select("name field phone status");
    res.status(200).json(responders);
  } catch (err) {
    console.error("Error fetching responders:", err);
    res.status(500).json({ message: "Failed to fetch responders" });
  }
};
