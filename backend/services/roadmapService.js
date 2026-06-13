import Roadmap from "../models/Roadmap.js";
import { getCompanyByName } from "./companyService.js";
import askAI from "./openRouterService.js";

// Fetch existing or generate a new roadmap
export const getOrCreateRoadmap = async (companyName, role) => {
  // 1. Resolve the company (which dynamically generates it if it is not cached)
  const company = await getCompanyByName(companyName);
  const normalizedCompanyName = company ? company.name : companyName;

  // 2. Check if the roadmap is already cached in database
  const existingRoadmap = await Roadmap.findOne({
    company: { $regex: new RegExp(`^${normalizedCompanyName}$`, "i") },
    role: { $regex: new RegExp(`^${role}$`, "i") }
  });

  if (existingRoadmap) {
    console.log(`ℹ️ Returning cached roadmap for ${normalizedCompanyName} - ${role}`);
    return existingRoadmap;
  }

  console.log(`🤖 Generating new roadmap via AI for ${normalizedCompanyName} - ${role}...`);

  // Prompt AI for a structured JSON response
  const prompt = `
You are an expert career advisor and technical recruiter.
Generate a highly detailed, comprehensive, and personalized career and preparation roadmap to crack the role of "${role}" at "${normalizedCompanyName}".

Provide your response strictly as a single, valid JSON object, without any markdown formatting, backticks, or code block fences (do not wrap it in \`\`\`json or \`\`\`). The JSON object must match this schema structure exactly:
{
  "company": "${normalizedCompanyName}",
  "role": "${role}",
  "requiredSkills": ["skill1", "skill2"],
  "technologies": ["tech1", "tech2"],
  "programmingLanguages": ["lang1", "lang2"],
  "frameworks": ["framework1", "framework2"],
  "tools": ["tool1", "tool2"],
  "concepts": ["concept1", "concept2"],
  "recommendedLearningSequence": ["step1", "step2"],
  "projectSuggestions": ["project1 with description", "project2 with description"],
  "interviewPreparationStrategy": "Detailed explanation of the interview process at this company for this role and strategy to crack it.",
  "aptitudeRequirements": "Details of aptitude/logical/analytical tests required for this company's hiring process.",
  "systemDesignRequirements": "Details of system design requirements for this role (e.g. LLD/HLD, scaling, database choices), or 'N/A' if not applicable.",
  "codingPreparationRoadmap": "Step-by-step roadmap for data structures, algorithms, and coding platforms (e.g. LeetCode patterns, company-specific tag questions).",
  "certifications": ["cert1", "cert2"],
  "estimatedPreparationTimeline": "An estimated timeline (e.g. '3-6 months') with a breakdown of phases."
}

Ensure the content is deeply personalized to how "${normalizedCompanyName}" specifically interviews and operates (e.g., mentioning company-specific processes, core values, technical stack, and interview stages).
`;

  const responseText = await askAI(prompt);
  
  // Clean up potential markdown formatting in AI's response
  let cleanedText = responseText.trim();
  if (cleanedText.startsWith("```")) {
    cleanedText = cleanedText
      .replace(/^```json\s*/i, "")
      .replace(/```$/, "")
      .trim();
  }

  let parsedData;
  try {
    parsedData = JSON.parse(cleanedText);
  } catch (parseError) {
    console.error("Failed to parse AI response as JSON. Raw response:", responseText);
    throw new Error("Failed to generate a valid structured roadmap. Please try again.");
  }

  // Save the generated roadmap in the database
  const newRoadmap = await Roadmap.create({
    company: normalizedCompanyName,
    role: parsedData.role || role,
    requiredSkills: parsedData.requiredSkills || [],
    technologies: parsedData.technologies || [],
    programmingLanguages: parsedData.programmingLanguages || [],
    frameworks: parsedData.frameworks || [],
    tools: parsedData.tools || [],
    concepts: parsedData.concepts || [],
    recommendedLearningSequence: parsedData.recommendedLearningSequence || [],
    projectSuggestions: parsedData.projectSuggestions || [],
    interviewPreparationStrategy: parsedData.interviewPreparationStrategy || "",
    aptitudeRequirements: parsedData.aptitudeRequirements || "",
    systemDesignRequirements: parsedData.systemDesignRequirements || "N/A",
    codingPreparationRoadmap: parsedData.codingPreparationRoadmap || "",
    certifications: parsedData.certifications || [],
    estimatedPreparationTimeline: parsedData.estimatedPreparationTimeline || ""
  });

  console.log(`✅ Dynamically generated and cached roadmap for ${normalizedCompanyName} - ${role}`);
  return newRoadmap;
};
