import React, { useRef, useState } from "react";
import { FaCircleArrowRight } from "react-icons/fa6";

const ChatInput = ({ onSend }) => {
  const [value, setValue] = useState("");
  const [isImage, setIsImage] = useState(false);
  const textareaRef = useRef(null);

  const token = localStorage.getItem("token") || "";

  const adjustHeight = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = ta.scrollHeight + "px";
  };

  const handleInput = (e) => {
    setValue(e.target.value);
    adjustHeight();
  };

  const sendMessage = () => {
    const text = value.trim();
    if (!text) return;
    if (typeof onSend === "function") onSend(text, isImage);
    setValue("");
    setIsImage(false);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full px-4 md:px-0 flex flex-col items-center">
      {/* Checkbox above the input */}
      {value.trim().length > 0 && token && (
        <div className="mb-2 flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            id="generateImage"
            checked={isImage}
            onChange={(e) => setIsImage(e.target.checked)}
            className="cursor-pointer"
          />
          <label
            htmlFor="generateImage"
            className="cursor-pointer text-gray-600"
          >
            Generate as Image
          </label>
        </div>
      )}

      <div className="relative w-full rounded-xl border border-gray-300 bg-white shadow-sm group">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onInput={adjustHeight}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          disabled={!token}
          className={`w-full resize-none overflow-hidden rounded-xl bg-transparent px-4 py-3 pr-14 text-gray-800 focus:outline-none focus:ring-0 transition-all duration-150 max-h-60 ${
            !token ? "cursor-not-allowed opacity-50 select-none" : ""
          }`}
        />

        {/* Tooltip (only if no token) */}
        {!token && (
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
            <div className="rounded-lg bg-gray-800 px-3 py-1 text-sm text-white shadow-lg animate-fade-up">
              You need to login first
            </div>
          </div>
        )}

        {/* Send button */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          {value.trim().length > 0 && token ? (
            <FaCircleArrowRight
              onClick={sendMessage}
              className="h-8 w-8 cursor-pointer active:scale-105 transition-transform duration-150 text-gray-700 hover:text-black"
            />
          ) : (
            <div className="h-10 w-10" />
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translate(-50%, -10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.25s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ChatInput;
