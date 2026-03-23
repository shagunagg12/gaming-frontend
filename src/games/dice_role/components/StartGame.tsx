import React from "react";

import { Button } from "../components/styled";

interface StartGameProps {
  toggle: () => void;
}

const StartGame: React.FC<StartGameProps> = ({ toggle }) => {
  return (
    <div className="bg-[#0f212e] max-w-[1080px] h-full flex m-auto items-center justify-center">
      <div className="">
        <img src="/src/assets/gamesImages/dice_role/dices.svg" alt="dice game" />
      </div>
      <div className="content">
        <h1 className="text-[96px] whitespace-nowrap mr-5">Dice Game</h1>
        <Button onClick={toggle}>Play Now</Button>
      </div>
    </div>
  );
};

export default StartGame;

