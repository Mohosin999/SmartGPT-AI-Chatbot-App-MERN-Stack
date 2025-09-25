const { createMessage } = require("../../../../lib/message");

const create = async (req, res, next) => {
  const userId = req.user.id;
  const { chatId, prompt } = req.body;

  try {
    const replyFromAI = await createMessage({ userId, chatId, prompt });

    // Response
    const response = {
      code: 201,
      message: "Successfully Created a New Message",
      data: replyFromAI,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
