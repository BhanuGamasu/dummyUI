import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { FaStar, FaStarHalfAlt, FaChevronDown, FaShoppingCart, FaShareAlt } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { motion } from "framer-motion";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import dataService from "../../dataService";

import img from "../../../src/img.jpg";
import img2 from "../../../src/img2.jpg";

const CustomerProductOverview = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [selectedWeight, setSelectedWeight] = useState("250gms");
    const [isFavorite, setIsFavorite] = useState(false);
    const [bubbles, setBubbles] = useState([]); // To store animated small hearts

    const { id } = useParams(); // Retrieve the product ID from URL
    const [product, setProduct] = useState(null); // State for product data
    const [loading, setLoading] = useState(true); // State for loading
    const [totalPrice, setTotalPrice] = useState(0); // State for total price
    const [originalPrice, setOriginalPrice] = useState();
    const [discountPrice, setDiscountPrice] = useState();

    // Fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await dataService.getProductById(id); // Adjust method name accordingly
                console.log(fetchedProduct, "productttttttttt");

                setProduct(fetchedProduct);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (product) {
            let weightMultiplier = 1;
            if (selectedWeight === "500gms") {
                weightMultiplier = 2; // Adjust this multiplier based on your pricing rules
            } else if (selectedWeight === "1 kg") {
                weightMultiplier = 4; // Adjust this multiplier based on your pricing rules
            }

            // Update price only based on weight
            const updatedDiscountPrice = product.discountPrice * weightMultiplier;
            const updatedOrginalPrice = product.originalPrice * weightMultiplier;
            setDiscountPrice(updatedDiscountPrice);
            setOriginalPrice(updatedOrginalPrice)
        }
    }, [selectedWeight, product]); // Only trigger when selectedWeight or product changes

    useEffect(() => {
        if (product && selectedWeight) {
            let weightMultiplier = 1;
            if (selectedWeight === "500gms") {
                weightMultiplier = 2; // Adjust this multiplier based on your pricing rules
            } else if (selectedWeight === "1 kg") {
                weightMultiplier = 4; // Adjust this multiplier based on your pricing rules
            }

            const newTotalPrice = product.discountPrice * quantity * weightMultiplier;
            setTotalPrice(newTotalPrice); // Update total price based on quantity and weight

            // Store the total price for future use (you can store it in a variable or local storage if needed)
            // Example: You can store it in a Redux store or context if needed
            console.log("Total Price for future use:", newTotalPrice);
        }
    }, [quantity, selectedWeight, product]);


    if (loading) {
        return <p>Loading product details...</p>; // Show loading state
    }

    if (!product) {
        return <p>Product not found.</p>; // Handle no product case
    }

    const similarProducts = [
        {
            name: "Best Seller 1",
            imageUrl: img,
            originalPrice: 500,
            discountPrice: 450,
            label: "Best Seller",
        },
        {
            name: "Best Seller 2",
            imageUrl: img2,
            originalPrice: 400,
            discountPrice: 350,
            label: "Top Rated",
        },
        {
            name: "Best Seller 3",
            imageUrl: img,
            originalPrice: 600,
            discountPrice: 550,
            label: "Trending",
        },
        {
            name: "Best Seller 4",
            imageUrl: img2,
            originalPrice: 800,
            discountPrice: 700,
            label: "Must Buy",
        },
        {
            name: "Best Seller 5",
            imageUrl: img,
            originalPrice: 500,
            discountPrice: 450,
            label: "Best Seller",
        },
        {
            name: "Best Seller 6",
            imageUrl: img2,
            originalPrice: 400,
            discountPrice: 350,
            label: "Top Rated",
        },
        {
            name: "Best Seller 7",
            imageUrl: img,
            originalPrice: 600,
            discountPrice: 550,
            label: "Trending",
        },
        {
            name: "Best Seller 8",
            imageUrl: img2,
            originalPrice: 800,
            discountPrice: 700,
            label: "Must Buy",
        },
    ];

    const incrementQuantity = () => setQuantity(quantity + 1);
    const decrementQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleWeightSelect = (weight) => {
        setSelectedWeight(weight); // Set the selected weight
    };

    const handleSubmit = () => {
        // Print the selected form data to console
        navigate("/buyNow");
        console.log("Selected Quantity:", quantity);
        console.log("Selected Weight:", selectedWeight);
    };

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
        setBubbles([
            { id: Date.now() + 1, direction: -1 },
            { id: Date.now() + 2, direction: 1 },
        ]);

        // Log the favorite status to the console
        if (!isFavorite) {
            console.log("Selected Fav"); // Log if the heart is selected
        } else {
            console.log("Not Selected Fav"); // Log if the heart is deselected
        }
    };

    return (
        <div className="p-6 bg-gradient-to-r from-pink-50 to-yellow-50 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Carousel Section */}
                <div className="carousel w-full md:w-1/2 relative">
                    <Swiper
                        modules={[Pagination, Navigation]}
                        pagination={{ clickable: true }}
                        navigation
                        loop={true}
                        className="w-full h-80 md:h-[100%] rounded-lg overflow-hidden shadow-lg"
                    >
                        {product.images && Array.isArray(product.images) && product.images.map((pic, index) => (
                            <SwiperSlide key={index}>
                                <img src={pic} alt={`Product Image ${index + 1}`} className="w-full h-full object-cover" />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Share Icon */}
                    <motion.div
                        className="absolute top-4 right-4 p-3 rounded-full bg-gray-800 bg-opacity-50 text-white z-10 cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaShareAlt className="text-2xl" />
                    </motion.div>
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2">
                    <h1 className="text-4xl font-bold mb-3 text-gray-800">{product.name}</h1>
                    <p className="text-lg sm:text-2xl text-gray-500 line-through">
                        &#8377; {originalPrice}
                    </p>
                    <p className="text-lg sm:text-2xl text-pink-600 font-semibold mb-3">
                        &#8377; {discountPrice}{" "}
                        <span className="text-gray-400">
                            ({((product.originalPrice - product.discountPrice) / product.originalPrice * 100).toFixed(0)}% off)
                        </span>
                    </p>
                    <div className="flex items-center text-yellow-500 mb-3">
                        {Array.from({ length: product.rating.fullStars }, (_, i) => <FaStar key={i} />)}
                        {product.rating.halfStar && <FaStarHalfAlt />}
                        <span className="ml-2 text-blue-600">({product.reviewsCount} reviews)</span>
                    </div>
                    <p className="text-gray-600 mb-4">Any 4 chocolates of your choice from Dairy Milk Silk Bubbly 120g, Dairy Milk Silk Fruit & Nut 137g, Dairy Milk Silk Oreo 130g, Dairy Milk Silk Oreo Red Velvet, 130g, Dairy Milk Silk Hazelnut 143g, Dairy Milk Silk Roast Almond 143g, Dairy Milk Silk Mousse, 116g and Dairy Milk Silk Plain Chocolate 150g.</p>

                    {/* Weight Selection */}
                    <div className="flex gap-2 mb-6">
                        {["250gms", "500gms", "1 kg"].map((weightOption) => (
                            <button
                                key={weightOption}
                                onClick={() => handleWeightSelect(weightOption)}
                                className={`px-6 py-2 rounded-3xl text-lg font-semibold transition-all duration-200 ease-in-out focus:outline-none ${selectedWeight === weightOption
                                    ? "bg-pink-500 text-white"
                                    : "bg-gray-200 text-gray-800 hover:bg-pink-100"
                                    }`}
                            >
                                {weightOption}
                            </button>
                        ))}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center mb-6 bg-gray-100 rounded-lg shadow-md overflow-hidden max-w-max">
                        <button
                            onClick={decrementQuantity}
                            className="text-lg px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 border-r border-gray-300 text-gray-700 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 hover:text-gray-900 rounded-l-lg transition-all duration-200 ease-in-out transform active:scale-95"
                        >
                            –
                        </button>
                        <span className="text-lg px-4 py-1 bg-white text-gray-800 border-gray-200 font-semibold">
                            {quantity}
                        </span>
                        <button
                            onClick={incrementQuantity}
                            className="text-lg px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 border-l border-gray-300 text-gray-700 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 hover:text-gray-900 rounded-r-lg transition-all duration-200 ease-in-out transform active:scale-95"
                        >
                            +
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mb-6">
                        {/* Love Icon with Sparkles */}
                        <motion.button
                            onClick={handleFavoriteClick}
                            className={`relative text-4xl transition duration-300 ease-in-out transform ${isFavorite ? "text-red-500 scale-110" : "text-gray-600"
                                }`}
                            whileTap={{ scale: 0.9 }} // Scale down when clicked
                        >
                            {/* Conditional Icon Rendering */}
                            {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}

                            {/* Small Love Bubbles */}
                            {bubbles.map((bubble) => (
                                <motion.div
                                    key={bubble.id}
                                    className="absolute top-0 left-1/2 transform -translate-x-1/2"
                                    initial={{ opacity: 1, y: 0, scale: 0.5, x: 0 }}
                                    animate={{
                                        opacity: 0,
                                        y: -30,
                                        x: bubble.direction * 30,
                                        scale: 1,
                                        transition: {
                                            duration: 2,
                                            ease: "easeInOut",
                                        },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -50,
                                    }}
                                >
                                    <AiFillHeart className="text-red-300 text-xl" />
                                </motion.div>
                            ))}
                        </motion.button>

                        {/* Add to Cart with Cart Logo */}
                        <button
                            onClick={() => dispatch(addToCart(product))}
                            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
                        >
                            <FaShoppingCart className="text-lg" />
                            <span>Add to Cart</span>
                        </button>

                        {/* Buy Now with Pink Background */}
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
                        >
                            Buy Now
                        </button>
                    </div>

                    {/* Return and Manufacturer Details Card */}
                    <div className="p-4 border rounded-lg shadow-md bg-gray-100">
                        <h3 className="font-semibold mb-2 text-gray-800">Shipping Details</h3>
                        <p className="text-gray-600">
                            Free shipping all over India
                        </p>
                        <h3 className="font-semibold mt-4 mb-2 text-gray-800">Return Policy</h3>
                        <p className="text-gray-600">7-day return available</p>
                        {/* <p className="text-gray-600">CIN: U51109KA2012PTC066107</p>
                        <p className="text-gray-600">Telephone: 044-45614700 / 044-67415800</p> */}
                    </div>

                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between">

                {/* Ratings and Reviews Card */}
                <div className="w-full md:w-[50%] md:pb-4 pt-4 relative">
                    <h3 className="font-semibold mb-2 text-gray-800">Ratings & Reviews</h3>
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
                        {/* Ratings Content */}
                        <motion.div
                            className="flex flex-col lg:flex-row items-center mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-gray-800 w-full lg:w-2/3 text-center">
                                <h3 className="text-xl font-bold text-gray-900">Very Good</h3>
                                <div className="flex items-center justify-center text-green-400 mb-1 mt-1">
                                    {Array.from({ length: 4 }, (_, i) => (
                                        <FaStar key={i} className="text-green-400" />
                                    ))}
                                    <FaStarHalfAlt className="text-green-400" />
                                </div>
                                <p className="text-lg font-semibold text-gray-800">
                                    4.0 out of 5.0
                                </p>
                                <p className="text-sm text-gray-600">
                                    {product.reviewsCount} ratings and{" "}
                                    {Math.ceil(product.reviewsCount / 12)} reviews
                                </p>
                            </div>
                            <motion.button
                                className="mt-4 lg:mt-0 px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-400 text-white font-semibold rounded-full shadow-md hover:scale-105 transition-transform duration-300"
                                whileHover={{ scale: 1.05 }}
                            >
                                Rate Product
                            </motion.button>
                        </motion.div>

                        {/* Star Rating Breakdown */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.entries(product.ratingsBreakdown)
                                .sort((a, b) => b[0] - a[0]) // Sort by star ratings from 5* to 1*
                                .map(([star, count]) => (
                                    <motion.div
                                        key={star}
                                        className="flex items-center space-x-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="flex items-center space-x-1 text-gray-700 font-medium text-sm">
                                            <div style={{ fontSize: "18px" }}>{star}</div>
                                            <FaStar className="text-green-400" />
                                        </div>
                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-green-400 to-green-300 h-2 rounded-full"
                                                style={{
                                                    width: `${(count / product.reviewsCount) * 100}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{count}</span>
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-[48.5%] py-6">
                    {/* Accordion Sections */}
                    <Accordion allowZeroExpanded className="space-y-3">
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton className="flex justify-between items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-medium rounded-bl-none rounded-br-none">
                                    Materials <FaChevronDown className="text-gray-600" />
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="px-4 py-2 text-gray-600 bg-white rounded-lg border border-gray-200 shadow-sm rounded-tl-none rounded-tr-none border-t-0">
                                <p>{product.materials}</p>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton className="flex justify-between items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-medium rounded-bl-none rounded-br-none">
                                    Instructions <FaChevronDown className="text-gray-600" />
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="px-4 py-2 text-gray-600 bg-white rounded-lg border border-gray-200 shadow-sm rounded-tl-none rounded-tr-none border-t-0">
                                <p>{product.instructions}</p>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton className="flex justify-between items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-medium rounded-bl-none rounded-br-none">
                                    Full Details <FaChevronDown className="text-gray-600" />
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="px-4 py-2 text-gray-600 bg-white rounded-lg border border-gray-200 shadow-sm rounded-tl-none rounded-tr-none border-t-0">
                                <p>{product.fullDetails}</p>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton className="flex justify-between items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-medium rounded-bl-none rounded-br-none">
                                    Ingrediants <FaChevronDown className="text-gray-600" />
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="px-4 py-2 text-gray-600 bg-white rounded-lg border border-gray-200 shadow-sm rounded-tl-none rounded-tr-none border-t-0">
                                <p>{product.ingrediants}</p>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton className="flex justify-between items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-medium rounded-bl-none rounded-br-none">
                                    Uses <FaChevronDown className="text-gray-600" />
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="px-4 py-2 text-gray-600 bg-white rounded-lg border border-gray-200 shadow-sm rounded-tl-none rounded-tr-none border-t-0">
                                <p>{product.uses}</p>
                            </AccordionItemPanel>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>




            {/* Similar Products Section */}
            <div className="w-full">
                <h2 className="text-3xl font-semibold text-pink-600 mb-4">Similar Products</h2>

                {/* Similar Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {similarProducts.map((product, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden p-3 transition-transform transform hover:scale-105 cursor-pointer relative"
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-40 sm:h-48 object-cover mb-3"
                            />
                            <h3 className="text-sm sm:text-lg font-semibold">{product.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-500 line-through">
                                &#8377; {product.originalPrice}
                            </p>
                            <p className="text-xs sm:text-sm text-pink-600 font-semibold">
                                &#8377; {product.discountPrice}{" "}
                                <span className="text-gray-400">
                                    ({((product.originalPrice - product.discountPrice) / product.originalPrice * 100).toFixed(0)}% off)
                                </span>
                            </p>
                            {/* <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-600 font-semibold rounded-full text-xs sm:text-sm mx-auto">
                                {product.label}
                            </span> */}
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-5">
                    <button
                        className="px-6 py-2 bg-gradient-to-r from-green-400 to-blue-400 text-white font-semibold rounded-full shadow-md 
                                transform transition duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg"
                    >
                        Show more
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomerProductOverview;
