const { createChat } = require("../../../../lib/chat");
const { transformedChatObj } = require("../../../../utils/query");

const create = async (req, res, next) => {
  const user = req.user;

  try {
    const data = await createChat(user);
    const formatedData = transformedChatObj(data);

    // Response
    const response = {
      code: 201,
      message: "Successfully Created a New Chat",
      data: { ...formatedData, link: `/chats/${data.id}` },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
