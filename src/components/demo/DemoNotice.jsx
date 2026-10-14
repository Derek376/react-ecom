import { useSelector } from "react-redux";

export default function DemoNotice() {
  const demo = useSelector((state) => state.auth.user?.demo);
  return demo ? <p className="my-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">Preview only in demo mode. You can explore this form; saving changes is disabled.</p> : null;
}
