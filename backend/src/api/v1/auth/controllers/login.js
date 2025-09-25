const authService = require("../../../../lib/auth");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const accessToken = await authService.login({ email, password });

  // Response
  const response = {
    code: 200,
    message: "Login Successfull",
    data: {
      access_token: accessToken,
    },
    links: {
      self: "/auth/login",
    },
  };

  res.status(200).json(response);
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = login;
