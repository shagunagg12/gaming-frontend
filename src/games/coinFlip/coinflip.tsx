import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring'; // or another animation lib
// Or use Lottie file with a coin flip animation

function CoinFlip({ onResult }: { onResult: (result: 'heads'|'tails') => void }) {
  const [flipping, setFlipping] = useState(false);
  const [side, setSide] = useState<"heads" | "tails" | null>(null);

  const { transform } = useSpring({
    to: { transform: flipping ? 'rotateY(720deg)' : 'rotateY(0deg)' },
    config: { tension: 180, friction: 20 },
    onRest: () => {
      // determine result
      const result = Math.random() < 0.5 ? 'heads' : 'tails';
      setSide(result);
      setFlipping(false);
      onResult(result);
    }
  });

  const flip = () => {
    setFlipping(true);
    setSide(null);
  }

  return (
    <div>
      <animated.div 
        style={{
          width: '200px',
          height: '200px',
          transformStyle: 'preserve-3d',
          transform,
        }}
      >
        {/* front face */}
        <div style={{
          backfaceVisibility: 'hidden',
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'url(/heads.png) center/cover'
        }} />
        {/* back face */}
        <div style={{
          backfaceVisibility: 'hidden',
          position: 'absolute',
          width: '100%',
          height: '100%',
          transform: 'rotateY(180deg)',
          background: 'url(/tails.png) center/cover'
        }} />
      </animated.div>

      <button onClick={flip} disabled={flipping}>Flip Coin</button>
      {side && <div>Result: {side.toUpperCase()}</div>}
    </div>
  );
}

export default CoinFlip;








import React, { useRef, useState } from "react";

// 3D Coin Flip component (React + TypeScript + Tailwind-ready)
// Drop this file into a React/Next project. Tailwind classes are used for layout,
// but the component works with plain CSS too — just keep the classNames or
// replace them with your own styles.

type CoinFlipProps = {
  size?: number; // diameter in px
};

export default function CoinFlip({ size = 200 }: CoinFlipProps) {
  const [rotation, setRotation] = useState(0); // accumulated degrees around Y
  const [isAnimating, setIsAnimating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  function flipCoin() {
    if (isAnimating) return;
    setIsAnimating(true);

    // random spins for a realistic feel
    const spins = Math.floor(Math.random() * 4) + 3; // 3..6 full spins
    // flip by 180 to switch face, plus spins*360 for the extra revolutions
    const additional = 180 + spins * 360;
    const newRotation = rotation + additional;

    setRotation(newRotation);

    // animation duration depends on spins
    const durationMs = 1200 + spins * 200;

    // compute result after animation completes
    setTimeout(() => {
      // each 180 degrees toggles face. If number of 180-degree steps is odd => tails
      const steps = Math.round(newRotation / 180);
      const face = steps % 2 === 0 ? "Heads" : "Tails";
      setResult(face);
      setIsAnimating(false);
    }, durationMs);
  }

  const diameter = size;
  const faceSize = diameter;
  const thickness = Math.max(6, Math.round(diameter * 0.08)); // visual thickness of rim

  const innerStyle: React.CSSProperties = {
    width: diameter,
    height: diameter,
    transition: `transform ${1200 + Math.floor(((rotation % 360) / 360) * 600)}ms cubic-bezier(.2,.9,.3,1)`,
    transformStyle: "preserve-3d",
    transform: `rotateY(${rotation}deg)`,
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative"
        style={{ width: diameter, height: diameter }}
      >
        {/* Perspective wrapper */}
        <div
          className="rounded-full shadow-xl"
          style={{ perspective: 1000, width: diameter, height: diameter }}
        >
          {/* Coin inner 3D */}
          <div
            ref={innerRef}
            className="absolute left-0 top-0 rounded-full overflow-visible"
            style={innerStyle}
          >
            {/* HEADS face (front) */}
            <div
              className="absolute inset-0 rounded-full flex items-center justify-center"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(0deg)",
                width: faceSize,
                height: faceSize,
                boxShadow: "inset -8px -8px 20px rgba(0,0,0,0.12)",
                background: "radial-gradient(circle at 30% 30%, #ffd966, #e6b800)",
                border: `${thickness / 6}px solid rgba(0,0,0,0.06)`,
              }}
            >
              {/* SVG head design */}
              <svg
                viewBox="0 0 200 200"
                width={faceSize * 0.85}
                height={faceSize * 0.85}
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="4" />
                <text x="100" y="115" textAnchor="middle" fontSize="68" fontFamily="serif" fill="#5b3a00">HEADS</text>
                <text x="100" y="145" textAnchor="middle" fontSize="14" fill="#5b3a00">(Eagle emblem)</text>
              </svg>
            </div>

            {/* TAILS face (back) */}
            <div
              className="absolute inset-0 rounded-full flex items-center justify-center"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                width: faceSize,
                height: faceSize,
                boxShadow: "inset -8px -8px 20px rgba(0,0,0,0.12)",
                background: "radial-gradient(circle at 30% 30%, #ffd966, #e6b800)",
                border: `${thickness / 6}px solid rgba(0,0,0,0.06)`,
              }}
            >
              {/* SVG tail design */}
              <svg
                viewBox="0 0 200 200"
                width={faceSize * 0.85}
                height={faceSize * 0.85}
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="4" />
                <text x="100" y="115" textAnchor="middle" fontSize="68" fontFamily="serif" fill="#5b3a00">TAILS</text>
                <text x="100" y="145" textAnchor="middle" fontSize="14" fill="#5b3a00">(Shield)</text>
              </svg>
            </div>

            {/* Rim (a thin rotated disk to simulate thickness). We'll render several thin slices to fake the rim */}
            {Array.from({ length: Math.max(4, Math.round(thickness / 2)) }).map((_, i) => {
              const knifeThickness = thickness / (Math.max(4, Math.round(thickness / 2)));
              const sliceOffset = i * knifeThickness - thickness / 2;
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: faceSize,
                    height: faceSize,
                    borderRadius: "50%",
                    transform: `rotateY(${90}deg) translateZ(${sliceOffset}px)`,
                    background: "linear-gradient(90deg,#c49100,#ffd966)",
                    opacity: 0.95,
                    boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
                    pointerEvents: "none",
                  }}
                  aria-hidden
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <button
          className={`px-4 py-2 rounded-md shadow-sm text-white ${isAnimating ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}`}
          onClick={flipCoin}
          disabled={isAnimating}
        >
          Flip
        </button>

        <div className="text-sm text-gray-700">
          {result ? (
            <span>
              Result: <strong>{result}</strong>
            </span>
          ) : (
            <span className="text-gray-500">Click flip to toss the coin</span>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Tip: click the coin area or the button while it’s not animating.
      </div>
    </div>
  );
}
