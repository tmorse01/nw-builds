const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { fileURLToPath } = require("url");

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use the full path
  },
  filename: (req, file, cb) => {
    // Create unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Add file filter for security
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, GIF and WebP are allowed."),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Update your MongoDB schema
const ImageSchema = new mongoose.Schema(
  {
    buildId: { type: String, required: true },
    sectionId: { type: String, required: true },
    imagePath: { type: String, required: true },
    originalName: { type: String, required: true },
  },
  { timestamps: true }
);

const Image = mongoose.models.Image || mongoose.model("Image", ImageSchema);

// Define handler functions first
const handleUpload = async (req, res) => {
  try {
    upload.single("image")(req, req, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { buildId, sectionId } = req.body;
      const file = req.file;

      if (!buildId || !sectionId || !file) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newImage = new Image({
        buildId,
        sectionId,
        imagePath: `/uploads/${file.filename}`,
        originalName: file.originalname,
      });

      await newImage.save();

      res.status(201).json({
        message: "Image uploaded successfully",
        image: {
          ...newImage._doc,
          imageUrl: `/uploads/${file.filename}`,
        },
      });
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};

const handleGet = async (req, res) => {
  try {
    const { buildId, sectionId } = req.query;
    const query = {};

    if (buildId) query.buildId = buildId;
    if (sectionId) query.sectionId = sectionId;

    const images = await Image.find(query).sort({ createdAt: -1 });

    const imagesWithUrls = images.map((img) => ({
      ...img._doc,
      imageUrl: img.imagePath,
    }));

    res.status(200).json(imagesWithUrls);
  } catch (error) {
    console.error("Get error:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

const handleDelete = async (req, res) => {
  try {
    const { id } = req.query;
    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    const fs = require("fs");
    const filePath = path.join(process.cwd(), "public", image.imagePath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Image.findByIdAndDelete(id);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
};

// Create router and define routes after handlers are defined
const router = express.Router();

router.post("/", handleUpload);
router.get("/", handleGet);
router.delete("/", handleDelete);

// Export using CommonJS
module.exports = router;
