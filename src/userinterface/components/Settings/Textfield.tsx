import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showIcon?: JSX.Element;
  hideIcon?: JSX.Element;
}

const TextField: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder,
  showIcon,
  hideIcon,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative">
      <input
        type={isVisible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Enter password"}
        className="w-full px-4 py-2 text-white  rounded-md bg-[#102636] hover:bg-[#1b3648] focus:ring-2 focus:ring-[#6e8190] border-[#6e8190] shadow-md"
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute inset-y-0 right-3 flex items-center"
      >
        {isVisible ? hideIcon || <DefaultHideIcon /> : showIcon || <DefaultShowIcon />}
      </button>
    </div>
  );
};

const DefaultShowIcon = () => (
    <FaEye />
);

const DefaultHideIcon = () => (
    <FaEyeSlash />
);

export default TextField;