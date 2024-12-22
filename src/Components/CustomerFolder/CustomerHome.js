import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import dataService from "../../dataService";

const CustomerHome = () => {

    const [carouselImages, setCarouselImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [specialProducts, setSpecialProducts] = useState([]);
    const [bestSellingProducts, setBestSellingProducts] = useState([]);
    const [occasionPacks, setOccasionPacks] = useState([]);

    useEffect(() => {
        const allData = dataService.getAllData();

        setCarouselImages(allData.filter((item) => item.type === "carouselImage"));
        setCategories(allData.filter((item) => item.type === "category"));
        setSpecialProducts(allData.filter((item) => item.type === "specialProduct11"));
        setBestSellingProducts(allData.filter((item) => item.type === "bestSellingProduct"));
        setOccasionPacks(allData.filter((item) => item.type === "occasionPack"));
    }, []);

    const navigate = useNavigate();

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };


    return (
        <div>
            <div className="flex flex-col items-center">
                {/* Carousel Section */}
                <div className="carousel w-full overflow-hidden relative">
                    <Swiper
                        modules={[Pagination, Navigation, Autoplay]}
                        pagination={{ clickable: true }}
                        navigation
                        loop={true}
                        autoplay={{
                            delay: 1500,
                            disableOnInteraction: false,
                        }}
                        speed={900}
                        className="w-full h-80 md:h-[500px]"
                    >
                        {carouselImages.map((image, index) => (
                            <SwiperSlide key={index} className="relative group">
                                <div className="relative h-80 md:h-[500px] overflow-hidden">
                                    <img
                                        src={image.url}
                                        alt={`Carousel ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-90"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Categories Section */}
            <div className="w-full py-6 px-4 bg-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold text-pink-600">Categories</h2>
                    <FaAngleDoubleRight className="text-pink-600 text-2xl" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            {/* Image */}
                            <img
                                src={category.imageUrl}
                                alt={category.name}
                                className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                            />

                            {/* Overlay and Category Name */}
                            <div className="absolute inset-0 group-hover:transition-all duration-300"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t to-transparent from-gray-600 text-white text-center transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white">{category.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Special Products Section */}
            <div className="w-full py-6 px-4 relative bg-pink-100 mt-4">
                {/* Teeth-like design on top */}
                <div className="absolute top-0 left-0 right-0 w-full bg-pink-100 z-10">
                    <div className="w-full h-full bg-teeth-pattern bg-repeat-x"></div>
                </div>

                <div className="relative z-20">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-semibold text-pink-600">Our Special Products</h2>
                        <FaAngleDoubleRight className="text-pink-600 text-2xl" />
                    </div>

                    {/* Responsive grid layout */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {specialProducts.map((product) => (
                            <div onClick={() => handleProductClick(product.id)}
                                key={product.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden p-3 transition-transform transform hover:scale-105 cursor-pointer"
                            >
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-40 sm:h-48 object-cover mb-3" // Adjust height for mobile
                                />
                                <h3 className="text-sm sm:text-lg font-semibold">{product.name}</h3>
                                <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-1">250gms</p>
                                <div className="flex items-center space-x-2">
                                    <p className="text-xs sm:text-sm text-gray-500 line-through">
                                        &#8377;{product.originalPrice}
                                    </p>
                                    <p className="text-sm sm:text-lg text-pink-600 font-semibold">
                                        &#8377;{product.discountPrice} <span className="text-gray-400">({((product.originalPrice - product.discountPrice) / product.originalPrice * 100).toFixed(0)}% off)</span>
                                    </p>
                                </div>
                                <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-600 font-semibold rounded-full text-xs sm:text-sm mx-auto">
                                    {product.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Best Selling Products Section */}
            <div className="w-full py-6 px-4 bg-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold text-pink-600">Best Selling Products</h2>
                    <FaAngleDoubleRight className="text-pink-600 text-2xl" />
                </div>

                {/* Best Selling Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {bestSellingProducts.map((product, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden p-3 transition-transform transform hover:scale-105 cursor-pointer relative"
                        >
                            {/* Status Label Reuse */}
                            {product.label && (
                                <div>
                                    <div
                                        className={`absolute top-4 -left-1 shadow-[4px_0px_6px_rgba(0,0,0,0.3)] rounded-full rounded-l-sm px-4 py-1 text-sm font-semibold text-white ${product.label === "Best Seller"
                                            ? "bg-pink-600"
                                            : product.label === "Top Rated"
                                                ? "bg-blue-600"
                                                : product.label === "Trending"
                                                    ? "bg-green-600"
                                                    : product.label === "Must Buy"
                                                        ? "bg-red-600"
                                                        : "bg-gray-500"
                                            }`}
                                    >
                                        {product.label}
                                    </div>
                                </div>
                            )}

                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-40 sm:h-48 object-cover mb-3"
                            />
                            <h3 className="text-sm sm:text-lg font-semibold">{product.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-1">250gms</p>
                            <div className="flex items-center space-x-2">
                                <p className="text-xs sm:text-sm text-gray-500 line-through">
                                    &#8377;{product.originalPrice}
                                </p>
                                <p className="text-sm sm:text-lg text-pink-600 font-semibold">
                                    &#8377;{product.discountPrice}{" "}
                                    <span className="text-gray-400">
                                        ({((product.originalPrice - product.discountPrice) / product.originalPrice * 100).toFixed(0)}% off)
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Unique Occasion Packs Section */}
            <div className="w-full py-8 px-6 bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 relative">
                <div className="absolute inset-0 opacity-10 pointer-events-none"></div>

                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-semibold text-yellow-700 tracking-wider">Occasion Packs</h2>
                    <FaAngleDoubleRight className="text-yellow-700 text-2xl" />
                </div>

                {/* Occasion Packs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {occasionPacks.map((pack, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-2xl overflow-hidden p-5 transform transition duration-700 ease-in-out hover:scale-105 hover:shadow-3xl cursor-pointer border-2 border-yellow-200"
                        >
                            {/* Image with Hover Animation */}
                            <div className="relative overflow-hidden rounded-lg mb-4 transition-all duration-500 group-hover:scale-105">
                                <img
                                    src={pack.imageUrl}
                                    alt={pack.name}
                                    className="w-full h-48 object-cover transition-transform duration-500 transform group-hover:scale-110 group-hover:opacity-90"
                                />
                                <div className="absolute inset-0 bg-yellow-200 opacity-0 group-hover:opacity-10 transition duration-500"></div>
                            </div>

                            {/* Product Details */}
                            <h3 className="text-lg font-bold text-gray-700 mb-2">{pack.name}</h3>
                            <p className="text-sm sm:text-[16px] text-gray-600 font-semibold mb-1">250gms</p>
                            <div className="flex items-center space-x-2">
                            <div className="text-sm text-gray-500 line-through">
                                &#8377;{pack.originalPrice}
                            </div>
                            <div className="text-lg font-semibold text-yellow-600">
                                &#8377;{pack.discountPrice}{" "}
                                <span className="text-gray-400 text-sm">
                                    ({((pack.originalPrice - pack.discountPrice) / pack.originalPrice * 100).toFixed(0)}% off)
                                </span>
                            </div>
                            </div>

                            {/* Label with Animation */}
                            <span className="inline-block mt-4 px-4 py-2 bg-yellow-600 text-white font-semibold rounded-full text-xs sm:text-sm mx-auto animate-bounce">
                                {pack.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default CustomerHome;
