import Resume from "../models/Resume.js";
import parsePDF from "../utils/pdfParser.js";
import analyzeResume from "../services/resumeService.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required",
      });
    }

    const { targetRole } = req.body;

    if (!targetRole) {
      return res.status(400).json({
        success: false,
        message: "Target role is required",
      });
    }

    // Extract text from PDF
    const extractedText = await parsePDF(
      req.file.path
    );

    // AI + ATS Analysis
    const analysis = await analyzeResume(
      extractedText,
      targetRole
    );

    // Save Resume Analysis
    const resume = await Resume.create({
      user: req.user._id,

      fileName: req.file.originalname,

      filePath: req.file.path,

      extractedText,

      targetRole,

      atsScore: analysis.atsScore,

      missingKeywords:
        analysis.missingSkills,

      recommendedSkills:
        analysis.recommendedSkills,

      aiSuggestions:
        analysis.aiSuggestions,

      status: "completed",
    });

    return res.status(201).json({
      success: true,
      message:
        "Resume analyzed successfully",

      data: {
        resumeId: resume._id,

        atsScore: analysis.atsScore,

        matchedSkills:
          analysis.matchedSkills,

        missingSkills:
          analysis.missingSkills,

        recommendedSkills:
          analysis.recommendedSkills,

        aiSuggestions:
          analysis.aiSuggestions,
      },
    });

  } catch (error) {
    console.error(
      "Resume Upload Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All User Resumes
export const getMyResumes = async (
  req,
  res
) => {
  try {
    const resumes =
      await Resume.find({
        user: req.user._id,
      }).sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Resume By ID
export const getResumeById = async (
  req,
  res
) => {
  try {
    const resume =
      await Resume.findById(
        req.params.id
      );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message:
          "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Resume
export const deleteResume = async (
  req,
  res
) => {
  try {
    const resume =
      await Resume.findById(
        req.params.id
      );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message:
          "Resume not found",
      });
    }

    await Resume.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Resume deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};