import Emergency from "../models/Emergency.js";
import { io } from "../server.js";

// ✅ Citizen reports new emergency
export const reportEmergency = async (req, res) => {
  try {
    // ✅ Make sure citizenId is set from middleware
    const citizenId = req.user?.id;
    if (!citizenId) {
      return res.status(401).json({ message: "Unauthorized: citizenId missing" });
    }

    const { location, time, severity, description, injuries, witnesses } = req.body;

    if (!location || !time || !severity || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Handle uploaded photos safely
    const photos = (req.files || []).map((file) => `/uploads/${file.filename}`);

    // ✅ Parse witnesses if provided (convert JSON string to objects)
    let parsedWitnesses = [];
    try {
      parsedWitnesses = JSON.parse(witnesses || "[]");
    } catch (e) {
      parsedWitnesses = [];
    }

    // ✅ Create emergency record in MongoDB
    const emergency = await Emergency.create({
      citizenId,
      location,
      timeOfIncident: new Date(time),
      severity,
      description,
      injuries: injuries || "",
      witnesses: parsedWitnesses,
      photos,
      status: "Active",
    });

    // ✅ Emit real-time notification
    io.emit("newEmergency", emergency);

    res.status(201).json({
      message: "Emergency reported successfully",
      emergency,
    });
  } catch (err) {
    console.error("❌ Error reporting emergency:", err);
    res.status(500).json({
      message: "Server error while reporting emergency",
      error: err.message,
    });
  }
};

// ✅ Get emergencies by citizen
export const getCitizenEmergencies = async (req, res) => {
  try {
    const citizenId = req.user?.id;
    if (!citizenId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const emergencies = await Emergency.find({ citizenId });
    res.json(emergencies);
  } catch (err) {
    console.error("Error fetching citizen emergencies:", err);
    res.status(500).json({ message: "Failed to fetch emergencies" });
  }
};

// ✅ Get all emergencies (for responders/admin)
export const listAllEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find()
      .populate("citizenId", "name email phone")
      .populate("responderId", "name field");
    res.json(emergencies);
  } catch (err) {
    console.error("Error listing emergencies:", err);
    res.status(500).json({ message: "Failed to list emergencies" });
  }
};

// ✅ Update status of an emergency
export const updateEmergencyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, responderId } = req.body;

    const emergency = await Emergency.findById(id);
    if (!emergency) {
      return res.status(404).json({ message: "Emergency not found" });
    }

    if (status) emergency.status = status;
    if (responderId) emergency.responderId = responderId;

    await emergency.save();

    io.emit("emergencyUpdated", emergency);
    res.json(emergency);
  } catch (err) {
    console.error("Error updating emergency:", err);
    res.status(500).json({ message: "Failed to update emergency status" });
  }
};
