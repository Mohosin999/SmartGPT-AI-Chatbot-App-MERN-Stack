const tokenService = require("../../../../lib/token");
const { User } = require("../../../../model");

const refreshToken = async (req, res, next) => {
  try {
    const payload = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    };

    // Generate new tokens
    const newAccessToken = tokenService.generateAccessToken({ payload });
    const { refreshToken, expiresAt } = tokenService.generateRefreshToken();

    // Update refresh token in database
    await User.findByIdAndUpdate(req.user.id, {
      refreshToken,
      refreshTokenExpiresAt: expiresAt,
    });

    // Response
    const response = {
      code: 200,
      message: "Access token with refresh token successfully generated",
      data: {
        access_token: newAccessToken,
        refresh_token: refreshToken,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = refreshToken;
