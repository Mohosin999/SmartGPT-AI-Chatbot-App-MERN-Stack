// import React, { useRef, useEffect } from "react";
// import ChatInput from "./ui/ChatInput";
// import { useDispatch, useSelector } from "react-redux";
// import Message from "./Message";

// import {
//   createChat,
//   createMessage,
//   getChatById,
//   updateChatName,
//   addChatToAllChats,
//   createImage,
// } from "@/features/chat/chatSlice";
// import toast from "react-hot-toast";
// import Loader from "./Loader";

// const ContentArea = () => {
//   const { currentChat, isGenerating } = useSelector((state) => state.chat);
//   const messagesEndRef = useRef(null);
//   const chatContainerRef = useRef(null);
//   const chatInputRef = useRef(null);
//   const dispatch = useDispatch();

//   const token = localStorage.getItem("token");

//   // Scroll to bottom after messages + images have loaded
//   useEffect(() => {
//     if (!chatContainerRef.current) return;

//     const scrollToBottom = () => {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     // Find all images in the chat container
//     const images = chatContainerRef.current.querySelectorAll("img");
//     if (images.length === 0) {
//       scrollToBottom();
//       return;
//     }

//     let loadedCount = 0;
//     images.forEach((img) => {
//       if (img.complete) {
//         loadedCount++;
//       } else {
//         img.addEventListener("load", () => {
//           loadedCount++;
//           if (loadedCount === images.length) scrollToBottom();
//         });
//         img.addEventListener("error", () => {
//           loadedCount++;
//           if (loadedCount === images.length) scrollToBottom();
//         });
//       }
//     });

//     if (loadedCount === images.length) scrollToBottom();
//   }, [currentChat?.data?.messages]);

//   // // Focus chat input when token exists
//   // useEffect(() => {
//   //   if (token) chatInputRef.current?.focus();
//   // }, [token, currentChat?.data?.messages]);

//   // Focus chat input when token exists, chat updates, or generation stops
//   useEffect(() => {
//     if (!token) return;

//     // Only focus if not generating
//     if (currentChat?.data?.messages.length === 0) {
//       chatInputRef.current?.focus();
//     }
//   }, [token, currentChat?.data?.messages, isGenerating]);

//   const handleSend = async (text, isImage) => {
//     if (!token) return;

//     let currentChatId = currentChat?.data?.id;

//     if (!currentChatId) {
//       const res = await dispatch(createChat({}));
//       if (res.meta.requestStatus === "fulfilled") {
//         currentChatId = res.payload.data.id;
//         dispatch(addChatToAllChats(res.payload.data));
//       }
//     }

//     if (isImage) {
//       const imageRes = await dispatch(
//         createImage({
//           chatId: currentChatId,
//           prompt: text.trim(),
//           isPublished: false,
//         })
//       );

//       if (imageRes.meta.requestStatus === "fulfilled") {
//         await dispatch(getChatById(currentChatId));
//       } else {
//         toast.error("Limit reached. Please try again later.");
//       }
//     } else {
//       const messageRes = await dispatch(
//         createMessage({ prompt: text.trim(), chatId: currentChatId })
//       );

//       if (messageRes.meta.requestStatus === "fulfilled") {
//         const chatRes = await dispatch(getChatById(currentChatId));

//         const firstMessageText =
//           chatRes.payload?.data?.messages?.[0]?.content
//             ?.split(" ")
//             .splice(0, 4)
//             .join(" ") || "Untitled Chat";

//         dispatch(
//           updateChatName({
//             chatId: currentChatId,
//             chatName: firstMessageText,
//           })
//         );
//       }
//     }

//     chatInputRef.current?.focus();
//   };

//   return (
//     <div className="h-screen flex flex-col relative">
//       {/* Chat messages or placeholder */}
//       <div
//         className="flex-1 flex flex-col overflow-y-auto mt-16 lg:mt-4 mb-4"
//         ref={chatContainerRef}
//       >
//         <div className="px-4 xl:pr-1 relative flex-1">
//           {!token ? (
//             <div className="absolute inset-0 flex flex-col items-center justify-center">
//               <img src="./vite.svg" alt="Logo" className="w-30 h-30 mb-4" />
//               <h2 className="text-4xl md:text-5xl px-4 md:px-0 font-semibold text-gray-800 mb-10">
//                 Ask me anything
//               </h2>
//             </div>
//           ) : currentChat?.data?.messages?.length > 0 ? (
//             <div className="flex flex-col space-y-2 w-full md:max-w-2xl xl:max-w-3xl mx-auto mt-4">
//               {currentChat.data.messages.map((msg) => (
//                 <Message key={msg.id} msg={msg} />
//               ))}
//               <div ref={messagesEndRef} />
//             </div>
//           ) : (
//             <div className="absolute inset-0 flex flex-col items-center justify-center">
//               <img src="./vite.svg" alt="Logo" className="w-30 h-30 mb-4" />
//               <h2 className="text-4xl md:text-5xl px-4 md:px-0 font-semibold text-gray-800 mb-10">
//                 Ask me anything
//               </h2>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Chat input */}
//       <div className="w-full md:max-w-2xl xl:max-w-3xl mx-auto pb-4">
//         <ChatInput ref={chatInputRef} onSend={handleSend} />
//       </div>

//       {/* Full-screen loader overlay */}
//       {isGenerating && <Loader title="Generating response..." />}
//     </div>
//   );
// };

// export default React.memo(ContentArea);

import React, { useRef, useEffect } from "react";
import ChatInput from "./ui/ChatInput";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";

import {
  createChat,
  createMessage,
  getChatById,
  updateChatName,
  addChatToAllChats,
  createImage,
} from "@/features/chat/chatSlice";
import toast from "react-hot-toast";
import Loader from "./Loader";

const ContentArea = () => {
  const { currentChat, isGenerating } = useSelector((state) => state.chat);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const chatInputRef = useRef(null);
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  // Scroll to bottom after messages + images have loaded
  useEffect(() => {
    if (!chatContainerRef.current) return;

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Find all images in the chat container
    const images = chatContainerRef.current.querySelectorAll("img");
    if (images.length === 0) {
      scrollToBottom();
      return;
    }

    let loadedCount = 0;
    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener("load", () => {
          loadedCount++;
          if (loadedCount === images.length) scrollToBottom();
        });
        img.addEventListener("error", () => {
          loadedCount++;
          if (loadedCount === images.length) scrollToBottom();
        });
      }
    });

    if (loadedCount === images.length) scrollToBottom();
  }, [currentChat?.data?.messages]);

  // // Focus chat input when token exists
  // useEffect(() => {
  //   if (token) chatInputRef.current?.focus();
  // }, [token, currentChat?.data?.messages]);

  // Focus chat input when token exists, chat updates, or generation stops
  useEffect(() => {
    if (!token) return;

    // Only focus if not generating
    if (currentChat?.data?.messages.length === 0) {
      chatInputRef.current?.focus();
    }
  }, [token, currentChat?.data?.messages, isGenerating]);

  const handleSend = async (text, isImage) => {
    if (!token) return;

    let currentChatId = currentChat?.data?.id;

    if (!currentChatId) {
      const res = await dispatch(createChat({}));
      if (res.meta.requestStatus === "fulfilled") {
        currentChatId = res.payload.data.id;
        dispatch(addChatToAllChats(res.payload.data));
      }
    }

    if (isImage) {
      const imageRes = await dispatch(
        createImage({
          chatId: currentChatId,
          prompt: text.trim(),
          isPublished: false,
        })
      );

      if (imageRes.meta.requestStatus === "fulfilled") {
        await dispatch(getChatById(currentChatId));
      } else {
        toast.error("Limit reached. Please try again later.");
      }
    } else {
      const messageRes = await dispatch(
        createMessage({ prompt: text.trim(), chatId: currentChatId })
      );

      if (messageRes.meta.requestStatus === "fulfilled") {
        const chatRes = await dispatch(getChatById(currentChatId));

        const firstMessageText =
          chatRes.payload?.data?.messages?.[0]?.content
            ?.split(" ")
            .splice(0, 4)
            .join(" ") || "Untitled Chat";

        dispatch(
          updateChatName({
            chatId: currentChatId,
            chatName: firstMessageText,
          })
        );
      }
    }

    chatInputRef.current?.focus();
  };

  return (
    <div className="h-screen flex flex-col relative">
      {/* Chat messages or placeholder */}
      <div
        className="flex-1 flex flex-col overflow-y-auto mt-16 lg:mt-4 mb-4"
        ref={chatContainerRef}
      >
        <div className="px-4 xl:pr-1 relative flex-1">
          {!token ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img src="./vite.svg" alt="Logo" className="w-30 h-30 mb-4" />
              <h2 className="text-4xl md:text-5xl px-4 md:px-0 font-semibold text-gray-800 mb-10">
                Ask me anything
              </h2>
            </div>
          ) : currentChat?.data?.messages?.length > 0 ? (
            <div className="flex flex-col space-y-2 w-full md:max-w-2xl xl:max-w-3xl mx-auto mt-4">
              {currentChat.data.messages.map((msg) => (
                <Message key={msg.id} msg={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img src="./vite.svg" alt="Logo" className="w-30 h-30 mb-4" />
              <h2 className="text-4xl md:text-5xl px-4 md:px-0 font-semibold text-gray-800 mb-10">
                Ask me anything
              </h2>
            </div>
          )}
        </div>
      </div>

      {/* Chat input */}
      <div className="w-full md:max-w-2xl xl:max-w-3xl mx-auto pb-4">
        <ChatInput ref={chatInputRef} onSend={handleSend} />
      </div>

      {/* Full-screen loader overlay */}
      {isGenerating && <Loader title="Generating full response..." />}
    </div>
  );
};

export default React.memo(ContentArea);
