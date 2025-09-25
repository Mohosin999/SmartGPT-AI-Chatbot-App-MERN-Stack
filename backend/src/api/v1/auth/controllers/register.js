const authService = require("../../../../lib/auth");
const { generateToken } = require("../../../../lib/token");

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

    const accessToken = generateToken({ payload });

    // Response
    const response = {
      code: 201,
      message: "User Created Successfully",
      data: {
        access_token: accessToken,
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
