import React from "react";
import { useLoading } from "../../../context/loadingContext";

const LoadingOverlay: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed top-0  left-0 w-screen h-screen bg-[#2a7a97]  flex justify-center items-center z-[500]">
      <div className="border-8 border-t-8 border-gray-300 border-t-blue-500 rounded-full w-24 h-24 animate-spin"></div>
    </div>
  );
};

export default LoadingOverlay;
