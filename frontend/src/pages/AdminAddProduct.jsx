import { useState } from "react";
import axios from "axios";

export default function AdminAddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: null,
  });

  const submit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/products`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    alert("Product added successfully");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>

      <form
        onSubmit={submit}
        className="bg-white shadow rounded-xl p-4 space-y-4"
      >
        <input
          placeholder="Product Name"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Category"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          placeholder="Price"
          type="number"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Stock"
          type="number"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
        <input
          type="file"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />

        <button className="btn-primary w-full">
          Add Product
        </button>
      </form>
    </div>
  );
}
