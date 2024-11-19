import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";

import Address from "./Address";
import Coupons from "./Coupons";

const BuyNow = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { product, quantity: initialQuantity = 1, selectedWeight, totalPrice: initialTotalPrice, originalPrice, discountPrice } = location.state || {};

    const [isFavorite, setIsFavorite] = useState(false);
    const [bubbles, setBubbles] = useState([]);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [isPromocodeApplied, setIsPromocodeApplied] = useState(false); // Promocode state
    const [appliedOffer, setAppliedOffer] = useState(null); // Stores applied offer details
    const [quantity, setQuantity] = useState(initialQuantity);
    const [totalPrice, setTotalPrice] = useState(initialTotalPrice);

    const offers = [
        { title: "Flat ₹200 Off", description: "Use code SAVE200 on orders above ₹1000.", code: "SAVE200", couponDiscount: 10, },
        { title: "10% Cashback", description: "Use code CASHBACK10 on all prepaid orders.", code: "CASHBACK10", couponDiscount: 20, },
        { title: "Free Shipping", description: "Use code FREESHIP for free delivery on orders above ₹500.", code: "FREESHIP", couponDiscount: 30, },
    ];

    const handlePlaceOrder = () => {
        const orderDetails = {
            product: {
                id: product.id,
                name: product.name,
                weight: selectedWeight,
                quantity: quantity,
                originalPrice: originalPrice,
                discountPrice: discountPrice,
            },
            pricing: {
                totalOriginalPrice: originalPrice * quantity,
                totalDiscount: originalPrice * quantity - discountPrice * quantity,
                couponDiscount: couponDiscount,
                finalTotal: totalPrice,
            },
            address: addressDetails,
            appliedCoupon: appliedOffer ? appliedOffer.code : null,
        };

        console.log("Order Details:", orderDetails);
    };

    const handleApplyOffer = (offer) => {
        if (offer) {
            // setPromocode(offer.code); // Set the promocode
            setCouponDiscount(offer.couponDiscount)
            setAppliedOffer(offer); // Save applied offer details
            setIsPromocodeApplied(true); // Mark promocode as applied
            console.log("Applied Offer:", offer); // Log offer data
        }
    };

    const handleRemovePromocode = () => {
        // setPromocode(""); // Clear promocode
        setCouponDiscount(0);
        setAppliedOffer(null); // Reset applied offer
        setIsPromocodeApplied(false); // Mark promocode as not applied
        console.log("Promocode removed.");
    };


    const addressDetails = {
        type: "Home/Office",
        address: "D No: 245, Aru Colony, Yejix, Jeh, Andhra Pradesh",
    };


    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
        setBubbles((prevBubbles) => [
            ...prevBubbles,
            { id: Date.now() + 1, direction: -1 },
            { id: Date.now() + 2, direction: 1 },
        ]);
    };

    const navigateToAddAddress = () => {
        navigate("/addAddress")
    }

    const incrementQuantityBuyNow = () => {
        setQuantity((prevQuantity) => {
            const newQuantity = prevQuantity + 1;
            setTotalPrice(newQuantity * discountPrice); // Update total price
            return newQuantity;
        });
    };

    const decrementQuantityBuyNow = () => {
        setQuantity((prevQuantity) => {
            if (prevQuantity > 1) {
                const newQuantity = prevQuantity - 1;
                setTotalPrice(newQuantity * discountPrice); // Update total price
                return newQuantity;
            }
            return prevQuantity;
        });
    };

    // Price Details Section
    useEffect(() => {
        setTotalPrice(quantity * discountPrice);
    }, [quantity, discountPrice]);

    useEffect(() => {
        const priceWithoutDiscount = quantity * discountPrice;
        const finalPrice = priceWithoutDiscount - couponDiscount;
        setTotalPrice(finalPrice > 0 ? finalPrice : 0); // Ensure total doesn't go below 0
    }, [quantity, discountPrice, couponDiscount]);

    useEffect(() => {
        if (!appliedOffer) {
            setIsPromocodeApplied(false); // Reset this state if no offer is applied
        }
    }, [appliedOffer]);

    return (
        <div className="container mx-auto p-4 pb-24">
            <div className="relative flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold mr-4">Quick Buy</h1>
                <p className="text-md font-semibold underline text-blue-600 cursor-pointer">Continue Shopping</p>
            </div>

            {product.length === 0 ? (
                <p className="text-center text-lg">Please add any order</p>
            ) : (
                <div>
                    <div
                        key={product.id}
                        className="flex items-center border p-4 rounded-lg shadow-lg mb-6"
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
                        <div className="flex-grow ml-4">
                            <div className="flex justify-between">
                                <h2 className="text-lg font-semibold">{product.name}</h2>
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
                                        className={`${index < product.rating.fullStars
                                            ? "text-yellow-500"
                                            : index === product.rating.fullStars &&
                                                product.rating.halfStar
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

                            {/* Price */}
                            <div className="mt-2">
                                <p className="text-xs text-gray-500 line-through">
                                    ₹{originalPrice * quantity}
                                </p>
                                <p className="text-sm font-semibold text-gray-800">
                                    ₹{discountPrice * quantity}
                                    <span className="text-gray-400 pl-1">
                                        ({((originalPrice - discountPrice) / originalPrice * 100).toFixed(0)}% off)
                                    </span>
                                </p>
                                <p className="text-xs text-gray-500">
                                    {selectedWeight}
                                </p>
                            </div>

                            {/* Quantity and Action Buttons */}
                            <div className="flex items-center justify-between md:justify-around mt-4">
                                <div className="flex items-center justify-center">
                                    <button
                                        onClick={decrementQuantityBuyNow}
                                        className="text-sm sm:text-base px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300 border-2 border-r-0 text-gray-700 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 hover:text-gray-900 rounded-l-lg transition-all duration-200 ease-in-out transform active:scale-95"
                                    >
                                        –
                                    </button>
                                    <span className="text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-1 bg-white text-gray-800 border-gray-200 border-2 border-r-0 border-l-0 font-semibold">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={incrementQuantityBuyNow}
                                        className="text-sm sm:text-base px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-l-0 border-gray-300 text-gray-700 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 hover:text-gray-900 rounded-r-lg transition-all duration-200 ease-in-out transform active:scale-95"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* <button
                                    onClick={() => dispatch(removeFromCart(product.id))}
                                    className="text-sm font-semibold text-gray-500 bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 focus:ring-red-300 px-4 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2"
                                >
                                    Remove
                                </button> */}
                            </div>
                        </div>
                    </div>

                    {/* Address Component */}
                    <Address
                        name="Ram Kumawat"
                        details={addressDetails}
                        onChangeAddress={() => console.log("Change Address clicked")}
                        onAddAddress={navigateToAddAddress}
                    />

                    {/* Coupons Component */}
                    <Coupons
                        offers={offers}
                        appliedOffer={appliedOffer}
                        onApply={(offer) => {
                            if (offer && appliedOffer?.code === offer.code) {
                                handleRemovePromocode();
                            } else if (offer) {
                                handleApplyOffer(offer);
                            } else {
                                handleRemovePromocode();
                            }
                        }}
                    />

                    {/* Success Message */}
                    {isPromocodeApplied && appliedOffer && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="text-green-600 text-sm font-semibold"
                        >
                            🎉 {appliedOffer.title}: {appliedOffer.description}
                        </motion.div>
                    )}



                    {/* Price Details Section */}
                    <div className="space-y-4 mt-6">
                        <div className="flex justify-between items-center">
                            <p className="text-md text-gray-600">Price (1 item)</p>
                            <p className="text-md text-gray-800 font-semibold">₹{originalPrice * quantity}</p>
                        </div>

                        <div className="flex justify-between items-center">
                            <p className="text-md text-gray-600">Discount</p>
                            <p className="text-md text-green-600 font-semibold">-₹{originalPrice * quantity - discountPrice * quantity}</p>
                        </div>

                        {isPromocodeApplied && appliedOffer && (
                            <div className="flex justify-between items-center">
                                <p className="text-md text-gray-600">Coupon</p>
                                <p className="text-md text-green-600 font-semibold">-₹{couponDiscount}</p>
                            </div>
                        )}

                        <div className="flex justify-between items-center">
                            <p className="text-md text-gray-600">Delivery Charges</p>
                            <p className="text-md text-blue-600 font-semibold">Free</p>
                        </div>

                        {/* Dotted Line */}
                        <div className="border-t-2 border-dotted my-4 border-gray-300"></div>

                        <div className="flex justify-between items-center">
                            <p className="text-md text-gray-800 font-semibold">Total</p>
                            <p className="text-md text-gray-800 font-semibold">₹{totalPrice}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 shadow-md z-50 py-3 px-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    {/* Left: Price Display */}
                    <div className="text-lg font-semibold text-gray-800">
                        <p className="text-sm font-semibold line-through text-gray-500">₹{originalPrice * quantity}</p> {/* Original Price with line-through */}
                        <p className="text-xl font-bold text-green-600">₹{totalPrice}</p> {/* Discounted Price */}
                    </div>
                </div>

                {/* Right: Place Order Button */}
                <button onClick={handlePlaceOrder}
                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-gradient-to-l transition duration-300 ease-in-out">
                    Place Order
                </button>
            </div>

        </div>
    );
};

export default BuyNow;