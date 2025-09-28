import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // Navigate to home page
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="bg-sky-950">
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
