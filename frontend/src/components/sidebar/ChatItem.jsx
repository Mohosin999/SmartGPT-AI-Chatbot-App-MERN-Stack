// import React, { useState } from "react";
// import { BsThreeDots } from "react-icons/bs";
// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogAction,
//   AlertDialogCancel,
// } from "@/components/ui/alert-dialog";

// const ChatItem = ({
//   chat,
//   isSelected,
//   onSelectChat,
//   setChatToDelete,
//   onConfirmDelete,
// }) => {
//   const [alertOpen, setAlertOpen] = useState(false);

//   return (
//     <li
//       className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition select-none ${
//         isSelected ? "bg-sky-800" : "hover:bg-gray-700"
//       }`}
//     >
//       <span className="flex-1" onClick={() => onSelectChat(chat.id)}>
//         {chat.name}
//       </span>

//       <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
//         <AlertDialogTrigger asChild>
//           <span
//             onClick={(e) => {
//               e.stopPropagation();
//               setChatToDelete(chat);
//               setAlertOpen(true);
//             }}
//             className="p-1 rounded-full hover:bg-sky-500 active:scale-105 transition cursor-pointer"
//           >
//             <BsThreeDots />
//           </span>
//         </AlertDialogTrigger>

//         <AlertDialogContent className="w-96 !p-4">
//           <AlertDialogHeader>
//             <AlertDialogTitle className="text-base font-medium">
//               Delete Chat
//             </AlertDialogTitle>
//             <AlertDialogDescription className="text-sm mt-1">
//               Are you sure you want to delete this chat? This action cannot be
//               undone.
//             </AlertDialogDescription>
//           </AlertDialogHeader>

//           <div className="flex justify-end gap-2 mt-4">
//             <AlertDialogCancel className="px-3 py-1 rounded border text-sm cursor-pointer select-none active:scale-105">
//               Cancel
//             </AlertDialogCancel>
//             <AlertDialogAction
//               onClick={() => {
//                 onConfirmDelete(chat.id);
//                 setAlertOpen(false);
//               }}
//               className="bg-red-600 text-white px-3 py-1 rounded text-sm cursor-pointer select-none active:scale-105"
//             >
//               Delete
//             </AlertDialogAction>
//           </div>
//         </AlertDialogContent>
//       </AlertDialog>
//     </li>
//   );
// };

// export default ChatItem;

import React, { useState } from "react";
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
import Loader from "../Loader";

const ChatItem = ({
  chat,
  isSelected,
  onSelectChat,
  setChatToDelete,
  onConfirmDelete,
}) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (chatId) => {
    setLoading(true); // show loader
    try {
      await onConfirmDelete(chatId); // call parent delete function
    } finally {
      setLoading(false); // hide loader
      setAlertOpen(false);
    }
  };

  return (
    <li
      className={`relative flex items-center justify-between p-2 rounded-lg cursor-pointer transition select-none ${
        isSelected ? "bg-sky-800" : "hover:bg-gray-700"
      }`}
    >
      {/* Full-screen Loader */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Loader title={"Deleting..."} />
        </div>
      )}

      <span className="flex-1" onClick={() => onSelectChat(chat.id)}>
        {chat.name}
      </span>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogTrigger asChild>
          <span
            onClick={(e) => {
              e.stopPropagation();
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
              onClick={() => handleDelete(chat.id)}
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

export default ChatItem;
