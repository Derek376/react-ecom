import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../shared/ProductCard";
import HeroBanner from "./HeroBanner";
import { useEffect } from "react";
import { fetchProducts } from "../../store/actions";
import Loader from "../shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="lg:px-14 sm:px-8 px-4">
      <section className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-blue-100 bg-blue-50 p-6">
        <div><h1 className="font-bold text-xl text-slate-900">A full-stack e-commerce portfolio</h1><p className="mt-1 text-slate-600">Explore the Admin, Seller and Customer experience. No sign-up needed.</p></div>
        <Link to="/demo" className="rounded-lg bg-custom-blue px-5 py-3 font-semibold text-white">Explore Demo →</Link>
      </section>
      <div className="py-6">
        <HeroBanner />
      </div>

      <div className="py-5">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="text-slate-800 text-4xl font-bold">Products</h1>
          <span className="text-slate-700">
            Discover our handpicked selection of top-rated items just for you!
          </span>
        </div>
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
                .map((item, i) => <ProductCard key={i} {...item} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
