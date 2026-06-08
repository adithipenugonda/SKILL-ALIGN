const SKILLS_DATABASE = [
  // Programming Languages
  "Java",
  "Python",
  "JavaScript",
  "TypeScript",
  "C",
  "C++",
  "C#",
  "R",
  "Go",
  "Rust",

  // Frontend
  "HTML",
  "CSS",
  "React",
  "Next.js",
  "Redux",
  "Tailwind CSS",
  "Bootstrap",

  // Backend
  "Node.js",
  "Express.js",
  "Spring Boot",
  "Django",
  "Flask",
  "FastAPI",

  // Databases
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Redis",
  "Oracle",

  // Data Analytics
  "Excel",
  "Power BI",
  "Tableau",
  "Pandas",
  "NumPy",
  "Statistics",

  // AI / ML
  "Machine Learning",
  "Deep Learning",
  "TensorFlow",
  "PyTorch",
  "NLP",
  "Computer Vision",
  "LangChain",
  "RAG",
  "LLMs",

  // Cloud
  "AWS",
  "Azure",
  "Google Cloud",

  // DevOps
  "Docker",
  "Kubernetes",
  "Jenkins",
  "Terraform",
  "CI/CD",

  // Security
  "OWASP",
  "Wireshark",
  "Kali Linux",
  "Penetration Testing",

  // Tools
  "Git",
  "GitHub",
  "Postman",
  "Linux",
  "VS Code"
];

const extractSkills = (resumeText) => {
  try {
    const text = resumeText.toLowerCase();

    const foundSkills = SKILLS_DATABASE.filter(
      (skill) =>
        text.includes(skill.toLowerCase())
    );

    return [...new Set(foundSkills)];
  } catch (error) {
    console.error(
      "Skill Extraction Error:",
      error.message
    );

    return [];
  }
};

export default extractSkills;