require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN?.split(",");

// REPLACE the block above with THIS block for the test
app.use(
  cors({
    origin: "https://ecommerce-app-frontend-wine.vercel.app", // Hardcoded URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle OPTIONS preflight requests
app.options("*", cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((err) => {
    console.error("Mongo connection error", err);
  });

module.exports = app;
