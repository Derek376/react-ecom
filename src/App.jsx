import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/shared/Navbar";

const About = lazy(() => import("./components/About"));
const LogIn = lazy(() => import("./components/auth/Login"));
const Register = lazy(() => import("./components/auth/Register"));
const Cart = lazy(() => import("./components/cart/Cart"));
const Checkout = lazy(() => import("./components/checkout/Checkout"));
const PaymentConfirmation = lazy(
  () => import("./components/checkout/PaymentConfirmation"),
);
const Contact = lazy(() => import("./components/Contact"));
const Home = lazy(() => import("./components/home/Home"));
const Products = lazy(() => import("./components/product/Products"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminProducts = lazy(
  () => import("./components/admin/products/AdminProducts"),
);
const Sellers = lazy(() => import("./components/admin/sellers/Sellers"));
const Category = lazy(() => import("./components/admin/categories/Category"));
const Dashboard = lazy(() => import("./components/admin/dashboard/Dashboard"));
const Orders = lazy(() => import("./components/admin/orders/Orders"));
const Profile = lazy(() => import("./components/profile/Profile"));
const ProfileOrders = lazy(() => import("./components/profile/ProfileOrders"));

function RouteLoadingFallback() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center text-slate-600"
      role="status"
    >
      Loading page...
    </div>
  );
}

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Suspense fallback={<RouteLoadingFallback />}>
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
        </Suspense>
      </Router>
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;
