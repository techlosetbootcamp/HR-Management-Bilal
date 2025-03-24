"use client";
import { SearchBarProps } from "@/types/types";
import { Search } from "lucide-react";
import React from "react";

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div
      className={`lg:flex hidden dark:border-gray-700 border-gray-300 border-[1px] rounded-[10px] px-[16px] py-[13px]`}
    >
      <Search />
      <input
        type="text"
        name="searchText"
        placeholder="Search"
        value={value}
        onChange={onChange}
        className="bg-transparent ml-[10px] focus:outline-none w-[229px]"
      />
    </div>
  );
};

export default SearchBar;
