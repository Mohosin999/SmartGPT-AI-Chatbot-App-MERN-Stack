const { User } = require("../model");
const userService = require("../lib/user");
const { authenticationError } = require("../utils/error");

const authenticateRefresh = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(200).json({
        message: "Session expired. Logging out...",
        logout: true,
      });
    }

    // Find user by refresh token
    const user = await userService.findUserByRefreshToken(refresh_token);

    if (!user) {
      return res.status(200).json({
        message: "Invalid session. Logging out...",
        logout: true,
      });
    }

    // Check expiration
    if (
      user.refreshTokenExpiresAt &&
      new Date(user.refreshTokenExpiresAt) < new Date()
    ) {
      // Clear expired refresh token from DB
      await User.findByIdAndUpdate(user.id, {
        refreshToken: null,
        refreshTokenExpiresAt: null,
      });

      // Send logout signal
      return res.status(200).json({
        message: "Session expired. Logging out...",
        logout: true,
      });
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
