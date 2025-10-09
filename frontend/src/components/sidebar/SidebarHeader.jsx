import React from "react";
import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaPlus } from "react-icons/fa6";

/**
 * SidebarHeader Component
 * -----------------------
 * This component renders the top section of the chat sidebar, including:
 * 1. App branding/logo.
 * 2. "Add New Chat" button for creating a new chat.
 * 3. Search input to filter existing chats by name.
 *
 * Props:
 * @param {string} searchTerm - Current search text to filter chats.
 * @param {function} setSearchTerm - Setter function to update the search text.
 * @param {function} onCreateChat - Callback function triggered when the "Add New Chat" button is clicked.
 */
const SidebarHeader = ({ searchTerm, setSearchTerm, onCreateChat }) => {
  return (
    <div>
      {/* Branding / Logo Section */}
      <div className="flex items-center justify-center my-6">
        <img src="./vite.svg" alt="App Logo" className="w-8 h-8" />
        <h2 className="text-2xl font-bold ml-2">SmartGPT</h2>
      </div>

      {/* Add New Chat Button */}
      <Button
        variant="outline"
        onClick={onCreateChat}
        className="w-full mb-3 text-gray-900 dark:bg-gray-100 active:scale-102 cursor-pointer"
      >
        <FaPlus className="mr-1" /> Add New Chat
      </Button>

      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search chats..."
        className="text-white placeholder:text-gray-300 selection:bg-orange-400 outline-none border-gray-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

// PropTypes for runtime type checking
SidebarHeader.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  onCreateChat: PropTypes.func.isRequired,
};

export default SidebarHeader;
