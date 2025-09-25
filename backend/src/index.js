require("dotenv").config();
const http = require("http");
const app = require("./app");
const { connectDB } = require("./db");

const server = http.createServer(app);

const port = process.env.PORT || 3000;

const main = async () => {
  try {
    await connectDB();
    server.listen("3000", () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log("Database Error");
    console.log(error);
  }
};

main();
