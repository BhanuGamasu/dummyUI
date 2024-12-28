import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaAngleRight } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import NavigateBack from "./NavigateBack";

const OrdersPage = () => {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState({});

  const orders = [
    {
      id: 1,
      date: "2024-11-20",
      status: "Delivered",
      itemsCount: 3,
      totalAmount: 1200,
      summary: "Chocolate Cake, Strawberry Muffin, Red Velvet Cake",
      images: [
        "https://via.placeholder.com/150?text=Chocolate+Cake",
        "https://via.placeholder.com/150?text=Strawberry+Muffin",
        "https://via.placeholder.com/150?text=Red+Velvet+Cake",
      ],
    },
    {
      id: 2,
      date: "2024-11-18",
      status: "In Transit",
      itemsCount: 2,
      totalAmount: 800,
      summary: "Blueberry Muffin, Black Forest Cake",
      images: [
        "https://via.placeholder.com/150?text=Blueberry+Muffin",
        "https://via.placeholder.com/150?text=Black+Forest+Cake",
      ],
    },
  ];

  const handleRating = (orderId, stars) => {
    setRatings((prev) => ({ ...prev, [orderId]: stars }));
    console.log(`Rated Order #${orderId} with ${stars} stars`);
  };

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="container mx-auto pt-5 bg-gradient-to-r from-[--primaryShade4] to-gray-50">
      <NavigateBack target="/home" className="pl-3" />
      <div className="bg-white p-5 rounded-3xl rounded-bl-none rounded-br-none">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Orders</h1>
        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              className="bg-white border shadow-md p-4 rounded-lg flex flex-row gap-4 items-start hover:shadow-lg transition-shadow duration-300"
              // whileHover={{ scale: 1.02 }}
              // whileTap={{ scale: 0.98 }}
            >
              {/* First Product Image */}
              <div
                className="w-28 h-28 flex-shrink-0"
                onClick={() => handleOrderClick(order.id)}
              >
                <img
                  src={order.images[0]} // Only show the first image
                  alt={`Product ${order.id}`}
                  className="w-full h-full object-cover rounded-md border"
                />
              </div>

              {/* Order Details */}
              <div className="flex flex-col flex-grow">
                <div onClick={() => handleOrderClick(order.id)}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-lg">Order #{order.id}</p>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                    {order.summary}
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-800 flex items-center">
                      <span className="text-lg text-gray-800 font-semibold p-1">
                        ₹{order.totalAmount}
                      </span>
                    </p>
                    <FaAngleRight className="text-[--primaryDarkShade1] text-2xl" />
                  </div>
                </div>

                {/* Rate This Product Section */}
                {order.status === "Delivered" && (
                  <div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevents parent click
                            handleRating(order.id, star);
                          }}
                          whileHover={{ scale: 1.2 }}
                          animate={{
                            color:
                              ratings[order.id] && ratings[order.id] >= star
                                ? "rgb(34, 197, 94)" // Green
                                : "rgb(209, 213, 219)", // Gray
                          }}
                          transition={{ duration: 0.3 }}
                          className="text-3xl"
                        >
                          <IoStar />
                        </motion.button>
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-[--primaryDarkShade1] mt-1">
                      Rate this product
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
