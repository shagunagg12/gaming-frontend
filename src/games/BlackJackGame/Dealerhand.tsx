import type { Card as CardType } from "../BlackJackGame/types";
import { Card } from "../BlackJackGame/Card";
import { calculateHandValue } from "../BlackJackGame/utils";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import CardSpreadSound from "../../assets/sounds/CardSpreadSound.mp3";

interface DealerHandProps {
  hand: CardType[];
  msg:string;
  activeDealer:boolean
}

export function DealerHand({ hand, msg, activeDealer }: DealerHandProps) {
  const value = calculateHandValue(hand);
  const previousHandLength = useRef(hand.length); // Track previous card count
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize and preload audio
    const audio = new Audio(CardSpreadSound);
    audio.volume = 0.6;
    audio.preload = "auto";

    // Ensure audio plays without issues in all browsers
    audio.addEventListener("canplaythrough", () => {
      console.log("Audio preloaded successfully.");
    });

    audio.addEventListener("error", (e) => {
      console.error("Audio loading error:", e);
    });

    audioRef.current = audio;

    return () => {
      // Cleanup event listeners when the component unmounts
      audio.removeEventListener("canplaythrough", () => {});
      audio.removeEventListener("error", () => {});
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (hand.length > previousHandLength.current) {
      // Stop & reset audio before playing new one
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }

      // Play audio safely and catch errors
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => console.warn("Audio play failed:", err));
      }
    }

    previousHandLength.current = hand.length; // Update reference
  }, [hand.length]);

  const handleLastCardAnimationComplete = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col-reverse items-center mr-[100px] justify-center"
    >
      <div className="h-[150px] mr-[100px] flex items-start justify-center w-full mt-2 gap-2">
        {hand.map((card, index) => {
          const isNewCard = index === hand.length - 1 && hand.length > previousHandLength.current;

          return (
            <motion.div
              key={index}
              initial={isNewCard ? { x: 500, y: -80, opacity: 0, rotate: 10 } : {}}
              animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              transition={{
                duration: isNewCard ? 0.5 : 0,
                ease: "easeOut",
                delay: isNewCard ? 0.2 : 0,
              }}
              onAnimationComplete={isNewCard ? handleLastCardAnimationComplete : undefined}
            >
              <Card dealerMsg={msg} activeDealer={activeDealer} card={card} index={index} total={hand.length} />
            </motion.div>
          );
        })}
      </div>

      {value > 0 && (
        <motion.div
          key={value}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full flex ml-[200px] justify-center"
        >
          <div className="bg-[#4a5f75] px-5 py-1 w-fit rounded-full">
            <div className="text-[15px] font-bold">{value}</div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
