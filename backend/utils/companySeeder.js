import Company from "../models/Company.js";

const initialCompanies = [
  {
    name: "Google",
    description: "A global technology leader specializing in internet-related services, search, cloud computing, and hardware.",
    industry: "Technology / Internet",
    productsServices: ["Google Search", "Google Cloud Platform", "YouTube", "Android OS", "Google Maps", "Chrome Browser", "Pixel Hardware"],
    workCulture: "Emphasis on innovation, open collaboration, psychological safety, work-life balance, and continuous learning.",
    hiringTrends: "Strong focus on AI/ML Engineering, Cloud Engineering, Systems Infrastructure, and Product Management.",
    keyTechnologies: ["C++", "Java", "Python", "Go", "TypeScript", "Angular", "Kubernetes", "TensorFlow"],
    roles: ["Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "AI/ML Engineer", "DevOps Engineer", "Cloud Engineer", "Product Manager"]
  },
  {
    name: "Microsoft",
    description: "A multinational technology corporation known for software products, developer tools, and enterprise cloud solutions.",
    industry: "Technology / Software / Cloud",
    productsServices: ["Microsoft Azure", "Windows OS", "Microsoft 365", "VS Code", "LinkedIn", "Xbox Gaming", "GitHub"],
    workCulture: "Growth mindset, diversity and inclusion, customer-obsessed innovation, and collaborative engineering.",
    hiringTrends: "Growing demand for AI Integration Specialists, Azure Cloud Engineers, Cybersecurity Analysts, and Full Stack Developers.",
    keyTechnologies: ["C#", "C++", "TypeScript", "React", "Azure Services", "Python", "SQL Server"],
    roles: ["Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Analyst", "Data Scientist", "AI/ML Engineer", "DevOps Engineer", "Cloud Engineer", "Cybersecurity Engineer", "Product Manager"]
  },
  {
    name: "Amazon",
    description: "A diverse technology giant focusing on e-commerce, cloud computing (AWS), digital streaming, and artificial intelligence.",
    industry: "Technology / E-commerce / Cloud",
    productsServices: ["Amazon.com E-commerce", "Amazon Web Services (AWS)", "Prime Video", "Kindle", "Alexa Smart Home", "Ring Security"],
    workCulture: "Customer obsession, ownership, bias for action, high operational standards, and data-driven decisions.",
    hiringTrends: "Constant hiring for AWS engineers, Distributed Systems developers, AI researchers, and DevOps.",
    keyTechnologies: ["Java", "C++", "Python", "AWS (EC2, S3, DynamoDB)", "React", "Linux"],
    roles: ["Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Analyst", "Data Scientist", "AI/ML Engineer", "DevOps Engineer", "Cloud Engineer", "Product Manager"]
  },
  {
    name: "Meta",
    description: "A social technology company focused on connecting people, building communities, and developing the metaverse.",
    industry: "Technology / Social Media",
    productsServices: ["Facebook", "Instagram", "WhatsApp", "Messenger", "Quest VR"],
    workCulture: "Move fast, focus on impact, be bold, build awesome things, and communicate openly.",
    hiringTrends: "Hiring heavily for AI infrastructure, PyTorch development, Full Stack engineers, and VR/AR developers.",
    keyTechnologies: ["Hack/PHP", "C++", "Python", "JavaScript", "React", "PyTorch"],
    roles: ["Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Analyst", "Data Scientist", "AI/ML Engineer", "DevOps Engineer", "Product Manager"]
  },
  {
    name: "Adobe",
    description: "A pioneer in digital media and digital marketing solutions, famous for creative tools and document software.",
    industry: "Technology / Software",
    productsServices: ["Adobe Creative Cloud (Photoshop, Illustrator, Premiere Pro)", "Adobe Document Cloud (Acrobat, Sign)", "Adobe Experience Cloud"],
    workCulture: "Genuine, exceptional, innovative, involved. Highly supportive and employee-centric environment.",
    hiringTrends: "Focused on AI-driven creative features (Firefly), Cloud Platform Engineers, and UX Developers.",
    keyTechnologies: ["C++", "Java", "JavaScript", "WebAssembly", "React", "AWS"],
    roles: ["Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Analyst", "AI/ML Engineer", "DevOps Engineer", "Product Manager"]
  },
  {
    name: "Netflix",
    description: "A leading entertainment service with millions of paid memberships in over 190 countries.",
    industry: "Technology / Entertainment",
    productsServices: ["Netflix Streaming Service", "Netflix Games", "Original Production Studio"],
    workCulture: "Freedom and responsibility, high performance, context not control, highly competitive compensation.",
    hiringTrends: "Focus on Senior Engineers, Data Scientists for personalization, and Cloud Infrastructure specialists.",
    keyTechnologies: ["Java", "JavaScript", "React", "Node.js", "AWS", "Cassandra", "Python"],
    roles: ["Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "DevOps Engineer", "Cloud Engineer", "Product Manager"]
  },
  {
    name: "Zepto",
    description: "A fast-growing Indian startup delivering groceries and essentials in under 10 minutes.",
    industry: "Technology / E-commerce / Logistics",
    productsServices: ["Zepto App", "10-Minute Delivery Service", "Zepto Café"],
    workCulture: "Fast-paced, high ownership, customer-centric execution, startup hustle, and high ownership.",
    hiringTrends: "Recruiting Mobile Developers, Backend Developers, Supply Chain/Logistics Data Analysts, and DevOps.",
    keyTechnologies: ["Node.js", "Go", "Python", "React Native", "AWS", "PostgreSQL", "Redis"],
    roles: ["Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Analyst", "DevOps Engineer", "Product Manager"]
  },
  {
    name: "Pixxel",
    description: "A space data startup building a health monitor for the planet through hyperspectral imaging satellites.",
    industry: "Aerospace / SpaceTech / DeepTech",
    productsServices: ["Hyperspectral Satellite Constellation", "Earth Observation Data Analytics"],
    workCulture: "Mission-driven, scientific exploration, flat hierarchy, and multidisciplinary engineering.",
    hiringTrends: "Deep demand for GIS developers, Remote Sensing Data Scientists, Embedded Systems Engineers, and AI/ML Specialists.",
    keyTechnologies: ["Python", "C++", "Rust", "GIS Tools", "PyTorch", "AWS", "Docker"],
    roles: ["Software Engineer", "Backend Developer", "Full Stack Developer", "Data Analyst", "Data Scientist", "AI/ML Engineer", "DevOps Engineer", "Cloud Engineer", "Product Manager"]
  },
  {
    name: "Polygon",
    description: "A decentralized Ethereum scaling platform that enables developers to build scalable, user-friendly dApps.",
    industry: "Technology / Blockchain / Web3",
    productsServices: ["Polygon PoS Network", "Polygon zkEVM", "Polygon SDK"],
    workCulture: "Remote-first, open-source contribution, high autonomy, and pioneering Web3 solutions.",
    hiringTrends: "Actively hiring Blockchain Engineers, Smart Contract developers, Developer Relations, and Cryptography Researchers.",
    keyTechnologies: ["Go", "Solidity", "Rust", "TypeScript", "Cryptographic tools", "Web3.js", "Ethers.js"],
    roles: ["Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps Engineer", "Cryptography / Blockchain Engineer"]
  }
];

export const seedCompanies = async () => {
  try {
    const count = await Company.countDocuments();
    if (count === 0) {
      await Company.insertMany(initialCompanies);
      console.log("✅ Initial companies seeded successfully.");
    } else {
      console.log(`ℹ️ Company database already contains ${count} records. Skipping seeding.`);
    }
  } catch (error) {
    console.error("❌ Error seeding companies:", error.message);
  }
};
