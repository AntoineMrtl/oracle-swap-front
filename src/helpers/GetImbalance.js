import { connection, pairPriceIds, oracleContract } from "./../config.js";

export const GetImbalance = async (pair) => {
  try {
    const priceFeeds = await connection.getLatestPriceFeeds(pairPriceIds[pair]);

    const result = await oracleContract.methods
      .isImbalanced(
        priceFeeds[0].getPriceNoOlderThan(30).price.toString(),
        priceFeeds[1].getPriceNoOlderThan(30).price.toString()
      )
      .call();

    return result === undefined ? null : result;
  } catch (error) {
    console.error("Error getting imbalance", error);
  }
  return null;
};
