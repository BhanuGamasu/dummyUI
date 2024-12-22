import React, { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const NavigateBack = ({ label = "Back", className = "", target = null }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (target) {
            navigate(target); // Navigate to the specified target
        } else {
            navigate(-1); // Navigate to the previous page
        }
    };

    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
    }, []);

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
