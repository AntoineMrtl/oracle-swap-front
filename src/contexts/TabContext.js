import React, { createContext, useState } from "react";

export const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("swap");

  const selectTab = (tab) => {
    setActiveTab(tab);
  };

  const contextValue = {
    activeTab,
    selectTab,
  };

  return (
    <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
  );
};
