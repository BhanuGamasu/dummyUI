import React from "react";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsBoxSeam } from "react-icons/bs";
import { CiMoneyBill } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrMapLocation } from "react-icons/gr";
import { RiTruckLine } from "react-icons/ri";

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
                description: "A dummy can be an imitation of something, such as a mannequin used to display clothing or a large puppet controlled by a ventriloquist",
                quantity: 1,
                price: 500,
                weight: "250gms",
                image: "https://via.placeholder.com/150?text=Chocolate+Cake",
            },
            {
                name: "Strawberry Muffin",
                description: "A dummy can be an imitation of something, such as a mannequin used to display clothing or a large puppet controlled by a ventriloquist",
                quantity: 1,
                weight: "500gms",
                price: 300,
                image: "https://via.placeholder.com/150?text=Strawberry+Muffin",
            },
            {
                name: "Red Velvet Cake",
                description: "A dummy can be an imitation of something, such as a mannequin used to display clothing or a large puppet controlled by a ventriloquist",
                quantity: 1,
                weight: "1kg",
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
            {/* <div className="flex items-center bg-white p-6 rounded-lg shadow-md mb-6"> */}

            {/* Product Image */}
            {/* <div className="w-28 h-28 flex-shrink-0 mr-6">
                    <img
                        src={order.image}
                        alt={`Product ${order.id}`}
                        className="w-full h-full object-cover rounded-md border border-gray-200 shadow-sm"
                    />
                </div> */}

            {/* Order Information */}
            {/* <div className="flex flex-col flex-grow">
                    <div className="flex justify-between items-center">
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

                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {order.summary}
                    </p>

                    <p className="text-sm text-gray-800 mt-1 flex items-center">
                        <span className="text-lg text-gray-800 font-semibold">
                            ₹{order.totalAmount}
                        </span>
                    </p>
                </div> */}

            <motion.div
                className="bg-white border shadow-md p-5 rounded-xl transition-shadow duration-300 mb-6"
            >
                <div className="flex justify-between items-center mb-4">
                    {/* <div className="flex items-center space-x-3"> */}
                    <div className="flex items-center space-x-3 ">
                        <BsBoxSeam className="text-2xl text-blue-500" />
                        <h2 className="text-lg font-bold">Order Details</h2>
                    </div>
                    <p className="text-gray-700">
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === "Delivered"
                                ? "bg-green-100 text-green-600"
                                : "bg-yellow-100 text-yellow-600"
                                }`}
                        >
                            {order.status}
                        </span>
                    </p>
                    {/* </div> */}
                </div>
                <p className="text-gray-700 mb-1">Order ID: {order.id}</p>
                <p className="text-gray-700 mb-1">Order Date: {order.date}</p>
            </motion.div>
            {/* </div> */}

            {/* Vertical Status Bar */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center space-x-3 mb-3">
                    <RiTruckLine className="text-2xl text-blue-500" />
                    <h2 className="text-lg font-bold">Order Status</h2>
                </div>
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


            {/* Order Items */}
            <motion.div
                className="bg-white border shadow-md p-5 rounded-xl transition-shadow duration-300 mb-6"
            >
                <div className="flex items-center space-x-3 mb-3">
                    <AiOutlineShoppingCart className="text-2xl text-blue-500" />
                    <h2 className="text-lg font-bold">Order Items</h2>
                </div>
                {order.items.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-start border-b py-2 last:border-none"
                    >
                        {/* Left Section with Image */}
                        <div className="flex items-start space-x-3">
                            <img
                                src={item.image} // Ensure `image` exists in the item object
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div>
                                <p className="text-sm font-bold text-gray-800 line-clamp-1">{item.name}</p>
                                <p className="text-sm text-gray-600 line-clamp-1">{item.description}</p>
                                <p className="text-sm text-gray-600 line-clamp-1 font-semibold">{item.weight}</p>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="text-right pl-2">
                            <p className="font-bold text-lg">x {item.quantity}</p>
                            <p className="text-sm font-semibold">₹{item.price}</p>
                        </div>
                    </div>
                ))}
            </motion.div>



            {/* Shipping Details */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex items-center space-x-3 mb-3">
                    <GrMapLocation className="text-2xl text-blue-500" />
                    <h2 className="text-lg font-bold">Delivery Address</h2>
                </div>
                <p className="text-sm text-gray-600">{order.shippingAddress}</p>
            </div>

            {/* Bill Details */}
            <motion.div
                className="bg-white border shadow-md p-5 rounded-xl transition-shadow duration-300"
            >

                <div className="flex items-center space-x-3 mb-3">
                    <CiMoneyBill className="text-2xl text-blue-500" />
                    <h2 className="text-lg font-bold">Bill Details</h2>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>
                            Item Total (
                            {order.items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                            items)
                        </span>
                        <span className="font-bold">₹
                            {order.items.reduce(
                                (sum, item) => sum + item.price * item.quantity,
                                0
                            )}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>Packaging Charges</span>
                        <span className="font-bold">₹{order.packagingCharges || 0}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>GST</span>
                        <span className="font-bold">₹{order.gst || 0}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Discount</span>
                        <span className="font-bold text-green-600">-₹{order.discount || 0}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Coupon Discount</span>
                        <span className="font-bold text-green-600">-₹{order.couponDiscount || 0}</span>
                    </div>

                    <hr className="border-dashed my-2" />

                    <div className="flex justify-between text-lg font-bold">
                        <span>Bill Total</span>
                        <span>₹
                            {order.items.reduce(
                                (sum, item) => sum + item.price * item.quantity,
                                0
                            ) +
                                (order.packagingCharges || 0) +
                                (order.gst || 0) -
                                (order.discount || 0) -
                                (order.couponDiscount || 0)}
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default OrderOverview;
