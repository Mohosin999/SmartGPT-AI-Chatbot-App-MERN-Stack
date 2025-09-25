import React from "react";
import ChatItem from "./ChatItem";

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
  if (!token)
    return (
      <p className="text-gray-400 text-center mt-4 h-full">
        Login to see your chats.
      </p>
    );
  if (chats?.length === 0)
    return (
      <p className="text-gray-400 text-center mt-4 h-full">No chats found.</p>
    );

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

export default ChatList;
