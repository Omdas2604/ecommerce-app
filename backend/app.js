require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

console.log("SERVER STARTING..."); // <-- ADD THIS

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");

const app = express();

// We are still using the hardcoded URL for testing
app.use(
  cors({
    origin: "https://ecommerce-app-frontend-wine.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

console.log("SERVER STARTING...");

console.log("MONGO_URI value:", process.env.MONGO_URI ? "✅ Loaded" : "❌ Missing");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MONGO DATABASE CONNECTED SUCCESSFULLY");
})
.catch((err) => {
  console.error("❌ MONGO CONNECTION FAILED:", err.message);
});


module.exports = app;