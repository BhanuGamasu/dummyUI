import React, { lazy, Suspense } from 'react';
import "./App.css";
import { Routes, Route } from "react-router-dom"; // No need for <Router> here
import Header from './Components/Header';
import Cart from './Components/Cart';
import Favourates from './Components/Favourates';
import BuyNow from './Components/BuyNow';

const CustomerHome = lazy(() => import("./Components/CustomerFolder/CustomerHome"));
const CustomerProductOverview = lazy(() => import("./Components/CustomerFolder/CustomerProductOverview"));

function App() {
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
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
