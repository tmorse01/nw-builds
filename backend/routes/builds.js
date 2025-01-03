const express = require("express");
const router = express.Router();
const Build = require("../models/Build");

// Get all builds
router.get("/", async (req, res) => {
  try {
    const builds = await Build.find();
    res.json(builds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single build by ID
router.get("/:id", async (req, res) => {
  try {
    const build = await Build.findById(req.params.id);
    if (!build) return res.status(404).json({ message: "Build not found" });
    res.json(build);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new build
router.post("/", async (req, res) => {
  const build = new Build(req.body);
  try {
    const newBuild = await build.save();
    res.status(201).json(newBuild);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a build by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedBuild = await Build.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedBuild)
      return res.status(404).json({ message: "Build not found" });
    res.json(updatedBuild);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a build by ID
router.delete("/:id", async (req, res) => {
  try {
    const build = await Build.findByIdAndDelete(req.params.id);
    if (!build) return res.status(404).json({ message: "Build not found" });
    res.json({ message: "Build deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
