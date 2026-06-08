import askAI from "./openRouterService.js";
import calculateATSScore from "../utils/atsCalculator.js";
import { roleSkills } from "../utils/skillDictionary.js";

const analyzeResume = async (
  resumeText,
  targetRole
) => {
  try {
    // Get required skills for selected role
    const targetSkills =
      roleSkills[targetRole] || [];

    // ATS Calculation
    const atsResult =
      calculateATSScore(
        resumeText,
        targetSkills
      );

    // AI Prompt
    const prompt = `
You are an expert ATS Resume Reviewer.

Target Role:
${targetRole}

Resume Content:
${resumeText}

Matched Skills:
${atsResult.matchedSkills.join(", ")}

Missing Skills:
${atsResult.missingSkills.join(", ")}

Give:

1. Resume Strengths
2. Missing Skills Explanation
3. Project Suggestions
4. Resume Improvement Tips
5. Industry Readiness Score (out of 100)

Return the answer in plain text.
`;

    // AI Response
    const aiSuggestions =
      await askAI(prompt);

    return {
      atsScore:
        atsResult.atsScore,

      matchedSkills:
        atsResult.matchedSkills,

      missingSkills:
        atsResult.missingSkills,

      recommendedSkills:
        atsResult.missingSkills,

      aiSuggestions,
    };
  } catch (error) {
    console.error(
      "Resume Analysis Error:",
      error.message
    );

    throw error;
  }
};

export default analyzeResume;