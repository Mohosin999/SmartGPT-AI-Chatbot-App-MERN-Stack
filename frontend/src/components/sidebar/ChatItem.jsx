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
//             className="p-1 rounded-full hover:bg-sky-500 transition cursor-pointer"
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
//             <AlertDialogCancel className="px-3 py-1 rounded border text-sm cursor-pointer select-none">
//               Cancel
//             </AlertDialogCancel>
//             <AlertDialogAction
//               onClick={() => {
//                 onConfirmDelete(chat.id);
//                 setAlertOpen(false);
//               }}
//               className="bg-red-600 text-white px-3 py-1 rounded text-sm cursor-pointer select-none"
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

const ChatItem = ({
  chat,
  isSelected,
  onSelectChat,
  setChatToDelete,
  onConfirmDelete,
}) => {
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <li
      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition select-none ${
        isSelected ? "bg-sky-800" : "hover:bg-gray-700"
      }`}
    >
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
            className="p-1 rounded-full hover:bg-sky-500 transition cursor-pointer"
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
            <AlertDialogCancel className="px-3 py-1 rounded border text-sm cursor-pointer select-none">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onConfirmDelete(chat.id);
                setAlertOpen(false);
              }}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm cursor-pointer select-none"
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
