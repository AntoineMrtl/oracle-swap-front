import Web3 from "web3";
import {
  web3,
  connection,
  Pyth,
  pairPriceIds,
  oracleContract,
} from "./../config.js";

export const Arbitrate = async (pair, amount) => {
  try {
    const accounts = await web3.eth.requestAccounts();
    const account = accounts[0];

    const priceUpdateData = await connection.getPriceFeedsUpdateData(
      pairPriceIds[pair]
    );
    const fees = await Pyth.methods.getUpdateFee(priceUpdateData).call();

    await oracleContract.methods
      .arbitrate(Web3.utils.toWei(amount, "ether"), priceUpdateData)
      .send({
        from: account,
        value: fees,
      });

    return true;
  } catch (error) {
    console.error("Error approving tokens:", error);
  }
  return false;
};
