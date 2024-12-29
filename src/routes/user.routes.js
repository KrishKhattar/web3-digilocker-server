import express from "express";
import {
  addUser,
  fetchUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/add", addUser); // Route to add a user
router.get("/:id", fetchUser); // Route to fetch a user
router.put("/update", updateUser); // Route to update a user

export default router;
