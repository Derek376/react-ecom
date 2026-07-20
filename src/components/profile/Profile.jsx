import { Avatar } from "@mui/material";
import { BiUser } from "react-icons/bi";
import { FaEnvelope, FaShoppingCart, FaUserShield } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const roles = user?.roles || [];
  const isAdmin = roles.includes("ROLE_ADMIN");
  const isSeller = roles.includes("ROLE_SELLER");
  const displayName = user?.username || user?.email || "Account";

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
          <BiUser className="text-slate-700" />
          My Profile
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          View your account details and orders
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="border border-slate-200 rounded-lg bg-white shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-5 mb-6">
            <Avatar
              sx={{ width: 72, height: 72, bgcolor: "rgba(28, 100, 242, 1)" }}
            >
              {displayName?.charAt(0)?.toUpperCase()}
            </Avatar>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-slate-800">{displayName}</h2>
              <p className="text-gray-500 mt-1">Signed in to E-Shop</p>
            </div>
          </div>

          <div className="space-y-4 border-t border-slate-100 pt-6">
            <div className="flex items-start gap-3">
              <BiUser className="text-custom-blue text-xl mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Username</p>
                <p className="text-slate-800 font-semibold">
                  {user?.username || "—"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaEnvelope className="text-custom-blue text-xl mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-slate-800 font-semibold">
                  {user?.email || "—"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaUserShield className="text-custom-blue text-xl mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Roles</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {roles.length > 0 ? (
                    roles.map((role) => (
                      <span
                        key={role}
                        className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-custom-blue border border-blue-100"
                      >
                        {role.replace("ROLE_", "")}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-800 font-semibold">USER</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            to="/profile/orders"
            className="flex items-center justify-center gap-2 border border-slate-200 rounded-lg bg-white shadow-sm px-5 py-4 font-semibold text-slate-800 hover:border-custom-blue hover:text-custom-blue transition"
          >
            <FaShoppingCart />
            My Orders
          </Link>

          {(isAdmin || isSeller) && (
            <Link
              to={isAdmin ? "/admin" : "/admin/orders"}
              className="flex items-center justify-center gap-2 rounded-lg bg-custom-blue text-white shadow-sm px-5 py-4 font-semibold hover:opacity-90 transition"
            >
              <FaUserShield />
              {isAdmin ? "Admin Panel" : "Seller Panel"}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
