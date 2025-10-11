import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { IoMdLogIn } from "react-icons/io";
import { LogOut } from "lucide-react";
import { Switch } from "../ui/switch";

const SidebarFooter = ({ token, onLogout, onLogin }) => {
  const [alertOpen, setAlertOpen] = useState(false);

  // Theme state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex flex-col gap-2 border-t border-gray-700">
      {/* Theme switch */}
      {/* <div className="flex items-center justify-between mt-2">
        <span className="text-sm font-semibold text-[#48A4FF]">
          {theme === "light" ? "Dark Theme" : "Light Theme"}
        </span>
        <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
      </div> */}
      <div className="flex items-center justify-between mt-2 p-2 bg-gray-800 dark:bg-gray-700 rounded-lg shadow-sm transition-colors duration-300">
        <span
          className="text-sm font-semibold text-[#48A4FF] transition-all duration-300 ease-in-out transform"
          style={{
            transitionProperty: "opacity, transform",
            opacity: theme === "light" ? 1 : 1,
            transform:
              theme === "light" ? "translateY(0px)" : "translateY(0px)",
          }}
        >
          {theme === "light" ? "Dark Theme" : "Light Theme"}
        </span>
        <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mb-2"></div>

      {token ? (
        // Logged-in view
        <div className="border-gray-700 flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_LnhwLXP1Ue8GYWenpakaD7tOQH-kjtRUSA&s" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h2>Mohosin Hasan Akash</h2>

              {/* Logout Confirmation Dialog */}
              <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogTrigger asChild>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setAlertOpen(true);
                    }}
                    className="text-xs text-start text-gray-300 cursor-pointer active:scale-105 select-none flex items-center gap-1"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </AlertDialogTrigger>

                <AlertDialogContent className="w-96 !p-4">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-base font-medium">
                      Log Out
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm lg:text-base text-gray-700 dark:text-gray-400 mt-1">
                      Are you sure you want to log out? You’ll need to log in
                      again to access your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <div className="flex justify-end gap-2 mt-4">
                    <AlertDialogCancel className="px-3 py-1 rounded border text-sm cursor-pointer select-none active:scale-105">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        onLogout();
                        setAlertOpen(false);
                      }}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm cursor-pointer select-none active:scale-105"
                    >
                      Logout
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      ) : (
        // Logged-out view
        <Button
          variant="outline"
          onClick={onLogin}
          className="text-gray-900 dark:bg-gray-100 w-full mb-6 active:scale-105 cursor-pointer"
        >
          <IoMdLogIn className="mr-1" /> Login
        </Button>
      )}
    </div>
  );
};

SidebarFooter.propTypes = {
  token: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default SidebarFooter;
