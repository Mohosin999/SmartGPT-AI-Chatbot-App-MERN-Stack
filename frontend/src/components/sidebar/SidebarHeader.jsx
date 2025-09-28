import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaPlus } from "react-icons/fa6";
// import { useSelector } from "react-redux";
// import Loader from "../Loader";

const SidebarHeader = ({ searchTerm, setSearchTerm, onCreateChat }) => {
  // const { isCreating } = useSelector((state) => state.chat);

  return (
    <div>
      {/* {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Loader title={"Creating New Chat..."} />
        </div>
      )} */}

      {/* Header Section */}
      <div className="flex items-center justify-center my-5 pb-3 xl:mb-6">
        <img src="./vite.svg" alt="App Logo" className="w-8 h-8" />
        <h2 className="text-2xl font-bold ml-2">SmartGPT</h2>
      </div>

      {/* Actions Section */}
      <Button
        variant="outline"
        onClick={onCreateChat}
        className="w-full mb-3 text-gray-900 hover:bg-gray-200 hover:border-gray-200 active:scale-102 cursor-pointer select-none"
      >
        <FaPlus className="mr-1" /> Add New Chat
      </Button>

      <Input
        type="text"
        placeholder="Search chats..."
        className="text-white placeholder:text-gray-300 mb-3 selection:bg-orange-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SidebarHeader;
