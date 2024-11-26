import React, { lazy, Suspense } from 'react';
import "./App.css";
import { Routes, Route } from "react-router-dom"; // No need for <Router> here
import Header from './Components/Header';
import Cart from './Components/Cart';
import Favourates from './Components/Favourates';
import BuyNow from './Components/BuyNow';

const CustomerHome = lazy(() => import("./Components/CustomerFolder/CustomerHome"));
const CustomerProductOverview = lazy(() => import("./Components/CustomerFolder/CustomerProductOverview"));
const AddAddress = lazy(() => import("./Components/AddAddress"));
const AddressModal = lazy(() => import("./Components/AddressModal"));
const Orders = lazy(() => import("./Components/Orders"));
const OrderOverview = lazy(() => import("./Components/orderOverview"));

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
          <Route path="/addAddress" element={<AddAddress />} />
          <Route path="/addressModal" element={<AddressModal />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:id" element={<OrderOverview />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
