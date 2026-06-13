import * as companyService from "../services/companyService.js";

// Fetch all companies
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await companyService.getCompanies();
    return res.status(200).json({
      success: true,
      count: companies.length,
      companies
    });
  } catch (error) {
    console.error("Error in getAllCompanies:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Search companies
export const searchCompanies = async (req, res) => {
  try {
    const query = req.query.q || req.query.query;
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query parameter 'q' or 'query' is required"
      });
    }

    const companies = await companyService.searchCompanies(query);
    return res.status(200).json({
      success: true,
      count: companies.length,
      companies
    });
  } catch (error) {
    console.error("Error in searchCompanies:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Fetch company by name
export const getCompanyByName = async (req, res) => {
  try {
    const { name } = req.params;
    const company = await companyService.getCompanyByName(name);
    
    if (!company) {
      return res.status(404).json({
        success: false,
        message: `Company '${name}' not found`
      });
    }

    return res.status(200).json({
      success: true,
      company
    });
  } catch (error) {
    console.error("Error in getCompanyByName:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Fetch roles for a specific company
export const getCompanyRoles = async (req, res) => {
  try {
    const { name } = req.params;
    const roles = await companyService.getCompanyRoles(name);

    if (!roles) {
      return res.status(404).json({
        success: false,
        message: `Company '${name}' not found or has no roles listed`
      });
    }

    return res.status(200).json({
      success: true,
      company: name,
      count: roles.length,
      roles
    });
  } catch (error) {
    console.error("Error in getCompanyRoles:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
