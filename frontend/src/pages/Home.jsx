import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products")
      .then((res) => setProducts(res.data))
      .catch(() => alert("Failed to load products"));
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="border rounded shadow p-4 text-center"
          >
            <img
              src={import.meta.env.VITE_API_URL + p.image}
              alt={p.name}
              className="h-40 mx-auto mb-3"
            />
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-orange-600 font-semibold">₹{p.price}</p>
            <button className="mt-2 bg-orange-600 text-white px-4 py-1 rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
