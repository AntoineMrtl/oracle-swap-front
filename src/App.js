import React, { useContext } from "react";

import { TopBarScreen } from "./screens/TopBarScreen";
import { SwapScreen } from "./screens/SwapScreen";
import { ArbitrageScreen } from "./screens/ArbitrageScreen";
import { PoolsScreen } from "./screens/PoolsScreen";

import { TabContext } from "./contexts/TabContext";

const App = () => {
  const { activeTab } = useContext(TabContext);

  return (
    <div className="app">
      <TopBarScreen />
      <div className="main-content">
        {activeTab === "swap" && <SwapScreen />}
        {activeTab === "arbitrage" && <ArbitrageScreen />}
        {activeTab === "pools" && <PoolsScreen />}
      </div>
    </div>
  );
};

export default App;
