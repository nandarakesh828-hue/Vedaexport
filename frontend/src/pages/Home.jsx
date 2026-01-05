import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto p-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              Premium Export Quality Products
            </h1>
            <p className="mb-6">
              Delivering trusted export goods worldwide with quality assurance.
            </p>
            <button className="bg-white text-orange-600 px-6 py-3 rounded font-bold">
              Explore Products
            </button>
          </div>
          <img
            src="https://images.unsplash.com/photo-1605902711622-cfb43c44367f"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Our Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
