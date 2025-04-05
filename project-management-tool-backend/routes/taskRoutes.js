const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Server error while fetching tasks." });
  }
});

// Create a new task
router.post("/", async (req, res) => {
    try {
      console.log("Incoming request body:", req.body);  // 👈 See if name is present
  
      const task = new Task(req.body);
      await task.save();
      res.json(task);
    } catch (err) {
      console.error("Error saving task:", err); // 👈 This logs the actual problem
      res.status(500).json({ message: err.message });
    }
  });  

module.exports = router;