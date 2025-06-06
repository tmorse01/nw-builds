const express = require("express");
const Build = require("../models/Build");
const Tag = require("../models/Tag");

const router = express.Router();

// Shared function to resolve tags for builds
const resolveTagsForBuild = async (buildData) => {
  // Fetch all tags from the database
  const tags = await Tag.find();
  console.log("DEBUG: Found tags in database:", tags.length);

  const tagsMap = tags.reduce((map, tag) => {
    map[tag.name] = { name: tag.name, color: tag.color };
    return map;
  }, {});
  console.log("DEBUG: Tags map keys:", Object.keys(tagsMap));

  console.log("DEBUG: Build tags before resolution:", buildData.tags);

  // Resolve tags if they exist
  if (buildData.tags && Array.isArray(buildData.tags)) {
    buildData.tags = buildData.tags.map((tagName) => {
      const resolvedTag = tagsMap[tagName] || {
        name: tagName,
        color: "#cccccc",
      };
      console.log(`DEBUG: Resolving tag "${tagName}" ->`, resolvedTag);
      return resolvedTag;
    });
  } else {
    console.log(
      "DEBUG: No tags found or tags not an array for build:",
      buildData.id
    );
    buildData.tags = [];
  }

  console.log("DEBUG: Build tags after resolution:", buildData.tags);
  return buildData;
};

// Get all builds
router.get("/", async (req, res) => {
  try {
    const builds = await Build.find();
    // Transform each build to include id property and resolve tags
    const transformedBuilds = await Promise.all(
      builds.map(async (doc) => {
        const buildData = {
          id: doc._id.toString(),
          ...doc._doc,
        };
        return await resolveTagsForBuild(buildData);
      })
    );
    res.json(transformedBuilds);
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

    // Transform builds to include string ID and resolve tags
    const transformedBuilds = await Promise.all(
      builds.map(async (doc) => {
        const buildData = {
          id: doc._id.toString(),
          ...doc._doc,
        };
        return await resolveTagsForBuild(buildData);
      })
    );

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
    console.error("DEBUG: Error in /list endpoint:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get a single build by ID
router.get("/:id", async (req, res) => {
  console.log("Get Build ID:", req.params.id);
  try {
    const build = await Build.findById(req.params.id);
    if (!build) return res.status(404).json({ message: "Build not found" });

    // Create a response object with resolved tags
    const buildData = {
      id: build._id.toString(), // TODO - Remove
      ...build.toObject(),
    };

    const resolvedBuildData = await resolveTagsForBuild(buildData);
    res.json(resolvedBuildData);
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
    // Add id property to response
    const response = {
      id: newBuild._id.toString(),
      ...newBuild.toObject(),
    };
    res.status(201).json(response);
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
    const response = {
      id: updatedBuild._id.toString(),
      ...updatedBuild.toObject(),
    };
    res.json(response);
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
