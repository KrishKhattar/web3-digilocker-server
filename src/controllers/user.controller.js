import {
  addUserToBlockchain,
  fetchUserFromBlockchain,
  updateUserOnBlockchain,
} from "../services/userService.js";

export const addUser = async (req, res) => {
  console.log("Request Body on Server:", req.body);

  try {
    const receipt = await addUserToBlockchain(req.body);
    res.status(201).json({ success: true, receipt });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const fetchUser = async (req, res) => {
  try {
    const user = await fetchUserFromBlockchain(req.params.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const receipt = await updateUserOnBlockchain(req.body);
    res.status(200).json({ success: true, receipt });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
