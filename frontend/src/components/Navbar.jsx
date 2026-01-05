import { Link } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        
        {/* LOGO */}
        <div>
          <h1 className="text-2xl font-extrabold tracking-wide text-orange-600">
            VEDA <span className="text-gray-800">EXPORT</span>
          </h1>
          <p className="text-xs text-gray-500 -mt-1">
            Global Trade Solutions
          </p>
        </div>

        {/* NAV LINKS */}
        <nav className="space-x-6 font-medium">
          <Link to="/" className="hover:text-orange-600">
            Home
          </Link>

          <Link to="/cart" className="hover:text-orange-600">
            Cart
          </Link>

          <Link to="/orders" className="hover:text-orange-600">
            Orders
          </Link>

          {!user && (
            <Link to="/login" className="hover:text-orange-600">
              Login
            </Link>
          )}

          {/* ✅ ADMIN LINKS (VISIBLE ONLY TO ADMIN) */}
          {user?.role === "admin" && (
            <>
              <Link to="/admin/orders" className="hover:text-orange-600">
                Admin Orders
              </Link>

              <Link to="/admin/add-product" className="hover:text-orange-600">
                Add Product
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

