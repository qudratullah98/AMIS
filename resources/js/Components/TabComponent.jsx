import React, { useState } from "react";

// Reusable TabComponent
const TabComponent = ({ tabs = [], tabContents = [] ,defaultSelect}) => {
  const [activeTab, setActiveTab] = useState(defaultSelect);

  const renderTabContent = () => {
    // Ensure tabContents exists and has content for the active tab
    if (tabContents.length > 0 && tabContents[activeTab]) {
      return tabContents[activeTab];
    }
    return <div>No content available</div>;
  };

  return (
    <div className="container mx-auto p-6 m-2 bg-white shadow-lg rounded-lg">
      <ul className="flex text-sm font-medium text-center text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab, index) => (
          <li key={index} className="flex-1">
            <button
              onClick={() => setActiveTab(index)}
              className={`w-full p-4 border-b-2 rounded-t-lg transition-all duration-300 ease-in-out 
                ${activeTab === index
                  ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 font-bold shadow-md"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}`}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
      <div className="p-6 text-gray-700 dark:text-gray-300">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TabComponent;
