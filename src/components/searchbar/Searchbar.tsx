"use client";
import { Search  } from "lucide-react";
import React from "react";
const SearchBar = () => {
  return (
    <div
      className={`lg:flex hidden dark:border-gray-700 border-gray-300 border-[1px] rounded-[10px] px-[16px] py-[13px]`}
    >
      <Search />
      <input
        type="text"
        name="searchText"
        placeholder="Search"
        className="bg-transparent ml-[10px] focus:outline-none w-[229px]"
      />
    </div>
  );
};

export default SearchBar;
