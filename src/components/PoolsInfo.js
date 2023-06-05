import React, { useState, useEffect } from "react";

export const PoolsInfo = ({ isAdding }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(
      isAdding
        ? "Add liquidity to the selected pool. First box for the base token and second box for the quote token. Leave empty either one."
        : "Set the percentage you want to remove (integers from 1 to 100)."
    );
  }, [isAdding]);

  return <div className={"pools-info-text"}>{text}</div>;
};
