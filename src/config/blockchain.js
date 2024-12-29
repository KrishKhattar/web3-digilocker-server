import { ethers } from "ethers";
import UserContractABI from "../contracts/compiled/abi.json" assert { type: "json" }; // Replace with your ABI file path
import dotenv from "dotenv";

dotenv.config();

// Initialize Ethers.js provider
const provider = new ethers.JsonRpcProvider(
  process.env.RPC_URL
);

const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY_METAMASK,
  provider
);
// Connect to the contract
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS, // Contract address
  UserContractABI, // Contract ABI
  provider // Ethers.js provider
);

export default contract;
