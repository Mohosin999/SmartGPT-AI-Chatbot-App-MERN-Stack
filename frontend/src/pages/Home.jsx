import React, { useState } from "react";
import ContentArea from "@/components/ContentArea";
import { FiMenu, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";

/**
 * Home Component
 * --------------
 * This is the main layout of the SmartGPT application.
 * It includes:
 * 1. A responsive sidebar (visible on large screens, slide-in on small screens)
 * 2. A header with a menu button for small screens
 * 3. A main content area
 *
 * Features:
 * - Responsive sidebar:
 *   - Large screens: always visible
 *   - Small screens: slide-in with overlay, closes on clicking overlay or X button
 * - Header only visible on small screens with menu button
 * - Main content area adapts to the remaining width
 *
 * State:
 * - isSidebarOpen (boolean): Tracks if the sidebar is open on small screens
 *
 * Example Usage:
 * <Home />
 */
const Home = () => {
  // Controls sidebar visibility on small screens
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to close sidebar, passed to Sidebar component
  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* ------------------
          Header (small screens)
          - Menu button (opens sidebar)
          - App title
      ------------------ */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            className="bg-transparent text-gray-950 hover:bg-transparent shadow-none hover:text-orange-800 active:border-2 border-gray-900"
          >
            <FiMenu size={24} />
          </Button>

          <div className="flex items-center justify-center mx-auto">
            <h2 className="text-2xl font-bold ml-2">SmartGPT</h2>
          </div>
        </div>
      </header>

      {/* -------------------------------
          Main layout
          - Sidebar for large screens
          - Sidebar for small screens (slide-in)
          - Content area
      ------------------------------- */}
      <div className="flex flex-1">
        {/* Sidebar - Large screens */}
        <aside className="hidden lg:block w-1/4 bg-indigo-950 h-screen">
          <Sidebar />
        </aside>

        {/* Sidebar - Small screens (slide-in) */}
        <div
          className={`lg:hidden fixed inset-0 z-50 flex transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
              isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          {/* Sidebar panel */}
          <div className="relative w-64 bg-indigo-950 text-white h-full shadow-lg flex flex-col">
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-white hover:text-red-500"
              onClick={() => setIsSidebarOpen(false)}
            >
              <FiX size={20} />
            </button>

            <Sidebar handleSidebarClose={handleSidebarClose} />
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 lg:w-3/4">
          <ContentArea />
        </main>
      </div>
    </div>
  );
};

export default Home;
