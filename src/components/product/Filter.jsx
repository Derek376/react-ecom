import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Tooltip,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router";

const FilterControls = ({ categories, initialSearchTerm }) => {
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const categoryFromUrl = searchParams.get("category");
  const categoryExists = categories.some(
    (item) => item.categoryName === categoryFromUrl,
  );
  const category = categoryExists ? categoryFromUrl : "all";
  const sortOrder = searchParams.get("sortby") === "desc" ? "desc" : "asc";
  const searchTermFromUrl = searchParams.get("keyword") || "";

  useEffect(() => {
    if (searchTerm === searchTermFromUrl) return;

    const handler = setTimeout(() => {
      const nextParams = new URLSearchParams(searchParams);
      if (searchTerm) {
        nextParams.set("keyword", searchTerm);
      } else {
        nextParams.delete("keyword");
      }
      nextParams.delete("page");
      navigate(`${pathname}?${nextParams.toString()}`, { replace: true });
    }, 700);

    return () => clearTimeout(handler);
  }, [navigate, pathname, searchParams, searchTerm, searchTermFromUrl]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    const nextParams = new URLSearchParams(searchParams);
    if (selectedCategory === "all") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", selectedCategory);
    }
    nextParams.delete("page");
    navigate(`${pathname}?${nextParams}`);
  };

  const toggleSortOrder = () => {
    const nextParams = new URLSearchParams(searchParams);
    const nextSortOrder = sortOrder === "asc" ? "desc" : "asc";
    nextParams.set("sortby", nextSortOrder);
    nextParams.delete("page");
    navigate(`${pathname}?${nextParams}`);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    navigate(pathname);
  };

  return (
    <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
      {/* SEARCH BAR */}
      <div className="relative flex items-center 2xl:w-112.5 sm:w-105 w-full">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-hidden focus:ring-2 focus:ring-[#1976d2]"
        />
        <FiSearch className="absolute left-3 text-slate-800 size={20}" />
      </div>

      {/* CATEGORY SELECTION */}
      <div className="flex sm:flex-row flex-col gap-4 items-center">
        <FormControl
          className="text-slate-800 border-slate-700"
          variant="outlined"
          size="small"
        >
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            className="min-w-30 text-slate-800 border-slate-700"
          >
            <MenuItem value="all">All</MenuItem>
            {categories.map((item) => (
              <MenuItem key={item.categoryId} value={item.categoryName}>
                {item.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* SORTING BUTTON & CLEAR FILTERS */}
        <Tooltip title="Sorted by price:desending">
          <Button
            variant="contained"
            onClick={toggleSortOrder}
            color="primary"
            className="flex items-center gap-2 h-10"
          >
            Sort By
            {sortOrder === "asc" ? (
              <FiArrowDown size={20} />
            ) : (
              <FiArrowUp size={20} />
            )}
          </Button>
        </Tooltip>

        <button
          className="flex items-center gap-2 bg-rose-700 text-white px-3 py-2 rounded-md transition duration300 ease-in shadow-md focus:outline-none cursor-pointer hover:bg-rose-900"
          onClick={handleClearFilters}
        >
          <FiRefreshCw className="font-semibold size={16}" />
          <span className="font-semibold">Clear Filters</span>
        </button>
      </div>
    </div>
  );
};

const Filter = ({ categories }) => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("keyword") || "";

  return (
    <FilterControls
      key={searchTerm}
      categories={categories}
      initialSearchTerm={searchTerm}
    />
  );
};

export default Filter;
