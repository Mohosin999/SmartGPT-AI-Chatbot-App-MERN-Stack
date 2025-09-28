import React, { useState } from "react";
import ContentArea from "@/components/ContentArea";
import { FiMenu, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader";
import Sidebar from "@/components/Sidebar";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isCreating } = useSelector((state) => state.chat);

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Loading Indicator for creating new chat */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Loader title={"Creating New Chat..."} />
        </div>
      )}

      {/* Fixed Header for small/medium screens */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Menu Button */}
          <Button
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            className="bg-transparent text-gray-950 hover:bg-transparent shadow-none hover:text-orange-800 active:border-2 border-gray-900"
          >
            <FiMenu size={24} />
          </Button>

          {/* Logo & Title */}
          <div className="flex items-center justify-center mx-auto">
            {/* <img src="./vite.svg" alt="App Logo" className="w-8 h-8" /> */}
            <h2 className="text-2xl font-bold ml-2">SmartGPT</h2>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar for lg+ screens */}
        <aside className="hidden lg:block w-1/4 bg-indigo-950 h-screen">
          <Sidebar />
        </aside>

        {/* Sidebar Drawer for mobile */}
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

          {/* Sliding Sidebar */}
          <div className="relative w-64 bg-indigo-950 text-white h-full shadow-lg flex flex-col">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-white hover:text-red-500"
              onClick={() => setIsSidebarOpen(false)}
            >
              <FiX size={20} />
            </button>

            <Sidebar handleSidebarClose={handleSidebarClose} />
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 lg:w-3/4">
          <ContentArea />
        </main>
      </div>
    </div>
  );
};

export default Home;
