import mongoose from "mongoose";

const curriculumSchema = new mongoose.Schema(
  {
    // Educator
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Uploaded PDF
    fileName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    // Extracted Curriculum Text
    extractedText: {
      type: String,
      default: "",
    },

    // Department
    department: {
      type: String,
      required: true,
    },

    // Subject
    subject: {
      type: String,
      required: true,
    },

    // Existing Skills Found
    existingSkills: [
      {
        type: String,
      },
    ],

    // Missing Industry Skills
    missingSkills: [
      {
        type: String,
      },
    ],

    // Recommended Skills
    recommendedSkills: [
      {
        type: String,
      },
    ],

    // AI Enhanced Curriculum
    enhancedCurriculum: {
      type: String,
      default: "",
    },

    // Market Alignment Score
    marketAlignmentScore: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "uploaded",
        "processing",
        "completed",
        "failed",
      ],
      default: "uploaded",
    },
  },
  {
    timestamps: true,
  }
);

const Curriculum = mongoose.model(
  "Curriculum",
  curriculumSchema
);

export default Curriculum;