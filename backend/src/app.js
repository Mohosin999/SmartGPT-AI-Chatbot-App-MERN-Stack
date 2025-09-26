const express = require("express");
// const applyMiddleware = require("./middleware");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// applyMiddleware(app);
app.use(routes);

app.get("/", (_req, res) => res.send("SmartChat - AI Chatbot"));

app.get("/health", (req, res) => {
  res.status(200).json({
    health: "OK",
    user: req.user,
  });
});

app.use((err, _req, res, _next) => {
  // TODO: format error
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

module.exports = app;
