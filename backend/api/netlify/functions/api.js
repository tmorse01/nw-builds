const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
require("dotenv").config();

const buildsRouter = require("../../builds");
const imagesRouter = require("../../images");
const tagsRouter = require("../../tags");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Base path for Netlify Functions
const router = express.Router();

router.get("/", (req, res) => {
  res.send("NW Builds API is running!");
});

// Mount routers on the base path
router.use("/builds", buildsRouter);
router.use("/images", imagesRouter);
router.use("/tags", tagsRouter);

// Mount everything under /.netlify/functions/api
app.use("/.netlify/functions/api", router);

// Catch-all route for debugging
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: ["/", "/builds", "/builds/:id", "/images"],
  });
});

// Export handler for serverless
module.exports.handler = serverless(app);
