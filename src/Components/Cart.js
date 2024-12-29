import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import emptyCartImg from "../../src/emptyCart.jpg";
import {
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
} from "../redux/cartSlice";
import NavigateBack from "./NavigateBack";
import AddressModal from "./AddressModal";
import Address from "./Address";
import Coupons from "./Coupons";

const Cart = () => {
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [isFavorite, setIsFavorite] = useState(false);
    const [bubbles, setBubbles] = useState([]);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [isPromocodeApplied, setIsPromocodeApplied] = useState(false); // Promocode state
    const [appliedOffer, setAppliedOffer] = useState(null); // Stores applied offer details

    const [showAddressModal, setShowAddressModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [updatedDeliveryAddress, setUpdatedDeliveryAddress] = useState('');

    const offers = [
        { title: "Flat ₹200 Off", description: "Use code SAVE200 on orders above ₹1000.", code: "SAVE200", couponDiscount: 10, },
        { title: "10% Cashback", description: "Use code CASHBACK10 on all prepaid orders.", code: "CASHBACK10", couponDiscount: 20, },
        { title: "Free Shipping", description: "Use code FREESHIP for free delivery on orders above ₹500.", code: "FREESHIP", couponDiscount: 30, },
    ];

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

    // Calculate total price, GST, and discounts dynamically
    const calculatePriceDetails = () => {
        const totalPrice = items.reduce((total, item) => {
            const itemTotal = item.quantity * (item.selectedWeight?.price || item.discountPrice);
            return total + itemTotal;
        }, 0);

        const gst = totalPrice * 0.18; // GST is 18%
        return { totalPrice, gst, finalPrice: totalPrice + gst };
    };

    const priceDetails = calculatePriceDetails();

    const handleEditAddress = (index) => {
        console.log("Edit address at index:", index);
    };

    const handleDeleteAddress = (index) => {
        console.log("Delete address at index:", index);
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

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
        setBubbles((prevBubbles) => [
            ...prevBubbles,
            { id: Date.now() + 1, direction: -1 },
            { id: Date.now() + 2, direction: 1 },
        ]);
    };

    const handleSubmit = () => {
        const orderDetails = {
            items,
            totalPrice: priceDetails.totalPrice.toFixed(),
            gst: priceDetails.gst.toFixed(),
            finalPrice: priceDetails.finalPrice.toFixed(),
            address: updatedDeliveryAddress,
        };
        console.log("Order Submitted:", orderDetails);
    };

    useEffect(() => {
        if (!appliedOffer) {
            setIsPromocodeApplied(false); // Reset this state if no offer is applied
        }
    }, [appliedOffer]);

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

    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container mx-auto pt-5 pb-20 bg-gradient-to-r from-[--primaryShade4] to-gray-50 ">
            <NavigateBack className="pl-3" />
            <div className="bg-white p-5 rounded-3xl">
                <div className="relative flex items-center justify-between mb-5">
                    <h1 className="text-2xl font-bold mr-4">Your Cart</h1>
                    <p className="text-md font-semibold underline text-blue-600 cursor-pointer">Continue Shopping</p>
                </div>

                {items.length === 0 ? (
                    <img
                    src={emptyCartImg}
                    alt={"Empty Cart"}
                    className="w-full h-full"
                />
                ) : (
                    <div>
                        {items.map((item) => (
                            <div
                                key={`${item.id}-${item.selectedWeight}`}
                                className="flex items-center border p-4 rounded-lg shadow-lg mb-6"
                            >
                                {/* Product Image */}
                                <div className="w-[10rem] h-[10rem] flex-shrink-0">
                                    <img
                                        src={item.product.images[0]}
                                        alt={item.product.name}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="flex-grow ml-4">
                                    <div className="flex justify-between">
                                        <h2 className="text-lg font-semibold">{item.product.name}</h2>
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
                                    <div className="flex items-center text-yellow-500">
                                        {[...Array(5)].map((_, index) => (
                                            <span
                                                key={index}
                                                className={`${index < item.product.rating.fullStars
                                                    ? "text-yellow-500"
                                                    : index === item.product.rating.fullStars &&
                                                        item.product.rating.halfStar
                                                        ? "text-yellow-500"
                                                        : "text-gray-300"
                                                    } text-sm`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                        {/* <span className="ml-2 text-gray-600 text-sm">
                                            ({item.product.reviewsCount} reviews)
                                        </span> */}
                                    </div>

                                    {/* Price */}
                                    <div className="mt-2">
                                        {item.originalPrice > item.discountPrice && (
                                            <p className="text-xs text-gray-500 line-through">
                                                ₹{(item.selectedWeight?.price || item.originalPrice) * item.quantity}
                                            </p>
                                        )}
                                        <p className="text-sm font-semibold text-gray-800">
                                            ₹{(item.selectedWeight?.price || item.discountPrice) * item.quantity}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {item.selectedWeight}
                                        </p>
                                    </div>

                                    {/* Quantity and Action Buttons */}
                                    <div className="flex items-center justify-between md:justify-around mt-4">
                                        <div className="flex items-center justify-center">
                                            <button
                                                onClick={() => dispatch(decrementQuantity({ id: item.id, selectedWeight: item.selectedWeight }))}
                                                className="text-sm sm:text-base px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300 border-2 border-r-0 text-gray-700 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 hover:text-gray-900 rounded-l-lg transition-all duration-200 ease-in-out transform active:scale-95"
                                            >
                                                –
                                            </button>
                                            <span className="text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-1 bg-white text-gray-800 border-gray-200 border-2 border-r-0 border-l-0 font-semibold">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => dispatch(incrementQuantity({ id: item.id, selectedWeight: item.selectedWeight }))}
                                                className="text-sm sm:text-base px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-l-0 border-gray-300 text-gray-700 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 hover:text-gray-900 rounded-r-lg transition-all duration-200 ease-in-out transform active:scale-95"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => dispatch(removeFromCart({ id: item.id, selectedWeight: item.selectedWeight }))}
                                            className="relative text-red-500 group focus:outline-none"
                                        >
                                            <span className="relative z-10">Remove</span>
                                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-500 rounded-full group-hover:w-full transition-all duration-300 transform"></span>
                                        </button>



                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Address Component */}
                        <Address
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
                                <p className="text-md text-gray-600">Price</p>
                                <p className="text-md text-gray-800 font-semibold">₹{priceDetails.totalPrice.toFixed()}</p>
                            </div>

                            {/* <div className="flex justify-between items-center">
                                <p className="text-md text-gray-600">Discount</p>
                                <p className="text-md text-green-600 font-semibold">-₹{priceDetails.discount.toFixed()}</p>
                            </div> */}

                            <div className="flex justify-between items-center">
                                <p className="text-md text-gray-600">GST</p>
                                <p className="text-md text-green-600 font-semibold">+₹{priceDetails.gst.toFixed()}</p>
                            </div>

                            <div className="flex justify-between items-center">
                                <p className="text-md text-gray-600">Delivery Charges</p>
                                <p className="text-md text-blue-600 font-semibold">Free</p>
                            </div>

                            {/* Dotted Line */}
                            <div className="border-t-2 border-dotted my-4 border-gray-300"></div>

                            <div className="flex justify-between items-center">
                                <p className="text-md text-gray-800 font-semibold">Total</p>
                                <p className="text-md text-gray-800 font-semibold">₹{priceDetails.finalPrice.toFixed()}</p>
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
                            <p className="text-xl font-bold text-[--primaryDarkShade1]">₹{priceDetails.finalPrice.toFixed()}</p> {/* Discounted Price */}
                        </div>
                    </div>

                    {/* Right: Place Order Button */}
                    <button onClick={handleSubmit}
                        className="bg-gradient-to-r from-[--primaryDarkShade1] to-[--primary] text-white font-bold py-2 px-6 rounded-lg hover:bg-gradient-to-l transition duration-300 ease-in-out">
                        Pay Now
                    </button>
                </div>

            </div>

        </div>
    );
};

export default Cart;