import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(res => setProducts(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      {products.map(p => (
        <p key={p._id}>{p.name} - ₹{p.price}</p>
      ))}
    </div>
  );
}
