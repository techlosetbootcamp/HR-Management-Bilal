import { PaginationProps } from "@/types/types";
import { useState, useEffect } from "react";

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const [indexOfFirstItem, setIndexOfFirstItem] = useState(0);
  const [indexOfLastItem, setIndexOfLastItem] = useState(0);

  useEffect(() => {
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;

    setIndexOfFirstItem(firstItem);
    setIndexOfLastItem(lastItem);
  }, [currentPage, itemsPerPage]);

  return (
    <div className="flex justify-between items-center mt-3">
      <div className="flex items-center gap-2 dark:text-white">
        <span>Showing</span>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            onItemsPerPageChange(Number(e.target.value));
          }}
          className="dark:bg-customBlack dark:text-white border border-gray-600 px-2 py-1 rounded-md"
        >
          {[6, 10, 20, 50]?.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="dark:text-white">
        Showing {totalItems > 0 ? indexOfFirstItem + 1 : 0} to{" "}
        {Math.min(indexOfLastItem, totalItems)} out of {totalItems} records
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md dark:text-white disabled:opacity-50"
        >
          {"<"}
        </button>

        {[...Array(Math.ceil(totalItems / itemsPerPage)).keys()].map(
          (number) => (
            <button
              key={number + 1}
              onClick={() => onPageChange(number + 1)}
              className={`px-3 py-1 rounded-md border ${
                currentPage === number + 1
                  ? "border-customOrange text-customOrange"
                  : "border-gray-500 dark:text-white"
              }`}
            >
              {number + 1}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(totalItems / itemsPerPage) ||
            totalItems === 0
          }
          className="rounded-md text-white disabled:opacity-50"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
