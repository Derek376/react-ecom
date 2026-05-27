import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../store/actions";

const useProductFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;
    params.set("pageNumber", currentPage - 1);

    const category = params.get("category") || null;
    const sortOrder = params.get("sortby") || "asc";
    const keyword = params.get("keyword") || null;
    params.set("sortby", "price");
    params.set("sortOrder", sortOrder);

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    if (keyword) {
      params.set("keyword", keyword);
    } else {
      params.delete("keyword");
    }

    const queryString = params.toString();

    dispatch(fetchProducts(queryString));
  }, [searchParams, dispatch]);

  return { searchParams };
};

export default useProductFilter;
