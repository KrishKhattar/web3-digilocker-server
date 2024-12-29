import dotenv from "dotenv";
import app from "./app.js"; // Importing the app from app.js

dotenv.config({path: "./.env"});

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
