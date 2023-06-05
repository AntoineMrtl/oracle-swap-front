import Web3 from "web3";
import {
  web3,
  connection,
  pairPriceIds,
  oracleContract,
  Pyth,
} from "./../config.js";

export const SwapToken = async (pair, isBuy, amount) => {
  try {
    const accounts = await web3.eth.requestAccounts();
    const account = accounts[0];

    const priceUpdateData = await connection.getPriceFeedsUpdateData(
      pairPriceIds[pair]
    );
    const fees = await Pyth.methods.getUpdateFee(priceUpdateData).call();

    await oracleContract.methods
      .swap(isBuy, Web3.utils.toWei(amount, "ether"), priceUpdateData)
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
