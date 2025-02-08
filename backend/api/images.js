const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define the Image Schema and Model
const ImageSchema = new mongoose.Schema({
  buildId: { type: String, required: true }, // Associate with a specific build
  sectionId: { type: String, required: true }, // Associate with a specific section
  data: { type: String, required: true }, // Base64 encoded image
});

const Image = mongoose.model("Image", ImageSchema);

// Route to upload an image
router.post("/upload", async (req, res) => {
  try {
    const { buildId, sectionId, image } = req.body;
    if (!buildId || !sectionId || !image) {
      return res
        .status(400)
        .json({ error: "buildId, sectionId, and image are required" });
    }

    const newImage = new Image({ buildId, sectionId, data: image });
    await newImage.save();

    res
      .status(201)
      .json({ message: "Image uploaded successfully", image: newImage });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// Route to fetch all images for a build
router.get("/build/:buildId", async (req, res) => {
  try {
    const { buildId } = req.params;
    const images = await Image.find({ buildId });
    res.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// Route to fetch images for a specific section
router.get("/build/:buildId/section/:sectionId", async (req, res) => {
  try {
    const { buildId, sectionId } = req.params;
    const images = await Image.find({ buildId, sectionId });
    res.json(images);
  } catch (error) {
    console.error("Error fetching section images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// Route to delete an image by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Image.findByIdAndDelete(id);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
});

module.exports = router;
