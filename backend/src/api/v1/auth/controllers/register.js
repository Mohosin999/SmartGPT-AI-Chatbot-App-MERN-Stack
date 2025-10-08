const authService = require("../../../../lib/auth");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../../../lib/token");
const { User } = require("../../../../model");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await authService.register({ name, email, password });

    // Generate access token
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const accessToken = generateAccessToken({ payload });
    const { refreshToken, expiresAt } = generateRefreshToken();

    // Save refresh token to database
    await User.findByIdAndUpdate(user.id, {
      refreshToken,
      refreshTokenExpiresAt: expiresAt,
    });

    // Response
    const response = {
      code: 201,
      message: "User Created Successfully",
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
      links: {
        self: "/auth/register",
        login: "/auth/login",
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = register;
