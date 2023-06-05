import {
  web3,
  pairSymbols,
  tokenContracts,
  OracleSwapAddress,
} from "./../config.js";
import tokenABI from "../abis/tokenABI.json";

export const ApproveToken = async (sideToken, activePair) => {
  try {
    const [baseSymbol, quoteSymbol] = pairSymbols[activePair];

    const contractAddress =
      sideToken === "base"
        ? tokenContracts[baseSymbol]
        : tokenContracts[quoteSymbol];

    const accounts = await web3.eth.requestAccounts();
    const account = accounts[0];

    const tokenContract = new web3.eth.Contract(tokenABI, contractAddress);

    await tokenContract.methods
      .approve(OracleSwapAddress, "999999999999999999999999")
      .send({
        from: account,
      });
    console.log("APPROVED");

    return true;
  } catch (error) {
    console.error("Error approving tokens:", error);
  }
  return false;
};
