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

const swaggerPath = path.join(process.cwd(), "../../swagger.yaml");
const swaggerDoc = YAML.load(swaggerPath);

const applyMiddleware = (app) => {
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());

  // ✅ Only enable Swagger in dev
  if (process.env.NODE_ENV !== "production") {
    app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
  }

  // OpenAPI Validator (can run in both dev & prod)
  app.use(
    OpenApiValidator.middleware({
      apiSpec: swaggerPath,
    })
  );

  // Example route
  app.get("/api/v1/ping", (req, res) => res.json({ message: "pong" }));
};

module.exports = applyMiddleware;
