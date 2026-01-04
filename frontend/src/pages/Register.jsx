import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        import.meta.env.VITE_API_URL + "/api/auth/register",
        { name, email, password }
      );
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 shadow rounded w-80"
        >
          <h2 className="text-xl font-bold mb-4">Register</h2>
          <input
            placeholder="Name"
            className="w-full border p-2 mb-3"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Email"
            className="w-full border p-2 mb-3"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 mb-3"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-orange-600 text-white py-2 rounded">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
