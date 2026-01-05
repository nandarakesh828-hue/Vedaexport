import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-orange-600">
          Veda <span className="text-gray-800">Export</span>
        </h1>

        <nav className="space-x-6 font-medium">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <Link to="/cart" className="hover:text-orange-600">Cart</Link>
          <Link to="/login" className="hover:text-orange-600">Login</Link>
        </nav>
      </div>
    </header>
  );
}

