import React, { useState } from "react";

const AllReviews = () => {
    const [selectedFilter, setSelectedFilter] = useState("All");
    const reviews = [
        { id: 1, user: "Alice", rating: 5, comment: "Amazing product! Highly recommend." },
        { id: 2, user: "Bob", rating: 4, comment: "Good quality but delivery was late." },
        { id: 3, user: "Charlie", rating: 3, comment: "Average, expected better." },
        { id: 4, user: "Diana", rating: 5, comment: "Perfect! Exceeded my expectations." },
        { id: 5, user: "Eve", rating: 4, comment: "Good value for money." },
        { id: 6, user: "Frank", rating: 2, comment: "Not satisfied with the quality." },
    ];

    const filteredReviews = selectedFilter === "All"
        ? reviews
        : reviews.filter((review) => review.rating === Number(selectedFilter));

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">All Reviews</h1>
            <div className="mb-4 flex items-center space-x-4">
                <label className="font-semibold">Filter by Rating:</label>
                <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="All">All</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                </select>
            </div>
            <div className="space-y-4">
                {filteredReviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white p-4 rounded-lg shadow-md"
                    >
                        <p className="font-semibold">{review.user}</p>
                        <p className="text-yellow-500">
                            {"⭐".repeat(review.rating)}
                        </p>
                        <p className="text-gray-700">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllReviews;