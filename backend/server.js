// backend/server.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log("⚡ Responder connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Responder disconnected:", socket.id);
  });
});

app.use(express.json());
app.use(cors());

// ✅ Import routes
import userRoutes from "./routes/userRoutes.js";
import responderRoutes from "./routes/responderRoutes.js";
import emergencyRoutes from "./routes/emergencyRoutes.js";
// ✅ Added this line:
import citizenRoutes from "./routes/citizenRoutes.js";

// ✅ Mount routes
app.use("/api/users", userRoutes);
app.use("/api/responders", responderRoutes);
app.use("/api/emergencies", emergencyRoutes);
// ✅ Added this line:
app.use("/api/citizens", citizenRoutes);

// Static uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("API and WebSocket server running...");
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
