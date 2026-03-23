import React, { useState } from "react";
import { CgDice1, CgDice2, CgDice3, CgDice4, CgDice5, CgDice6 } from "react-icons/cg";
import styled, { keyframes } from "styled-components";

interface RoleDiceProps {
  roleDice: () => void;
  currentDice: number;
  rolling:boolean;
}

const RoleDice: React.FC<RoleDiceProps> = ({ roleDice, currentDice, rolling}) => {
  // const [rolling, setRolling] = useState<boolean>(false);
  // const [diceValue, setDiceValue] = useState<number>(currentDice);

  // const handleClick = () => {
  //   setRolling(true);
  //   roleDice();

  // };
  // const diceIcons = [
  //   <CgDice1 color="green" size={150} />,
  //   <CgDice2 color="green" size={150} />,
  //   <CgDice3 color="green" size={150} />,
  //   <CgDice4 color="green" size={150} />,
  //   <CgDice5 color="green" size={150} />,
  //   <CgDice6 color="green" size={150} />,
  // ];

  return (
    <DiceContainer>
      <div className={`dice  ${rolling ? "rolling" : ""}`}>
         <img
         className="w-52"
          src={`/src/assets/gamesImages/dice_role/dice_${currentDice}.svg`}
          alt={`dice ${currentDice}`}
        /> 

{/* 
      {diceIcons[currentDice - 1]} */}
      </div>
      {/* <p>Click on Bet to roll</p> */}
    </DiceContainer>

   
  );
};

export default RoleDice;

const rollDice = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(30deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-30deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const DiceContainer = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .dice {
    display: inline-block;
    transition: transform 0.2s ease;
  }

  .rolling {
    animation: ${rollDice} .2s ease-in-out;
  }

  p {
    font-size: 24px;
  }
`;
