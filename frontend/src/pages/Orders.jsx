import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 && (
        <p className="text-gray-500">No orders found.</p>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow rounded-xl p-4 mb-4"
        >
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Order ID</span>
            <span className="text-sm">{order._id}</span>
          </div>

          <div className="flex justify-between">
            <span>Total Amount</span>
            <span className="font-bold text-orange-600">
              ₹{order.totalAmount}
            </span>
          </div>

          <div className="flex justify-between mt-1">
            <span>Payment</span>
            <span className="capitalize">{order.paymentMethod}</span>
          </div>

          {/* DOWNLOAD INVOICE BUTTON */}
          <button
            onClick={() =>
              window.open(
                `${import.meta.env.VITE_API_URL}/api/orders/invoice/${order._id}`
              )
            }
            className="mt-3 bg-gray-800 hover:bg-black text-white px-4 py-2 rounded text-sm"
          >
            Download Invoice
          </button>
        </div>
      ))}
    </div>
  );
}
