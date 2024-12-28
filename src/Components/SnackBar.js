import React, { useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const SnackBar = ({ message, isVisible, duration = 2500, onClose, color = "--primaryDarkShade1" }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    return (
        <div
            className={`flex items-center fixed top-28 max-md:top-36 right-4 px-5 py-3 text-white text-lg font-medium rounded-full shadow-lg transition-all ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
                zIndex: 1000,
                backgroundColor: `var(${color})`,
            }}
        >
            {/* Moving Light Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 w-full h-full animate-light-slide"></div>

            <AiOutlineShoppingCart className="mr-1 text-xl" />
            {/* Message Content */}
            <div className="relative z-10">{message}</div>
        </div>
    );
};

export default SnackBar;
