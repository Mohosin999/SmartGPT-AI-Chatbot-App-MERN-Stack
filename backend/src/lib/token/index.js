const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { serverError, notFound } = require("../../utils/error");
const { User } = require("../../model");

const generateAccessToken = ({
  payload,
  algorithm = "HS256",
  secret = process.env.ACCESS_TOKEN_SECRET,
  expiresIn = "2m",
}) => {
  try {
    return jwt.sign(payload, secret, { expiresIn, algorithm });
  } catch (error) {
    console.log("[JWT]", error);
    throw serverError();
  }
};

const generateRefreshToken = () => {
  const refreshToken = uuidv4();
  // const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const expiresAt = new Date(Date.now() + 4 * 60 * 60 * 1000); // 2 hrs
  return { refreshToken, expiresAt };
};

const verifyAccessToken = ({
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

const decodedToken = ({ token, algorithm = "HS256" }) => {
  try {
    return jwt.decode(token, { algorithm: [algorithm] });
  } catch (error) {
    console.log("[JWT]", error);
    throw serverError();
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  decodedToken,
};
