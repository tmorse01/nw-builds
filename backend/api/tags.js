const express = require("express");
const Tag = require("../models/Tag");

const router = express.Router();

// Get all tags
router.get("/", async (req, res) => {
  try {
    // Don't exclude _id in the select to allow adding id property
    const tags = await Tag.find();
    // Transform tags to include id property
    const transformedTags = tags.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name,
      color: doc.color,
    }));
    res.json(transformedTags);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tags." });
  }
});

// Add a new tag
router.post("/", async (req, res) => {
  const { name, color } = req.body;

  if (!name || typeof name !== "string") {
    return res
      .status(400)
      .json({ error: "Tag name must be a non-empty string." });
  }
  if (!color || typeof color !== "string") {
    return res.status(400).json({ error: "Tag color must be a valid string." });
  }

  try {
    const existingTag = await Tag.findOne({ name });
    if (existingTag) {
      return res.status(409).json({ error: "Tag already exists." });
    }

    const newTag = new Tag({ name, color });
    await newTag.save();

    // Add id property to response
    const response = {
      message: "Tag added successfully.",
      tag: {
        id: newTag._id.toString(),
        name: newTag.name,
        color: newTag.color,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to add tag." });
  }
});

// Update an existing tag
router.put("/:tag", async (req, res) => {
  const { tag } = req.params;
  const { newName, color } = req.body;

  if (!newName || typeof newName !== "string") {
    return res
      .status(400)
      .json({ error: "New tag name must be a non-empty string." });
  }

  try {
    const existingTag = await Tag.findOne({ name: tag });
    if (!existingTag) {
      return res.status(404).json({ error: "Tag not found." });
    }

    const duplicateTag = await Tag.findOne({ name: newName });
    if (duplicateTag) {
      return res.status(409).json({ error: "New tag name already exists." });
    }

    existingTag.name = newName;
    existingTag.color = color;
    await existingTag.save();

    // Add id to response if returning the full tag
    res.json({
      message: "Tag updated successfully.",
      tag: existingTag.name,
      id: existingTag._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update tag." });
  }
});

// Delete a tag
router.delete("/:tag", async (req, res) => {
  const { tag } = req.params;

  try {
    const deletedTag = await Tag.findOneAndDelete({ name: tag });
    if (!deletedTag) {
      return res.status(404).json({ error: "Tag not found." });
    }

    res.json({ message: "Tag deleted successfully.", tag: deletedTag.name });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete tag." });
  }
});

module.exports = router;
