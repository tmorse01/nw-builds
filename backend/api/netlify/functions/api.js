const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
require("dotenv").config();

const app = express();

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? ["http://localhost:5173", "http://localhost:8888"] // Allow both Vite dev server and Netlify dev
        : "https://your-production-domain.netlify.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Routes
app.get("/.netlify/functions/api", (req, res) => {
  res.send("NW Builds API is running!");
});

app.use("/.netlify/functions/api/builds", require("../../builds"));
app.use("/.netlify/functions/api/images", require("../../images"));

// Export handler for serverless
module.exports.handler = serverless(app);
