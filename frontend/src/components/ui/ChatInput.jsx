import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import PropTypes from "prop-types";
import { FaCircleArrowRight } from "react-icons/fa6";

/**
 * ChatInput Component
 * ------------------
 * Provides a responsive chat input area for sending text or image messages.
 * Key Features:
 * 1. Auto-expanding textarea that grows based on content.
 * 2. Checkbox to toggle "Generate as Image" mode when sending a message.
 * 3. Send message via Enter key or send button click.
 * 4. Disabled input and tooltip when the user is not logged in.
 * 5. Exposes a focus() method to the parent using `useImperativeHandle`.
 *
 * Props:
 * @param {function} onSend - Callback invoked when a message is sent.
 *        Receives two arguments: text (string), isImage (boolean)
 *
 * Exposed Ref Methods:
 * - focus(): Focuses the textarea from the parent component.
 *
 * Example Usage:
 * const chatRef = useRef();
 * <ChatInput ref={chatRef} onSend={(text, isImage) => console.log(text, isImage)} />
 * chatRef.current.focus(); // Focuses the input programmatically
 */
const ChatInput = forwardRef(({ onSend }, ref) => {
  const [value, setValue] = useState(""); // Current input value
  const [isImage, setIsImage] = useState(false); // Whether to send message as an image
  const textareaRef = useRef(null); // Ref to the textarea DOM element
  const token = localStorage.getItem("token") || ""; // Auth token for enabling input

  /**
   * Adjust textarea height based on content to auto-expand
   */
  const adjustHeight = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto"; // Reset before calculating
    ta.style.height = ta.scrollHeight + "px";
  };

  /**
   * Update value state on user input and adjust height
   */
  const handleInput = (e) => {
    setValue(e.target.value);
    adjustHeight();
  };

  /**
   * Send message to parent handler
   */
  const sendMessage = () => {
    const text = value.trim();
    if (!text) return;
    if (typeof onSend === "function") onSend(text, isImage);

    // Reset state
    setValue("");
    setIsImage(false);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  /**
   * Handle Enter key for sending message
   * Shift+Enter inserts a newline instead
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /**
   * Expose focus() method to parent via ref
   */
  useImperativeHandle(ref, () => ({
    focus: () => textareaRef.current?.focus(),
  }));

  return (
    <div className="w-full px-4 md:px-0 flex flex-col items-center">
      {/* Checkbox to toggle "Generate as Image" mode */}
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
        {/* Textarea for user input */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onInput={adjustHeight}
          onKeyDown={handleKeyDown}
          placeholder="Ask without limits..."
          rows={1}
          disabled={!token}
          className={`w-full resize-none overflow-hidden rounded-xl bg-transparent px-4 py-3 pr-14 text-gray-800 focus:outline-none focus:ring-0 transition-all duration-150 max-h-60 ${
            !token ? "cursor-not-allowed opacity-50 select-none" : ""
          }`}
        />

        {/* Tooltip when user is not logged in */}
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

      {/* Local animation style */}
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
});

ChatInput.displayName = "ChatInput";

// PropTypes for runtime validation
ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired, // Required callback for sending messages
};

export default ChatInput;
