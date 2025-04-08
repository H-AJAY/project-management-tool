const express = require("express");
const Project = require("../models/Project");
const { authMiddleware, managerOnly } = require("../middleWare/authMiddleWare");

const router = express.Router();

// Only managers can create projects
router.post("/", authMiddleware, managerOnly, async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.json(project);
});

// Anyone logged in can view
router.get("/", authMiddleware, async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

module.exports = router;
