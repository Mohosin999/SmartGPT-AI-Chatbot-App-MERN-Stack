const tokenService = require("../lib/token");
const userService = require("../lib/user");
const { authenticationError } = require("../utils/error");

const authenticate = async (req, _res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = tokenService.verifyAccessToken({ token });
    const user = await userService.findUserByEmail(decoded.email);

    // if (!user) {
    //   next(authenticationError());
    // }

    if (!user) {
      return next(authenticationError());
    }

    // Attach user to request
    req.user = { ...user._doc, id: user.id };
    next();
  } catch (error) {
    console.log(error);
    next(authenticationError());
  }
};

module.exports = authenticate;
