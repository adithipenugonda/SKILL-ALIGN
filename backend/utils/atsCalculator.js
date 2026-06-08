const calculateATSScore = (
  resumeText,
  targetSkills
) => {
  try {
    // Convert everything to lowercase
    const resume = resumeText.toLowerCase();

    let matchedSkills = [];
    let missingSkills = [];

    targetSkills.forEach((skill) => {
      if (
        resume.includes(
          skill.toLowerCase()
        )
      ) {
        matchedSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    });

    // ATS Score Calculation
    const atsScore = Math.round(
      (matchedSkills.length /
        targetSkills.length) *
        100
    );

    return {
      atsScore,
      matchedSkills,
      missingSkills,
    };
  } catch (error) {
    console.error(
      "ATS Calculation Error:",
      error.message
    );

    throw error;
  }
};

export default calculateATSScore;