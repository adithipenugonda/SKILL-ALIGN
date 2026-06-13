import express from "express";
import { generateRoadmap } from "../controllers/roadmapController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Generate dynamic role-specific roadmap for a company
router.post("/generate", authMiddleware, generateRoadmap);

export default router;
