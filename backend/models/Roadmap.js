import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    requiredSkills: [
      {
        type: String,
      },
    ],
    technologies: [
      {
        type: String,
      },
    ],
    programmingLanguages: [
      {
        type: String,
      },
    ],
    frameworks: [
      {
        type: String,
      },
    ],
    tools: [
      {
        type: String,
      },
    ],
    concepts: [
      {
        type: String,
      },
    ],
    recommendedLearningSequence: [
      {
        type: String,
      },
    ],
    projectSuggestions: [
      {
        type: String,
      },
    ],
    interviewPreparationStrategy: {
      type: String,
      required: true,
    },
    aptitudeRequirements: {
      type: String,
      required: true,
    },
    systemDesignRequirements: {
      type: String,
      default: "N/A",
    },
    codingPreparationRoadmap: {
      type: String,
      required: true,
    },
    certifications: [
      {
        type: String,
      },
    ],
    estimatedPreparationTimeline: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Unique index for the combination of company and role to optimize lookup and caching
roadmapSchema.index({ company: 1, role: 1 }, { unique: true });

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

export default Roadmap;
