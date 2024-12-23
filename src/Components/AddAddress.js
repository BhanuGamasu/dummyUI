// import React, { useState } from "react";
// import { MdOutlineMyLocation } from "react-icons/md";
// import { RiUserLocationFill } from "react-icons/ri";
// import NavigateBack from "./NavigateBack"

// const AddAddress = ({ addAddressData }) => {
//     const [formData, setFormData] = useState({
//         fullName: "",
//         phoneNumber: "",
//         pincode: "",
//         state: "",
//         city: "",
//         houseNumber: "",
//         roadName: "",
//         landmark: "",
//         type: "Home",
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const handleSave = () => {
//         if (
//             formData.fullName &&
//             formData.phoneNumber &&
//             formData.pincode &&
//             formData.state &&
//             formData.city &&
//             formData.houseNumber &&
//             formData.roadName
//         ) {
//             console.log(formData, "Address saved successfully!");
//         } else {
//             alert("Please fill all required fields.");
//         }
//     };

//     return (
//         <div className="p-6 rounded-lg bg-white w-full">
//             <div className="flex items-center justify-between mb-6">
//                 <NavigateBack className="mb-0"/>
//                 <div className="flex items-center">
//                     <RiUserLocationFill className="text-lg" />
//                     <h3 className="text-xl pl-2 font-semibold text-gray-800">Add New Address</h3>
//                 </div>
//             </div>

//             {/* Form Fields with Floating Labels */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
//                 {/* Full Name */}
//                 <div className="relative">
//                     <input
//                         type="text"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={handleChange}
//                         id="fullName"
//                         className="peer w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                         autoComplete="off"
//                         placeholder=" "
//                     />
//                     <label
//                         htmlFor="fullName"
//                         className="bg-white absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 transform -translate-y-6 origin-top-left px-1"
//                     >
//                         Full Name *
//                     </label>
//                 </div>

//                 {/* Phone Number */}
//                 <div className="relative">
//                     <input
//                         type="text"
//                         name="phoneNumber"
//                         value={formData.phoneNumber}
//                         onChange={handleChange}
//                         id="phoneNumber"
//                         className="peer w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                         autoComplete="off"
//                         placeholder=" "
//                     />
//                     <label
//                         htmlFor="phoneNumber"
//                         className="bg-white absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 transform -translate-y-6 origin-top-left px-1"
//                     >
//                         Phone Number *
//                     </label>
//                 </div>

//                 {/* Pincode with Use My Location */}
//                 <div className="relative flex items-center">
//                     <input
//                         type="text"
//                         name="pincode"
//                         value={formData.pincode}
//                         onChange={handleChange}
//                         id="pincode"
//                         className="peer w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                         autoComplete="off"
//                         placeholder=" "
//                     />
//                     <label
//                         htmlFor="pincode"
//                         className="bg-white absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 transform -translate-y-6 origin-top-left px-1"
//                     >
//                         Pincode *
//                     </label>
//                     {/* Beautiful Button for Use My Location */}
//                     <button
//                         className="ml-2 w-1/2 py-3 px-4 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-lg shadow-md hover:from-blue-500 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transform transition-all duration-300 ease-in-out flex items-center justify-center"
//                         onClick={() => alert("Fetching current location...")}
//                     >
//                         <MdOutlineMyLocation className="mr-2 text-lg" />
//                         <span>Use My Location</span>
//                     </button>

//                 </div>

//                 {/* State */}
//                 <div className="relative">
//                     <input
//                         type="text"
//                         name="state"
//                         value={formData.state}
//                         onChange={handleChange}
//                         id="state"
//                         className="peer w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                         autoComplete="off"
//                         placeholder=" "
//                     />
//                     <label
//                         htmlFor="state"
//                         className="bg-white absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 transform -translate-y-6 origin-top-left px-1"
//                     >
//                         State *
//                     </label>
//                 </div>

//                 {/* City */}
//                 <div className="relative">
//                     <input
//                         type="text"
//                         name="city"
//                         value={formData.city}
//                         onChange={handleChange}
//                         id="city"
//                         className="peer w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                         autoComplete="off"
//                         placeholder=" "
//                     />
//                     <label
//                         htmlFor="city"
//                         className="bg-white absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 transform -translate-y-6 origin-top-left px-1"
//                     >
//                         City *
//                     </label>
//                 </div>

//                 {/* House Number */}
//                 <div className="relative">
//                     <input
//                         type="text"
//                         name="houseNumber"
//                         value={formData.houseNumber}
//                         onChange={handleChange}
//                         id="houseNumber"
//                         className="peer w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                         autoComplete="off"
//                         placeholder=" "
//                     />
//                     <label
//                         htmlFor="houseNumber"
//                         className="bg-white absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 transform -translate-y-6 origin-top-left px-1"
//                     >
//                         House No., Building Name *
//                     </label>
//                 </div>

//                 {/* Road Name */}
//                 <div className="relative">
//                     <input
//                         type="text"
//                         name="roadName"
//                         value={formData.roadName}
//                         onChange={handleChange}
//                         id="roadName"
//                         className="peer w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                         autoComplete="off"
//                         placeholder=" "
//                     />
//                     <label
//                         htmlFor="roadName"
//                         className="bg-white absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 transform -translate-y-6 origin-top-left px-1"
//                     >
//                         Road Name, Area, Colony *
//                     </label>
//                 </div>

//                 {/* Landmark */}
//                 <div className="relative">
//                     <input
//                         type="text"
//                         name="landmark"
//                         value={formData.landmark}
//                         onChange={handleChange}
//                         id="landmark"
//                         className="peer w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                         autoComplete="off"
//                         placeholder=" "
//                     />
//                     <label
//                         htmlFor="landmark"
//                         className="bg-white absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 transform -translate-y-6 origin-top-left px-1"
//                     >
//                         Landmark
//                     </label>
//                 </div>
//             </div>

//             {/* Address Type Radio Buttons */}
//             <div className="flex items-center justify-start space-x-6 mt-6">
//                 <label className="flex items-center text-gray-700">
//                     <input
//                         type="radio"
//                         name="type"
//                         value="Home"
//                         checked={formData.type === "Home"}
//                         onChange={handleChange}
//                         className="mr-2"
//                     />
//                     Home
//                 </label>
//                 <label className="flex items-center text-gray-700">
//                     <input
//                         type="radio"
//                         name="type"
//                         value="Work"
//                         checked={formData.type === "Work"}
//                         onChange={handleChange}
//                         className="mr-2"
//                     />
//                     Work
//                 </label>
//             </div>

//             {/* Save Button */}
//             <button
//                 onClick={handleSave}
//                 className="w-full py-3 mt-8 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 transition-all duration-300"
//             >
//                 Save Address
//             </button>
//         </div>
//     );
// };

// export default AddAddress;









import React, { useState, useCallback, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { FaSearch, FaHome, FaBriefcase, FaEllipsisH, FaTimes } from "react-icons/fa";
import { MdMyLocation } from "react-icons/md";
import locationImg from "../rb_2202.png";
import NavigateBack from "./NavigateBack";

const libraries = ["places"];

const AddAddress = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAOA9KKCj8Du-XiKPypdF9EWNc6W-lALSY", // Replace with your API key
        libraries,
    });

    const [address, setAddress] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [location, setLocation] = useState({ lat: 37.7749, lng: -122.4194 });
    const [markerPosition, setMarkerPosition] = useState(location);
    const [mapZoom, setMapZoom] = useState(12);

    const [formVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        house: "",
        area: "",
        directions: "",
        saveAs: "Home",
        otherLabel: "",
        alternatePhone: "",
    });

    const autocompleteService = useRef(null);

    useEffect(() => {
        if (isLoaded && !autocompleteService.current) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
        }
    }, [isLoaded]);

    const handleAddressChange = (e) => {
        const value = e.target.value;
        setAddress(value);

        if (value && autocompleteService.current) {
            autocompleteService.current.getPlacePredictions(
                { input: value },
                (predictions, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        setSuggestions(predictions || []);
                    } else {
                        setSuggestions([]);
                    }
                }
            );
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setAddress(suggestion.description);
        setSuggestions([]);
        setFormVisible(true);

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: suggestion.description }, (results, status) => {
            if (status === "OK" && results[0]) {
                const location = results[0].geometry.location;
                const newLocation = {
                    lat: location.lat(),
                    lng: location.lng(),
                };

                setLocation(newLocation);
                setMarkerPosition(newLocation);
                setMapZoom(19);
            }
        });
    };

    const handleMapClick = useCallback((event) => {
        const latLng = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        setMarkerPosition(latLng);
        setMapZoom(19);

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === "OK" && results[0]) {
                setAddress(results[0].formatted_address);
                setFormVisible(true);
            }
        });
    }, []);

    const handleMarkerDragEnd = (e) => {
        const latLng = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        };
        setMarkerPosition(latLng);

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === "OK" && results[0]) {
                setAddress(results[0].formatted_address); // Update address state
                setFormVisible(true); // Ensure form visibility
            } else {
                console.error("Geocoder failed due to: ", status);
                alert("Unable to retrieve address. Please try again.");
            }
        });
    };

    const handleCurrentLocation = () => {
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const currentLocation = { lat: latitude, lng: longitude };
                setLocation(currentLocation);
                setMarkerPosition(currentLocation);
                setMapZoom(19);

                const geocoder = new window.google.maps.Geocoder();
                geocoder.geocode({ location: currentLocation }, (results, status) => {
                    if (status === "OK" && results[0]) {
                        setAddress(results[0].formatted_address);
                        setFormVisible(true);
                    }
                });
            },
            (error) => {
                console.error("Error fetching location:", error.message);
                alert("Unable to fetch location.");
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    const options = [
        { label: "Home", icon: <FaHome /> },
        { label: "Work", icon: <FaBriefcase /> },
        { label: "Other", icon: <FaEllipsisH /> },
    ];

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSaveAddress = () => {
        const completeData = {
            address,
            ...formData,
        };
        console.log("Complete Address Data:", completeData);
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="bg-gradient-to-r from-pink-50 to-yellow-50 pt-5">
            <NavigateBack className="pl-3" />
           <div className="bg-white rounded-3xl p-5 min-h-screen flex flex-col gap-4 transition-all duration-300">
             {/* Search Section */}
             <div className="relative animate-fadeIn">
                <input
                    type="text"
                    placeholder="Search location..."
                    value={address}
                    onChange={handleAddressChange}
                    className="border border-gray-300 rounded-full py-3 pl-[2.8rem] pr-4 w-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 shadow-sm hover:shadow-md transition-shadow duration-300"
                />
                <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400">
                    <FaSearch className="w-5 h-5" />
                </div>
                {address && (
                    <button
                        onClick={() => setAddress('')}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                )}
                {suggestions.length > 0 && (
                    <ul className="absolute z-10 bg-white border rounded shadow mt-1 w-full max-h-60 overflow-y-auto transition-all duration-200">
                        {suggestions.map((suggestion) => (
                            <li
                                key={suggestion.place_id}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="p-3 hover:bg-gray-200 cursor-pointer transition-all duration-150"
                            >
                                {suggestion.description}
                            </li>
                        ))}
                    </ul>
                )}
            </div>



            {/* Map Section */}
            <div className="h-80 rounded overflow-hidden shadow relative animate-fadeIn">
                <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    zoom={mapZoom}
                    center={location}
                    onClick={handleMapClick}
                >
                    <Marker
                        position={markerPosition}
                        draggable
                        onDragEnd={handleMarkerDragEnd}
                        icon={{
                            url: locationImg,
                            scaledSize: new window.google.maps.Size(60, 60),
                        }}
                    />
                </GoogleMap>
                <button
                    onClick={handleCurrentLocation}
                    className="absolute bottom-4 right-14 flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition-all duration-200"
                >
                    <MdMyLocation /> Use Current Location
                </button>
            </div>

            {/* Selected Address Card */}
            {address && (
                <div className="bg-blue-50 pt-5 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800">Selected Address:</h3>
                    <p className="text-gray-600">{address}</p>
                </div>
            )}

            {/* Form Section */}
            {formVisible && (
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">House/Flat/Block No.</label>
                        <input
                            type="text"
                            name="house"
                            value={formData.house}
                            onChange={handleFormChange}
                            className="w-full px-3 py-[7px] border-[1px] rounded-md shadow-sm focus:ring-2 focus:outline-none focus:ring-blue-500 focus:border-0 border-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Apartment/Road/Area</label>
                        <input
                            type="text"
                            name="area"
                            value={formData.area}
                            onChange={handleFormChange}
                            className="w-full px-3 py-[7px] border-[1px] rounded-md shadow-sm focus:ring-2 focus:outline-none focus:ring-blue-500 focus:border-0 border-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Directions to Reach</label>
                        <textarea
                            type="text"
                            name="directions"
                            value={formData.directions}
                            onChange={handleFormChange}
                            className="w-full px-3 py-[7px] border-[1px] rounded-md shadow-sm focus:ring-2 focus:outline-none focus:ring-blue-500 focus:border-0 border-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Save As</label>
                        <div className="flex space-x-2">
                            {options.map(({ label, icon }) => (
                                <button
                                    key={label}
                                    type="button"
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-full border-[1px] text-sm ${formData.saveAs === label
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "bg-white text-gray-700 border-gray-400"
                                        } shadow-sm focus:outline-none`}
                                    onClick={() =>
                                        setFormData((prev) => ({ ...prev, saveAs: label }))
                                    }
                                >
                                    {icon}
                                    <span>{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {formData.saveAs === "Other" && (
                        <>
                            <div>
                                <label className="block text-gray-700 mb-1">Save As (Label)</label>
                                <input
                                    type="text"
                                    name="otherLabel"
                                    value={formData.otherLabel}
                                    onChange={handleFormChange}
                                    className="w-full px-3 py-[7px] border-[1px] rounded-md shadow-sm focus:ring-2 focus:outline-none focus:ring-blue-500 focus:border-0 border-gray-400"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Alternate Phone Number</label>
                                <input
                                    type="text"
                                    name="alternatePhone"
                                    value={formData.alternatePhone}
                                    onChange={handleFormChange}
                                    className="w-full px-3 py-[7px] border-[1px] rounded-md shadow-sm focus:ring-2 focus:outline-none focus:ring-blue-500 focus:border-0 border-gray-400"
                                />
                            </div>
                        </>
                    )}
                    <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={handleSaveAddress}
                        className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition-all duration-200"
                    >
                        Save Address
                    </button>
                    </div>
                </form>
            )}
           </div>
        </div>
    );
};

export default AddAddress;