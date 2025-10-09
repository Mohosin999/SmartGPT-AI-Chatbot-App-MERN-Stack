import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="bg-[#181818]">
      <div className="flex items-center justify-center h-screen">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
