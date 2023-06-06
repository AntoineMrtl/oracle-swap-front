import React, { useContext, useState } from "react";
import { ConnectionContext } from "../contexts/ConnectionContext";
import { PairContext } from "../contexts/PairContext";
import "../css/PoolsScreen.css";
import "../css/InputBoxes.css";
import "../css/Screens.css";

import { ApproveToken } from "../helpers/ApproveToken";
import { PoolsInfo } from "../components/PoolsInfo";
import { PairsSelector } from "../components/PairsSelector";
import { AddLiquidity } from "../helpers/AddLiquidity";
import { RemoveLiquidity } from "../helpers/RemoveLiquidity";

export const PoolsScreen = () => {
  const { isConnected, connectWallet } = useContext(ConnectionContext);
  const { activePair } = useContext(PairContext);

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [isApproved1, setIsApproved1] = useState(false);
  const [isApproved2, setIsApproved2] = useState(false);
  const [addingLiquidity, setAddingLiquidity] = useState(true);

  const handleInputChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d.]/g, ""); // Remove non-numeric and non-decimal point characters
    value = value.replace(/^(\d*\.?)|(\d*\.?\d*)\./g, "$1$2"); // Remove multiple decimal points except the first one
    setInput1(value);
  };

  const handleInputChange2 = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d.]/g, ""); // Remove non-numeric and non-decimal point characters
    value = value.replace(/^(\d*\.?)|(\d*\.?\d*)\./g, "$1$2"); // Remove multiple decimal points except the first one
    setInput2(value);
  };

  const handleInputChange3 = (e) => {
    let value = e.target.value;

    // Remove non-numeric characters
    value = value.replace(/[^\d]/g, "");

    // Convert value to a number
    const numberValue = parseInt(value);

    // Check if the value is a valid number between 1 and 100 or empty string
    if (
      value === "" ||
      (Number.isInteger(numberValue) && numberValue >= 1 && numberValue <= 100)
    ) {
      setInput3(value);
    }
  };
  const handleApprove1 = () => {
    // Approve logic goes here
    const _isApproved = ApproveToken("base", activePair);

    setIsApproved1(_isApproved);
  };

  const handleApprove2 = () => {
    // Approve logic goes here
    const _isApproved = ApproveToken("quote", activePair);

    setIsApproved2(_isApproved);
  };

  const handleInteractLiquidity = async () => {
    let _added = false;

    if (addingLiquidity) {
      _added = await AddLiquidity(activePair, input1, input2);
    } else {
      _added = await RemoveLiquidity(activePair, input3);
    }
    if (_added) {
      setInput1("");
      setInput2("");
      setInput3("");
    }
  };

  return (
    <div className="pools-frame">
      <div className="top-frame">
        <div className="top-frame-left">
          <div className="pools-text">Pools</div>
          <PoolsInfo isAdding={addingLiquidity} />
        </div>
        <div className="top-frame-right">
          <PairsSelector />
          <button
            className={`buy-sell-button ${addingLiquidity ? "" : "sell"}`}
            onClick={() => setAddingLiquidity(!addingLiquidity)}
          >
            {addingLiquidity ? "Add Liquidity" : "Remove Liquidity"}
          </button>
        </div>
      </div>
      <div className="input-boxes">
        {addingLiquidity && (
          <div>
            <div className="input-box">
              <input
                type="text"
                value={input1}
                onChange={(e) => handleInputChange(e, setInput1)}
                placeholder="0"
              />
            </div>
            <div className="input-box">
              <input
                type="text"
                value={input2}
                onChange={(e) => handleInputChange2(e, setInput2)}
                placeholder="0"
              />
            </div>
          </div>
        )}
        {!addingLiquidity && (
          <div className="input-box">
            <input
              type="text"
              value={input3}
              onChange={(e) => handleInputChange3(e, setInput3)}
              placeholder="1"
            />
          </div>
        )}
      </div>
      {!isConnected && (
        <button className="bottom-connect-button" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
      {isConnected && (
        <div className="pools-buttons-container">
          {addingLiquidity ? (
            <div className="pools-approve-buttons">
              <button
                className="pools-bottom-approve-button"
                disabled={isApproved1 || !activePair}
                onClick={handleApprove1}
              >
                Approve 1
              </button>
              <button
                className="pools-bottom-approve-button"
                disabled={isApproved2 || !activePair}
                onClick={handleApprove2}
              >
                Approve 2
              </button>
            </div>
          ) : null}
          <button
            className="pools-bottom-swap-button"
            onClick={handleInteractLiquidity}
            disabled={
              (addingLiquidity && (!isApproved1 || !isApproved2)) ||
              !activePair ||
              (addingLiquidity && input1 && input2) ||
              (!addingLiquidity && !input3)
            }
          >
            Add / Remove Liquidity
          </button>
        </div>
      )}
    </div>
  );
};
