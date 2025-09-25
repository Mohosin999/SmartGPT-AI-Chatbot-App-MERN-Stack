import React from "react";
import Sidebar from "@/components/Sidebar";
import ContentArea from "@/components/ContentArea";
import { FiMenu } from "react-icons/fi";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header for small/medium screens */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                className="bg-transparent text-gray-950 hover:bg-transparent shadow-none hover:text-orange-800 active:border-2 border-gray-900"
              >
                <FiMenu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-indigo-950 text-white">
              <Sidebar />
            </SheetContent>
          </Sheet>

          {/* Logo & Title */}
          <div className="flex items-center justify-center mx-auto">
            <img src="./vite.svg" alt="App Logo" className="w-8 h-8" />
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

        {/* ContentArea fills remaining space */}
        <main className="flex-1 lg:w-3/4">
          <ContentArea />
        </main>
      </div>
    </div>
  );
};

export default Home;
