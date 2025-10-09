import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Markdown from "react-markdown";
import Prism from "prismjs";

/**
 * Message Component
 * -----------------
 * Displays a single chat message in the chat interface. It supports:
 * - User and assistant messages with different styling
 * - Markdown rendering for assistant messages
 * - Syntax highlighting for code blocks using PrismJS
 * - Displaying image messages with responsive sizing
 *
 * Features:
 * 1. Uses `useEffect` to re-highlight code blocks whenever the message content changes.
 * 2. Differentiates message alignment and styling based on the sender role (`user` or `assistant`).
 * 3. Handles messages that are images (`msg.isImage`) by rendering them responsively.
 * 4. Uses `react-markdown` to render Markdown content safely.
 *
 * Props:
 * @param {Object} msg - The chat message object
 * @param {string} msg.role - The sender role ("user" or "assistant")
 * @param {string} msg.content - The message content (text or image URL)
 * @param {boolean} [msg.isImage] - Whether the message is an image
 *
 * Example Usage:
 * <Message msg={{ role: "assistant", content: "Hello **world**!" }} />
 */
const Message = ({ msg }) => {
  // Re-run syntax highlighting on code blocks whenever the content changes
  useEffect(() => {
    Prism.highlightAll();
  }, [msg.content]);

  return (
    <div
      className={`flex ${
        msg.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`rounded-lg ${
          msg.isImage ? "max-w-[100%] lg:max-w-[60%]" : "lg:max-w-[90%]"
        } ${
          msg.role === "user"
            ? "bg-gray-300 dark:bg-[#303030] text-gray-900 dark:text-gray-200 rounded-br-none"
            : "text-gray-900 dark:text-gray-200 rounded-bl-none"
        }`}
      >
        {msg.isImage ? (
          <div className="my-2">
            <img
              src={msg.content}
              alt="chat-img"
              className="rounded-lg max-w-full object-contain"
            />
          </div>
        ) : (
          <div
            className={`text-base ${
              msg.role === "assistant" ? "reset-tw" : "p-3"
            }`}
          >
            <Markdown>{msg.content}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

// PropTypes for runtime type checking
Message.propTypes = {
  msg: PropTypes.shape({
    role: PropTypes.oneOf(["user", "assistant"]).isRequired,
    content: PropTypes.string.isRequired,
    isImage: PropTypes.bool,
  }).isRequired,
};

export default Message;
