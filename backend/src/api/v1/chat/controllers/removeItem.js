const { removeChat } = require("../../../../lib/chat");

const removeItem = async (req, res, next) => {
  const id = req.params.id;

  try {
    await removeChat(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = removeItem;
