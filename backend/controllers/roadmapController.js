import * as roadmapService from "../services/roadmapService.js";

// Generate or fetch a cached career roadmap for a company and role
export const generateRoadmap = async (req, res) => {
  try {
    const { companyName, role } = req.body;

    if (!companyName || !role) {
      return res.status(400).json({
        success: false,
        message: "Both 'companyName' and 'role' are required in the request body."
      });
    }

    const roadmap = await roadmapService.getOrCreateRoadmap(companyName.trim(), role.trim());

    return res.status(200).json({
      success: true,
      roadmap
    });
  } catch (error) {
    console.error("Error in generateRoadmap controller:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
