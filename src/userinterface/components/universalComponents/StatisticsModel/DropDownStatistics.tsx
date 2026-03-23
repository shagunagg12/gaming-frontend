import React, { useState, useEffect, useRef } from "react";

export interface MenuItem {
  title: string;
  image?: any; // Optional image
}

interface DropdownStatisticsProps {
  buttonText: string;
  menuItems: MenuItem[];
  onItemClick?: (item: MenuItem) => void; // Optional callback for item click
}

const DropdownStatistics: React.FC<DropdownStatisticsProps> = ({
  buttonText,
  menuItems,
  onItemClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>(buttonText); // Initialize state with buttonText
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item.title); // Update the selected item
    if (onItemClick) onItemClick(item); // Trigger callback if provided
    setIsOpen(false); // Close dropdown
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedItem(buttonText); // Sync with updated prop if buttonText changes
  }, [buttonText]);
  const getRandomColor = () => {
    const letters = '89ABCDEF'; // Limit the range to light colors by choosing lighter hex values
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };
  
  
  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={toggleDropdown}
        className="bg-[#0f212e] text-white text-[13px] font-medium py-2 px-4 rounded-md flex items-center justify-between focus:outline-none w-full"
      >
        {selectedItem} {/* Display the selected item */}
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="relative">
          {/* Arrow */}
          <div className="absolute top-3 left-4 transform -translate-y-1/2 w-3 h-3 bg-white rotate-45 z-10"></div>

          {/* Dropdown Menu */}
          <div
            className="absolute left-0 mt-2 max-h-[180px] w-full overflow-auto scrollbar-thin scrollbar-thumb-[#339742] scrollbar-track-[#99ffa8] bg-white shadow-lg rounded-md z-10"
          >
            <ul className="py-2 text-sm text-black font-semibold">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-1 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleItemClick(item)} // Moved this click handler here for better control
                >
                  {/* Handle optional image */}
                  {item.image && (
                     <div
                     className="p-1 rounded-full"
                     style={{ backgroundColor: getRandomColor() }} // Apply random background color
                   >
                     <item.image size={12} />
                   </div>
                  )}
                  <span className="text-left">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownStatistics;