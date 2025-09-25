const Chat = require("../../model/Chat");
const openai = require("../../config/openai");
const { notFound } = require("../../utils/error");

const createMessage = async ({ userId, chatId, prompt }) => {
  // Find the chat by user and chat ID
  const chat = await Chat.findOne({ userId, _id: chatId });
  if (!chat) {
    throw notFound();
  }

  // Add user's message to chat
  chat.messages.push({
    role: "user",
    content: prompt,
    timestamp: Date.now(),
    isImage: false,
  });

  // Send message to AI and get reply
  const response = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const reply = {
    ...response.choices[0].message,
    timestamp: Date.now(),
    isImage: false,
  };

  // Save AI reply in the chat
  chat.messages.push(reply);
  await chat.save();

  return reply;
};

module.exports = { createMessage };
