import oracleABI from "./abis/oracleABI.json";
import PythABI from "./abis/PythABI.json";
import Web3 from "web3";
import { EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js";

export const web3 = new Web3(window.ethereum);

export const pairPriceIds = {
  "BTC / ETH": [
    "0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b", // BTC/USD
    "0x651071f8c7ab2321b6bdd3bc79b94a50841a92a6e065f9e3b8b9926a8fb5a5d1", // ETH/USD
  ],
};

export const pairContract = {
  "BTC / ETH": "0x6AFd864C3C5EAa77c61D56517C03F062940A2dD5",
};

export const pairSymbols = {
  "BTC / ETH": ["BTC", "ETH"],
};

export const tokenContracts = {
  BTC: "0x2f1C050e18c832d6205B86Ae45050eDDFC21a908",
  ETH: "0x8F2DE90b56d10DDE483cA4744cc55972132CAB50",
};

export const OracleSwapAddress = "0x6AFd864C3C5EAa77c61D56517C03F062940A2dD5";
export const oracleContract = new web3.eth.Contract(
  oracleABI,
  OracleSwapAddress
);

export const connection = new EvmPriceServiceConnection(
  "https://xc-testnet.pyth.network"
);

export const pythAddress = "0xff1a0f4744e8582DF1aE09D5611b887B6a12925C";
export const Pyth = new web3.eth.Contract(PythABI, pythAddress);
