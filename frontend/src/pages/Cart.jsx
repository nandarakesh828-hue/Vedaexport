import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

export default function Cart() {
  const { cart } = useContext(CartContext);
  const total = cart.reduce((a, b) => a + b.price, 0);

  const razorpayPay = async () => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/orders/razorpay`,
      { amount: total },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: data.amount,
      currency: "INR",
      name: "Veda Export",
      handler: () => alert("Payment Successful")
    };

    new window.Razorpay(options).open();
  };

  const whatsappCOD = () => {
    const msg = `New COD Order\nTotal: ₹${total}`;
    window.open(`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(msg)}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Cart</h1>
      {cart.map((p, i) => (
        <p key={i}>{p.name} - ₹{p.price}</p>
      ))}
      <h2 className="font-bold mt-4">Total: ₹{total}</h2>

      <button onClick={razorpayPay} className="bg-blue-600 text-white px-4 py-2 mt-4">
        Pay Online
      </button>

      <button onClick={whatsappCOD} className="bg-green-600 text-white px-4 py-2 mt-2">
        COD via WhatsApp
      </button>
    </div>
  );
}
