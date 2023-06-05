import React, { useContext, useState } from "react";
import { ConnectionContext } from "../contexts/ConnectionContext";
import { PairContext } from "../contexts/PairContext";

import "../css/SwapScreen.css";
import "../css/InputBoxes.css";
import "../css/Screens.css";

import { ApproveToken } from "../helpers/ApproveToken";
import { SwapToken } from "../helpers/SwapToken";

import { PairsSelector } from "../components/PairsSelector";

export const SwapScreen = () => {
  const { isConnected, connectWallet } = useContext(ConnectionContext);
  const { activePair } = useContext(PairContext);

  const [buying, setBuying] = useState(true);
  const [input1, setInput1] = useState("");
  const [isApproved, setIsApproved] = useState(true);

  const handleBuySellToggle = () => {
    setBuying(!buying);
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d.]/g, ""); // Remove non-numeric and non-decimal point characters
    value = value.replace(/^(\d*\.?)|(\d*\.?\d*)\./g, "$1$2"); // Remove multiple decimal points except the first one
    setInput1(value);
  };

  const handleApprove = () => {
    // Approve logic goes here
    const _isApproved = ApproveToken(buying ? "quote" : "base", activePair);

    setIsApproved(_isApproved);
  };

  const handleSwap = async () => {
    // Swap logic goes here
    const _swapped = await SwapToken(activePair, buying, input1);

    if (_swapped) setInput1("");
  };

  return (
    <div className="swap-frame">
      <div className="top-frame">
        <div className="top-frame-left">
          <div className="swap-text">Swap</div>
        </div>
        <div className="top-frame-right">
          <PairsSelector />
          <button
            className={`buy-sell-button ${buying ? "" : "sell"}`}
            onClick={() => handleBuySellToggle()}
          >
            {buying ? "Buy" : "Sell"}
          </button>
        </div>
      </div>
      <div className="input-boxes">
        <div className="input-box">
          <input
            type="text"
            value={input1}
            onChange={(e) => handleInputChange(e)}
            placeholder="0"
          />
        </div>
      </div>
      {!isConnected && (
        <button className="bottom-connect-button" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
      {isConnected && (
        <div className="buttons-container">
          <button
            className="bottom-approve-button"
            disabled={isApproved || !activePair}
            onClick={handleApprove}
          >
            Approve
          </button>
          <button
            className="bottom-swap-button"
            onClick={handleSwap}
            disabled={!isApproved}
          >
            Swap
          </button>
        </div>
      )}
    </div>
  );
};
