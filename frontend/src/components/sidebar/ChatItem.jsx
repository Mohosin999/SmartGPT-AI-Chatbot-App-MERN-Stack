import React, { useState } from "react";
import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useSelector } from "react-redux";
import Loader from "../Loader";

/**
 * ChatItem Component
 * ------------------
 * Represents a single chat item in the chat list.
 * Features:
 * 1. Displays the chat name and highlights the selected chat.
 * 2. Provides a settings/menu button (three dots) for chat actions.
 * 3. Handles deleting a chat with a confirmation alert dialog.
 * 4. Shows a loading indicator if a deletion is in progress.
 *
 * Props:
 * @param {Object} chat - Chat object containing at least `id` and `name`
 * @param {boolean} isSelected - Whether this chat is currently selected
 * @param {function} onSelectChat - Function called with chat ID when selected
 * @param {function} setChatToDelete - Setter to mark a chat for deletion
 * @param {function} onConfirmDelete - Function called to confirm chat deletion
 *
 * Example Usage:
 * <ChatItem
 *   chat={chat}
 *   isSelected={currentChat?.id === chat.id}
 *   onSelectChat={handleSelectChat}
 *   setChatToDelete={setChatToDelete}
 *   onConfirmDelete={handleConfirmDelete}
 * />
 */
const ChatItem = ({
  chat,
  isSelected,
  onSelectChat,
  setChatToDelete,
  onConfirmDelete,
}) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const { isDeleting } = useSelector((state) => state.chat);

  return (
    <li
      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition select-none active:scale-105 ${
        isSelected ? "bg-sky-800" : "hover:bg-gray-700"
      }`}
    >
      {/* Loading Indicator while deleting a chat */}
      {isDeleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Loader title={"Deleting chat..."} />
        </div>
      )}

      {/* Chat name, clickable to select chat */}
      <span className="flex-1" onClick={() => onSelectChat(chat.id)}>
        {chat.name}
      </span>

      {/* Three-dot menu for chat actions (delete) */}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogTrigger asChild>
          <span
            onClick={(e) => {
              e.stopPropagation(); // Prevent selecting chat when opening menu
              setChatToDelete(chat);
              setAlertOpen(true);
            }}
            className="p-1 rounded-full hover:bg-sky-500 active:scale-105 transition cursor-pointer"
          >
            <BsThreeDots />
          </span>
        </AlertDialogTrigger>

        <AlertDialogContent className="w-96 !p-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-medium">
              Delete Chat
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm mt-1">
              Are you sure you want to delete this chat? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex justify-end gap-2 mt-4">
            <AlertDialogCancel className="px-3 py-1 rounded border text-sm cursor-pointer select-none active:scale-105">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onConfirmDelete(chat.id);
                setAlertOpen(false);
              }}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm cursor-pointer select-none active:scale-105"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  );
};

// PropTypes for runtime type checking
ChatItem.propTypes = {
  chat: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool,
  onSelectChat: PropTypes.func.isRequired,
  setChatToDelete: PropTypes.func.isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
};

export default ChatItem;
