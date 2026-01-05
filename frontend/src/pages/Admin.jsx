import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(res => setProducts(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="bg-white shadow rounded-xl p-4">
        {products.map(p => (
          <div key={p._id} className="flex justify-between border-b py-2">
            <span>{p.name}</span>
            <span className="font-semibold">₹{p.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
