import React, { useContext, useState, useEffect, useRef } from "react";
import { PairContext } from "../contexts/PairContext";

import "../css/PairsSelector.css";

export const PairsSelector = () => {
  const items = ["BTC / ETH", "AVAX / ETH", "BNB / ETH"];
  const { activePair, selectPair } = useContext(PairContext);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    selectPair(item);
    setIsOpen(false);
  };

  return (
    <div className="select-box" ref={dropdownRef}>
      <div className="selected-item" onClick={handleToggle}>
        {activePair || "Select a pair"}
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {items.map((item, index) => (
            <li key={index} onClick={() => handleItemClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
