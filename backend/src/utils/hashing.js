const bcrypt = require("bcryptjs");

/**
 * Generate a hashed string.
 *
 * @param {string} payload - The plain text (or password) to hash.
 * @param {number} [saltRound=10] - Number of salt rounds for hashing.
 * @returns {Promise<string>} The hashed string.
 */
const generateHash = async (payload, saltRound = 10) => {
  const salt = await bcrypt.genSalt(saltRound);
  return bcrypt.hash(payload, salt);
};

/**
 * Compare a plain text string with a hashed string.
 *
 * @param {string} raw - The plain text (or password) to compare.
 * @param {string} hash - The hashed string to compare against.
 * @returns {Promise<boolean>} True if the text matches the hash, otherwise false.
 */
const hashMatched = async (raw, hash) => {
  const result = await bcrypt.compare(raw, hash);
  return result;
};

module.exports = { generateHash, hashMatched };
