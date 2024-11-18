import React from "react";
import { AiOutlineArrowLeft, AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux"; // Redux hook
import { useNavigate } from "react-router-dom"; // React Router hook for navigation

const Header = () => {
  const cartCount = useSelector((state) => state.cart.cartCount); // Redux selector for cart count
  const navigate = useNavigate(); // Navigation function from React Router

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Back Arrow */}
        <button
          className="text-gray-600 text-2xl p-2 rounded-full hover:bg-gray-100 transition hover:text-pink-600"
          onClick={() => window.history.back()}
        >
          <AiOutlineArrowLeft />
        </button>

        {/* Search Bar */}
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* Favourates Icon */}
        <div className="relative mx-2">
          <button
            className="text-gray-600 text-2xl p-2 rounded-full hover:bg-gray-100 hover:text-red-500 transition"
            onClick={() => navigate("/favourates")} // Navigate to wishlist page (optional)
          >
            <AiOutlineHeart />
          </button>
        </div>

        {/* Cart Icon */}
        <div className="relative">
          <button
            className="text-gray-600 text-2xl p-2 rounded-full hover:bg-gray-100 hover:text-pink-600 transition"
            onClick={() => navigate("/cart")} // Navigate to cart page
          >
            <AiOutlineShoppingCart />
          </button>
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-pink-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
