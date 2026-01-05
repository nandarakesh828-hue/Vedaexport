import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="border p-4 rounded">
      <img src={product.image} className="h-40 w-full object-cover" />
      <h2 className="font-bold">{product.name}</h2>
      <p>₹{product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-orange-600 text-white px-4 py-2 mt-2"
      >
        Add to Cart
      </button>
    </div>
  );
}

