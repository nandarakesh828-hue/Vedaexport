import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>

        <div className="flex justify-between items-center">
          <span className="text-orange-600 font-bold text-lg">
            ₹{product.price}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="btn-primary"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

