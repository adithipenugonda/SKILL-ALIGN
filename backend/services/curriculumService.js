import askAI from "./openRouterService.js";
import analyzeCurriculum from "../utils/curriculumAnalyzer.js";

const enhanceCurriculum = async (
  curriculumText,
  domain,
  subject
) => {
  try {
    // Analyze Curriculum
    const analysis =
      analyzeCurriculum(
        curriculumText,
        domain
      );

    // AI Prompt
    const prompt = `
You are an Industry Curriculum Expert.

Domain:
${domain}

Subject:
${subject}

Current Curriculum:
${curriculumText.substring(0, 5000)}

Existing Skills:
${analysis.existingSkills.join(", ")}

Missing Industry Skills:
${analysis.missingSkills.join(", ")}

Market Alignment Score:
${analysis.marketAlignmentScore}/100

Tasks:

1. Identify outdated topics.
2. Explain why the missing skills are important.
3. Suggest industry-relevant projects.
4. Generate an Enhanced Curriculum.
5. Organize curriculum into Units.
6. Make it suitable for university students.
7. Include modern tools, frameworks and technologies.

Return response in this format:

OUTDATED TOPICS:
...

MISSING SKILLS:
...

PROJECT SUGGESTIONS:
...

ENHANCED CURRICULUM:
Unit 1:
...

Unit 2:
...

Unit 3:
...
`;

    // AI Response
    const enhancedCurriculum =
      await askAI(prompt);

    return {
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

      enhancedCurriculum,
    };

  } catch (error) {
    console.error(
      "Curriculum Service Error:",
      error.message
    );

    throw error;
  }
};

export default enhanceCurriculum;