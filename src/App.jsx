import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import LogIn from "./components/auth/Login";
import Register from "./components/auth/Register";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import PaymentConfirmation from "./components/checkout/PaymentConfirmation";
import Contact from "./components/Contact";
import Home from "./components/home/Home";
import PrivateRoute from "./components/PrivateRoute";
import Products from "./components/product/Products";
import Navbar from "./components/shared/Navbar";
import AdminLayout from "./components/admin/AdminLayout";
import AdminProducts from "./components/admin/products/AdminProducts";
import Sellers from "./components/admin/sellers/Sellers";
import Category from "./components/admin/categories/Category";
import Dashboard from "./components/admin/dashboard/Dashboard";
import Orders from "./components/admin/orders/Orders";
import Profile from "./components/profile/Profile";
import ProfileOrders from "./components/profile/ProfileOrders";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirm" element={<PaymentConfirmation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/orders" element={<ProfileOrders />} />
          </Route>

          <Route path="/" element={<PrivateRoute publicPage />}>
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="/" element={<PrivateRoute adminOnly />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="" element={<Dashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="sellers" element={<Sellers />} />
              <Route path="categories" element={<Category />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <Toaster position="bottom-center" />
    </React.Fragment>
  );
}

export default App;
