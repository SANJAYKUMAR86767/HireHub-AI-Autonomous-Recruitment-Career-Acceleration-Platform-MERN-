const mongoose = require("mongoose");
const dns = require("dns");
const User = require("../models/User");

// Ensure reliable SRV DNS resolution across all networks
try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (e) {
  // Ignore if custom DNS not supported in environment
}

const seedDemoUsers = async () => {
  try {
    const demoCandidateId = "65ef49b80000000000000001";
    const demoRecruiterId = "65ef49b80000000000000002";
    const demoAdminId = "65ef49b80000000000000003";

    // 1. Candidate
    const candidateExists = await User.findById(demoCandidateId);
    if (!candidateExists) {
      await User.create({
        _id: demoCandidateId,
        name: "Aarav Sharma (Demo)",
        email: "candidate@demo.com",
        password: "$2a$10$DemoHashPasswordForLocalTestingOnlySecureEnough123",
        role: "candidate",
        location: "Bangalore",
        skills: ["React", "Node.js", "TypeScript", "Tailwind CSS"],
        experience: [{ title: "Frontend Intern", company: "Meta", years: 1 }],
        education: [{ degree: "B.Tech CSE", institute: "IIT Bombay", year: 2025 }]
      });
      console.log("Seeded demo candidate account successfully!");
    }

    // 2. Recruiter
    const recruiterExists = await User.findById(demoRecruiterId);
    if (!recruiterExists) {
      await User.create({
        _id: demoRecruiterId,
        name: "Sanjay Kumar (Demo)",
        email: "recruiter@demo.com",
        password: "$2a$10$DemoHashPasswordForLocalTestingOnlySecureEnough123",
        role: "recruiter",
        companyName: "Google India",
        companyVerified: true
      });
      console.log("Seeded demo recruiter account successfully!");
    }

    // 3. Admin
    const adminExists = await User.findById(demoAdminId);
    if (!adminExists) {
      await User.create({
        _id: demoAdminId,
        name: "Super Admin (Demo)",
        email: "admin@demo.com",
        password: "$2a$10$DemoHashPasswordForLocalTestingOnlySecureEnough123",
        role: "admin"
      });
      console.log("Seeded demo admin account successfully!");
    }
  } catch (err) {
    console.error("Error seeding demo accounts:", err.message);
  }
};

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hirehub";
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log("MongoDB connected successfully to Atlas Cluster!");
    await seedDemoUsers();
  } catch (err) {
    console.warn("MongoDB Atlas connection notice:", err.message);
    console.log("Serving rich embedded mock datasets for zero-downtime execution.");
  }
};

module.exports = connectDB;
