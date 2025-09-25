const { findAll } = require("../../../../lib/chat");
const query = require("../../../../utils/query");

const findAllItems = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const chats = await findAll(userId);

    const transformedChats = query.getTransformedItems({
      items: chats,
      selection: ["id", "userId", "name", "userName", "createdAt", "updatedAt"],
      path: "/chats",
    });

    res.status(200).json({ data: transformedChats });
  } catch (error) {
    next(error);
  }
};

module.exports = findAllItems;
