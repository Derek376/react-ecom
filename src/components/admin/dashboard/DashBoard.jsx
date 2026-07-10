import { FaBoxOpen, FaShoppingCart } from "react-icons/fa";
import DashboardOverview from "./DashboardOverview";
import { RiMoneyEuroCircleFill } from "react-icons/ri";

const Dashboard = () => {
  const { productCount, totalRevenue, totalOrders } = {
    productCount: 12,
    totalRevenue: 3738,
    totalOrders: 4,
  };

  return (
    <div>
      <div
        className="flex md:flex-row mt-8 flex-col lg:justify-between
        border border-slate-400 rounded-lg bg-linear-to-r
         from-blue-50 to-blue-100 shadow-lg"
      >
        <DashboardOverview
          title="Total Products"
          amount={productCount}
          Icon={FaBoxOpen}
        />
        <DashboardOverview
          title="Total Orders"
          amount={totalOrders}
          Icon={FaShoppingCart}
        />
        <DashboardOverview
          title="Total Revenue"
          amount={totalRevenue}
          Icon={RiMoneyEuroCircleFill}
          revenue={true}
        />
      </div>
    </div>
  );
};

export default Dashboard;
