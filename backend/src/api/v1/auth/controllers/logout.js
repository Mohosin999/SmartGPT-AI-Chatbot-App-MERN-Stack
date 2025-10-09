const { User } = require("../../../../model");

const logout = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    console.log("akash", userId);

    if (!userId) {
      return res.status(401).json({
        code: 401,
        message: "User not found",
      });
    }

    // Remove refresh token from DB
    await User.findByIdAndUpdate(userId, {
      refreshToken: null,
      refreshTokenExpiresAt: null,
    });

    res.status(200).json({
      code: 200,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
