const jwt = require("jsonwebtoken");
const { serverError } = require("../../utils/error");

const generateToken = ({
  payload,
  algorithm = "HS256",
  secret = process.env.ACCESS_TOKEN_SECRET,
  expiresIn = "1d",
}) => {
  try {
    return jwt.sign(payload, secret, { expiresIn, algorithm });
  } catch (error) {
    console.log("[JWT]", error);
    throw serverError();
  }
};

const decodedToken = ({ token, algorithm = "HS256" }) => {
  try {
    return jwt.decode(token, { algorithm: [algorithm] });
  } catch (error) {
    console.log("[JWT]", error);
    throw serverError();
  }
};

const verifyToken = ({
  token,
  algorithm = "HS256",
  secret = process.env.ACCESS_TOKEN_SECRET,
}) => {
  try {
    return jwt.verify(token, secret, { algorithm: [algorithm] });
  } catch (error) {
    console.log("[JWT]", error);
    throw serverError();
  }
};

module.exports = { generateToken, decodedToken, verifyToken };
