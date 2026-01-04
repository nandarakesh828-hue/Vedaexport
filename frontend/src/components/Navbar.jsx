import { Link } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="flex justify-between p-4 bg-orange-600 text-white">
      <Link to="/" className="font-bold text-lg">
        Veda Export
      </Link>
      <div className="space-x-4">
        <Link to="/cart">Cart</Link>
        {user ? (
          <span>{user.name}</span>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
