const express = require("express");
const router = express.Router();
const { authMiddleware, managerOnly } = require("../middleWare/authMiddleWare");
const Project = require("../models/Project");

// 🔒 View all projects (any logged-in user)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects", error });
  }
});

// 🛠️ Create project (managers only)
router.post("/", authMiddleware, managerOnly, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to create project", error });
  }
});

module.exports = router;
