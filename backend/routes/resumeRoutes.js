import express from "express";

import {
  uploadResume,
  getMyResumes,
  getResumeById,
  deleteResume,
} from "../controllers/resumeController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Upload Resume + AI Analysis
router.post(
  "/upload",
  authMiddleware,
  upload.single("pdf"),
  uploadResume
);

// Get All User Resumes
router.get(
  "/",
  authMiddleware,
  getMyResumes
);

// Get Single Resume
router.get(
  "/:id",
  authMiddleware,
  getResumeById
);

// Delete Resume
router.delete(
  "/:id",
  authMiddleware,
  deleteResume
);

export default router;