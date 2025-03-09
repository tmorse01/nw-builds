const express = require("express");
const Build = require("../models/Build");
const Tag = require("../models/Tag");

const router = express.Router();

// Get all builds
router.get("/", async (req, res) => {
  try {
    const builds = await Build.find();
    res.json(builds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get builds optimized for card display
router.get("/list", async (req, res) => {
  try {
    // Parse pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Query with selected fields useful for cards
    const builds = await Build.find()
      .sort({ updatedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Fetch all tags from the database
    const tags = await Tag.find();
    const tagsMap = tags.reduce((map, tag) => {
      map[tag.name] = { name: tag.name, color: tag.color };
      return map;
    }, {});

    const transformedBuilds = builds.map((doc) => {
      // Get the basic document data
      const buildData = {
        ...doc._doc,
      };

      // Resolve tags if they exist
      if (buildData.tags && Array.isArray(buildData.tags)) {
        buildData.tags = buildData.tags.map(
          (tagName) => tagsMap[tagName] || { name: tagName, color: "#cccccc" } // Default color if tag not found
        );
      } else {
        buildData.tags = [];
      }

      return buildData;
    });

    // Get total count for pagination
    const total = await Build.countDocuments();

    res.json({
      builds: transformedBuilds,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single build by ID
router.get("/:id", async (req, res) => {
  console.log("Get Build ID:", req.params.id);
  try {
    const build = await Build.findById(req.params.id);
    if (!build) return res.status(404).json({ message: "Build not found" });

    // Fetch all tags from the database
    const tags = await Tag.find();
    const tagsMap = tags.reduce((map, tag) => {
      map[tag.name] = { name: tag.name, color: tag.color };
      return map;
    }, {});

    // Create a response object with resolved tags
    const buildData = {
      ...build.toObject(),
      sections: build.sections.map((section) => ({
        ...section.toObject(),
      })),
    };

    // Resolve tags if they exist
    if (buildData.tags && Array.isArray(buildData.tags)) {
      buildData.tags = buildData.tags.map(
        (tagName) => tagsMap[tagName] || { name: tagName, color: "#cccccc" } // Default color if tag not found
      );
    } else {
      buildData.tags = [];
    }

    res.json(buildData);
  } catch (err) {
    console.error("Error fetching build:", err);
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

    // Add id property to response
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
