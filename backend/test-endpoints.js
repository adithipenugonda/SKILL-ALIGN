import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import axios from "axios";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// Load env
dotenv.config();

import connectDB from "./config/db.js";
import User from "./models/User.js";
import Company from "./models/Company.js";
import Roadmap from "./models/Roadmap.js";
import companyRoutes from "./routes/companyRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";

const TEST_PORT = 5001;

const runTests = async () => {
  let server;
  try {
    console.log("🔌 Connecting to DB...");
    await connectDB();

    // Clean up previously dynamically created companies/roadmaps for clean testing
    console.log("🧼 Cleaning up previous dynamic test data (Uber, Atlassian)...");
    await Company.deleteMany({ name: { $in: ["Uber", "Atlassian"] } });
    await Roadmap.deleteMany({ company: { $in: ["Uber", "Atlassian"] } });

    // 1. Setup Test User
    console.log("👤 Creating/finding test user...");
    let user = await User.findOne({ email: "teststudent@skillalign.com" });
    if (!user) {
      user = await User.create({
        name: "Test Student",
        email: "teststudent@skillalign.com",
        password: "testpassword123",
        role: "student"
      });
    }

    // 2. Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "skillalignjwtsecretkey123!",
      { expiresIn: "1h" }
    );
    console.log("🔑 Generated Test JWT Token successfully.");

    // 3. Start Express app locally on port 5001
    const app = express();
    app.use(cors());
    app.use(express.json());
    
    app.use("/api/companies", companyRoutes);
    app.use("/api/roadmaps", roadmapRoutes);

    server = app.listen(TEST_PORT, () => {
      console.log(`🚀 Test Server listening on port ${TEST_PORT}`);
    });

    const axiosConfig = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const baseUrl = `http://localhost:${TEST_PORT}`;

    // --- TEST 1: Fetch all cached companies ---
    console.log("\n--- TEST 1: Fetching all cached companies ---");
    const allCompaniesRes = await axios.get(`${baseUrl}/api/companies`, axiosConfig);
    console.log("Success:", allCompaniesRes.data.success);
    console.log("Count:", allCompaniesRes.data.count);
    console.log("First Company Name:", allCompaniesRes.data.companies[0]?.name);

    // --- TEST 2: Global Search for a brand-new company (Atlassian) ---
    console.log("\n--- TEST 2: Global Search for uncached company 'Atlassian' ---");
    console.log("(This should trigger AI generation and cache it in MongoDB)");
    const searchRes = await axios.get(`${baseUrl}/api/companies/search?q=Atlassian`, axiosConfig);
    console.log("Success:", searchRes.data.success);
    console.log("Results Count:", searchRes.data.count);
    const foundCompany = searchRes.data.companies[0];
    console.log("Generated Company Name:", foundCompany?.name);
    console.log("Industry:", foundCompany?.industry);
    console.log("Roles Available:", foundCompany?.roles);

    // Verify it is now cached in DB
    const cachedAtlassian = await Company.findOne({ name: "Atlassian" });
    console.log("Confirmed cached in MongoDB:", !!cachedAtlassian);

    // --- TEST 3: Fetch overview for another uncached company (Uber) ---
    console.log("\n--- TEST 3: Fetching overview for uncached company 'Uber' ---");
    console.log("(This should trigger dynamic generation and cache it)");
    const overviewRes = await axios.get(`${baseUrl}/api/companies/Uber`, axiosConfig);
    console.log("Success:", overviewRes.data.success);
    console.log("Name:", overviewRes.data.company?.name);
    console.log("Description:", overviewRes.data.company?.description);
    console.log("Key Tech:", overviewRes.data.company?.keyTechnologies);

    // --- TEST 4: Fetch roles for Uber ---
    console.log("\n--- TEST 4: Fetching roles for 'Uber' (now cached) ---");
    const rolesRes = await axios.get(`${baseUrl}/api/companies/Uber/roles`, axiosConfig);
    console.log("Success:", rolesRes.data.success);
    console.log("Roles Count:", rolesRes.data.count);
    console.log("Roles:", rolesRes.data.roles);

    // --- TEST 5: Generate dynamic roadmap for 'Uber' - 'Backend Developer' ---
    console.log("\n--- TEST 5: Generating roadmap for 'Uber' - 'Backend Developer' ---");
    console.log("(This should call AI, cache it, and return the structured roadmap)");
    const t0 = Date.now();
    const roadmapRes1 = await axios.post(
      `${baseUrl}/api/roadmaps/generate`,
      { companyName: "Uber", role: "Backend Developer" },
      axiosConfig
    );
    const t1 = Date.now();
    console.log("Success:", roadmapRes1.data.success);
    console.log("Generation Time:", ((t1 - t0) / 1000).toFixed(2), "seconds");
    console.log("Roadmap Role:", roadmapRes1.data.roadmap?.role);
    console.log("Programming Languages:", roadmapRes1.data.roadmap?.programmingLanguages);
    console.log("Interview Strategy:", roadmapRes1.data.roadmap?.interviewPreparationStrategy?.slice(0, 150) + "...");

    // --- TEST 6: Fetch same roadmap again to test caching ---
    console.log("\n--- TEST 6: Fetching same roadmap again to verify caching ---");
    console.log("(This should respond instantly from MongoDB)");
    const t2 = Date.now();
    const roadmapRes2 = await axios.post(
      `${baseUrl}/api/roadmaps/generate`,
      { companyName: "Uber", role: "Backend Developer" },
      axiosConfig
    );
    const t3 = Date.now();
    console.log("Success:", roadmapRes2.data.success);
    console.log("Response Time (Cached):", ((t3 - t2) / 1000).toFixed(4), "seconds");
    console.log("Roadmap ID Match:", roadmapRes1.data.roadmap?._id === roadmapRes2.data.roadmap?._id);

    console.log("\n✅ All tested endpoints responded successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error.response?.data || error.message);
  } finally {
    if (server) {
      server.close(() => {
        console.log("🔌 Closed Test Server.");
      });
    }
    await mongoose.connection.close();
    console.log("🔌 Disconnected from MongoDB.");
  }
};

runTests();
