import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";
import {
  reportEmergency,
  getCitizenEmergencies,
  listAllEmergencies,
  updateEmergencyStatus,
} from "../controllers/emergencyController.js";

const router = express.Router();

// ✅ ES module __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ✅ Configure multer for photo uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({ storage });

// ✅ Citizen reports emergency (with photos)
router.post(
  "/report",
  verifyToken,
  requireRole("citizen"),
  upload.array("photos", 5),
  reportEmergency
);

// ✅ Citizen fetches their emergencies
router.get("/citizen", verifyToken, requireRole("citizen"), getCitizenEmergencies);

// ✅ Responder/Admin view all emergencies
router.get("/all", verifyToken, listAllEmergencies);

// ✅ Responder updates emergency status
router.put("/:id", verifyToken, requireRole("responder"), updateEmergencyStatus);

export default router;
