// backend/routes/responderRoutes.js
import express from "express";
import {
  registerResponder,
  loginResponder,
  getResponderDashboard,
  listAssignedEmergencies,
  getAllResponders
} from "../controllers/responderController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register new responder
router.post("/register", registerResponder);

// Login responder
router.post("/login", loginResponder);

// Get responder dashboard stats
router.get("/dashboard", verifyToken, requireRole("responder"), getResponderDashboard);

// List emergencies assigned to responder
router.get("/assigned", verifyToken, requireRole("responder"), listAssignedEmergencies);

// Get all responders (for citizens to view assistance)
router.get("/all", getAllResponders);

export default router;
