import React, { lazy, Suspense, useEffect } from 'react';
import "./App.css";
import { Routes, Route } from "react-router-dom"; // No need for <Router> here
import Header from './Components/Header';
import Cart from './Components/Cart';
import Favourates from './Components/Favourates';
import BuyNow from './Components/BuyNow';
import AllReviews from './Components/AllReviews';

const CustomerHome = lazy(() => import("./Components/CustomerFolder/CustomerHome"));
const CustomerProductOverview = lazy(() => import("./Components/CustomerFolder/CustomerProductOverview"));
const AddAddress = lazy(() => import("./Components/AddAddress"));
const AddressModal = lazy(() => import("./Components/AddressModal"));
const Orders = lazy(() => import("./Components/Orders"));
const OrderOverview = lazy(() => import("./Components/orderOverview"));

function App() {

  const getColorData = () => {
    const storedData = localStorage.getItem("colorData");
    if (storedData) {
      const colorData = JSON.parse(storedData);
      console.log("Retrieved color data from local storage:", colorData);
      return colorData;
    } else {
      console.log("No color data found in local storage.");
      return null;
    }
  };

  // Apply primary colors to the application
  useEffect(() => {
    const colorData = getColorData();
    console.log("Color Data:", colorData);

    if (colorData) {
      document.documentElement.style.setProperty("--primary", colorData.primaryColor || "white");
      document.documentElement.style.setProperty("--primaryShade1", colorData.shades.shade1 || "white");
      document.documentElement.style.setProperty("--primaryShade2", colorData.shades.shade2 || "#2ecc71");
      document.documentElement.style.setProperty("--primaryShade3", colorData.shades.shade3 || "#e74c3c");
      document.documentElement.style.setProperty("--primaryShade4", colorData.shades.shade4 || "#9b59b6");
    }
  }, []);
  
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="*" element={<CustomerHome />} />
          <Route path="/home" element={<CustomerHome />} />
          <Route path="/product/:id" element={<CustomerProductOverview />} />
          <Route path="/buyNow" element={<BuyNow />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favourates" element={<Favourates />} />
          <Route path="/addAddress" element={<AddAddress />} />
          <Route path="/addressModal" element={<AddressModal />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:id" element={<OrderOverview />} />
          <Route path="/allReviews" element={<AllReviews />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
