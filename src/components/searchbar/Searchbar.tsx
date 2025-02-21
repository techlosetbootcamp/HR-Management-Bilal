"use client";
import { Search  } from "lucide-react";
import React from "react";
export type SEARCH_BAR_PROPS = {
    width: number;
    searchText: string;
    setSearchText: (text: string) => void;
  };
const SearchBar = ({ width, searchText, setSearchText }: SEARCH_BAR_PROPS) => {
  return (
    <div
      className={`lg:flex hidden   w-[${width}px] border-lightGreyShade border-[1px] rounded-[10px] px-[16px] py-[13px]`}
    >
      <Search />
      <input
        value={searchText}
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchText(e.target.value)}
        className="bg-transparent ms-[10px] focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
