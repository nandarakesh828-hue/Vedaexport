const router = require("express").Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth.middleware");
const upload = require("../config/upload");

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post(
  "/",
  auth,
  upload.single("image"),
  async (req, res) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const product = await Product.create({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      image: `/uploads/${req.file.filename}`
    });

    res.json(product);
  }
);

module.exports = router;
