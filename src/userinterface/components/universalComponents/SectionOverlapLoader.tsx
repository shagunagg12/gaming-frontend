import React from "react";

interface SectionOverlapLoaderProps {
  show: boolean;
  text?: string;
  blurBackground?: boolean;
  overlayColor?: string;
  spinnerColor?: string;
  size?: "sm" | "md" | "lg";
  className?: string; // additional classNames for custom position/sizing
}

const sizeClasses = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-4",
  lg: "w-10 h-10 border-4",
};

const SectionOverlapLoader: React.FC<SectionOverlapLoaderProps> = ({
  show,
  text = "",
  blurBackground = false,
  overlayColor = "bg-black/40",
  spinnerColor = "border-white",
  size = "md",
  className = "",
}) => {
  if (!show) return null;

  return (
    <div
      className={`absolute  inset-0 z-40 flex rounded-lg items-center justify-center ${overlayColor} ${
        blurBackground ? "backdrop-blur-sm" : ""
      } ${className}`}
    >
      <div className="flex flex-col items-center space-y-2">
        <div
          className={`animate-spin rounded-full border-t-transparent ${spinnerColor} ${sizeClasses[size]}`}
        />
        {text && <span className="text-white text-xs">{text}</span>}
      </div>
    </div>
  );
};

export default SectionOverlapLoader;
