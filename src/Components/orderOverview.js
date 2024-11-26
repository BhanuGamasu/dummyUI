import React from "react";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderOverview = () => {
    const navigate = useNavigate();

    const order = {
        id: "ORD123456789",
        date: "2024-11-20",
        totalAmount: 1200,
        seller: "Sweet Treats Co.",
        summary: "Reynolds Kitchens Turkey Size Oven Bags, Holds Up to 24 Pounds, 2 Count",
        status: "Delivered",
        image: "https://via.placeholder.com/150?text=Chocolate+Cake",
        shippingAddress: "659, Venkat Enclave, TY Raju Road, Whitefields, Hyderabad-499963, Arunodaya Colony, Madhapur, Hyderabad, Telangana - 499963",
        items: [
            {
                name: "Chocolate Cake",
                quantity: 1,
                price: 500,
                image: "https://via.placeholder.com/150?text=Chocolate+Cake",
            },
            {
                name: "Strawberry Muffin",
                quantity: 1,
                price: 300,
                image: "https://via.placeholder.com/150?text=Strawberry+Muffin",
            },
            {
                name: "Red Velvet Cake",
                quantity: 1,
                price: 400,
                image: "https://via.placeholder.com/150?text=Red+Velvet+Cake",
            },
        ],
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center mb-5">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-600 hover:text-gray-800"
                    onClick={handleBack}
                >
                    <FaArrowLeft className="text-xl" />
                </motion.button>
                <h1 className="text-2xl font-bold ml-4 text-gray-800">Order Overview</h1>
            </div>

            <p className="font-semibold text-sm text-gray-400 mb-2">Order ID: {order.id}</p>

            {/* Order Details */}
            <div className="flex items-center bg-white p-6 rounded-lg shadow-md mb-6">

                {/* Product Image */}
                <div className="w-28 h-28 flex-shrink-0 mr-6"> {/* Added margin-right to create space */}
                    <img
                        src={order.image} // Only show the first image
                        alt={`Product ${order.id}`}
                        className="w-full h-full object-cover rounded-md border border-gray-200 shadow-sm"
                    />
                </div>

                {/* Order Information */}
                <div className="flex flex-col flex-grow">
                    <div className="flex justify-between items-center"> {/* Increased bottom margin */}
                        <p className="text-sm text-gray-600">Order Date <span className="font-bold">{order.date}</span></p>
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === "Delivered"
                                ? "bg-green-100 text-green-600"
                                : "bg-yellow-100 text-yellow-600"
                                }`}
                        >
                            {order.status}
                        </span>
                    </div>

                    {/* Ordered Items */}
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2"> {/* Increased margin-top for spacing */}
                        {order.summary}
                    </p>

                    {/* Total Amount */}
                    <p className="text-sm text-gray-800 mt-1 flex items-center"> {/* Increased margin-top */}
                        <span className="text-lg text-gray-800 font-semibold">
                            ₹{order.totalAmount}
                        </span>
                    </p>
                </div>
            </div>

           {/* Vertical Status Bar */}
           <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Order Status</h2>
                <div className="relative">
                    <ul className="space-y-8">
                        {["Confirmed", "Shipped", "Out For Delivery", "Delivered", "Cancelled"].map((step, index) => {
                            const currentIndex = ["Confirmed", "Shipped", "Out For Delivery", "Delivered", "Cancelled"].indexOf(order.status);
                            const isCompleted = index <= currentIndex;

                            // Hide "Cancelled" step if it's not the selected status
                            const showDot = order.status === "Cancelled"
                                ? (step === "Order Confirmed" || step === "Cancelled")
                                : step !== "Cancelled"; // Hide "Cancelled" dot if it's not selected

                            // Determine the color and icon based on the status
                            const dotColor = order.status === "Cancelled"
                                ? "bg-red-500 border-red-500"  // Red for Cancelled
                                : isCompleted
                                    ? "bg-green-500 border-green-500"  // Green for completed steps
                                    : "bg-gray-300 border-gray-300";  // Gray for incomplete steps

                            // Heartbreak or smiley based on status
                            const icon = order.status === "Cancelled" && isCompleted
                                ? "😢"  // Heartbreak icon for Cancelled
                                : "🤍";  // Smiley for other statuses

                            return (
                                showDot && (
                                    <li key={index} className="flex items-center space-x-4">
                                        {/* Circle Indicator */}
                                        <div className="relative flex items-center justify-center">
                                            <div
                                                className={`w-5 h-5 rounded-full border-2 ${dotColor} flex-shrink-0 flex items-center justify-center`}
                                            >
                                                {/* Icon inside the dot */}
                                                {isCompleted && (
                                                    <span className="text-white text-xs font-bold">{icon}</span>
                                                )}
                                            </div>

                                            {/* Line Connector */}
                                            {/* Only show connector between steps except for the last one */}
                                            {index < 3 && showDot && (
                                                <div
                                                    className={`absolute left-2.3 top-5 w-0.5 h-8 ${order.status === "Cancelled" && index === 0
                                                        ? "bg-red-500"  // Red line between Order Confirmed and Cancelled
                                                        : isCompleted
                                                            ? "bg-green-500"  // Green line for completed steps
                                                            : "bg-gray-300"  // Gray for incomplete steps
                                                        }`}
                                                ></div>
                                            )}
                                        </div>

                                        {/* Step Label */}
                                        <p className={`text-sm font-medium ${isCompleted ? "text-gray-800" : "text-gray-400"}`}>
                                            {step === "Shipped" && order.status === "Cancelled" ? "Cancelled" : step}
                                        </p>
                                    </li>
                                )
                            );
                        })}
                    </ul>
                </div>
            </div>


            {/* Shipping Details */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
                <p className="text-sm text-gray-600">{order.shippingAddress}</p>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Price Details</h2>
                <ul className="space-y-2">
                    <li className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span>₹{order.totalAmount}</span>
                    </li>
                    <li className="flex justify-between text-sm text-gray-600">
                        <span>Discount</span>
                        <span>₹100</span>
                    </li>
                    <li className="flex justify-between text-sm text-gray-600">
                        <span>Delivery Charges</span>
                        <span>₹50</span>
                    </li>
                    <li className="flex justify-between text-base font-semibold text-gray-800">
                        <span>Total Amount</span>
                        <span>₹1150</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default OrderOverview;
