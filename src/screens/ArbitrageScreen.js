import React, { useContext, useEffect, useState } from "react";
import { ConnectionContext } from "../contexts/ConnectionContext";
import { PairContext } from "../contexts/PairContext";

import "../css/ArbitrageScreen.css";
import "../css/InputBoxes.css";
import "../css/Screens.css";

import { ApproveToken } from "../helpers/ApproveToken";
import { Arbitrate } from "../helpers/Arbitrate";
import { GetImbalance } from "../helpers/GetImbalance";

import { PairsSelector } from "../components/PairsSelector";

export const ArbitrageScreen = () => {
  const { isConnected, connectWallet } = useContext(ConnectionContext);
  const { activePair } = useContext(PairContext);

  const [input1, setInput1] = useState("");
  const [isApproved, setIsApproved] = useState(true);
  const [isImbalanced, setIsImbalanced] = useState(null);

  useEffect(() => {
    async function fetchImbalance() {
      if (activePair) {
        const imbalance = await GetImbalance(activePair);
        setIsImbalanced(parseInt(imbalance));
      }
    }

    fetchImbalance();
  }, [activePair]);

  const handleInputChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d.]/g, ""); // Remove non-numeric and non-decimal point characters
    value = value.replace(/^(\d*\.?)|(\d*\.?\d*)\./g, "$1$2"); // Remove multiple decimal points except the first one
    setInput1(value);
  };

  const handleApprove = async () => {
    // Approve logic goes here
    const _isApproved = await ApproveToken(
      isImbalanced === 2 ? "quote" : "base",
      activePair
    );

    setIsApproved(_isApproved);
  };

  const handleArbitrate = async () => {
    const arbitrated = await Arbitrate(activePair, input1);

    if (arbitrated) setInput1("");
  };

  const ArbitrageInfo = () => {
    if (parseInt(isImbalanced) > 0 && activePair !== null) {
      return (
        <div className={"arbitrage-info-text"}>
          Pool imbalanced : You will
          {parseInt(isImbalanced) === 2 ? (
            <span style={{ color: "#a00b0b" }}> sell </span>
          ) : (
            <span style={{ color: "#3ca812" }}> buy </span>
          )}
          {activePair.split(" / ")[0].trim() + "."}
        </div>
      );
    } else if (parseInt(isImbalanced) === 0) {
      return (
        <div className={"arbitrage-info-text"}>
          Pool balanced : You cannot arbitrate this pool.
        </div>
      );
    } else {
      return (
        <div className={"arbitrage-info-text"}>
          Select a pair to see the imbalance.
        </div>
      );
    }
  };

  return (
    <div className="arbitrage-frame">
      <div className="top-frame">
        <div className="top-frame-left">
          <div className="arbitrage-text">Arbitrage</div>
          <ArbitrageInfo />
        </div>
        <div className="top-frame-right">
          <PairsSelector />
        </div>
      </div>
      <div className="input-boxes">
        {" "}
        {isImbalanced !== 0 && (
          <div className="input-box">
            <input
              type="text"
              value={input1}
              onChange={(e) => handleInputChange(e, setInput1)}
              placeholder="0"
            />
          </div>
        )}
      </div>
      {!isConnected && (
        <button className="bottom-connect-button" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
      {isConnected && isImbalanced !== 0 && (
        <div className="buttons-container">
          <button
            className="bottom-approve-button"
            disabled={isApproved || !activePair || isImbalanced === 0}
            onClick={handleApprove}
          >
            Approve
          </button>
          <button
            className="bottom-swap-button"
            onClick={handleArbitrate}
            disabled={!isApproved || !activePair || isImbalanced === 0}
          >
            Arbitrate
          </button>
        </div>
      )}
    </div>
  );
};
