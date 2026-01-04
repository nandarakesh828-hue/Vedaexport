const router = require("express").Router();
const Razorpay = require("razorpay");
const Order = require("../models/Order");
const auth = require("../middleware/auth.middleware");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post("/razorpay", auth, async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: "INR"
  };
  const order = await razorpay.orders.create(options);
  res.json(order);
});

router.post("/", auth, async (req, res) => {
  const newOrder = await Order.create(req.body);
  res.json(newOrder);
});

module.exports = router;

