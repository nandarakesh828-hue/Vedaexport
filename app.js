const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// routes
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/uploads", express.static("uploads"));

// test route
app.get("/", (req, res) => {
  res.send("Veda Export API Running");
});

module.exports = app;
