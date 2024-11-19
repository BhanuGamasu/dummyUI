import React, { useState } from "react";
import { BiSolidOffer } from "react-icons/bi";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

const Coupons = ({ offers, onApply, appliedOffer }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleApplyOffer = (offer) => {
        console.log("Offer applied:", offer);
        onApply(offer); // Apply the offer
        setShowPopup(false); // Close the popup after applying
    };
    
    const handleRemovePromocode = () => {
        console.log("Offer removed");
        onApply(null); // Remove the applied offer by passing null
        setShowPopup(false); // Close the popup after removing the offer
    };

    return (
        <>
            {/* Trigger Button */}
            <div
                className="flex items-center justify-between w-full px-4 py-3 mt-6 mb-4 bg-white border rounded-lg shadow cursor-pointer"
                onClick={() => setShowPopup(true)}
            >
                <div className="flex items-center gap-2">
                    <BiSolidOffer className="text-xl" />
                    <span className="text-lg font-semibold text-gray-700">
                        Apply Coupons
                    </span>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </div>

            {/* Modal Popup */}
            {showPopup && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50 z-50"
                    onClick={() => setShowPopup(false)} // Close modal on backdrop click
                >
                    <motion.div
                        initial={{ y: "100vh", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100vh", opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 70,
                            damping: 15,
                        }}
                        className="bg-white mb-[73px] rounded-lg rounded-bl-none rounded-br-none shadow-lg w-full md:w-[50%] max-h-[50vh] p-6 overflow-y-auto transform no-scrollbar"
                        onClick={(e) => e.stopPropagation()} // Prevent backdrop click
                    >
                        {/* Modal Header */}
                        <div className="flex justify-between">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Coupons & Promocodes
                            </h2>
                            <motion.div
                                onClick={() => setShowPopup(false)} // Close popup on click
                                whileHover={{ scale: 1.2 }} // Hover animation to scale the close icon
                                whileTap={{ scale: 0.9 }} // Tap animation to shrink the icon
                                className="cursor-pointer text-gray-500"
                            >
                                <AiOutlineClose className="w-6 h-6" />
                            </motion.div>
                        </div>

                        {/* Offers List */}
                        <div className="space-y-4">
                            {offers.map((offer, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-gray-50 border rounded-lg shadow-sm"
                                >
                                    <h3 className="text-md font-semibold text-gray-800 mb-2">
                                        {offer.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        {offer.description}
                                    </p>
                                    <button
                                        onClick={() =>
                                            appliedOffer?.code === offer.code
                                                ? handleRemovePromocode()
                                                : handleApplyOffer(offer)
                                        }
                                        className={`text-sm font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 transition-all ${
                                            appliedOffer?.code === offer.code
                                                ? "text-gray-500 bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 focus:ring-red-300"
                                                : "text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 focus:ring-blue-500"
                                        }`}
                                    >
                                        {appliedOffer?.code === offer.code ? "Remove" : "Apply"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default Coupons;
