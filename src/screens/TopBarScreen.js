import React, { useContext } from "react";

import { ConnectionContext } from "../contexts/ConnectionContext";
import { TabContext } from "../contexts/TabContext";
import logoImage from "../assets/metamask-logo.png"; // Replace with your own logo image path

import "../css/TopBarScreen.css";

export const TopBarScreen = () => {
  const { isConnected, accountAddress, connectWallet, disconnectWallet } =
    useContext(ConnectionContext);
  const { selectTab } = useContext(TabContext);

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <button className="top-bar-button" onClick={() => selectTab("swap")}>
          Swap
        </button>
        <button
          className="top-bar-button"
          onClick={() => selectTab("arbitrage")}
        >
          Arbitrage
        </button>
        <button className="top-bar-button" onClick={() => selectTab("pools")}>
          Pools
        </button>
      </div>
      <div className="top-bar-right">
        {isConnected ? (
          <button className="top-connect-button" onClick={disconnectWallet}>
            Disconnect
          </button>
        ) : null}
        <button className="top-connect-button" onClick={connectWallet}>
          {isConnected
            ? "0×" +
              accountAddress.substr(2, 4) +
              "..." +
              accountAddress.substr(38, 4)
            : "Connect"}
        </button>{" "}
        <img src={logoImage} alt="Logo" className="logo" />
      </div>
    </div>
  );
};
