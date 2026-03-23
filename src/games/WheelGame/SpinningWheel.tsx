import React, { useRef, useState } from "react";
import "./Style.css"

const segmentColors = [
  "bg-green-500", "bg-slate-600", "bg-yellow-400", "bg-slate-600",
  "bg-green-500", "bg-slate-600", "bg-yellow-400", "bg-slate-600",
  "bg-green-500", "bg-purple-500", "bg-slate-600", "bg-green-500",
  "bg-yellow-400", "bg-slate-600", "bg-cyan-100", "bg-orange-400",
  "bg-slate-600", "bg-green-500"
];

const colorNames: Record<string, string> = {
  "bg-green-500": "Green",
  "bg-slate-600": "Slate",
  "bg-yellow-400": "Yellow",
  "bg-purple-500": "Purple",
  "bg-cyan-100": "Cyan",
  "bg-orange-400": "Orange"
};

const SpinningWheel: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [resultColor, setResultColor] = useState("");
  const spinning = useRef(false);

  const segmentAngle = 360 / segmentColors.length;

  const spin = () => {
    if (spinning.current) return;
    spinning.current = true;

    const extraDegrees = Math.floor(Math.random() * 360);
    const totalRotation = 360 * 5 + extraDegrees;

    setRotation(prev => prev + totalRotation);

    setTimeout(() => {
      const finalDeg = (rotation + totalRotation) % 360;
      const index = Math.floor(((360 - finalDeg + segmentAngle / 2) % 360) / segmentAngle);
      const rawColor = segmentColors[index];
      const color = colorNames[rawColor] || "Unknown";
      setResultColor(color);
      spinning.current = false;
    }, 5000);
  };





  
  return (
    <div className="flex  flex-col items-center justify-center mt-20">
      <div className="relative w-[300px] h-[300px] mb-6">
        {/* Pointer */}
        <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 z-10">
          <div className="w-4 h-4 rounded-full bg-red-400 relative">
            <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[16px] border-l-transparent border-r-transparent border-t-red-400 absolute top-full left-1/2 -translate-x-1/2" />
          </div>
        </div>

        {/* Wheel */}
        <div
          className="w-full h-full rounded-full border-[10px] border-[#1f2f3c] relative transition-transform duration-[5s] ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {segmentColors.map((color, i) => (
            <div
              key={i}
              className={`absolute top-1/2 left-1/2 w-[40px] h-[20px] ${color} origin-top-left rounded-[100px]`}
              style={{
                transform: `rotate(${i * segmentAngle}deg) translateY(-137px)`,
              }}
            />
          ))}
        </div>

        {/* Inner ring for effect */}
        <div className="absolute inset-[25%] rounded-full border border-[#1c2e3c]" />
      </div>

      {/* Spin Button */}
      <button
        onClick={spin}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Spin
      </button>

      {/* Result */}
      {resultColor && (
        <p className="text-white mt-4 text-lg">
          🎯 Result: <span className="font-bold">{resultColor}</span>
        </p>
      )}
    </div>
  );
};

export default SpinningWheel;
