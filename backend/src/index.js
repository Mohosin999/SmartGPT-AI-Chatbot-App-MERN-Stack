// require("dotenv").config();
// const http = require("http");
// const app = require("./app");
// const { connectDB } = require("./db");

// const server = http.createServer(app);

// const port = process.env.PORT || 3000;

// const main = async () => {
//   try {
//     await connectDB();
//     server.listen("3000", () => {
//       console.log(`Server running on port ${port}`);
//     });
//   } catch (error) {
//     console.log("Database Error");
//     console.log(error);
//   }
// };

// main();

require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const app = require("./app");
const { connectDB } = require("./db");

const isLocal = process.env.NODE_ENV !== "production";

let dbConnected = false;

const startServer = async () => {
  try {
    await connectDB();
    dbConnected = true;
    console.log("Database connected");

    if (isLocal) {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

startServer();

// Serverless handler for Vercel
const handler = async (req, res) => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
      console.log("Database connected (serverless)");
    } catch (error) {
      console.error("Database connection failed (serverless):", error);
      return res.status(500).json({ message: "Database connection failed" });
    }
  }
  return app(req, res);
};

module.exports = isLocal ? app : serverless(handler);
