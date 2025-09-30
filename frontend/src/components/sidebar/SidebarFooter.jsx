import React from "react";
import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { IoMdLogIn } from "react-icons/io";

/**
 * SidebarFooter Component
 * -----------------------
 * This component renders the footer section of the sidebar, which provides:
 * - User avatar and name if the user is logged in
 * - A settings dropdown with logout functionality
 * - A login button if the user is not logged in
 *
 * Features:
 * 1. Uses conditional rendering based on the presence of a `token` prop.
 * 2. Shows the user's avatar and name with a dropdown menu for settings and logout.
 * 3. Shows a login button when the user is not authenticated.
 *
 * Props:
 * @param {string} token - Authentication token; if present, shows user info and logout
 * @param {function} onLogout - Function to call when the user clicks logout
 * @param {function} onLogin - Function to call when the user clicks login
 *
 * Example Usage:
 * <SidebarFooter
 *   token={userToken}
 *   onLogout={handleLogout}
 *   onLogin={handleLogin}
 * />
 */
const SidebarFooter = ({ token, onLogout, onLogin }) => {
  return token ? (
    // User is logged in: show avatar, name, and settings dropdown
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
              <button className="text-start text-xs active:scale-102 cursor-pointer select-none">
                Settings
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={onLogout}
                className="cursor-pointer active:scale-105"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  ) : (
    // User is not logged in: show login button
    <Button
      variant="outline"
      onClick={onLogin}
      className="text-gray-900 w-full mt-4 active:scale-105 cursor-pointer"
    >
      <IoMdLogIn className="mr-1" /> Login
    </Button>
  );
};

// PropTypes for runtime type checking
SidebarFooter.propTypes = {
  token: PropTypes.string, // Authentication token; optional
  onLogout: PropTypes.func.isRequired, // Function to log out user
  onLogin: PropTypes.func.isRequired, // Function to log in user
};

export default SidebarFooter;
