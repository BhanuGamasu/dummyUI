import React from "react";

const Address = ({ name, details, phone, onChangeAddress }) => {

    return (
        <div className="flex p-4 mt-6 bg-gray-50 rounded-lg shadow-md">
            <div>
                <div className="flex items-center">
                    <p className="text-lg text-gray-800">Delivery Address</p>
                    <button
                        onClick={onChangeAddress}
                        className="text-sm font-semibold text-white bg-gradient-to-r from-gray-400 to-gray-600 py-2 px-4 rounded-lg shadow-md hover:from-gray-500 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 ml-3"
                    >
                        Change Address
                    </button>
                </div>
                <p className="text-lg font-semibold text-gray-800">{name}</p>
                <p className="text-sm text-gray-600">{details}</p>
                <p className="text-sm text-gray-600">{phone}</p>
            </div>
        </div>
    );
};

export default Address;
