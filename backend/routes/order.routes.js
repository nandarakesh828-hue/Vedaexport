const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

const Order = require("../models/Order");
const auth = require("../middleware/auth.middleware");
const sendEmail = require("../utils/sendEmail");

/* ---------------- RAZORPAY ---------------- */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,      // +\change
  key_secret: process.env.RAZORPAY_KEY_SECRET, // +\change
});

/* ---------------- CREATE ORDER ---------------- */
router.post("/", auth, async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      userId: req.user.id,
      orderStatus: "Processing",
    });

    /* USER EMAIL */
    await sendEmail({
      to: req.user.email,
      subject: "Order Confirmed - Veda Export",
      html: `
        <h3>Thank you for your order</h3>
        <p>Order ID: ${order._id}</p>
        <p>Total: ₹${order.totalAmount}</p>
        <p>Status: ${order.orderStatus}</p>
      `,
    });

    /* ADMIN EMAIL */
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "New Order Received - Veda Export",
      html: `
        <h3>New Order</h3>
        <p>Order ID: ${order._id}</p>
        <p>Total: ₹${order.totalAmount}</p>
      `,
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Order creation failed" });
  }
});

/* ---------------- USER ORDERS ---------------- */
router.get("/", auth, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
});

/* ---------------- ADMIN ALL ORDERS ---------------- */
router.get("/admin/all", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

/* ---------------- ADMIN UPDATE STATUS ---------------- */
router.put("/admin/status/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { orderStatus: req.body.status },
    { new: true }
  );

  /* EMAIL STATUS UPDATE */
  await sendEmail({
    to: req.user.email,
    subject: "Order Status Updated - Veda Export",
    html: `
      <p>Your order <b>${order._id}</b> status changed to:</p>
      <h3>${order.orderStatus}</h3>
    `,
  });

  res.json(order);
});

/* ---------------- RAZORPAY ORDER ---------------- */
router.post("/razorpay", auth, async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
  };

  const order = await razorpay.orders.create(options);
  res.json(order);
});

module.exports = router;


router.post("/", auth, async (req, res) => {
  const newOrder = await Order.create(req.body);
  res.json(newOrder);
});

module.exports = router;


