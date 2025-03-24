// pages/attandance/index.tsx (or similar)
"use client";
import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import AttandanceOverview from "@/components/attandanceOverview/AttandanceOverview";
import Button from "@/components/button/Button";
import SearchBar from "@/components/searchbar/Searchbar";

export default function Page() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="border dark:border-gray-700 rounded-xl">
      <div className="flex justify-between items-center p-6">
        <SearchBar value={searchTerm} onChange={handleSearchChange} />
        <div className="w-[200px]">
          <Button onClick={() => router.push("/attandance/markAttandance")}>
            Mark Attandance
          </Button>
        </div>
      </div>
      <AttandanceOverview
        searchTerm={searchTerm}
        showViewAll={false}
        showPagination={true}
      />
    </div>
  );
}
