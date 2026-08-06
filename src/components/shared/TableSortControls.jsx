const TableSortControls = ({
  tableName,
  sortBy,
  sortOrder,
  sortOptions,
  onSortByChange,
  onSortOrderChange,
}) => {
  const sortById = `${tableName}-sort-by`;
  const sortOrderId = `${tableName}-sort-order`;

  return (
    <div className="mb-3 flex flex-wrap items-end justify-end gap-3">
      <div className="flex flex-col gap-1">
        <label
          htmlFor={sortById}
          className="text-xs font-semibold text-slate-600"
        >
          Sort by
        </label>
        <select
          id={sortById}
          value={sortBy}
          onChange={(event) => onSortByChange(event.target.value)}
          className="min-w-40 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor={sortOrderId}
          className="text-xs font-semibold text-slate-600"
        >
          Order
        </label>
        <select
          id={sortOrderId}
          value={sortOrder}
          onChange={(event) => onSortOrderChange(event.target.value)}
          className="min-w-36 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default TableSortControls;
