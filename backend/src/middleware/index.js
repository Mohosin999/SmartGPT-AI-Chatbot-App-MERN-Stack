const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const OpenApiValidator = require("express-openapi-validator");
const path = require("path");

const swaggerPath = path.join(__dirname, "../../swagger.yaml");
console.log(swaggerPath);

const swaggerDoc = YAML.load(swaggerPath);

const applyMiddleware = (app) => {
  app.use(cors({ origin: "https://smartgpt-server.onrender.com/docs" }));
  app.use(morgan("dev"));
  app.use(express.json());

  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

  app.use(
    OpenApiValidator.middleware({
      apiSpec: swaggerPath,
    })
  );
};

module.exports = applyMiddleware;
