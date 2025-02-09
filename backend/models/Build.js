const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // Store content as HTML
});

const BuildSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weapons: { type: [String], required: true },
  attributes: {
    strength: { type: Number, required: true },
    dexterity: { type: Number, required: true },
    intelligence: { type: Number, required: true },
    focus: { type: Number, required: true },
    constitution: { type: Number, required: true },
  },
  playstyle: { type: String, required: true },
  thumbnail: { type: String },
  tags: { type: [String] },
  sections: [SectionSchema],
  createdBy: { type: String, required: true },
  season: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Build", BuildSchema);
