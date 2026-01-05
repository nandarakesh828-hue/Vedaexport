const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

const Order = require("../models/Order");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const sendEmail = require("../utils/sendEmail");

/* -------------------- RAZORPAY SETUP -------------------- */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* -------------------- CREATE ORDER (USER) -------------------- */
router.post("/", auth, async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      userId: req.user.id,
    });

    await sendEmail({
      to: req.user.email,
      subject: "Order Confirmed - Veda Export",
      html: `<h3>Order ID: ${order._id}</h3>`,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* -------------------- USER: MY ORDERS -------------------- */
router.get("/my", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* -------------------- ADMIN: ALL ORDERS -------------------- */
router.get("/", auth, admin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* -------------------- ADMIN: UPDATE ORDER STATUS -------------------- */
router.put("/:id", auth, admin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: req.body.status },
      { new: true }
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* -------------------- RAZORPAY ORDER -------------------- */
router.post("/razorpay", auth, async (req, res) => {
  try {
    const razorpayOrder = await razorpay.orders.create({
      amount: req.body.amount * 100,
      currency: "INR",
    });

    res.json(razorpayOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;




