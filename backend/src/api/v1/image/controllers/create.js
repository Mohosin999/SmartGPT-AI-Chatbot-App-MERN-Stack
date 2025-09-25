const { createImage } = require("../../../../lib/image");

const create = async (req, res, next) => {
  const userId = req.user.id;
  const { chatId, prompt, isPublished } = req.body;

  try {
    const reply = await createImage({
      userId,
      chatId,
      prompt,
      isPublished,
    });

    // Response
    const response = {
      code: 201,
      message: "Successfully Created a New Image",
      data: reply,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
