import Web3 from "web3";
import { web3, oracleContract } from "./../config.js";

export const AddLiquidity = async (pair, amount1, amount2) => {
  try {
    const accounts = await web3.eth.requestAccounts();
    const account = accounts[0];

    await oracleContract.methods
      .addLiquidity(
        amount1 ? Web3.utils.toWei(amount1, "ether") : 0,
        amount2 ? Web3.utils.toWei(amount2, "ether") : 0
      )
      .send({
        from: account,
      });

    return true;
  } catch (error) {
    console.error("Error adding liquidity:", error);
  }
  return false;
};
