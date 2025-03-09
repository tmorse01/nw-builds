const mongoose = require("mongoose");

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

module.exports = mongoose.models.Image || mongoose.model("Image", ImageSchema);
