import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AddressModal = ({
    show,
    onClose,
    addresses,
    selectedAddress,
    setSelectedAddress,
    onEdit,
    onDelete,
    popupStyles,
    onDefaultChange, // Callback to sync default address outside
}) => {
    const navigate = useNavigate();
    const [openOptionsIndex, setOpenOptionsIndex] = useState(null);
    const [defaultAddressIndex, setDefaultAddressIndex] = useState(null);

    const menuRef = useRef(null);

    // Load default address from localStorage on mount
    useEffect(() => {
        const savedDefaultIndex = localStorage.getItem("defaultAddressIndex");
        if (savedDefaultIndex !== null && addresses[savedDefaultIndex]) {
            setDefaultAddressIndex(Number(savedDefaultIndex));
        } else {
            setDefaultAddressIndex(addresses.length > 0 ? 0 : null);
        }
    }, [addresses]);

    // Save default address to localStorage whenever it changes
    useEffect(() => {
        if (defaultAddressIndex !== null) {
            localStorage.setItem("defaultAddressIndex", defaultAddressIndex);
        }
        if (onDefaultChange) {
            onDefaultChange(defaultAddressIndex);
        }
    }, [defaultAddressIndex, onDefaultChange]);

    // Close options menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenOptionsIndex(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end"
                    onClick={onClose}
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
                        className={`bg-white mb-[73px] rounded-lg rounded-bl-none rounded-br-none shadow-lg w-full md:w-[50%] max-h-[50vh] p-6 overflow-y-auto transform no-scrollbar ${popupStyles}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Select Address
                            </h2>
                            <motion.div
                                onClick={onClose}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                className="cursor-pointer text-gray-500"
                            >
                                <AiOutlineClose className="w-6 h-6" />
                            </motion.div>
                        </div>

                        <div className="mb-4">
                            <button
                                onClick={() => navigate("/addAddress")}
                                className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 focus:ring-2 focus:ring-blue-300 transition-all"
                            >
                                Add New Address
                            </button>
                        </div>

                        <div className="space-y-4">
                            {addresses.map((address, index) => (
                                <div
                                    key={index}
                                    className={`p-4 border rounded-lg shadow-sm relative ${
                                        selectedAddress === index
                                            ? "bg-blue-50 border-blue-500"
                                            : "bg-gray-50"
                                    }`}
                                    onClick={() => setSelectedAddress(index)}
                                >
                                    <div className="absolute top-2 right-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenOptionsIndex(
                                                    openOptionsIndex === index ? null : index
                                                );
                                            }}
                                            className="text-gray-500 hover:text-gray-800"
                                        >
                                            ...
                                        </button>
                                        {openOptionsIndex === index && (
                                            <div
                                                ref={menuRef}
                                                className="absolute right-0 bg-white shadow-md rounded-lg text-sm z-10"
                                            >
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onEdit(index);
                                                        setOpenOptionsIndex(null);
                                                    }}
                                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onDelete(index);
                                                        setOpenOptionsIndex(null);
                                                    }}
                                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                                                >
                                                    Delete
                                                </button>
                                                {defaultAddressIndex !== index && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setDefaultAddressIndex(index);
                                                            setOpenOptionsIndex(null);
                                                        }}
                                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-green-600"
                                                    >
                                                        Default
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="cursor-pointer">
                                        <h3 className="text-md font-semibold text-gray-800 flex items-center">
                                            {address.name}
                                            {defaultAddressIndex === index && (
                                                <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded">
                                                    Default Address
                                                </span>
                                            )}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {address.details}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {address.phone}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AddressModal;