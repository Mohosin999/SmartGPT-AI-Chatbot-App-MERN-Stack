// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
// const swaggerUI = require("swagger-ui-express");
// const YAML = require("yamljs");
// const OpenApiValidator = require("express-openapi-validator");
// const swaggerDoc = YAML.load("./swagger.yaml");
// // const authenticate = require('./authenticate')

// const applyMiddleware = (app) => {
//   app.use(cors());
//   app.use(morgan("dev"));
//   app.use(express.json());
//   app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

//   app.use(
//     OpenApiValidator.middleware({
//       apiSpec: "./swagger.yaml",
//     })
//   );
// };

// module.exports = applyMiddleware;

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const OpenApiValidator = require("express-openapi-validator");
const path = require("path");

// Use path relative to current file in Vercel
const swaggerDoc = YAML.load(path.join(process.cwd(), "swagger.yaml"));

const applyMiddleware = (app) => {
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());

  // Serve Swagger UI
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

  // OpenAPI validator
  app.use(
    OpenApiValidator.middleware({
      apiSpec: path.join(process.cwd(), "swagger.yaml"),
    })
  );
};

module.exports = applyMiddleware;
