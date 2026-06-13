import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    productsServices: [
      {
        type: String,
      },
    ],
    workCulture: {
      type: String,
      required: true,
    },
    hiringTrends: {
      type: String,
      required: true,
    },
    keyTechnologies: [
      {
        type: String,
      },
    ],
    roles: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Add a text index for name, description, industry, keyTechnologies, and roles
companySchema.index({
  name: "text",
  description: "text",
  industry: "text",
  keyTechnologies: "text",
  roles: "text"
});

const Company = mongoose.model("Company", companySchema);

export default Company;
