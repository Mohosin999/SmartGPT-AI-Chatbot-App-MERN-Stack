import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { IoMdLogIn } from "react-icons/io";

const SidebarFooter = ({ token, onLogout, onLogin }) => {
  return token ? (
    <div className="mt-4 border-gray-700 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2>Mohosin Hasan Akash</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-start text-xs cursor-pointer select-none">
                Settings
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  ) : (
    <Button
      variant="outline"
      onClick={onLogin}
      className="text-gray-900 w-full mt-4 active:scale-102 cursor-pointer"
    >
      <IoMdLogIn className="mr-1" /> Login
    </Button>
  );
};

export default SidebarFooter;
