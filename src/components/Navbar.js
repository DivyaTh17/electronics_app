import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-2">
      <div className="container mx-auto flex justify-between">
        <div className="text-white">
          <Link to="/">Home</Link> |<Link to="/products"> Products</Link> |
          <Link to="/about"> About Us</Link> |
          <Link to="/contact"> Contact Us</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
