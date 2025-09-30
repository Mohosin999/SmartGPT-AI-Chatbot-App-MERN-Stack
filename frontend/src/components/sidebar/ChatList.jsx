import React from "react";
import PropTypes from "prop-types";
import ChatItem from "./ChatItem";

/**
 * ChatList Component
 * ------------------
 * Renders a scrollable list of chats in the sidebar.
 * Handles different states:
 * 1. User not logged in: shows a prompt to log in.
 * 2. No chats available: shows a "No chats found" message.
 * 3. Chats available: displays each chat using ChatItem component.
 *
 * Features:
 * - Highlights the currently selected chat.
 * - Supports deleting a chat with confirmation modal.
 * - Smooth scrolling for long chat lists.
 *
 * Props:
 * @param {string} token - Authentication token; required to fetch chats
 * @param {Array<Object>} chats - Array of chat objects to display
 * @param {Object} currentChat - The currently selected chat object
 * @param {function} onSelectChat - Function to select a chat by ID
 * @param {Object|null} chatToDelete - Chat object pending deletion
 * @param {function} setChatToDelete - Setter for chatToDelete state
 * @param {boolean} alertOpen - Whether the delete confirmation modal is open
 * @param {function} setAlertOpen - Setter for alertOpen state
 * @param {function} onConfirmDelete - Function to confirm deletion of a chat
 *
 * Example Usage:
 * <ChatList
 *   token={userToken}
 *   chats={allChats}
 *   currentChat={selectedChat}
 *   onSelectChat={handleSelectChat}
 *   chatToDelete={chatToDelete}
 *   setChatToDelete={setChatToDelete}
 *   alertOpen={alertOpen}
 *   setAlertOpen={setAlertOpen}
 *   onConfirmDelete={handleConfirmDelete}
 * />
 */
const ChatList = ({
  token,
  chats,
  currentChat,
  onSelectChat,
  chatToDelete,
  setChatToDelete,
  alertOpen,
  setAlertOpen,
  onConfirmDelete,
}) => {
  // Show login prompt if user is not authenticated
  if (!token)
    return (
      <p className="text-gray-400 text-center mt-4 h-full">
        Login to see your chats.
      </p>
    );

  // Show message if there are no chats
  if (chats?.length === 0)
    return (
      <p className="text-gray-400 text-center mt-4 h-full">No chats found.</p>
    );

  // Render list of chats
  return (
    <div className="flex-1 overflow-y-auto mt-4 space-y-2 no-scrollbar scroll-smooth">
      <ul>
        {chats?.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            isSelected={currentChat?.data?.id === chat.id}
            onSelectChat={onSelectChat}
            chatToDelete={chatToDelete}
            setChatToDelete={setChatToDelete}
            alertOpen={alertOpen}
            setAlertOpen={setAlertOpen}
            onConfirmDelete={onConfirmDelete}
          />
        ))}
      </ul>
    </div>
  );
};

// PropTypes for runtime type checking
ChatList.propTypes = {
  token: PropTypes.string, // Authentication token; required to show chats
  chats: PropTypes.arrayOf(PropTypes.object), // Array of chat objects
  currentChat: PropTypes.object, // Currently selected chat object
  onSelectChat: PropTypes.func.isRequired, // Function to select a chat
  chatToDelete: PropTypes.object, // Chat pending deletion
  setChatToDelete: PropTypes.func.isRequired, // Setter for chatToDelete state
  alertOpen: PropTypes.bool.isRequired, // Delete confirmation modal state
  setAlertOpen: PropTypes.func.isRequired, // Setter for alertOpen state
  onConfirmDelete: PropTypes.func.isRequired, // Function to confirm chat deletion
};

export default ChatList;
