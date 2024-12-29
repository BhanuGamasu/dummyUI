import React, { useState, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import img from "../img.jpg";
import img2 from "../img2.jpg";

const AllReviews = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFullReviewVisible, setIsFullReviewVisible] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const reviewRef = useRef();

  const reviews = [
    {
      id: 1,
      user: "Alice",
      rating: 5,
      comment: "Amazing product! Highly recommend. The delivery was quick, and the product quality is top-notch. I’ll definitely order again!Amazing product! Highly recommend. The delivery was quick, and the product quality is top-notch. I’ll definitely order again!Amazing product! Highly recommend. The delivery was quick, and the product quality is top-notch. I’ll definitely order again!Amazing product! Highly recommend. The delivery was quick, and the product quality is top-notch. I’ll definitely order again!Amazing product! Highly recommend. The delivery was quick, and the product quality is top-notch. I’ll definitely order again!Amazing product! Highly recommend. The delivery was quick, and the product quality is top-notch. I’ll definitely order again!Amazing product! Highly recommend. The delivery was quick, and the product quality is top-notch. I’ll definitely order again!",
      images: [img, img2],
    },
    {
      id: 2,
      user: "Bob",
      rating: 4,
      comment: "Good quality but delivery was late.",
      images: [img2],
    },
    // More reviews...
  ];

  const filteredReviews =
    selectedFilter === "All"
      ? reviews
      : reviews.filter((review) => review.rating === Number(selectedFilter));

  const openReviewModal = (review) => {
    setSelectedReview(review);
    setSelectedImage(review.images[0]);
  };

  const closeReviewModal = () => {
    setSelectedReview(null);
    setSelectedImage(null);
    setIsFullReviewVisible(false);
  };

  useEffect(() => {
    if (selectedReview && reviewRef.current) {
      setIsOverflowing(reviewRef.current.scrollHeight > reviewRef.current.clientHeight);
    }
  }, [selectedReview, isFullReviewVisible]);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-2xl shadow-lg min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Customer Reviews
      </h2>

      {/* Filter Section */}
      <div className="mb-6 flex items-center justify-center gap-4">
        <label className="font-semibold text-gray-700">Filter by Rating:</label>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="All">All</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-start gap-4 cursor-pointer"
            onClick={() => openReviewModal(review)}
          >
            <img
              src={review.images[0]}
              alt={`${review.user}'s review`}
              className="w-24 h-24 rounded-full border-2 border-[--primary] object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{review.user}</h3>
              <p className="text-yellow-500 text-sm">
                {"⭐".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </p>
              <p className="text-gray-600 mt-2 line-clamp-2">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for full image and review */}
      {selectedReview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeReviewModal}
        >
          <div
            className="relative bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[100%] mx-5 md:mx-0 overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Close Button */}
            <button
              onClick={closeReviewModal}
              className="absolute top-2 right-2 z-10 bg-white text-red-500 border-2 border-red-500 p-1 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition duration-300 ease-in-out"
            >
              <IoClose />
            </button>

            {/* Image Section */}
            <div className="relative w-full bg-gray-100 rounded-t-lg overflow-hidden">
              <img
                src={selectedImage || selectedReview.images[0]}
                alt="Selected"
                className="w-full max-h-72 object-contain"
              />
            </div>

            {/* Thumbnail Section */}
            <div className="flex justify-center gap-2 mt-2 p-4">
              {selectedReview.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`w-16 h-16 object-cover rounded cursor-pointer border-[3px] ${
                    (selectedImage || selectedReview.images[0]) === img
                      ? "border-[--primary]"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>

            {/* Review Content */}
            <div className="p-6 flex flex-col gap-4 overflow-auto max-h-[calc(80%-320px)]">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-lg text-gray-800">{selectedReview.user}</p>
                <p className="text-yellow-500 text-base">
                  {"⭐".repeat(selectedReview.rating)}
                </p>
              </div>

              {/* Scrollable Review Text */}
              <div className="relative">
                <div
                  ref={reviewRef}
                  className={`text-gray-700 text-sm leading-relaxed overflow-auto max-h-[200px] small-scrollbar ${
                    isFullReviewVisible ? "" : "line-clamp-3"
                  }`}
                >
                  {selectedReview.comment}
                </div>
                {(isOverflowing || isFullReviewVisible) && (
                  <button
                    onClick={() => setIsFullReviewVisible(!isFullReviewVisible)}
                    className="absolute bottom-[-20px] right-0 text-blue-500 hover:underline focus:outline-none mt-2"
                  >
                    {isFullReviewVisible ? "Show Less" : "More"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllReviews;