// src/services/dataService.js
import img from "../src/img.jpg";
import img2 from "../src/img2.jpg";

const data = [
    // Carousel Images
    { type: "carouselImage", url: img },
    { type: "carouselImage", url: img2 },
    { type: "carouselImage", url: img },

    // Categories
    { type: "category", name: "Category 1", imageUrl: img },
    { type: "category", name: "Category 2", imageUrl: img2 },
    { type: "category", name: "Category 3", imageUrl: img },
    { type: "category", name: "Category 4", imageUrl: img2 },

    // Special Products
    {
        type: "specialProduct11",
        id:9931,
        name: "Mango Lassi",
        imageUrl: img,
        originalPrice: 200,
        discountPrice: 180,
        label: "Trending",
    },
    {
        type: "specialProduct11",
        id:9932,
        name: "Fruit Bowl",
        imageUrl: img2,
        originalPrice: 150,
        discountPrice: 135,
        label: "Fast Selling",
    },
    {
        type: "specialProduct11",
        id:9933,
        name: "Gulab Jamun",
        imageUrl: img,
        originalPrice: 250,
        discountPrice: 225,
        label: "Trending",
    },
    {
        type: "specialProduct11",
        id:9934,
        name: "Salad",
        imageUrl: img2,
        originalPrice: 300,
        discountPrice: 270,
        label: "Best Choice",
    },

    // Product Overview
    {   
        type: "specialProduct",
        id:9931,
        name: "Mango Lassi",
        totalPrice:180,
        images: [img, img2],
        rating: { fullStars: 4, halfStar: true },
        reviewsCount: 250,
        originalPrice: 200,
        discountPrice: 180,
        materials: "Sugar, Flour, Cocoa",
        instructions: "Store in a cool, dry place.",
        ingrediants: "This sweet treat is perfect for any occasion!",
        uses:"Just No Uses",
        fullDetails: "This sweet treat is perfect for any occasion! Experience immersive sound with our noise-canceling headphones, featuring advanced active noise cancellation technology, comfortable over-ear design, and long battery life for uninterrupted listening.Elevate your everyday style with our premium leather tote bag, featuring a spacious interior with multiple compartments for organized carrying, sleek minimalist design, and durable construction for long-lasting use. Crafted with high-quality, ethically sourced leather, this tote is perfect for work, travel, or casual outings",
        manufacturer: "Sweet Factory",
        location: "New York",
        ratingsBreakdown: {
            5: 40,
            4: 60,
            3: 20,
            2: 70,
            1: 10,
        },
    },
    {
        type: "specialProduct",
        id:9932,
        name: "Fruit Bowl",
        totalPrice:135,
        images: [img, img2],
        rating: { fullStars: 4, halfStar: true },
        reviewsCount: 250,
        originalPrice: 150,
        discountPrice: 135,
        materials: "Sugar, Flour, Cocoa",
        ingrediants: "This sweet treat is perfect for any occasion!",
        uses:"Just No Uses",
        instructions: "Store in a cool, dry place.",
        fullDetails: "This sweet treat is perfect for any occasion! Experience immersive sound with our noise-canceling headphones, featuring advanced active noise cancellation technology, comfortable over-ear design, and long battery life for uninterrupted listening.Elevate your everyday style with our premium leather tote bag, featuring a spacious interior with multiple compartments for organized carrying, sleek minimalist design, and durable construction for long-lasting use. Crafted with high-quality, ethically sourced leather, this tote is perfect for work, travel, or casual outings",
        manufacturer: "Sweet Factory",
        location: "New York",
        ratingsBreakdown: {
            5: 40,
            4: 60,
            3: 20,
            2: 70,
            1: 10,
        },
    },
    {
        type: "specialProduct",
        id:9933,
        name: "Gulab Jamun",
        totalPrice:225,
        images: [img, img2],
        rating: { fullStars: 4, halfStar: true },
        reviewsCount: 250,
        originalPrice: 250,
        discountPrice: 225,
        materials: "Sugar, Flour, Cocoa",
        ingrediants: "This sweet treat is perfect for any occasion!",
        uses:"Just No Uses",
        instructions: "Store in a cool, dry place.",
        fullDetails: "This sweet treat is perfect for any occasion! Experience immersive sound with our noise-canceling headphones, featuring advanced active noise cancellation technology, comfortable over-ear design, and long battery life for uninterrupted listening.Elevate your everyday style with our premium leather tote bag, featuring a spacious interior with multiple compartments for organized carrying, sleek minimalist design, and durable construction for long-lasting use. Crafted with high-quality, ethically sourced leather, this tote is perfect for work, travel, or casual outings",
        manufacturer: "Sweet Factory",
        location: "New York",
        ratingsBreakdown: {
            5: 40,
            4: 60,
            3: 20,
            2: 70,
            1: 10,
        },
    },
    {
        type: "specialProduct",
        id:9934,
        name: "Salad",
        totalPrice:270,
        images: [img, img2],
        rating: { fullStars: 4, halfStar: true },
        reviewsCount: 250,
        originalPrice: 300,
        discountPrice: 270,
        materials: "Sugar, Flour, Cocoa",
        ingrediants: "This sweet treat is perfect for any occasion!",
        uses:"Just No Uses",
        instructions: "Store in a cool, dry place.",
        fullDetails: "This sweet treat is perfect for any occasion! Experience immersive sound with our noise-canceling headphones, featuring advanced active noise cancellation technology, comfortable over-ear design, and long battery life for uninterrupted listening.Elevate your everyday style with our premium leather tote bag, featuring a spacious interior with multiple compartments for organized carrying, sleek minimalist design, and durable construction for long-lasting use. Crafted with high-quality, ethically sourced leather, this tote is perfect for work, travel, or casual outings",
        manufacturer: "Sweet Factory",
        location: "New York",
        ratingsBreakdown: {
            5: 40,
            4: 60,
            3: 20,
            2: 70,
            1: 10,
        },
    },

    // Best Selling Products
    {
        type: "bestSellingProduct",
        name: "Best Seller 1",
        imageUrl: img,
        originalPrice: 500,
        discountPrice: 450,
        label: "Best Seller",
    },
    {
        type: "bestSellingProduct",
        name: "Best Seller 2",
        imageUrl: img2,
        originalPrice: 400,
        discountPrice: 350,
        label: "Top Rated",
    },
    {
        type: "bestSellingProduct",
        name: "Best Seller 3",
        imageUrl: img,
        originalPrice: 600,
        discountPrice: 550,
        label: "Trending",
    },
    {
        type: "bestSellingProduct",
        name: "Best Seller 4",
        imageUrl: img2,
        originalPrice: 800,
        discountPrice: 700,
        label: "Must Buy",
    },

    // Occasion Packs
    {
        type: "occasionPack",
        name: "Occasion Pack 1",
        imageUrl: img,
        originalPrice: 400,
        discountPrice: 350,
        label: "Special Offer",
    },
    {
        type: "occasionPack",
        name: "Occasion Pack 2",
        imageUrl: img2,
        originalPrice: 500,
        discountPrice: 450,
        label: "Limited Time",
    },
    {
        type: "occasionPack",
        name: "Occasion Pack 3",
        imageUrl: img,
        originalPrice: 600,
        discountPrice: 540,
        label: "Best Deal",
    },
    {
        type: "occasionPack",
        name: "Occasion Pack 4",
        imageUrl: img2,
        originalPrice: 700,
        discountPrice: 630,
        label: "New Arrival",
    },
];

const getAllData = () => data;

// Method to fetch a product by ID

const getProductById = (id) => {
    // Filter for special products and map to extract the ids
    return data
        .filter((product) => product.type === "specialProduct")
        .find((product) => product.id == id);  // Extract just the ids
};

export default { getAllData, getProductById };
