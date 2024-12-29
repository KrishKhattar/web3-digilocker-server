import express from "express";
import cors from "cors"; // For handling cross-origin requests
import bodyParser from "body-parser";
import userRoutes from "./routes/user.routes.js"; // Importing the user routes
import dotenv from "dotenv";

dotenv.config({path: ""});

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log("Headers:", req.headers);
  next();
});

// Use routes
app.use("/api/users", userRoutes); // API route for users

// Default route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the Web3 API!");
});

export default app;
