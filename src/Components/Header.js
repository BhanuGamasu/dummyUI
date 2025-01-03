import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaSearch, FaTimes, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useNavigate, useLocation } from "react-router-dom"; // React Router hook for navigation
import { useSelector } from "react-redux"; // Redux hook
import { AiOutlineShoppingCart, AiFillHome } from "react-icons/ai";
import { motion } from 'framer-motion';
import { MdFilterList } from "react-icons/md";
import logoImg from "../logoImg.webp";
import { BsBoxSeamFill } from "react-icons/bs";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { BiSolidCategory, BiSolidHome } from "react-icons/bi";
import AddressModal from './AddressModal';
import ProfileHeader from './ProfileHeader';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // To track which dropdown is active
  const sidebarRef = useRef(null);
  const cartCount = useSelector((state) => state.cart.cartCount); // Redux selector for cart count
  const navigate = useNavigate(); // Navigation function from React Router
  const location = useLocation(); // Get the current location

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [updatedDeliveryAddress, setUpdatedDeliveryAddress] = useState('');


  const addresses = [
    {
      name: "Ram Kumawat",
      details:
        "659, Venkat Enclave, TY Raju Road, Whitefields, Hyderabad-499963, Arunodaya Colony, Madhapur, Hyderabad, Telangana - 499963",
      phone: "9876543210",
    },
    {
      name: "Shyam Verma",
      details:
        "245, Lotus Apartments, Green Park, Mumbai-400053, Maharashtra",
      phone: "8765432109",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleEditAddress = (index) => {
    console.log("Edit address at index:", index);
  };

  const handleDeleteAddress = (index) => {
    console.log("Delete address at index:", index);
  };

  // Log the selected address whenever it changes
  useEffect(() => {
    if (selectedAddress !== null) {
      setShowAddressModal(false);
      setUpdatedDeliveryAddress(addresses[selectedAddress]);
      console.log("Selected Address:", addresses[selectedAddress]);
    }
  }, [selectedAddress]);

  useEffect(() => {
    const savedDefaultIndex = localStorage.getItem("defaultAddressIndex");
    if (addresses.length > 0 && !updatedDeliveryAddress) {
      setUpdatedDeliveryAddress(addresses[savedDefaultIndex]); // Set the first address as default
    }
  }, [addresses, updatedDeliveryAddress]);

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
      {location.pathname === "/home" && ( // Only show the moving text on the home page
        <div className="relative bg-gradient-to-r from-primaryShade1 via-primaryShade2 to-primaryShade3 text-black">

          {/* Address Component */}
          <ProfileHeader
            name={updatedDeliveryAddress?.name || ""}
            details={updatedDeliveryAddress?.details || ""}
            phone={updatedDeliveryAddress?.phone || ""}
            onChangeAddress={() => setShowAddressModal(true)}
          />

          {/* Address Modal */}
          <AddressModal
            show={showAddressModal}
            onClose={() => setShowAddressModal(false)}
            addresses={addresses}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            onEdit={handleEditAddress}
            onDelete={handleDeleteAddress}
            popupStyles="mb-[-1px]"
          />
        </div>
      )}
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
              className="text-gray-700 text-xl p-3 rounded-full shadow-lg hover:bg-[--primaryShade4] hover:text-black transition-transform transform hover:scale-110"
              onClick={() => navigate("/cart")}
              aria-label="View Cart"
            >
              <AiOutlineShoppingCart />
            </button>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[--primary] text-white text-[10px] font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md border-2 border-gray-200">
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
          className="fixed top-0 left-0 h-full bg-white w-64 shadow-lg z-50"
          ref={sidebarRef}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-bold text-lg text-gray-700">Menu</h2>
            <button onClick={toggleSidebar} className="text-gray-700 hover:text-[--primary]">
              <FaTimes className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="p-4 rounded-lg">
            <nav>
              <ul className='space-y-4'>
                <li>
                  <button
                    onClick={() => {
                      navigate("/home");
                      setIsSidebarOpen(false);
                    }}
                    className="text-gray-800 hover:text-[--primary] font-medium focus:outline-none transition-colors duration-300 w-full text-left flex items-center"
                  >
                    <AiFillHome
                      className="transition-transform duration-200 mr-1"
                    />
                    Home
                  </button>
                </li>
              </ul>

              <ul className="space-y-4 mt-4">
                {[
                  {
                    label: "Categories",
                    items: ["Sub Category 1", "Sub Category 2", "Sub Category 3", "Sub Category 4"]
                  },
                  // { 
                  //   label: "Savings", 
                  //   items: ["Sub Saving 1", "Sub Saving 2", "Sub Saving 3", "Sub Saving 4"] 
                  // },
                  // { label: "Order Again", items: ["Sub Order 1", "Sub Order 2", "Sub Order 3", "Sub Order 4"] },
                ].map((menu, index) => (
                  <li key={index}>
                    <div className='flex items-center hover:text-[--primary]'>
                      <BiSolidCategory className='flex, items-center mr-1 hover:text-[--primary]' />
                      <button
                        onClick={() => handleDropdownToggle(index)} // Toggle dropdown
                        className="hover:text-[--primary] text-gray-800 flex justify-between items-center w-full font-medium focus:outline-none transition-colors duration-300"
                      >
                        {menu.label}
                        <FaChevronDown
                          className={`ml-2 transition-transform duration-200 ${activeDropdown === index ? "rotate-180 text-[--primary]" : "text-gray-400"
                            }`}
                        />
                      </button>
                    </div>
                    {activeDropdown === index && (
                      <ul className="mt-2 space-y-1 pl-4 border-l-2 border-gray-200">
                        {menu.items.map((item, idx) => (
                          <li key={idx}>
                            <button
                              onClick={() => {
                                console.log(`Navigating to ${item}`);
                                setIsSidebarOpen(false); // Close sidebar on sub-item click
                              }}
                              className="block text-gray-700 hover:text-[--primary] hover:font-medium transition-all duration-200 text-left w-full"
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>

              <ul className='space-y-4 mt-4'>
                <li>
                  <button
                    onClick={() => {
                      navigate("/orders")
                      setIsSidebarOpen(false);
                    }

                    }
                    className="text-gray-800 hover:text-[--primary] font-medium focus:outline-none transition-colors duration-300 w-full text-left flex items-center"
                  >
                    <BsBoxSeamFill
                      className="transition-transform duration-200 mr-1"
                    />
                    Orders
                  </button>
                </li>
              </ul>


              <ul className='space-y-4 mt-4'>
                <li>
                  <button
                    onClick={() => {
                      navigate("/about")
                      setIsSidebarOpen(false);
                    }

                    }
                    className="text-gray-800 hover:text-[--primary] font-medium focus:outline-none transition-colors duration-300 w-full text-left flex items-center"
                  >
                    <TbMessageChatbotFilled
                      className="transition-transform duration-200 mr-1"
                    />
                    About Us
                  </button>
                </li>
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
              className="border border-gray-300 rounded-full py-2 pl-10 pr-4 w-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[--primaryShade3] focus:border-[--primaryShade3] shadow-sm hover:shadow-md transition-shadow duration-300"
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
        <nav className="flex space-x-4 mr-4">
          <div className="relative group">
            <button
              onClick={() => navigate("/home")}
              className="my-2 text-gray-700 hover:text-gray-900 flex items-center font-medium focus:outline-none relative rounded-full group-hover:bg-[--primaryShade4] transition duration-300 p-2 px-3"
            >
              <BiSolidHome
                className="transition-transform duration-200 mr-1 h-5 w-5"
              />
              Home
              {/* <FaChevronRight
                className={`ml-1 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300`}
              /> */}
            </button>
            {/* Underline Animation */}
            <span className="absolute bottom-0 left-1/2 w-0 h-[2.5px] bg-[--primary] rounded-full group-hover:w-1/4 transition-all duration-300 transform -translate-x-1/2"></span>
          </div>
          {[
            {
              label: "Categories",
              items: ["Sub Category 1", "Sub Category 2", "Sub Category 3", "Sub Category 4"]
            },
          ].map((menu, index) => (
            <div className="relative group" key={index}>
              {/* Parent Button */}
              <button
                onClick={() => handleDropdownToggle(index)}
                className="my-2 text-gray-700 hover:text-gray-900 flex items-center font-medium focus:outline-none relative rounded-full group-hover:bg-[--primaryShade4] transition duration-300 p-2 px-3"
              >
                <BiSolidCategory className="flex items-center mr-1 mb-1 h-5 w-5" />
                <span className="relative z-10 pb-1">
                  {menu.label}
                </span>
                {/* Arrow Icon */}
                <FaChevronDown
                  className={`ml-1.5 text-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-300 ${activeDropdown === index ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Underline Animation */}
              <span className="absolute bottom-0 left-1/2 w-0 h-[2.5px] bg-[--primary] rounded-full group-hover:w-1/4 transition-all duration-300 transform -translate-x-1/2"></span>

              {/* Dropdown Items */}
              {activeDropdown === index && (
                <ul className="absolute mt-5 bg-white shadow-lg rounded-lg w-max p-4 z-50 transition-opacity duration-300 opacity-100">
                  {menu.items.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-3 group mb-2">
                      {/* Image */}
                      <img
                        src={`https://via.placeholder.com/40`}
                        alt={item}
                        className="w-12 h-12 rounded-full shadow-md transition-transform duration-200 group-hover:scale-105"
                      />
                      {/* Category Name */}
                      <a
                        href="/home"
                        className="block text-gray-700 hover:text-white hover:bg-[--primaryShade1] py-2 px-3 rounded-lg transition-all duration-200 w-full"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}


          <div className="relative group">
            <button
              onClick={() => navigate("/orders")}
              className="my-2 text-gray-700 hover:text-gray-900 flex items-center font-medium focus:outline-none relative rounded-full group-hover:bg-[--primaryShade4] transition duration-300 p-2 px-3"
            >
              <BsBoxSeamFill className='mr-1 h-[1.10rem] w-[1.10rem]' />
              Orders
              <FaChevronRight
                className={`ml-1 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300`}
              />
            </button>
            {/* Underline Animation */}
            <span className="absolute bottom-0 left-1/2 w-0 h-[2.5px] bg-[--primary] rounded-full group-hover:w-1/4 transition-all duration-300 transform -translate-x-1/2"></span>
          </div>

          <div className="relative group">
            <button
              onClick={() => navigate("/about")}
              className="my-2 text-gray-700 hover:text-gray-900 flex items-center font-medium focus:outline-none relative rounded-full group-hover:bg-[--primaryShade4] transition duration-300 p-2 px-3"
            >
              <TbMessageChatbotFilled className='mr-1 h-5 w-5' />
              About Us
              {/* <FaChevronRight
                className={`ml-1 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300`}
              /> */}
            </button>
            {/* Underline Animation */}
            <span className="absolute bottom-0 left-1/2 w-0 h-[2.5px] bg-[--primary] rounded-full group-hover:w-1/4 transition-all duration-300 transform -translate-x-1/2"></span>
          </div>
        </nav>


        <div className="flex-grow relative mr-6">
          <input
            type="text"
            placeholder="Search products"
            className="border border-gray-300 rounded-full py-2 pl-[3rem] pr-4 w-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[--primaryShade3] focus:border-[--primaryShade3] shadow-sm hover:shadow-md transition-shadow duration-300"
          />
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400">
            <FaSearch className="w-5 h-5" />
          </div>
        </div>

        <div className="relative">
          <button
            className="text-gray-700 text-xl p-3 rounded-full shadow-lg hover:bg-[--primaryShade4] hover:text-black transition-transform transform hover:scale-110"
            onClick={() => navigate("/cart")}
            aria-label="View Cart"
          >
            <AiOutlineShoppingCart />
          </button>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[--primary] text-white text-[10px] font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md border-2 border-white">
              {cartCount}
            </span>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;