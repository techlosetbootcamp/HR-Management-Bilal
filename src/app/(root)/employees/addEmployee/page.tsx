"use client";

import { useState } from "react";
import useAddEmployee from "./useAddEmployee";
import TabBar from "@/components/tabBar/TabBar";
import { getAddEmployeeTabs } from "@/utils/addEmployeeTabs";

export default function AddEmployeeForm() {
  const {
    form,
    handleChange,
    handleSubmit,
    loading,
    error,
    handleFileUpload,
  } = useAddEmployee();

  const [activeTab, setActiveTab] = useState(0);
  
  // Get tabs configuration from the utility file
  const tabs = getAddEmployeeTabs(form, handleChange, handleFileUpload);

  const handleTabChange = (tabKey: string) => {
    setActiveTab(parseInt(tabKey));
  };

  return (
    <div className="w-full min-h-screen bg-[#131313] text-white shadow-md rounded-lg">
      <TabBar 
        tabs={tabs}
        activeTab={activeTab.toString()}
        onTabChange={handleTabChange}
        orientation="horizontal"
        className="border-b border-gray-700 w-full"
        activeClassName="border-orange-500 text-orange-500 text-[18px] border-b-2"
        inactiveClassName="border-transparent text-[18px]"
      />

      <div className="">{tabs[activeTab].component}</div>

      <div className="flex float-end bg-[#131313]">
        {activeTab > 0 && (
          <button
            onClick={() => setActiveTab(activeTab - 1)}
            className="bg-[#131313] px-4 py-3 text-white border-gray-700 border rounded-xl mr-3"
          >
            Previous
          </button>
        )}
        {activeTab < tabs.length - 1 ? (
          <button
            onClick={() => setActiveTab(activeTab + 1)}
            className="mr-4 bg-customOrange hover:bg-[#131313] hover:text-customOrange border transition-all ease-in-out border-customOrange px-4 py-3 rounded-xl text-white"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-customOrange hover:bg-[#131313] hover:text-customOrange border transition-all ease-in-out border-customOrange px-5 py-3 rounded-xl text-white"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        )}
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}