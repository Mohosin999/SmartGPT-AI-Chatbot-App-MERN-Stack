const userService = require("../lib/user");
const { authenticationError } = require("../utils/error");

const authenticateRefresh = async (req, _res, next) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return next(authenticationError("Refresh token is missing"));
    }

    // Find user by refresh token
    const user = await userService.findUserByRefreshToken(refresh_token);

    if (!user) {
      return next(authenticationError("Invalid refresh token"));
    }

    // Check expiration
    if (
      user.refreshTokenExpiresAt &&
      new Date(user.refreshTokenExpiresAt) < new Date()
    ) {
      return next(authenticationError("Refresh token expired"));
    }

    // Attach user to request
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (error) {
    console.log(error);
    next(authenticationError());
  }
};

module.exports = authenticateRefresh;
