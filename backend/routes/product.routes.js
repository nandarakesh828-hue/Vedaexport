const router = require("express").Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const upload = require("../config/upload");

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post(
  "/",
  auth,
  admin,
  upload.single("image"),
  async (req, res) => {
    const product = await Product.create({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    res.json(product);
  }
);

module.exports = router;

