import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-orange-600 text-white">
      <h1 className="font-bold text-xl">Veda Export</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
