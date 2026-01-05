import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart } = useContext(CartContext);
  const total = cart.reduce((a, b) => a + b.price, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      <div className="bg-white rounded-xl shadow p-4">
        {cart.map((p, i) => (
          <div key={i} className="flex justify-between border-b py-2">
            <span>{p.name}</span>
            <span>₹{p.price}</span>
          </div>
        ))}

        <div className="flex justify-between font-bold mt-4">
          <span>Total</span>
          <span className="text-orange-600">₹{total}</span>
        </div>

        <div className="flex gap-4 mt-6">
          <button className="btn-primary w-full">
            Pay Online
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full">
            COD (WhatsApp)
          </button>
        </div>
      </div>
    </div>
  );
}

