const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String }, // Store content as HTML
});

const BuildSchema = new mongoose.Schema(
  {
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
    tags: { type: [String] },
    sections: [SectionSchema],
    createdBy: { type: String, required: true },
    season: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Build || mongoose.model("Build", BuildSchema);
