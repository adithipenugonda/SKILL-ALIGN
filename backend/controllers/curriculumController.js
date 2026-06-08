import Curriculum from "../models/Curriculum.js";
import parsePDF from "../utils/pdfParser.js";
import enhanceCurriculum from "../services/curriculumService.js";

// Upload Curriculum & Generate Enhanced Version
export const uploadCurriculum = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Curriculum PDF is required",
      });
    }

    const { domain, subject } = req.body;

    if (!domain || !subject) {
      return res.status(400).json({
        success: false,
        message:
          "Domain and Subject are required",
      });
    }

    // Extract PDF Text
    const extractedText =
      await parsePDF(req.file.path);

    // Analyze & Enhance Curriculum
    const analysis =
      await enhanceCurriculum(
        extractedText,
        domain,
        subject
      );

    // Save in MongoDB
    const curriculum =
      await Curriculum.create({
        user: req.user._id,

        fileName:
          req.file.originalname,

        filePath:
          req.file.path,

        extractedText,

        department: domain,

        subject,

        existingSkills:
          analysis.existingSkills,

        missingSkills:
          analysis.missingSkills,

        recommendedSkills:
          analysis.recommendedSkills,

        marketAlignmentScore:
          analysis.marketAlignmentScore,

        enhancedCurriculum:
          analysis.enhancedCurriculum,

        status: "completed",
      });

    return res.status(201).json({
      success: true,
      message:
        "Curriculum analyzed successfully",

      data: {
        curriculumId:
          curriculum._id,

        existingSkills:
          analysis.existingSkills,

        matchedSkills:
          analysis.matchedSkills,

        missingSkills:
          analysis.missingSkills,

        recommendedSkills:
          analysis.recommendedSkills,

        marketAlignmentScore:
          analysis.marketAlignmentScore,

        enhancedCurriculum:
          analysis.enhancedCurriculum,
      },
    });

  } catch (error) {
    console.error(
      "Curriculum Upload Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Curriculums
export const getMyCurriculums =
  async (req, res) => {
    try {
      const curriculums =
        await Curriculum.find({
          user: req.user._id,
        }).sort({
          createdAt: -1,
        });

      return res.status(200).json({
        success: true,
        count:
          curriculums.length,
        curriculums,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// Get Single Curriculum
export const getCurriculumById =
  async (req, res) => {
    try {
      const curriculum =
        await Curriculum.findById(
          req.params.id
        );

      if (!curriculum) {
        return res.status(404).json({
          success: false,
          message:
            "Curriculum not found",
        });
      }

      return res.status(200).json({
        success: true,
        curriculum,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// Delete Curriculum
export const deleteCurriculum =
  async (req, res) => {
    try {
      const curriculum =
        await Curriculum.findById(
          req.params.id
        );

      if (!curriculum) {
        return res.status(404).json({
          success: false,
          message:
            "Curriculum not found",
        });
      }

      await Curriculum.findByIdAndDelete(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Curriculum deleted successfully",
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };