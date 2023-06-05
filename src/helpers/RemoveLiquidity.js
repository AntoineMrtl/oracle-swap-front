import { web3, oracleContract } from "./../config.js";

export const RemoveLiquidity = async (pair, percentage) => {
  try {
    const accounts = await web3.eth.requestAccounts();
    const account = accounts[0];

    await oracleContract.methods.removeLiquidity(percentage).send({
      from: account,
    });

    return true;
  } catch (error) {
    console.error("Error removing liquidity:", error);
  }
  return false;
};
