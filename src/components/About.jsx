import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./shared/ProductCard";
import Loader from "./shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";
import { useEffect } from "react";
import { fetchProducts } from "../store/actions";

const About = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
        About Us
      </h1>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-lg mb-4">
            Welcome to our e-commerce store! We are dedicated to providing the
            best products and services to our customers. Our mission is to offer
            a seamless shopping experience while ensuring the highest quality of
            our offerings.
          </p>
        </div>

        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
            alt="About Us"
            className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          ></img>
        </div>
      </div>

      <div className="py-7 space-y-8">
        <h1 className="text-slate-800 text-4xl font-bold text-center">
          Our Products
        </h1>
        <div className="flex flex-col justify-center items-center space-y-2">
          {isLoading ? (
            <Loader />
          ) : errorMessage ? (
            <div className="flex justify-center items-center h-50">
              <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
              <span className="text-slate-800 text-lg. font-medium">
                {errorMessage}
              </span>
            </div>
          ) : (
            <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
              {products &&
                products
                  ?.slice(0, 3)
                  .map((item, i) => (
                    <ProductCard key={i} {...item} about={true} />
                  ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
