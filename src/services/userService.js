import { ethers } from "ethers";
import { v4 as uuidv4 } from "uuid";
import contract from "../config/blockchain.js";
import dotenv from "dotenv";

dotenv.config();

// Function to add a user
export const addUserToBlockchain = async (userData) => {
  // Log the incoming data to verify it
  console.log("Data received in addUserToBlockchain:", userData);

  // Ensure userData is in the expected format
  if (!userData || typeof userData !== "object") {
    throw new Error("Invalid user data");
  }

  const userId = `USER-${uuidv4()}`;

  // Extract properties from userData
  const { properties } = userData;
  if (!Array.isArray(properties) || properties.length === 0) {
    throw new Error("Invalid properties: Must be a non-empty array.");
  }

  // Assign property IDs and ensure PAN number consistency
  properties.forEach((property, index) => {
    property.propertyId = `PROP-${index + 1}`;
  });

  // Extract the PAN number from the first property
  const panNumber = properties[0]?.panNumber;
  if (!panNumber) {
    throw new Error("PAN number is missing in the properties array.");
  }

  // Prepare the user data
  const userDetails = {
    userId,
    panNumber,
    properties,
  };

  try {
    // Smart contracts might not support complex data like arrays directly.
    // Consider encoding properties if required.
    const tx = await contract.addUser(
      userDetails.userId,
      userDetails.panNumber,
      JSON.stringify(userDetails.properties) // Encode array if required
    );
    console.log("Transaction Hash:", tx.hash);
    await tx.wait();
    console.log("User added to blockchain successfully.");
  } catch (err) {
    console.error("Error adding user to blockchain:", err);
    throw new Error("Blockchain transaction failed.");
  }

  return userDetails;
};

// Function to fetch a user
export const fetchUserFromBlockchain = async (walletAddress) => {
  const user = await contract.fetchUser(walletAddress); // Call fetchUser method
  return {
    name: user[0],
    email: user[1],
    age: user[2],
  };
};

// Function to update a user
export const updateUserOnBlockchain = async (userData) => {
  const { name, email, age, walletAddress, privateKey } = userData;

  // Connect signer to interact with contract
  const wallet = new ethers.Wallet(privateKey, contract.provider);
  const signer = contract.connect(wallet);

  // Call updateUser function
  const tx = await signer.updateUser(name, email, age);
  const receipt = await tx.wait(); // Wait for transaction to be mined

  return receipt;
};
