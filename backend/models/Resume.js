import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    // Resume Owner
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Original File Name
    fileName: {
      type: String,
      required: true,
    },

    // Uploaded PDF Path
    filePath: {
      type: String,
      required: true,
    },

    // Extracted PDF Text
    extractedText: {
      type: String,
      default: "",
    },

    // Job Role User Targets
    targetRole: {
      type: String,
      required: true,
    },

    // ATS Score
    atsScore: {
      type: Number,
      default: 0,
    },

    // Missing Keywords
    missingKeywords: [
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

    // AI Suggestions
    aiSuggestions: {
      type: String,
      default: "",
    },

    // Resume Status
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

const Resume = mongoose.model(
  "Resume",
  resumeSchema
);

export default Resume;