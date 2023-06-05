import React, { createContext, useState } from "react";

export const ConnectionContext = createContext();

export const ConnectionProvider = ({ children }) => {
  const [isConnected, setConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState(null);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        // Request account access from MetaMask
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Get the current account address
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const address = accounts[0];

        setConnected(true);
        setAccountAddress(address);
      } else {
        throw new Error("MetaMask not found");
      }
    } catch (error) {
      console.log("Error connecting wallet:", error);
    }
  };

  const disconnectWallet = () => {
    setConnected(false);
    setAccountAddress(null);
  };

  const contextValue = {
    isConnected,
    accountAddress,
    connectWallet,
    disconnectWallet,
  };

  return (
    <ConnectionContext.Provider value={contextValue}>
      {children}
    </ConnectionContext.Provider>
  );
};
