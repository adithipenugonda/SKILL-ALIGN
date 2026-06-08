import extractSkills from "./skillExtractor.js";
import { marketSkills } from "./marketSkillDictionary.js";

const analyzeCurriculum = (
  curriculumText,
  domain
) => {
  try {
    const existingSkills =
      extractSkills(curriculumText);

    const requiredSkills =
      marketSkills[domain] || [];

    const missingSkills =
      requiredSkills.filter(
        (skill) =>
          !existingSkills.some(
            (existing) =>
              existing.toLowerCase() ===
              skill.toLowerCase()
          )
      );

    const matchedSkills =
      existingSkills.filter(
        (skill) =>
          requiredSkills.some(
            (required) =>
              required.toLowerCase() ===
              skill.toLowerCase()
          )
      );

    const marketAlignmentScore =
      requiredSkills.length > 0
        ? Math.round(
            (matchedSkills.length /
              requiredSkills.length) *
              100
          )
        : 0;

    return {
      existingSkills,
      matchedSkills,
      missingSkills,
      recommendedSkills:
        missingSkills,
      marketAlignmentScore,
    };
  } catch (error) {
    console.error(
      "Curriculum Analyzer Error:",
      error.message
    );

    throw error;
  }
};

export default analyzeCurriculum;