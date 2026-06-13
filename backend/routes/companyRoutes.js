import express from "express";
import {
  getAllCompanies,
  searchCompanies,
  getCompanyByName,
  getCompanyRoles
} from "../controllers/companyController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all companies
router.get("/", authMiddleware, getAllCompanies);

// Search companies (must be defined before /:name to avoid route parameter hijacking)
router.get("/search", authMiddleware, searchCompanies);

// Get specific company details by name
router.get("/:name", authMiddleware, getCompanyByName);

// Get available roles for a specific company
router.get("/:name/roles", authMiddleware, getCompanyRoles);

export default router;
