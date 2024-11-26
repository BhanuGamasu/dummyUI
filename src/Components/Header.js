// import React from "react";
// import { AiOutlineArrowLeft, AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
// import { useSelector } from "react-redux"; // Redux hook
// import { useNavigate } from "react-router-dom"; // React Router hook for navigation

// const Header = () => {
//   const cartCount = useSelector((state) => state.cart.cartCount); // Redux selector for cart count
//   const navigate = useNavigate(); // Navigation function from React Router

//   return (
//     <header className="bg-white shadow-md sticky top-0 z-50">
//       <div className="flex items-center justify-between px-4 py-3">
//         {/* Back Arrow */}
//         <button
//           className="text-gray-600 text-2xl p-2 rounded-full hover:bg-gray-100 transition hover:text-pink-600"
//           onClick={() => window.history.back()}
//         >
//           <AiOutlineArrowLeft />
//         </button>

//         {/* Search Bar */}
//         <div className="flex-grow mx-4">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full py-2 px-4 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
//           />
//         </div>

//         {/* Favourates Icon */}
//         <div className="relative mx-2">
//           <button
//             className="text-gray-600 text-2xl p-2 rounded-full hover:bg-gray-100 hover:text-red-500 transition"
//             onClick={() => navigate("/favourates")} // Navigate to wishlist page (optional)
//           >
//             <AiOutlineHeart />
//           </button>
//         </div>

//         {/* Cart Icon */}
//         <div className="relative">
//           <button
//             className="text-gray-600 text-2xl p-2 rounded-full hover:bg-gray-100 hover:text-pink-600 transition"
//             onClick={() => navigate("/cart")} // Navigate to cart page
//           >
//             <AiOutlineShoppingCart />
//           </button>
//           {cartCount > 0 && (
//             <span className="absolute top-0 right-0 bg-pink-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//               {cartCount}
//             </span>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaSearch, FaTimes, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from "react-router-dom"; // React Router hook for navigation
import { useSelector } from "react-redux"; // Redux hook
import { AiOutlineShoppingCart } from "react-icons/ai";
import { motion } from 'framer-motion';
import { MdFilterList } from "react-icons/md";
import logoImg from "../logoImg.webp"

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // To track which dropdown is active
  const sidebarRef = useRef(null);
  const cartCount = useSelector((state) => state.cart.cartCount); // Redux selector for cart count
  const navigate = useNavigate(); // Navigation function from React Router

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown on desktop and mobile
  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Mobile View */}
      <div className="lg:hidden px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={toggleSidebar} className="text-gray-700">
            <FaBars className="h-6 w-6" />
          </button>
          <img
            src={logoImg}
            alt="Logo"
            className="h-8"
          />
          <div className="relative">
            <button
              className="text-gray-700 text-xl p-3 rounded-full shadow-lg hover:bg-pink-100 hover:text-pink-600 transition-transform transform hover:scale-110"
              onClick={() => navigate("/cart")}
              aria-label="View Cart"
            >
              <AiOutlineShoppingCart />
            </button>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md border-2 border-white">
                {cartCount}
              </span>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: isSidebarOpen ? '0%' : '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 h-full bg-white w-64 shadow-md z-50"
          ref={sidebarRef}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-bold text-lg text-gray-700">Menu</h2>
            <button onClick={toggleSidebar}>
              <FaTimes className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="p-4 rounded-lg">
            <nav>
              <ul className="space-y-4">
                {[
                  { label: "Categories", items: ["Sub Category 1", "Sub Category 2", "Sub Category 3", "Sub Category 4"] },
                  { label: "Savings", items: ["Sub Saving 1", "Sub Saving 2", "Sub Saving 3", "Sub Saving 4"] },
                  { label: "Order Again", items: ["Sub Order 1", "Sub Order 2", "Sub Order 3", "Sub Order 4"] },
                ].map((menu, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleDropdownToggle(index)}
                      className="text-gray-800 hover:text-pink-500 flex justify-between items-center w-full font-medium focus:outline-none transition-colors duration-300"
                    >
                      {menu.label}
                      <FaChevronDown
                        className={`ml-2 transition-transform duration-200 ${activeDropdown === index ? "rotate-180 text-pink-500" : "text-gray-400"
                          }`}
                      />
                    </button>
                    {activeDropdown === index && (
                      <ul className="mt-2 space-y-1 pl-4 border-l-2 border-gray-200">
                        {menu.items.map((item, idx) => (
                          <li key={idx}>
                            <a
                              href="#"
                              className="block text-gray-700 hover:text-pink-500 hover:font-medium transition-all duration-200"
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

        </motion.div>

        {/* Search Bar & Filter */}
        <div className="mt-4 flex items-center space-x-2">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Search products"
              className="border border-gray-300 rounded-full py-2 pl-10 pr-4 w-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 shadow-sm hover:shadow-md transition-shadow duration-300"
            />
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400">
              <FaSearch className="w-5 h-5" />
            </div>
          </div>
          <button className="bg-gray-100 p-2 rounded-full">
            <MdFilterList className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex items-center px-8 py-4">
        <img
          src={logoImg}
          alt="Logo"
          className="h-10 mr-8"
        />
        <nav className="flex space-x-6 mr-6">
          {[
            { label: "Categories", items: ["Sub Category 1", "Sub Category 2", "Sub Category 3", "Sub Category 4"] },
            { label: "Savings", items: ["Sub Saving 1", "Sub Saving 2", "Sub Saving 3", "Sub Saving 4"] },
            { label: "Order Again", items: ["Sub Order 1", "Sub Order 2", "Sub Order 3", "Sub Order 4"] },
          ].map((menu, index) => (
            <div className="relative group" key={index}>
              <button
                onClick={() => handleDropdownToggle(index)}
                className="my-2 text-gray-700 hover:text-gray-900 flex items-center font-medium focus:outline-none relative rounded-full group-hover:bg-pink-100 transition duration-300 p-2 px-3"
              >
                <span className="relative z-10 pb-1">
                  {menu.label}
                </span>
                <FaChevronDown
                  className={`ml-2 transition-transform duration-200 ${activeDropdown === index ? "rotate-180" : ""
                    }`}
                />
              </button>
              {/* Underline Animation */}
              <span className="absolute bottom-0 left-1/2 w-0 h-[2.5px] bg-pink-500 rounded-full group-hover:w-1/4 transition-all duration-300 transform -translate-x-1/2"></span>
              {activeDropdown === index && (
                <ul className="text-center mt-5 absolute bg-white shadow-lg rounded-lg space-y-1 w-52 p-2 z-50 transition-opacity duration-300 opacity-100">
                  {menu.items.map((item, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="block py-2 text-gray-700 hover:text-white hover:bg-pink-300 rounded-lg transition-all duration-200"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>


        <div className="flex-grow relative mr-6">
          <input
            type="text"
            placeholder="Search products"
            className="border border-gray-300 rounded-full py-2 pl-[3rem] pr-4 w-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 shadow-sm hover:shadow-md transition-shadow duration-300"
          />
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400">
            <FaSearch className="w-5 h-5" />
          </div>
        </div>

        <div className="relative">
          <button
            className="text-gray-700 text-xl p-3 rounded-full shadow-lg hover:bg-pink-100 hover:text-pink-600 transition-transform transform hover:scale-110"
            onClick={() => navigate("/cart")}
            aria-label="View Cart"
          >
            <AiOutlineShoppingCart />
          </button>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md border-2 border-white">
              {cartCount}
            </span>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;





