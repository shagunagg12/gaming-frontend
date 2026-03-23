import type { Card as CardType } from "../BlackJackGame/types";
import { Card } from "../BlackJackGame/Card";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import CardSpreadSound from "../../assets/sounds/CardSpreadSound.mp3";

interface PlayerHandProps {
  hand: CardType[];
  activePlayer: boolean;
  value: number;
  msg:string;
}

export function PlayerHand({ hand, msg, activePlayer, value }: PlayerHandProps) {
  const prevHandLength = useRef(hand.length);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playSoundTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize audio
    if (!audioRef.current) {
      audioRef.current = new Audio(CardSpreadSound);
      audioRef.current.volume = 0.6;
      audioRef.current.preload = "auto";
    }
  }, []);

  useEffect(() => {
    if (hand.length > prevHandLength.current && audioRef.current) {
      // Clear any previous timeout before playing sound
      if (playSoundTimeout.current) clearTimeout(playSoundTimeout.current);

      // Play sound with a slight delay to sync with card animation
      playSoundTimeout.current = setTimeout(() => {
        if (audioRef.current) { // Check if audioRef.current is not null
          audioRef.current.currentTime = 0; // Reset audio to start
          audioRef.current.play().catch((err) => console.warn("Audio play failed:", err));
        }
      }, 150);
    }
    prevHandLength.current = hand.length; // Update previous hand count

    // Cleanup sound timeout on unmount
    return () => {
      if (playSoundTimeout.current) clearTimeout(playSoundTimeout.current);
    };
  }, [hand.length]);

  const handleLastCardAnimationComplete = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      key={value}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center mt-10 mr-[100px] justify-center gap-4"
    >
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
      <div className="flex flex-col-reverse items-center justify-center mr-[100px]">
        <div className="h-[150px] flex items-start justify-center w-full mt-2 gap-2">
          {hand.map((card, index) => (
            <motion.div
              key={index}
              initial={
                index === hand.length - 1 && prevHandLength.current < hand.length
                  ? { x: 500, y: -550, opacity: 0, rotate: -10 }
                  : {}
              }
              animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index === hand.length - 1 ? 0.2 : 0,
              }}
              onAnimationComplete={
                index === hand.length - 1 ? handleLastCardAnimationComplete : undefined
              }
            >
              <Card playerMsg={msg} activePlayer={activePlayer} card={card} index={index} total={hand.length} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}