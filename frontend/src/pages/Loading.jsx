import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Loading Component
 * -----------------
 * Displays a full-screen loading spinner and automatically redirects
 * the user to the home page ("/") after a short delay (1 second).
 *
 * Features:
 * 1. Full-screen centered spinner using Tailwind CSS.
 * 2. Automatically navigates to the home page after 1 second.
 * 3. Cleans up the timer on unmount to prevent memory leaks.
 *
 * Example Usage:
 * <Loading />
 */
const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Start a timer to navigate to home after 1 second
    const timer = setTimeout(() => {
      navigate("/"); // Navigate to home page
    }, 1000);

    // Cleanup timer if component unmounts before navigation
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="bg-sky-950">
      <div className="flex items-center justify-center h-screen">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
