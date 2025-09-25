const axios = require("axios");
const Chat = require("../../model/Chat");
const imageKit = require("../../config/imageKit");
const { notFound } = require("../../utils/error");

const createImage = async ({ userId, chatId, prompt, isPublished }) => {
  // Find chat
  const chat = await Chat.findOne({ userId, _id: chatId });
  if (!chat) throw notFound();

  // Push user message
  chat.messages.push({
    role: "user",
    content: prompt,
    timestamp: Date.now(),
    isImage: false,
  });

  // Generate image
  const encodedPrompt = encodeURIComponent(prompt);
  const generatedImageUrl = `${
    process.env.IMAGEKIT_URL_ENDPOINT
  }/ik-genimg-prompt-${encodedPrompt}/smartgpt/${Date.now()}.png?tr=w-800,h-800`;

  const aiImageResponse = await axios.get(generatedImageUrl, {
    responseType: "arraybuffer",
  });

  const base64Image = `data:image/png;base64,${Buffer.from(
    aiImageResponse.data,
    "binary"
  ).toString("base64")}`;

  // Upload to ImageKit
  const uploadResponse = await imageKit.upload({
    file: base64Image,
    fileName: `${Date.now()}.png`,
    folder: "smartgpt",
  });

  // Prepare assistant reply
  const reply = {
    role: "assistant",
    content: uploadResponse.url,
    timestamp: Date.now(),
    isImage: true,
    isPublished,
  };

  // Update chat messages & save
  chat.messages.push(reply);
  await chat.save();

  return reply;
};

module.exports = { createImage };
