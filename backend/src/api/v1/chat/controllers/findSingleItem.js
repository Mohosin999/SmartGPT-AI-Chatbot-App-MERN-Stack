const { findChatById } = require("../../../../lib/chat");

const findSingleItem = async (req, res, next) => {
  const id = req.params.id;

  try {
    const chat = await findChatById(id);

    // Format messages array
    const formattedMessages = chat.messages.map((msg) => ({
      id: msg._id?.toString() || msg.id, // ensure string
      isImage: msg.isImage,
      isPublished: msg.isPublished,
      role: msg.role,
      content: msg.content,
      timestamp: msg.timestamp ? Number(msg.timestamp) : Date.now(),
    }));

    const formatedChat = {
      id: chat.id,
      userId: chat.userId,
      name: chat.name,
      userName: chat.userName,
      messages: formattedMessages,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
    };

    // Response
    const response = {
      data: formatedChat,
      links: {
        self: `/chats/${chat.id}`,
        author: `/chats/${chat.userId}/author`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingleItem;
