import React from "react";
import { useTheme } from "@/hooks/useTheme";

const ThemeProvider = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      {/* Example toggle button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition"
      >
        {theme === "light" ? "🌞 Light" : "🌙 Dark"}
      </button>

      {children}
    </div>
  );
};

export default ThemeProvider;
