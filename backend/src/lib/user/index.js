const { User } = require("../../model");
const { badRequest } = require("../../utils/error");

/**
 * Find a user by refresh token.
 *
 * @param {string} refreshToken - User's refresh token.
 * @returns {Promise<Object|boolean>} User object if found, otherwise false.
 */
const findUserByRefreshToken = async (refreshToken) => {
  const user = await User.findOne({ refreshToken });
  return user ? user : false;
};

/**
 * Find a user by email.
 *
 * @param {string} email - User's email address.
 * @returns {Promise<Object|boolean>} User object if found, otherwise false.
 */
const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user ? user : false;
};

/**
 * Check if a user exists by email.
 *
 * @param {string} email - User's email address.
 * @returns {Promise<boolean>} Returns a boolean value
 */
const userExist = async (email) => {
  const user = await findUserByEmail(email);
  return user ? true : false;
};

/**
 * Create a new user in the database.
 *
 * @param {Object} data - User details.
 * @param {string} data.name - User's name.
 * @param {string} data.email - User's email.
 * @param {string} data.password - User's password.
 * @returns {Promise<Object>} Created user data with `id` included.
 */
const createUser = async ({ name, email, password }) => {
  if (!name || !email || !password) throw badRequest("Invalid Parameters");

  const user = new User({ name, email, password });
  await user.save();
  return { ...user._doc, id: user.id };
};

module.exports = {
  findUserByRefreshToken,
  findUserByEmail,
  userExist,
  createUser,
};
