import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoStar, IoClose } from "react-icons/io5";
import Confetti from "react-confetti";

const emojis = ["😞", "😐", "🙂", "😊", "😍"]; // Emojis for each rating level

const RateProductPopup = ({ isOpen, onClose }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [showConfetti, setShowConfetti] = useState(false);
    const [uploadedPhotos, setUploadedPhotos] = useState([]);

    const handleRating = (value) => {
        setRating(value);

        if (value === 5) {
            setShowConfetti(true); // Trigger confetti animation
            // Stop confetti after 2 seconds
            setTimeout(() => setShowConfetti(false), 5000);
        }
    };

    const handlePhotoUpload = (event) => {
        const files = Array.from(event.target.files);
    
        files.forEach((file) => {
            const reader = new FileReader();
    
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
    
                img.onload = () => {
                    console.log(`Original size of ${file.name}: ${Math.round(file.size / 1024)} KB`);
    
                    const canvas = document.createElement("canvas");
                    const MAX_WIDTH = 800;
                    const MAX_HEIGHT = 800;
                    let width = img.width;
                    let height = img.height;
    
                    if (width > MAX_WIDTH || height > MAX_HEIGHT) {
                        if (width > height) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        } else {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
    
                    canvas.width = width;
                    canvas.height = height;
    
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);
    
                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                console.log(`Optimized size of ${file.name}: ${Math.round(blob.size / 1024)} KB`);
                                const optimizedPhoto = URL.createObjectURL(blob);
                                setUploadedPhotos((prevPhotos) => [...prevPhotos, optimizedPhoto]);
                            }
                        },
                        "image/jpeg",
                        0.8 // Compression quality (0 to 1)
                    );
                };
            };
    
            reader.readAsDataURL(file);
        });
    };
    

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-2xl z-50 p-6"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Rate Product</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-600 hover:text-gray-800"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="relative flex items-center mb-4">
                            {Array.from({ length: 5 }, (_, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.3 }}
                                    whileTap={{ scale: 1.2 }}
                                >
                                    <IoStar
                                        className={`text-3xl cursor-pointer ${i < rating ? "text-yellow-400" : "text-gray-300"
                                            }`}
                                        onClick={() => handleRating(i + 1)}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Animated Emoji */}
                        {rating > 0 && (
                            <motion.div
                                key={rating}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="text-5xl mb-4"
                            >
                                {emojis[rating - 1]}
                            </motion.div>
                        )}

                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            rows="4"
                            className="w-full border rounded-lg p-3 text-gray-800 mb-4"
                            placeholder="Write your review here..."
                        />

                        {/* Upload Photos */}
                        <div className="w-full mb-4">
                            <label
                                htmlFor="photo-upload"
                                className="block text-center px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold rounded-lg shadow cursor-pointer hover:scale-105 transition-transform duration-300"
                            >
                                Upload Photos
                            </label>
                            <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handlePhotoUpload}
                                className="hidden"
                            />
                        </div>

                        {/* Uploaded Photos */}
                        {uploadedPhotos.length > 0 && (
                            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3">
                                {uploadedPhotos.map((photo, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={photo}
                                            alt={`Uploaded ${index + 1}`}
                                            className="w-full h-24 object-cover rounded-md border"
                                        />
                                        <button
                                            onClick={() => {
                                                setUploadedPhotos((prevPhotos) =>
                                                    prevPhotos.filter((_, i) => i !== index)
                                                );
                                            }}
                                            className="absolute top-2 right-2 bg-white text-red-500 border-2 border-red-500 p-1 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition duration-300 ease-in-out"
                                        >
                                            <IoClose />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <button
                            className="mt-4 px-4 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold rounded-lg shadow hover:scale-105 transition-transform duration-300"
                            onClick={() => {
                                console.log("Rating:", rating);
                                console.log("Review:", review);
                                console.log("Photos:", uploadedPhotos);
                                onClose();
                            }}
                        >
                            Submit Review
                        </button>
                    </div>
                    {/* Confetti Celebration for 5-star rating */}
                    {showConfetti && <Confetti />}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RateProductPopup;