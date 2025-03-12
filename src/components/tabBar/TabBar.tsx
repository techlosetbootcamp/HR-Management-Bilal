import React from "react";

interface TabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabKey: string) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  orientation = "horizontal",
  className = "",
  activeClassName = "bg-customOrange text-white",
  inactiveClassName = "dark:text-white",
}) => {
  const isVertical = orientation === "vertical";
  
  return (
    <div className={`flex flex-wrap ${isVertical ? "flex-col" : "border-b border-gray-700"} ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`
            ${isVertical 
              ? "block w-full text-left px-4 py-3 mb-2 rounded-lg" 
              : "px-4 py-2 flex items-center gap-2 flex-wrap"}
            ${activeTab === tab.key 
              ? activeClassName 
              : inactiveClassName}
            ${!isVertical && activeTab === tab.key ? "border-b-2 border-orange-500 text-orange-500" : ""}
            ${!isVertical && activeTab !== tab.key ? "border-transparent" : ""}
            transition-all
          `}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.icon && (
            <span className={`${!isVertical ? "mr-2" : ""}`}>{tab.icon}</span>
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabBar;