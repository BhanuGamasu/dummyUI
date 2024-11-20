import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiFillHeart } from "react-icons/ai";

const Favourates = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Chocolate Cake",
      images: [
        "https://via.placeholder.com/150?text=Chocolate+Cake", // Replace with actual image URL
      ],
      rating: { fullStars: 4, halfStar: true },
      reviewsCount: 56,
      originalPrice: 500,
      discountPrice: 400,
      selectedWeight: "500g",
    },
    {
      id: 2,
      name: "Strawberry Muffin",
      images: [
        "https://via.placeholder.com/150?text=Strawberry+Muffin", // Replace with actual image URL
      ],
      rating: { fullStars: 3, halfStar: false },
      reviewsCount: 32,
      originalPrice: 300,
      discountPrice: 250,
      selectedWeight: "250g",
    },
  ]);

  const handleFavoriteClick = (id) => {
    setFavorites((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Favourites</h1>
      {favorites.map((product) => (
        <div
          key={product.id}
          className="flex items-center border p-4 rounded-lg shadow-lg mb-6 bg-white"
        >
          {/* Product Image */}
          <div className="w-[10rem] h-[10rem] flex-shrink-0">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="ml-4 flex-grow">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <motion.button
                onClick={() => handleFavoriteClick(product.id)}
                className="text-red-500 text-2xl"
                whileTap={{ scale: 0.9 }}
              >
                <AiFillHeart />
              </motion.button>
            </div>

            <div className="flex items-center text-yellow-500 mt-1">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`${
                    index < product.rating.fullStars
                      ? "text-yellow-500"
                      : index === product.rating.fullStars && product.rating.halfStar
                      ? "text-yellow-500"
                      : "text-gray-300"
                  } text-sm`}
                >
                  ★
                </span>
              ))}
              <span className="ml-2 text-gray-600 text-sm">
                ({product.reviewsCount} reviews)
              </span>
            </div>

            <div className="mt-2">
              <p className="text-xs text-gray-500 line-through">
                ₹{product.originalPrice}
              </p>
              <p className="text-sm font-semibold text-gray-800">
                ₹{product.discountPrice}
                <span className="text-gray-400 pl-1">
                  (
                  {(
                    ((product.originalPrice - product.discountPrice) /
                      product.originalPrice) *
                    100
                  ).toFixed(0)}
                  % off)
                </span>
              </p>
              <p className="text-xs text-gray-500">{product.selectedWeight}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favourates;
