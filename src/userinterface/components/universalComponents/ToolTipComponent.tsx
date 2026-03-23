import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  tooltipText: string;
  children: React.ReactNode;
  trianglePosition?:string;
}

const TooltipComponent: React.FC<TooltipProps> = ({ tooltipText, children,trianglePosition }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipWidth = 150; // Approximate width of the tooltip; adjust this as necessary
      
      // Calculate initial position
      let left = rect.left + rect.width / 2;
      
      // Check if the tooltip overflows on the left side
      if (left - tooltipWidth / 2 < 0) {
        left = tooltipWidth / 2.9; // Align tooltip with the left edge
      }
      
      // Check if the tooltip overflows on the right side
      const rightOverflow = left + tooltipWidth / 2 - window.innerWidth;
      if (rightOverflow > 0) {
        left -= rightOverflow; // Align tooltip with the right edge
      }

      setTooltipPosition({
        top: rect.top - 10,
        left: left,
      });
    }
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <>
      <span
        className="cursor-pointer relative"
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </span>
      {tooltipVisible &&
        createPortal(
          <div
            style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
            className="fixed transform -translate-x-1/2 -translate-y-full mb-2 p-3 text-black font-extrabold text-[14px] bg-white rounded shadow-lg whitespace-nowrap z-50"
          > 
            <div className={`${trianglePosition} w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-white absolute -bottom-2 left-1/2  transform -translate-x-1/2`} />
            {tooltipText}
          </div>,
          document.body
        )}
    </>
  );
};

export default TooltipComponent;
