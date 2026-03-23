import { useState } from "react";
import { MdLabel } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
export default function Calculator() {
  // State to track the hovered button
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  // Button labels
  const buttonLabels = [
    ["7", "4", "1", "00"],
    ["8", "5", "2", "0"],
    ["9", "6", "3", "."],
    ["delete", "OK"],
  ];

  // Utility to handle dynamic background color
  const getButtonBgColor = (label: string) =>
    hoveredButton === label ? "#2e4250" : "#22313b";

  return (
    <div className="flex p-0.5 bg-[#0e1921] absolute w-[96%] gap-0.5 z-20 bottom-0">
      {/* Loop through columns */}
      {buttonLabels.map((column, colIndex) => (
        <div key={colIndex} className="flex w-full flex-col gap-0.5">
          {/* Loop through buttons in each column */}
          {column.map((label) => (
            <button
              key={label}
              onMouseEnter={() => setHoveredButton(label)}
              onMouseLeave={() => setHoveredButton(null)}
              className="text-white py-3 px-6"
              style={{ backgroundColor: getButtonBgColor(label) }}
            >
              {label === "delete" ? (
                <div className="flex relative py-0.5 justify-center items-center">
                <MdLabel size={20} />
                <div className="absolute">
                    <RxCross2 size={10} color="#0e1921"/>
                </div>
                </div>
              ) : (
                label
              )}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
