// const express = require("express");
// // const applyMiddleware = require("./middleware");
// const cors = require("cors");
// const morgan = require("morgan");
// const routes = require("./routes");

// const app = express();

// app.use(cors());
// app.use(morgan("dev"));
// app.use(express.json());

// // applyMiddleware(app);
// app.use(routes);

// app.get("/", (_req, res) => res.send("SmartChat - AI Chatbot"));

// app.get("/health", (req, res) => {
//   res.status(200).json({
//     health: "OK",
//     user: req.user,
//   });
// });

// app.use((err, _req, res, _next) => {
//   // TODO: format error
//   console.log(err);
//   res.status(err.status || 500).json({
//     message: err.message,
//     errors: err.errors,
//   });
// });

// module.exports = app;

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const OpenApiValidator = require("express-openapi-validator");
const path = require("path");

const routes = require("./routes");

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ✅ Resolve swagger.yaml file inside project root
const swaggerPath = path.resolve("swagger.yaml");
const swaggerDoc = YAML.load(swaggerPath);

// Swagger Docs (only in dev mode, optional)
if (process.env.NODE_ENV !== "production") {
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
}

// OpenAPI Validator middleware
app.use(
  OpenApiValidator.middleware({
    apiSpec: swaggerPath,
  })
);

// Routes
app.use(routes);

app.get("/", (_req, res) => res.send("SmartChat - AI Chatbot"));

app.get("/health", (req, res) => {
  res.status(200).json({
    health: "OK",
    user: req.user,
  });
});

// Global Error Handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

module.exports = app;
