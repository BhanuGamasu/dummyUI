import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { BiSolidOffer } from "react-icons/bi";
import {
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
} from "../redux/cartSlice";

const Cart = () => {
    const { items, totalAmount, gst } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [isFavorite, setIsFavorite] = useState(false);
    const [bubbles, setBubbles] = useState([]);
    const [showPopup, setShowPopup] = useState(false); // Toggle popup
    const [promocode, setPromocode] = useState(""); // Promocode input
    const [isPromocodeApplied, setIsPromocodeApplied] = useState(false); // Promocode state
    const [appliedOffer, setAppliedOffer] = useState(null); // Stores applied offer details

    const offers = [
        { title: "Flat ₹200 Off", description: "Use code SAVE200 on orders above ₹1000.", code: "SAVE200" },
        { title: "10% Cashback", description: "Use code CASHBACK10 on all prepaid orders.", code: "CASHBACK10" },
        { title: "Free Shipping", description: "Use code FREESHIP for free delivery on orders above ₹500.", code: "FREESHIP" },
    ];

    // Handles applying the offer
    const handleApplyOffer = (offer) => {
        setPromocode(offer.code); // Set the promocode
        setAppliedOffer(offer); // Save applied offer details
        setIsPromocodeApplied(true); // Mark promocode as applied
        console.log("Applied Offer:", offer); // Log offer data
        setShowPopup(false); // Close the popup
    };

    // Handles removing the applied promocode
    const handleRemovePromocode = () => {
        setPromocode(""); // Clear promocode
        setAppliedOffer(null); // Reset applied offer
        setIsPromocodeApplied(false); // Mark promocode as not applied
        console.log("Promocode removed.");
    };

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
        setBubbles((prevBubbles) => [
            ...prevBubbles,
            { id: Date.now() + 1, direction: -1 },
            { id: Date.now() + 2, direction: 1 },
        ]);
    };

    return (
        <div className="container mx-auto p-4 pb-24">
            <div className="relative flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold mr-4">Your Cart</h1>
                <p className="text-md font-semibold underline text-blue-600 cursor-pointer">Continue Shopping</p>
            </div>

            {items.length === 0 ? (
                <p className="text-center text-lg">Your cart is empty.</p>
            ) : (
                <div>
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center border p-4 rounded-lg shadow-lg mb-6"
                        >
                            {/* Product Image */}
                            <div className="w-36 h-36 flex-shrink-0">
                                <img
                                    src={item.images[0]}
                                    alt={item.name}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="flex-grow ml-4">
                                <div className="flex justify-between">
                                    <h2 className="text-lg font-semibold">{item.name}</h2>
                                    <motion.button
                                        onClick={handleFavoriteClick}
                                        className={`relative text-2xl transition duration-300 ease-in-out transform ${isFavorite ? "text-red-500 scale-110" : "text-gray-600"
                                            }`}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}

                                        {/* Heart Bubbles */}
                                        <AnimatePresence>
                                            {bubbles.map((bubble) => (
                                                <motion.div
                                                    key={bubble.id}
                                                    className="absolute top-0 left-1/2 transform -translate-x-1/2"
                                                    initial={{
                                                        opacity: 1,
                                                        y: 0,
                                                        scale: 0.5,
                                                        x: bubble.direction * 10,
                                                    }}
                                                    animate={{
                                                        opacity: 0,
                                                        y: -30,
                                                        x: bubble.direction * 30,
                                                        scale: 1,
                                                        transition: {
                                                            duration: 1.5,
                                                            ease: "easeInOut",
                                                        },
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        y: -50,
                                                    }}
                                                    onAnimationComplete={() => {
                                                        setBubbles((prev) =>
                                                            prev.filter((b) => b.id !== bubble.id)
                                                        );
                                                    }}
                                                >
                                                    <AiFillHeart className="text-red-300 text-xl" />
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </motion.button>
                                </div>
                                <div className="flex items-center text-yellow-500 mt-1">
                                    {[...Array(5)].map((_, index) => (
                                        <span
                                            key={index}
                                            className={`${index < item.rating.fullStars
                                                ? "text-yellow-500"
                                                : index === item.rating.fullStars &&
                                                    item.rating.halfStar
                                                    ? "text-yellow-500"
                                                    : "text-gray-300"
                                                } text-sm`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                    <span className="ml-2 text-gray-600 text-sm">
                                        ({item.reviewsCount} reviews)
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="mt-2">
                                    <p className="text-sm font-semibold text-gray-800">
                                        ₹{item.discountPrice}
                                    </p>
                                    {item.originalPrice > item.discountPrice && (
                                        <p className="text-xs text-gray-500 line-through">
                                            ₹{item.originalPrice}
                                        </p>
                                    )}
                                </div>

                                {/* Quantity and Action Buttons */}
                                <div className="flex items-center justify-between md:justify-around mt-4">
                                    <div className="flex items-center justify-center">
                                        <button
                                            onClick={() => dispatch(decrementQuantity(item.id))}
                                            className="text-sm sm:text-base px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300 border-2 border-r-0 text-gray-700 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 hover:text-gray-900 rounded-l-lg transition-all duration-200 ease-in-out transform active:scale-95"
                                        >
                                            –
                                        </button>
                                        <span className="text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-1 bg-white text-gray-800 border-gray-200 border-2 border-r-0 border-l-0 font-semibold">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => dispatch(incrementQuantity(item.id))}
                                            className="text-sm sm:text-base px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-l-0 border-gray-300 text-gray-700 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 hover:text-gray-900 rounded-r-lg transition-all duration-200 ease-in-out transform active:scale-95"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                        className="text-sm font-semibold text-gray-500 bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 focus:ring-red-300 px-4 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Address Card Section */}
                    <div className="flex p-4 mt-6 bg-gray-50 rounded-lg shadow-md">
                        {/* Left: Address Information */}
                        <div>
                            <div className="flex items-center">
                                <p className="text-lg text-gray-800">Delivery Address</p>
                                <button className="text-sm font-semibold text-white bg-gradient-to-r from-gray-400 to-gray-600 py-2 px-4 rounded-lg shadow-md hover:from-gray-500 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 ml-3">
                                    Change Address
                                </button>

                            </div>
                            <p className="text-lg font-semibold text-gray-800">Ram Kumawat</p>
                            <p className="text-sm text-gray-600">500643 - Home/Office</p>
                            <p className="text-sm text-gray-600">D No: 245, Aru Colocny, Yejix, Jeh, Andhra Pradesh</p>
                        </div>
                    </div>

                    {/* Coupons & Promocode Section */}
                    <div
                        className="flex items-center justify-between w-full px-4 py-3 mt-6 mb-4 bg-white border rounded-lg shadow cursor-pointer"
                        onClick={() => setShowPopup(true)} // Open the modal
                    >
                        <div className="flex items-center gap-2">
                            <BiSolidOffer className="text-xl" />
                            <span className="text-lg font-semibold text-gray-700">
                                Coupons & Promocode
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
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>

                    {/* Success Message */}
                    {isPromocodeApplied && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="text-green-600 text-sm font-semibold"
                        >
                            🎉 {appliedOffer.title}: {appliedOffer.description}
                        </motion.div>
                    )}

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
                                                    isPromocodeApplied && appliedOffer.code === offer.code
                                                        ? handleRemovePromocode()
                                                        : handleApplyOffer(offer)
                                                }
                                                className={`text-sm font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 transition-all ${isPromocodeApplied && appliedOffer.code === offer.code
                                                    ? "text-gray-500 bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 focus:ring-red-300"
                                                    : "text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 focus:ring-blue-500"
                                                    }`}
                                            >
                                                {isPromocodeApplied && appliedOffer.code === offer.code
                                                    ? "Remove"
                                                    : "Apply"}
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Close Button */}
                                {/* <button
                                    onClick={() => setShowPopup(false)}
                                    className="mt-6 w-full text-sm font-semibold text-white bg-gradient-to-r from-red-400 to-red-600 py-2 px-4 rounded-lg shadow-md hover:from-red-500 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all"
                                >
                                    Close
                                </button> */}
                            </motion.div>
                        </motion.div>


                    )}



                    {/* Price Details Section */}
                    <div className="space-y-4 mt-6">
                        <div className="flex justify-between items-center">
                            <p className="text-md text-gray-600">Price (1 item)</p>
                            <p className="text-md text-gray-800 font-semibold">₹650</p>
                        </div>

                        <div className="flex justify-between items-center">
                            <p className="text-md text-gray-600">Discount</p>
                            <p className="text-md text-green-600 font-semibold">₹120 (10%)</p>
                        </div>

                        <div className="flex justify-between items-center">
                            <p className="text-md text-gray-600">Delivery Charges</p>
                            <p className="text-md text-blue-600 font-semibold">Free</p>
                        </div>

                        {/* Dotted Line */}
                        <div className="border-t-2 border-dotted my-4 border-gray-300"></div>

                        <div className="flex justify-between items-center">
                            <p className="text-md text-gray-800 font-semibold">Total</p>
                            <p className="text-md text-gray-800 font-semibold">₹4357</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 shadow-md z-50 py-3 px-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    {/* Left: Price Display */}
                    <div className="text-lg font-semibold text-gray-800">
                        <p className="text-sm font-semibold line-through text-gray-500">₹180</p> {/* Original Price with line-through */}
                        <p className="text-xl font-bold text-green-600">₹200</p> {/* Discounted Price */}
                    </div>
                </div>

                {/* Right: Place Order Button */}
                <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-gradient-to-l transition duration-300 ease-in-out">
                    Place Order
                </button>
            </div>

        </div>
    );
};

export default Cart;