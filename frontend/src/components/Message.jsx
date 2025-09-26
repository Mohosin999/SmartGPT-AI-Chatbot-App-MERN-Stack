import React, { useEffect } from "react";
import Markdown from "react-markdown";
import Prism from "prismjs";

const Message = ({ msg }) => {
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
        className={` rounded-lg ${
          msg.isImage ? "max-w-[100%] lg:max-w-[60%]" : "lg:max-w-[90%]"
        } ${
          msg.role === "user"
            ? "bg-sky-800 text-white rounded-br-none"
            : "text-gray-900 rounded-bl-none"
        }`}
      >
        {msg.isImage ? (
          <img
            src={msg.content}
            alt="chat-img"
            className="rounded-lg max-w-full object-contain"
          />
        ) : msg.role === "assistant" ? (
          <div className="text-base reset-tw">
            <Markdown>{msg.content}</Markdown>
          </div>
        ) : (
          <div className="text-base p-3">
            <Markdown>{msg.content}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
