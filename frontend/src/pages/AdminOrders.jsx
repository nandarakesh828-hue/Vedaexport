import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders/admin/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
              <th className="p-3">Invoice</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3 text-xs">{order._id}</td>

                <td className="p-3 font-semibold text-orange-600">
                  ₹{order.totalAmount}
                </td>

                <td className="p-3 capitalize">
                  {order.paymentMethod}
                </td>

                {/* ✅ STATUS DROPDOWN */}
                <td className="p-3">
                  <select
                    value={order.orderStatus}
                    onChange={async (e) => {
                      const newStatus = e.target.value;

                      await axios.put(
                        `${import.meta.env.VITE_API_URL}/api/orders/admin/status/${order._id}`,
                        { status: newStatus },
                        {
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "token"
                            )}`,
                          },
                        }
                      );

                      // Update UI instantly
                      setOrders((prev) =>
                        prev.map((o) =>
                          o._id === order._id
                            ? { ...o, orderStatus: newStatus }
                            : o
                        )
                      );
                    }}
                    className="border rounded px-2 py-1 text-sm capitalize"
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>

                {/* ✅ INVOICE DOWNLOAD */}
                <td className="p-3">
                  <button
                    onClick={() =>
                      window.open(
                        `${import.meta.env.VITE_API_URL}/api/orders/invoice/${order._id}`
                      )
                    }
                    className="bg-gray-800 hover:bg-black text-white px-3 py-1 rounded text-xs"
                  >
                    Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="p-6 text-center text-gray-500">
            No orders found.
          </p>
        )}
      </div>
    </div>
  );
}
