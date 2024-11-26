import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const NavigateBack = ({ label = "Back", className = "" }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <div className="flex justify-between">
            <div className={`flex items-center mb-4 cursor-pointer ${className}`} onClick={handleBack}>
                <IoIosArrowBack className="text-2xl mr-1" />
                <h1 className="text-xl font-semibold">{label}</h1>
            </div>
            <div></div>
        </div>
    );
};

export default NavigateBack;
