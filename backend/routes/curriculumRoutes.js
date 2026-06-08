import express from "express";

import {
  uploadCurriculum,
  getMyCurriculums,
  getCurriculumById,
  deleteCurriculum,
} from "../controllers/curriculumController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Upload Curriculum + AI Enhancement
router.post(
  "/upload",
  authMiddleware,
  upload.single("pdf"),
  uploadCurriculum
);

// Get All Curriculums
router.get(
  "/",
  authMiddleware,
  getMyCurriculums
);

// Get Single Curriculum
router.get(
  "/:id",
  authMiddleware,
  getCurriculumById
);

// Delete Curriculum
router.delete(
  "/:id",
  authMiddleware,
  deleteCurriculum
);

export default router;