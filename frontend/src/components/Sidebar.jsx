import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/features/auth/authSlice";
import {
  createChat,
  deleteChatById,
  getAllChats,
  getChatById,
  updateChatName,
  addChatToAllChats,
} from "@/features/chat/chatSlice";
import SidebarFooter from "./sidebar/SidebarFooter";
import ChatList from "./sidebar/ChatList";
import SidebarHeader from "./sidebar/SidebarHeader";

const Sidebar = ({ handleSidebarClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allChats, currentChat } = useSelector((state) => state.chat);
  const token = localStorage.getItem("token") || "";

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [chatToDelete, setChatToDelete] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);

  // Optimize the expensive title sync effect
  useEffect(() => {
    if (!token) return;

    const syncChatTitles = async () => {
      const res = await dispatch(getAllChats());
      if (res?.meta?.requestStatus !== "fulfilled") return;

      const chats = res.payload?.data || [];

      // Batch updates instead of sequential requests
      const syncPromises = chats.map(async (chat) => {
        const name = chat?.name ?? "";
        const needsName =
          !name ||
          name.trim() === "" ||
          name.toLowerCase().includes("new chat") ||
          name.toLowerCase().includes("untitled");

        if (!needsName) return;

        try {
          const chatDetailRes = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/chats/${chat.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const fullChat =
            chatDetailRes?.data?.data || chatDetailRes?.data || {};
          const firstMsg = fullChat?.messages?.[0]?.content || "";
          const derivedTitle =
            firstMsg.split(" ").slice(0, 4).join(" ") || "Untitled Chat";

          // Batch this update instead of immediate dispatch
          return { chatId: chat.id, title: derivedTitle };
        } catch (err) {
          console.error("Error syncing chat title:", err);
          return null;
        }
      });

      const results = await Promise.all(syncPromises);
      const validResults = results.filter(Boolean);

      // Batch dispatch updates
      validResults.forEach(({ chatId, title }) => {
        dispatch(updateChatName({ chatId, chatName: title }));
      });
    };

    syncChatTitles();
  }, [dispatch, token]);

  // Handlers
  const handleCreateChat = async () => {
    if (!token) return navigate("/login");
    // Close sidebar
    if (handleSidebarClose) handleSidebarClose();

    const res = await dispatch(createChat({}));
    if (res.meta.requestStatus === "fulfilled") {
      const chatData = res.payload.data;
      dispatch(addChatToAllChats(chatData));
      await dispatch(getChatById(chatData.id));

      const firstMessageText =
        chatData.messages?.[0]?.content || "Untitled Chat";

      dispatch(
        updateChatName({ chatId: chatData.id, chatName: firstMessageText })
      );

      try {
        await axios.patch(
          `${import.meta.env.VITE_BASE_URL}/chats/${chatData.id}`,
          { name: firstMessageText },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Failed to persist chat name:", err);
      }
    }
  };

  const handleGetChatById = (chatId) => {
    if (!token) return navigate("/login");
    dispatch(getChatById(chatId));
    // Close sidebar
    if (handleSidebarClose) handleSidebarClose();
  };

  const handleConfirmDeleteChat = async () => {
    if (!chatToDelete) return;
    const chatId = chatToDelete.id;
    setAlertOpen(false);
    setChatToDelete(null);

    const res = await dispatch(deleteChatById(chatId));
    if (res.meta.requestStatus === "fulfilled") {
      if (currentChat?.data?.id === chatId) {
        const remainingChats = allChats?.data?.filter((c) => c.id !== chatId);
        if (remainingChats?.length > 0) {
          dispatch(getChatById(remainingChats[0].id));
        }
      }
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/loading");
  };

  const filteredChats = allChats?.data?.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen p-3 xl:p-4 bg-sky-950 text-white">
      <SidebarHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onCreateChat={handleCreateChat}
      />

      <ChatList
        token={token}
        chats={filteredChats}
        currentChat={currentChat}
        onSelectChat={handleGetChatById}
        chatToDelete={chatToDelete}
        setChatToDelete={setChatToDelete}
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        onConfirmDelete={handleConfirmDeleteChat}
      />
      <SidebarFooter
        token={token}
        onLogout={handleLogout}
        onLogin={() => navigate("/login")}
      />
    </div>
  );
};

export default React.memo(Sidebar);
