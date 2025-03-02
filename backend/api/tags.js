const express = require("express");
const Tag = require("../models/Tag");

const router = express.Router();

// Get all tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find().select("name color -_id");
    res.json(tags);
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

    res.status(201).json({ message: "Tag added successfully.", tag: newTag });
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

    res.json({ message: "Tag updated successfully.", tag: existingTag.name });
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
