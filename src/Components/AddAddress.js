import React, { useState } from "react";
import { MdOutlineMyLocation } from "react-icons/md";
import { RiUserLocationFill } from "react-icons/ri";
import NavigateBack from "./NavigateBack"

const AddAddress = ({ addAddressData }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        pincode: "",
        state: "",
        city: "",
        houseNumber: "",
        roadName: "",
        landmark: "",
        type: "Home",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = () => {
        if (
            formData.fullName &&
            formData.phoneNumber &&
            formData.pincode &&
            formData.state &&
            formData.city &&
            formData.houseNumber &&
            formData.roadName
        ) {
            console.log(formData, "Address saved successfully!");
        } else {
            alert("Please fill all required fields.");
        }
    };

    return (
        <div className="p-6 rounded-lg bg-white w-full">
            <div className="flex items-center justify-between mb-6">
                <NavigateBack className="mb-0"/>
                <div className="flex items-center">
                    <RiUserLocationFill className="text-lg" />
                    <h3 className="text-xl pl-2 font-semibold text-gray-800">Add New Address</h3>
                </div>
            </div>

            {/* Form Fields with Floating Labels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="relative">
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        id="fullName"
                        className="peer w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        autoComplete="off"
                        placeholder=" "
                    />
                    <label
                        htmlFor="fullName"
                        className="bg-white absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 transform -translate-y-6 origin-top-left px-1"
                    >
                        Full Name *
                    </label>
                </div>

                {/* Phone Number */}
                <div className="relative">
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        id="phoneNumber"
                        className="peer w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        autoComplete="off"
                        placeholder=" "
                    />
                    <label
                        htmlFor="phoneNumber"
                        className="bg-white absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 transform -translate-y-6 origin-top-left px-1"
                    >
                        Phone Number *
                    </label>
                </div>

                {/* Pincode with Use My Location */}
                <div className="relative flex items-center">
                    <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        id="pincode"
                        className="peer w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        autoComplete="off"
                        placeholder=" "
                    />
                    <label
                        htmlFor="pincode"
                        className="bg-white absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 transform -translate-y-6 origin-top-left px-1"
                    >
                        Pincode *
                    </label>
                    {/* Beautiful Button for Use My Location */}
                    <button
                        className="ml-2 w-1/2 py-3 px-4 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-lg shadow-md hover:from-blue-500 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transform transition-all duration-300 ease-in-out flex items-center justify-center"
                        onClick={() => alert("Fetching current location...")}
                    >
                        <MdOutlineMyLocation className="mr-2 text-lg" />
                        <span>Use My Location</span>
                    </button>

                </div>

                {/* State */}
                <div className="relative">
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        id="state"
                        className="peer w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        autoComplete="off"
                        placeholder=" "
                    />
                    <label
                        htmlFor="state"
                        className="bg-white absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 transform -translate-y-6 origin-top-left px-1"
                    >
                        State *
                    </label>
                </div>

                {/* City */}
                <div className="relative">
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        id="city"
                        className="peer w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        autoComplete="off"
                        placeholder=" "
                    />
                    <label
                        htmlFor="city"
                        className="bg-white absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 transform -translate-y-6 origin-top-left px-1"
                    >
                        City *
                    </label>
                </div>

                {/* House Number */}
                <div className="relative">
                    <input
                        type="text"
                        name="houseNumber"
                        value={formData.houseNumber}
                        onChange={handleChange}
                        id="houseNumber"
                        className="peer w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        autoComplete="off"
                        placeholder=" "
                    />
                    <label
                        htmlFor="houseNumber"
                        className="bg-white absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 transform -translate-y-6 origin-top-left px-1"
                    >
                        House No., Building Name *
                    </label>
                </div>

                {/* Road Name */}
                <div className="relative">
                    <input
                        type="text"
                        name="roadName"
                        value={formData.roadName}
                        onChange={handleChange}
                        id="roadName"
                        className="peer w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        autoComplete="off"
                        placeholder=" "
                    />
                    <label
                        htmlFor="roadName"
                        className="bg-white absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 transform -translate-y-6 origin-top-left px-1"
                    >
                        Road Name, Area, Colony *
                    </label>
                </div>

                {/* Landmark */}
                <div className="relative">
                    <input
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        id="landmark"
                        className="peer w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        autoComplete="off"
                        placeholder=" "
                    />
                    <label
                        htmlFor="landmark"
                        className="bg-white absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 transform -translate-y-6 origin-top-left px-1"
                    >
                        Landmark
                    </label>
                </div>
            </div>

            {/* Address Type Radio Buttons */}
            <div className="flex items-center justify-start space-x-6 mt-6">
                <label className="flex items-center text-gray-700">
                    <input
                        type="radio"
                        name="type"
                        value="Home"
                        checked={formData.type === "Home"}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    Home
                </label>
                <label className="flex items-center text-gray-700">
                    <input
                        type="radio"
                        name="type"
                        value="Work"
                        checked={formData.type === "Work"}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    Work
                </label>
            </div>

            {/* Save Button */}
            <button
                onClick={handleSave}
                className="w-full py-3 mt-8 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 transition-all duration-300"
            >
                Save Address
            </button>
        </div>
    );
};

export default AddAddress;
