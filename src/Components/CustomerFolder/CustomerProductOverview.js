import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { FaStar, FaStarHalfAlt, FaChevronDown, FaShoppingCart, FaShareAlt } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import NavigateBack from "../../Components/NavigateBack";
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
import RateProductPopup from "../RateProductPopup";
import SnackBar from "../SnackBar";

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
    const [isInCart, setIsInCart] = useState(false); // Tracks if the item is in the cart
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");

    const [selectedReview, setSelectedReview] = useState(null);
    const [isFullReviewVisible, setIsFullReviewVisible] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const reviewRef = useRef(null);

    const reviews = [
        {
            id: 1,
            user: "Alice",
            rating: 5,
            comment: "Amazing product! Highly recommend product!",
            images: [img2, img, img2, img]
        },
        {
            id: 2,
            user: "Bob",
            rating: 4,
            comment: "Good quality Amazing product but delivery was late.",
            images: [img2, img]
        },
        {
            id: 3,
            user: "Frank",
            rating: 2,
            comment: "Amazing product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend.Amazing product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend.Amazing product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend.Amazing product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend product! Highly recommend.",
            images: [img2, img]
        },
    ];

    // Detect if the review text is overflowing
    useEffect(() => {
        if (selectedReview && reviewRef.current) {
            const isTextOverflowing =
                reviewRef.current.scrollHeight > reviewRef.current.clientHeight;
            setIsOverflowing(isTextOverflowing);
        }
    }, [selectedReview, isFullReviewVisible]);


    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
    }, []);

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

    // Function to open the modal with the selected review
    const openReviewModal = (review) => {
        setSelectedReview(review);
        setIsFullReviewVisible(false); // Reset the full review visibility
    };

    // Function to close the modal
    const closeReviewModal = () => {
        setSelectedReview(null);
        setIsFullReviewVisible(false);
    };

    const incrementQuantity = () => setQuantity(quantity + 1);
    const decrementQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleWeightSelect = (weight) => {
        setSelectedWeight(weight); // Set the selected weight
    };

    const handleAddToCart = () => {
        // Create an object with all the required product details
        const cartItem = {
            product,          // The full product object
            quantity,         // Selected quantity
            selectedWeight,   // Selected weight option
            originalPrice,    // Price before discount
            discountPrice,    // Price after discount
            totalPrice        // Total calculated price
        };

        // Dispatch the addToCart action with the cartItem object
        dispatch(addToCart(cartItem));
        setSnackBarMessage("Added to Cart!");
        setIsSnackBarVisible(true);
        console.log(cartItem, "cartttttttttttttttttttttt");


        setIsInCart(true); // Update state to indicate the item is in the cart

        // setTimeout(() => {
        //     // Optional: navigate to the cart page after some delay
        //     navigate("/cart");
        // }, 1500); // Adjust delay as needed
    };

    const handleSubmit = () => {
        // Navigate with state
        navigate("/buyNow", {
            state: {
                product,
                quantity,
                selectedWeight,
                originalPrice,
                discountPrice,
                totalPrice
            }
        });
        console.log("Selected Product:", totalPrice);
        console.log("Selected Quantity:", quantity);
        console.log("Selected Weight:", selectedWeight);
        console.log("Selected Product:", product);
        console.log("Discount Price:", discountPrice);
        console.log("Orginal Price:", originalPrice);
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

    const productDetails = {
        title: "🌟 Amazing Product 🌟",
        description: "🔥 This product is perfect for your daily needs! Highly recommended. 🔥",
        link: "https://example.com/product/12345",
        image: "https://example.com/product-image.jpg",
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                // Web Share API for supported devices
                await navigator.share({
                    title: productDetails.title,
                    text: `${productDetails.description}\n\n🌐 Check it out here: ${productDetails.link}`,
                });
                console.log("Product shared successfully!");
            } catch (error) {
                console.error("Error sharing the product:", error);
            }
        } else {
            // Fallback for WhatsApp sharing
            const message = `📌 *${productDetails.title}*\n\n${productDetails.description}\n\n🌐 Link: ${productDetails.link}\n🖼️ Image: ${productDetails.image}`;
            const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, "_blank");
        }
    }

    return (
        <div className="p-5 bg-gradient-to-r from-[--primaryShade4] to-gray-50 rounded-lg shadow-lg">
            <NavigateBack />
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
                        onClick={handleShare}
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
                    <p className="text-lg sm:text-2xl text-[--primaryDarkShade1] font-semibold mb-3">
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
                    <p className="text-gray-600 mb-4 line-clamp-3">Any 4 chocolates of your choice from Dairy Milk Silk Bubbly 120g, Dairy Milk Silk Fruit & Nut 137g, Dairy Milk Silk Oreo 130g, Dairy Milk Silk Oreo Red Velvet, 130g, Dairy Milk Silk Hazelnut 143g, Dairy Milk Silk Roast Almond 143g, Dairy Milk Silk Mousse, 116g and Dairy Milk Silk Plain Chocolate 150g.</p>

                    {/* Weight Selection */}
                    <div className="flex gap-2 mb-6">
                        {["250gms", "500gms", "1 kg"].map((weightOption) => (
                            <button
                                key={weightOption}
                                onClick={() => handleWeightSelect(weightOption)}
                                className={`px-6 py-2 rounded-3xl text-lg font-semibold transition-all duration-200 ease-in-out focus:outline-none ${selectedWeight === weightOption
                                    ? "bg-gradient-to-r from-[--primaryDarkShade1] to-[--primary] text-white"
                                    : "bg-gray-200 text-gray-800 hover:bg-[--primaryShade4]"
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

                        <motion.button
                            onClick={handleAddToCart}
                            className="px-6 py-3 border border-gray-400 text-gray-700 font-semibold rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                            whileTap={{ scale: 0.95 }} // Animation on click
                        // animate={{
                        //     backgroundColor: isInCart ? "#22c55e" : "#fff", // Animate color
                        //     color: isInCart ? "#fff" : "#374151", // Animate text color
                        //     scale: isInCart ? 1.1 : 1, // Slightly enlarge when in cart
                        // }}
                        >
                            <FaShoppingCart className="text-lg" />
                            {/* <span>{isInCart ? "Go to Cart" : "Add to Cart"}</span> */}
                            <span>Add to Cart</span>
                        </motion.button>

                        {/* Buy Now with Pink Background */}
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-3 bg-gradient-to-r from-[--primaryDarkShade1] to-[--primaryDarkShade1] text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
                        >
                            Buy Now
                        </button>
                    </div>

                    {/* Return and Manufacturer Details Card */}
                    <div className="p-4 border rounded-lg shadow-md bg-gray-50">
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
                    {/* <h3 className="font-semibold mb-2 text-gray-800">Ratings & Reviews</h3> */}
                    <div className="bg-white p-7 rounded-lg shadow-md border border-gray-100">
                        {/* Ratings Content */}
                        <motion.div
                            className="flex flex-col lg:flex-row items-center mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-gray-800 w-full lg:w-2/3 text-center">
                                <h3 className="text-xl font-bold text-gray-900">Very Good</h3>
                                <div className="flex items-center justify-center text-[--primaryDarkShade1] mb-1 mt-1">
                                    {Array.from({ length: 4 }, (_, i) => (
                                        <FaStar key={i} className="text-[--primaryDarkShade1]" />
                                    ))}
                                    <FaStarHalfAlt className="text-[--primaryDarkShade1]" />
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
                                className="mt-4 lg:mt-0 px-6 py-2 bg-gradient-to-r from-[--primaryDarkShade1] to-[--primary] text-white font-semibold rounded-full shadow-md hover:scale-105 transition-transform duration-300"
                                whileHover={{ scale: 1.05 }}
                                onClick={() => setIsPopupOpen(true)}
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
                                            <FaStar className="text-[--primaryDarkShade1]" />
                                        </div>
                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-[--primaryDarkShade1] via-[--primaryShade1] to-[--primaryShade2] h-2 rounded-full"
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

                    <RateProductPopup
                        isOpen={isPopupOpen}
                        onClose={() => setIsPopupOpen(false)}
                    />
                </div>

                <div className="w-full md:w-[48.5%] py-6">
                    {/* Accordion Sections */}
                    <Accordion allowZeroExpanded className="space-y-3">
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton className="flex justify-between items-center p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-medium rounded-bl-none rounded-br-none">
                                    Materials <FaChevronDown className="text-gray-600" />
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="px-4 py-2 text-gray-600 bg-white rounded-lg border border-gray-200 shadow-sm rounded-tl-none rounded-tr-none border-t-0">
                                <p>{product.materials}</p>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton className="flex justify-between items-center p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-medium rounded-bl-none rounded-br-none">
                                    Instructions <FaChevronDown className="text-gray-600" />
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="px-4 py-2 text-gray-600 bg-white rounded-lg border border-gray-200 shadow-sm rounded-tl-none rounded-tr-none border-t-0">
                                <p>{product.instructions}</p>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton className="flex justify-between items-center p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-medium rounded-bl-none rounded-br-none">
                                    Full Details <FaChevronDown className="text-gray-600" />
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="px-4 py-2 text-gray-600 bg-white rounded-lg border border-gray-200 shadow-sm rounded-tl-none rounded-tr-none border-t-0">
                                <p>{product.fullDetails}</p>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton className="flex justify-between items-center p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-medium rounded-bl-none rounded-br-none">
                                    Ingrediants <FaChevronDown className="text-gray-600" />
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="px-4 py-2 text-gray-600 bg-white rounded-lg border border-gray-200 shadow-sm rounded-tl-none rounded-tr-none border-t-0">
                                <p>{product.ingrediants}</p>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton className="flex justify-between items-center p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-medium rounded-bl-none rounded-br-none">
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



            {/* Redesigned Reviews Section */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-2xl shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {reviews.slice(0, 6).map((review) => (
                        <div
                            key={review.id}
                            onClick={() => openReviewModal(review)}
                            className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-start gap-4 cursor-pointer"
                        >
                            {/* User Image */}
                            <img
                                src={review.images[0]}
                                alt={`${review.user}'s review`}
                                className="w-24 h-24 rounded-full border-2 border-[--primary] object-cover"
                            />

                            {/* Review Content */}
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg text-gray-800">{review.user}</h3>
                                <p className="text-yellow-500 text-sm">
                                    {"⭐".repeat(review.rating)}{" "}
                                    <span className="text-gray-400">
                                        {"☆".repeat(5 - review.rating)}
                                    </span>
                                </p>
                                <p className="text-gray-600 mt-2 line-clamp-2">{review.comment}</p>
                                {review.comment.length > 100 && (
                                    <div className="flex justify-end mt-2">
                                        <button
                                            onClick={() => openReviewModal(review)}
                                            className="text-blue-500 text-sm font-medium hover:underline"
                                        >
                                            Read More
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show All Reviews Button */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => navigate("/allReviews")}
                        className="px-6 py-2 bg-gradient-to-r from-[--primary] to-[--primaryShade1] text-white font-semibold rounded-full shadow-md 
                                transform transition duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg"
                    >
                        Show All Reviews
                    </button>
                </div>
            </div>

            {/* Modal for full image and review */}
            {selectedReview && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={closeReviewModal}
                >
                    <div
                        className="relative bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[100%] mx-5 md:mx-0 overflow-hidden"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeReviewModal}
                            className="absolute top-2 right-2 z-10 bg-white text-red-500 border-2 border-red-500 p-1 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition duration-300 ease-in-out"
                        >
                            <IoClose />
                        </button>

                        {/* Image Section */}
                        <div className="relative w-full bg-gray-100 rounded-t-lg overflow-hidden">
                            {/* Large Image */}
                            <img
                                src={selectedImage || selectedReview.images[0]}
                                alt="Selected"
                                className="w-full max-h-72 object-contain"
                            />
                        </div>

                        {/* Thumbnail Section */}
                        <div className="flex justify-center gap-2 mt-2 p-4">
                            {selectedReview.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`Thumbnail ${idx + 1}`}
                                    className={`w-16 h-16 object-cover rounded cursor-pointer border-[3px] ${(selectedImage || selectedReview.images[0]) === img
                                        ? "border-[--primary]"
                                        : "border-transparent"
                                        }`}
                                    onClick={() => setSelectedImage(img)}
                                />
                            ))}
                        </div>

                        {/* Review Content */}
                        <div className="p-6 flex flex-col gap-4 overflow-auto max-h-[calc(80%-320px)]">
                            {/* User and Rating */}
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-lg text-gray-800">
                                    {selectedReview.user}
                                </p>
                                <p className="text-yellow-500 text-base">
                                    {"⭐".repeat(selectedReview.rating)}
                                </p>
                            </div>

                            {/* Scrollable Review Text */}
                            <div className="relative">
                                <div
                                    ref={reviewRef}
                                    className={`text-gray-700 text-sm leading-relaxed overflow-auto max-h-[200px] small-scrollbar ${isFullReviewVisible ? "" : "line-clamp-3"
                                        }`}
                                >
                                    {selectedReview.comment}
                                </div>
                                {/* Show More/Less Button */}
                                {(isOverflowing || isFullReviewVisible) && (
                                    <button
                                        onClick={() => setIsFullReviewVisible(!isFullReviewVisible)}
                                        className="absolute bottom-[-20px] right-0 text-blue-500 hover:underline focus:outline-none mt-2"
                                    >
                                        {isFullReviewVisible ? "Show Less" : "More"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Similar Products Section */}
            <div className="w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Similar Products</h2>

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
                            <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-1">250gms</p>
                            <div className="flex items-center space-x-2">
                                <p className="text-xs sm:text-sm text-gray-500 line-through">
                                    &#8377;{product.originalPrice}
                                </p>
                                <p className="text-sm sm:text-lg text-[--primaryDarkShade1] font-semibold">
                                    &#8377;{product.discountPrice}{" "}
                                    <span className="text-gray-400">
                                        ({((product.originalPrice - product.discountPrice) / product.originalPrice * 100).toFixed(0)}% off)
                                    </span>
                                </p>
                            </div>
                            {/* <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-600 font-semibold rounded-full text-xs sm:text-sm mx-auto">
                                {product.label}
                            </span> */}
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-5">
                    <button
                        className="px-6 py-2 bg-gradient-to-r from-[--primary] to-[--primaryShade1] text-white font-semibold rounded-full shadow-md 
                                transform transition duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg"
                    >
                        Show more
                    </button>
                </div>
            </div>

            {/* SnackBar */}
            <SnackBar
                message={snackBarMessage}
                isVisible={isSnackBarVisible}
                onClose={() => setIsSnackBarVisible(false)}
            />
        </div>
    );
};

export default CustomerProductOverview;
