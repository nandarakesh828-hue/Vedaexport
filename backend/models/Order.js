const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    items: Array,
    totalAmount: Number,
    paymentMethod: String,
    paymentStatus: String,
    orderStatus: {
      type: String,
      default: "Processing"
    },
    address: Object
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
