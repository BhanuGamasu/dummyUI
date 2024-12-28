import React, { useState } from "react";

const AllReviews = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const reviews = [
    {
      id: 1,
      user: "Alice",
      rating: 5,
      comment: "Amazing product! Highly recommend.",
      image: "https://via.placeholder.com/80?text=Alice",
    },
    {
      id: 2,
      user: "Bob",
      rating: 4,
      comment: "Good quality but delivery was late.",
      image: "https://via.placeholder.com/80?text=Bob",
    },
    {
      id: 3,
      user: "Charlie",
      rating: 3,
      comment: "Average, expected better.",
      image: "https://via.placeholder.com/80?text=Charlie",
    },
    {
      id: 4,
      user: "Diana",
      rating: 5,
      comment: "Perfect! Exceeded my expectations.",
      image: "https://via.placeholder.com/80?text=Diana",
    },
    {
      id: 5,
      user: "Eve",
      rating: 4,
      comment: "Good value for money.",
      image: "https://via.placeholder.com/80?text=Eve",
    },
    {
      id: 6,
      user: "Frank",
      rating: 2,
      comment: "Not satisfied with the quality.",
      image: "https://via.placeholder.com/80?text=Frank",
    },
  ];

  const filteredReviews =
    selectedFilter === "All"
      ? reviews
      : reviews.filter((review) => review.rating === Number(selectedFilter));

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Customer Reviews
      </h1>

      {/* Filter Section */}
      <div className="mb-6 flex items-center justify-center gap-4">
        <label className="font-semibold text-gray-700">Filter by Rating:</label>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
            className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-start gap-4"
          >
            {/* User Image */}
            <img
              src={review.image}
              alt={`${review.user}'s review`}
              className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
            />

            {/* Review Content */}
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                {review.user}
              </h3>
              <p className="text-yellow-500 text-sm">
                {"⭐".repeat(review.rating)}{" "}
                <span className="text-gray-400">
                  {"☆".repeat(5 - review.rating)}
                </span>
              </p>
              <p className="text-gray-600 mt-2">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;