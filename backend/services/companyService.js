import Company from "../models/Company.js";
import askAI from "./openRouterService.js";

// Helper to construct prompt for company profile generation
const getCompanyPrompt = (name) => {
  return `
You are a top-tier corporate intelligence analyst and recruiter.
Generate a comprehensive, highly accurate company overview for "${name}".

Provide your response strictly as a single, valid JSON object, without any markdown formatting, backticks, or code block fences (do not wrap it in \`\`\`json or \`\`\`). The JSON object must match this schema structure exactly:
{
  "name": "${name}",
  "description": "A detailed 2-3 sentence description of the company, its origins, and its mission.",
  "industry": "Primary industry the company operates in (e.g. Technology / E-commerce, aerospace, space tech, fintech, Web3, etc.)",
  "productsServices": ["Product/Service 1", "Product/Service 2", "Product/Service 3"],
  "workCulture": "A detailed overview of the work environment, employee benefits, balance, and unique values.",
  "hiringTrends": "A summary of recent hiring focuses, preferred backgrounds, and hiring intensity.",
  "keyTechnologies": ["Technology 1", "Technology 2", "Technology 3", "Technology 4"],
  "roles": ["Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Analyst", "Data Scientist", "AI/ML Engineer", "DevOps Engineer", "Cloud Engineer", "Cybersecurity Engineer", "Product Manager"]
}

Make sure that the fields are highly specific, detailed, and accurate to "${name}". The roles array should list the common tech, software, engineering, and product roles they actively hire for.
`;
};

// Fetch all companies
export const getCompanies = async () => {
  return await Company.find({}).sort({ name: 1 });
};

// Search companies by query (partial case-insensitive matching)
export const searchCompanies = async (query) => {
  if (!query) return [];
  const regex = new RegExp(query, "i");
  const localResults = await Company.find({
    $or: [
      { name: regex },
      { description: regex },
      { industry: regex },
      { keyTechnologies: regex },
      { roles: regex }
    ]
  }).sort({ name: 1 });

  if (localResults.length > 0) {
    return localResults;
  }

  // If no local matches, treat the query as a company name and dynamically generate it
  console.log(`🔍 No local matches found for search query: "${query}". Triggering dynamic AI generation...`);
  try {
    const newCompany = await getCompanyByName(query);
    return newCompany ? [newCompany] : [];
  } catch (error) {
    console.error("Failed to dynamically generate company during search:", error.message);
    return [];
  }
};

// Fetch company overview by name (case-insensitive)
export const getCompanyByName = async (name) => {
  if (!name) return null;

  // 1. Check if the company exists in MongoDB
  let company = await Company.findOne({
    name: { $regex: new RegExp(`^${name.trim()}$`, "i") }
  });

  if (company) {
    console.log(`ℹ️ Returning cached company overview for: ${company.name}`);
    return company;
  }

  // 2. If not found, dynamically generate it
  console.log(`🤖 Company overview for "${name}" not found in cache. Generating dynamically...`);
  const responseText = await askAI(getCompanyPrompt(name.trim()));

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
  } catch (error) {
    console.error("Failed to parse AI response as JSON. Raw response:", responseText);
    throw new Error(`Failed to dynamically generate company overview for '${name}'.`);
  }

  // 3. Save to MongoDB
  company = await Company.create({
    name: parsedData.name || name.trim(),
    description: parsedData.description || "",
    industry: parsedData.industry || "Technology",
    productsServices: parsedData.productsServices || [],
    workCulture: parsedData.workCulture || "",
    hiringTrends: parsedData.hiringTrends || "",
    keyTechnologies: parsedData.keyTechnologies || [],
    roles: parsedData.roles || []
  });

  console.log(`✅ Dynamically generated and cached company: ${company.name}`);
  return company;
};

// Fetch roles for a specific company (case-insensitive)
export const getCompanyRoles = async (name) => {
  if (!name) return null;

  // Call getCompanyByName which automatically checks MongoDB or generates & caches it
  const company = await getCompanyByName(name);
  return company ? company.roles : null;
};
