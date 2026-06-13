import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import upload from "./middleware/uploadMiddleware.js";
import parsePDF from "./utils/pdfParser.js";
import askAI from "./services/openRouterService.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import curriculumRoutes from "./routes/curriculumRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";

console.log("OpenRouter Key Loaded:", process.env.OPENROUTER_API_KEY?.slice(0,10));
dotenv.config({ path: "./.env" });

console.log(
  "OpenRouter Key Loaded:",
  process.env.OPENROUTER_API_KEY
);

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
app.use(
  "/api/curriculums",
  curriculumRoutes
);
app.use("/api/companies", companyRoutes);
app.use("/api/roadmaps", roadmapRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 SkillAlign Backend Running...");
});

app.get(
  "/api/profile",
  authMiddleware,
  (req, res) => {
    res.json({
      success: true,
      user: req.user,
    });
  }
);

app.post(
  "/api/test-upload",
  upload.single("pdf"),
  (req, res) => {
    res.json({
      success: true,
      file: req.file,
    });
  }
);

app.post(
  "/api/test-pdf",
  upload.single("pdf"),
  async (req, res) => {
    try {
      const text = await parsePDF(req.file.path);

      res.json({
        success: true,
        extractedText: text,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

app.get(
  "/api/test-gemini",
  async (req, res) => {
    try {
      const reply =
        await askGemini(
          "Tell me top skills for a MERN stack developer in 2026"
        );

      res.json({
        success: true,
        response: reply,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

app.get("/api/test-ai", async (req, res) => {
  try {
    const response = await askAI(
      "Tell me top MERN stack skills in 2026"
    );

    res.json({
      success: true,
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/api/models", async (req, res) => {
  try {
    const response = await axios.get(
      "https://openrouter.ai/api/v1/models"
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});



// Port
const PORT = process.env.PORT || 5000;

app.get("/api/check", (req, res) => {
  res.send("Check Route Working");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});