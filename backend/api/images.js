const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Configure Cloudinary (Replace with your credentials)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer (Memory storage for direct upload)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) cb(null, true);
    else
      cb(
        new Error(
          "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed."
        ),
        false
      );
  },
});

// MongoDB Schema
const ImageSchema = new mongoose.Schema(
  {
    buildId: { type: String, required: true },
    sectionId: { type: String, required: true },
    cloudinaryUrl: { type: String, required: true }, // Store Cloudinary URL
    publicId: { type: String, required: true }, // Store Cloudinary public ID
    originalName: { type: String, required: true },
  },
  { timestamps: true }
);

const Image = mongoose.models.Image || mongoose.model("Image", ImageSchema);

// **Upload Image to Cloudinary**
const uploadToCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      { folder: "new-world-builds" }, // Folder in Cloudinary
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// **Handle Upload**
const handleUpload = async (req, res) => {
  try {
    upload.single("image")(req, req, async (err) => {
      if (err) return res.status(400).json({ error: err.message });

      const { buildId, sectionId } = req.body;
      if (!buildId || !sectionId || !req.file)
        return res.status(400).json({ error: "Missing required fields" });

      // Upload to Cloudinary
      const result = await uploadToCloudinary(req.file.buffer);

      if (sectionId === "thumbnail") {
        const images = await Image.find({ buildId, sectionId });
        // Delete previous thumbnail image
        if (images.length > 0) {
          await Image.findByIdAndDelete(images[0]._id);
        }
      }

      const newImage = new Image({
        buildId,
        sectionId,
        cloudinaryUrl: result.secure_url,
        publicId: result.public_id,
        originalName: req.file.originalname,
      });

      await newImage.save();

      // Add id property to response
      const transformedImage = {
        id: newImage._id.toString(),
        ...newImage.toObject(),
      };

      res.status(201).json({
        message: "Image uploaded successfully",
        image: transformedImage,
      });
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};

// **Get Images**
const handleGet = async (req, res) => {
  try {
    const { buildId, sectionId } = req.query;
    const query = {};
    if (buildId) query.buildId = buildId;
    if (sectionId) query.sectionId = sectionId;

    const images = await Image.find(query).sort({ createdAt: -1 });

    // Transform images to include string ID
    const transformedImages = images.map((image) => ({
      id: image._id.toString(),
      ...image._doc,
    }));

    res.status(200).json(transformedImages);
  } catch (error) {
    console.error("Get error:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

// **Delete Image from Cloudinary**
const handleDelete = async (req, res) => {
  try {
    const { id } = req.query;
    const image = await Image.findById(id);
    if (!image) return res.status(404).json({ error: "Image not found" });
    console.log("Delete Image:", image);
    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    // Delete from MongoDB
    await Image.findByIdAndDelete(id);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
};

// **Router Setup**
const router = express.Router();
router.post("/", handleUpload);
router.get("/", handleGet);
router.delete("/", handleDelete);

module.exports = router;
