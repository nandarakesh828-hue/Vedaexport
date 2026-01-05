const router = require("express").Router();
const Razorpay = require("razorpay");
const Order = require("../models/Order");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const sendEmail = require("../utils/sendEmail");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* CREATE ORDER */
router.post("/", auth, async (req, res) => {
  const order = await Order.create({
    ...req.body,
    userId: req.user.id,
  });

  await sendEmail({
    to: req.user.email,
    subject: "Order Confirmed - Veda Export",
    html: `<h3>Order ID: ${order._id}</h3>`,
  });

  res.json(order);
});

/* USER ORDERS */
router.get("/", auth, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
});

/* ADMIN ALL ORDERS */
router.get("/admin/all", auth, admin, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

/* ADMIN UPDATE STATUS */
router.put("/admin/status/:id", auth, admin, async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { orderStatus: req.body.status },
    { new: true }
  );

  res.json(order);
});

/* RAZORPAY */
router.post("/razorpay", auth, async (req, res) => {
  const razorpayOrder = await razorpay.orders.create({
    amount: req.body.amount * 100,
    currency: "INR",
  });

  res.json(razorpayOrder);
});

module.exports = router;



