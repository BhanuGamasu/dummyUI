import React from "react";

const ProfileHeader = ({ name, details, phone, onChangeAddress }) => {
    return (
        <div className="flex items-center p-2 px-4 bg-white shadow-md">
            <div className="flex-shrink-0">
                <div className="w-9 h-9 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold">{name.charAt(0)}</span>
                </div>
            </div>
            <div className="ml-4 flex-grow">
                <p className="text-[14px] font-semibold text-gray-800">{name}</p>
                <p className="text-[12px] text-gray-600 line-clamp-1">{details}</p>
                {/* <p className="text-sm text-gray-600">{phone}</p> */}
            </div>
            <button
                onClick={onChangeAddress}
                className="text-[12px] font-semibold text-white bg-gradient-to-r from-gray-400 to-gray-600 py-1.5 px-3 rounded-lg shadow-md hover:from-gray-500 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 ml-4"
            >
                Change
            </button>
        </div>
    );
};

export default ProfileHeader;