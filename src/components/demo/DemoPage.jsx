import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import api from "../../api/api";
import { enterDemo } from "../../store/actions";

const roles = [
  { role: "admin", title: "Admin", path: "/admin", description: "Explore sales analytics, products, categories, sellers and orders.", features: "Sales overview · Catalog management · Order management" },
  { role: "seller", title: "Seller", path: "/admin/products", description: "See the seller workspace with its own products and sales orders.", features: "Seller catalog · Sales orders · Product form previews" },
  { role: "customer", title: "Customer", path: "/profile", description: "Browse the shop, build a cart and explore the customer account.", features: "Profile · Order history · Checkout preview" },
];

export default function DemoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [available, setAvailable] = useState(null);
  const [pending, setPending] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    api.get("/auth/demo", { signal: controller.signal })
      .then(({ data }) => setAvailable(data.enabled))
      .catch(() => { if (!controller.signal.aborted) setError("Unable to load the demo. Please try again later."); });
    return () => controller.abort();
  }, []);

  const chooseRole = async (item) => {
    setPending(item.role);
    setError("");
    try {
      await dispatch(enterDemo(item.role));
      navigate(item.path, { replace: true });
    } catch (failure) {
      setError(failure.response?.data?.message || "Unable to enter the demo. Please try again.");
      setPending(null);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 sm:py-20">
      <p className="text-custom-blue text-sm font-semibold tracking-widest uppercase">E-Shop portfolio demo</p>
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-4">Explore every side of E-Shop</h1>
      <p className="mt-5 max-w-2xl text-lg text-slate-600">Choose a role to enter instantly. No registration or password needed. Switch roles at any time to explore the full project.</p>
      <p className="mt-4 text-sm text-slate-500">Demo accounts are read-only. You can browse, filter and preview forms. Your cart stays in this browser; orders and payments are disabled.</p>
      {error && <p role="alert" className="mt-6 text-red-700">{error}</p>}
      {available === false && <p role="status" className="mt-6 text-slate-600">The demo is currently unavailable.</p>}
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {roles.map((item) => (
          <article key={item.role} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm flex flex-col">
            <h2 className="text-2xl font-bold text-slate-900">{item.title}</h2>
            <p className="mt-4 text-slate-600">{item.description}</p>
            <p className="mt-5 mb-8 text-sm text-slate-500">{item.features}</p>
            <button type="button" disabled={available !== true || pending !== null}
              onClick={() => chooseRole(item)}
              className="mt-auto rounded-lg bg-custom-blue px-4 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed">
              {pending === item.role ? "Entering…" : `Enter as ${item.title} →`}
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}
