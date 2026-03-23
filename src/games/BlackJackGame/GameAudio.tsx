import React, { useEffect, useState } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

interface GameAudioProps {
  audioFile: string;
}

const GameAudio: React.FC<GameAudioProps> = ({ audioFile }) => {
  const [isMuted, setIsMuted] = useState<boolean>(false); // Ensure audio is unmuted initially
  const [volume, setVolume] = useState<number>(0.5);
  const [audio] = useState(new Audio(audioFile));
  const [isvolume, setisVolume] = useState<boolean>(false);
  useEffect(() => {
    audio.loop = true;
    audio.volume = volume;
    audio.muted = isMuted;

    const playAudio = async () => {
      try {
        await audio.play();
        console.log("Audio started instantly!");
      } catch (error) {
        console.warn("Autoplay blocked. Waiting for user interaction...");
      }
    };

    // Try playing immediately
    playAudio();

    // Add event listener in case autoplay is blocked
    const enableAudio = () => {
      playAudio();
      document.removeEventListener("click", enableAudio);
    };

    document.addEventListener("click", enableAudio);

    return () => {
      document.removeEventListener("click", enableAudio);
    };
  }, []);

  useEffect(() => {
    audio.volume = volume;
    audio.muted = isMuted;

    if (!isMuted) {
      audio.play().catch(() => console.warn("Play blocked again!"));
    }
  }, [volume, isMuted]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div onMouseLeave={()=>setisVolume(false)} onMouseEnter={()=>setisVolume(true)} className="w-[200px] cursor-pointer space-x-3 p-2 flex justify-end items-center">
      <button onClick={toggleMute} className="text-white">
        {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
      </button>
      {isvolume&&
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={isMuted ? 0 : volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="cursor-pointer"
      />}
    </div>
  );
};

export default GameAudio;
