import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { logOutUser } from "../../store/actions";
import toast from "react-hot-toast";

export default function DemoBanner() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [pending, setPending] = useState(false);
  if (!user?.demo) return null;
  const role = user.roles.includes("ROLE_ADMIN") ? "Admin" : user.roles.includes("ROLE_SELLER") ? "Seller" : "Customer";
  const exit = async () => {
    setPending(true);
    try { await dispatch(logOutUser(navigate)); }
    catch { toast.error("Unable to confirm sign-out. Please try again."); }
    finally { setPending(false); }
  };
  return (
    <div className={`bg-blue-50 border-b border-blue-100 ${pathname.startsWith("/admin") ? "xl:pl-72" : ""}`}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm text-slate-700">
        <p><strong>Demo Mode · {role}</strong><span className="ml-3">Read-only · Checkout preview only</span></p>
        <div className="flex gap-4 items-center">
          <Link className="font-semibold text-custom-blue underline" to="/demo">Switch Role</Link>
          <button type="button" onClick={exit} disabled={pending} className="font-semibold underline disabled:opacity-50">{pending ? "Exiting…" : "Exit Demo"}</button>
        </div>
      </div>
    </div>
  );
}
