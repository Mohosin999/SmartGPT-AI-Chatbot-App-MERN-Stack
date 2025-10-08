const { userExist, createUser, findUserByEmail } = require("../user");
const { badRequest } = require("../../utils/error");
const { generateHash, hashMatched } = require("../../utils/hashing");
const { generateAccessToken, generateRefreshToken } = require("../token");
const { User } = require("../../model");

/**
 * Register a new user.
 *
 * @param {Object} data - User registration data.
 * @param {string} data.name - User's name.
 * @param {string} data.email - User's email.
 * @param {string} data.password - User's password.
 * @returns {Promise<Object>} Created user object.
 * @throws Will throw an error if the user already exists or parameters are invalid.
 */
const register = async ({ name, email, password }) => {
  const hasUser = await userExist(email);
  if (hasUser) {
    throw badRequest("User already exist");
  }

  password = await generateHash(password);
  const user = await createUser({ name, email, password });

  return user;
};

/**
 * Login a user and generate a JWT token.
 *
 * @param {Object} data - User login data.
 * @param {string} data.email - User's email.
 * @param {string} data.password - User's password.
 * @returns {Promise<string>} JWT token for authenticated user.
 * @throws Will throw an error if credentials are invalid.
 */
const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw badRequest("Invalid Credentials");
  }

  const matched = await hashMatched(password, user.password);
  if (!matched) {
    throw badRequest("Invalid Credentials");
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken({ payload });
  const { refreshToken, expiresAt } = generateRefreshToken();

  // Save refresh token to database
  await User.findByIdAndUpdate(user.id, {
    refreshToken,
    refreshTokenExpiresAt: expiresAt,
  });

  return { accessToken, refreshToken };
};

module.exports = {
  register,
  login,
};
