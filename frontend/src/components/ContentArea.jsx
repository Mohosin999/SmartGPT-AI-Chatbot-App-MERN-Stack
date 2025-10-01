import React, { useRef, useEffect } from "react";
import ChatInput from "./ui/ChatInput";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import {
  createChat,
  createMessage,
  getChatById,
  updateChatName,
  addChatToAllChats,
  createImage,
} from "@/features/chat/chatSlice";
import toast from "react-hot-toast";
import Loader from "./Loader";

/**
 * ContentArea Component
 * ---------------------
 * This component represents the main chat area of the application. It handles:
 * 1. Displaying messages of the current chat or a placeholder if no chat exists.
 * 2. Automatic scrolling to the bottom when new messages or images load.
 * 3. Focusing the chat input when appropriate.
 * 4. Sending messages and image prompts, including:
 *    - Creating a new chat if none exists
 *    - Sending a text message or generating an image via AI
 *    - Updating chat titles based on the first message
 * 5. Showing a full-screen loader when AI is generating a response.
 *
 * Features:
 * - Uses refs for smooth scrolling and focusing the input.
 * - Uses Redux for chat state management.
 * - Handles token validation and redirects if needed.
 *
 * Props: None (component relies on Redux state)
 *
 * Example Usage:
 * <ContentArea />
 */
const ContentArea = () => {
  const { currentChat, isGenerating } = useSelector((state) => state.chat);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const chatInputRef = useRef(null);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  /**
   * useEffect - Auto-scroll chat container
   * --------------------------------------
   * Scrolls to the bottom whenever the current chat messages change.
   * Waits for all images to load before scrolling to ensure smooth UX.
   */
  useEffect(() => {
    if (!chatContainerRef.current) return;

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const images = chatContainerRef.current.querySelectorAll("img");
    if (images.length === 0) {
      scrollToBottom();
      return;
    }

    let loadedCount = 0;
    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener("load", () => {
          loadedCount++;
          if (loadedCount === images.length) scrollToBottom();
        });
        img.addEventListener("error", () => {
          loadedCount++;
          if (loadedCount === images.length) scrollToBottom();
        });
      }
    });

    if (loadedCount === images.length) scrollToBottom();
  }, [currentChat?.data?.messages]);

  /**
   * useEffect - Focus chat input
   * -----------------------------
   * Automatically focuses the chat input when:
   * - A token exists
   * - Chat messages are updated
   * - No AI generation is in progress
   */
  useEffect(() => {
    if (!token) return;
    if (currentChat?.data?.messages.length === 0) {
      chatInputRef.current?.focus();
    }
  }, [token, currentChat?.data?.messages, isGenerating]);

  /**
   * Send message or image prompt
   * -----------------------------
   * Handles:
   * - Creating a new chat if none exists
   * - Sending text messages
   * - Generating AI images
   * - Updating the chat title based on the first message
   *
   * @param {string} text - Text input from user
   * @param {boolean} isImage - Whether the input is an image prompt
   */
  const handleSend = async (text, isImage) => {
    if (!token) return;

    let currentChatId = currentChat?.data?.id;

    // Create a new chat if none exists
    if (!currentChatId) {
      const res = await dispatch(createChat({}));
      if (res.meta.requestStatus === "fulfilled") {
        currentChatId = res.payload.data.id;
        dispatch(addChatToAllChats(res.payload.data));
      }
    }

    // Generate AI image
    if (isImage) {
      const imageRes = await dispatch(
        createImage({
          chatId: currentChatId,
          prompt: text.trim(),
          isPublished: false,
        })
      );

      if (imageRes.meta.requestStatus === "fulfilled") {
        await dispatch(getChatById(currentChatId));
      } else {
        toast.error("Limit reached. Please try again later.");
      }
    }
    // Send text message
    else {
      const messageRes = await dispatch(
        createMessage({ prompt: text.trim(), chatId: currentChatId })
      );

      if (messageRes.meta.requestStatus === "fulfilled") {
        const chatRes = await dispatch(getChatById(currentChatId));

        const firstMessageText =
          chatRes.payload?.data?.messages?.[0]?.content
            ?.split(" ")
            .splice(0, 4)
            .join(" ") || "Untitled Chat";

        dispatch(
          updateChatName({
            chatId: currentChatId,
            chatName: firstMessageText,
          })
        );
      }
    }

    chatInputRef.current?.focus();
  };

  return (
    <div className="h-screen flex flex-col relative">
      {/* Chat messages container */}
      <div
        className="flex-1 flex flex-col overflow-y-auto mt-16 lg:mt-4 mb-4"
        ref={chatContainerRef}
      >
        <div className="px-4 xl:pr-1 relative flex-1">
          {!token ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img src="./vite.svg" alt="Logo" className="w-30 h-30 mb-4" />
              <h2 className="text-4xl md:text-5xl px-4 md:px-0 font-semibold text-gray-800 mb-10">
                What’s on your mind?
              </h2>
            </div>
          ) : currentChat?.data?.messages?.length > 0 ? (
            <div className="flex flex-col space-y-2 w-full md:max-w-2xl xl:max-w-3xl mx-auto mt-4">
              {currentChat.data.messages.map((msg) => (
                <Message key={msg.id} msg={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img src="./vite.svg" alt="Logo" className="w-30 h-30 mb-4" />
              <h2 className="text-4xl md:text-5xl px-4 md:px-0 font-semibold text-gray-800 mb-10">
                What’s on your mind?
              </h2>
            </div>
          )}
        </div>
      </div>

      {/* Chat input area */}
      <div className="w-full md:max-w-2xl xl:max-w-3xl mx-auto pb-4">
        <ChatInput ref={chatInputRef} onSend={handleSend} />
      </div>

      {/* Loader overlay while AI is generating */}
      {isGenerating && <Loader title="Generating full response..." />}
    </div>
  );
};

export default React.memo(ContentArea);
