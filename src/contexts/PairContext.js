import React, { createContext, useState } from "react";

export const PairContext = createContext();

export const PairProvider = ({ children }) => {
  const [activePair, setActivePair] = useState(null);

  const selectPair = (Pair) => {
    setActivePair(Pair);
  };

  const contextValue = {
    activePair,
    selectPair,
  };

  return (
    <PairContext.Provider value={contextValue}>{children}</PairContext.Provider>
  );
};
