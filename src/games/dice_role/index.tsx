import React, { useRef, useState } from "react";
import styled from "styled-components";
import NumberSelector from "./components/NumberSelector";
import TotalScore from "./components/TotalScore";
import RoleDice from "./components/RoleDice";
import { Button, OutlineButton } from "./components/styled";
import Rules from "./components/Rules";
import BetCalculator from "../../userinterface/components/CasinoComponents/BetCalculator";
import win_sound from '../../assets/sounds/win-sound.mp3'
import dice_spin from '../../assets/sounds/dice_spins.mp3'
import { useUserInfo } from "../../context/UserInfoContext";
import { AuthContext, useAuth } from "../../context/authContext";
import { useDialog } from "../../context/DialogContext";


interface Score {
  value: number;
  isWin: boolean;
}
const GamePlay: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [selectedNumber, setSelectedNumber] = useState<number | undefined>(undefined);
  const [currentDice, setCurrentDice] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [showRules, setShowRules] = useState<boolean>(false);
  const [rolling, setRolling] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioRefDice = useRef<HTMLAudioElement>(null);
  const [lastFiveScores, setLastFiveScores] = useState<Score[]>([]);

  const generateRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const {betAmt, setBetAmt, userWalletBalance, setUserWalletBalance} = useUserInfo()
  const {isLoggedIn} = useAuth()
  const {openSigninDialog} = useDialog()
  console.log(betAmt, userWalletBalance);
  
  const roleDice = () => {

    if (!isLoggedIn ) {
      openSigninDialog()
      return;
    }
    
    if (!selectedNumber) {
      setError("You have not selected any number");
      return;
    }

    if (betAmt <= 0 || betAmt > userWalletBalance) {
      setError("You don't have enough balance");
      return;
    }
   
    const randomNumber = generateRandomNumber(1, 7);
    const isWin = selectedNumber === randomNumber;
    setCurrentDice(randomNumber);

    setLastFiveScores((prevScores) => {
      const updatedScores = [...prevScores, { value: randomNumber, isWin }];
      return updatedScores.slice(-5); // Keep only the last 5 rolls
    });

    if (selectedNumber === randomNumber) {
      
      setResult('Won')
      audioRef.current?.play(); // Play sound if the user wins
      audioRefDice.current?.play(); 
      setUserWalletBalance(userWalletBalance + betAmt * 3)     
    } else {
      setResult('Lost')
      audioRefDice.current?.play();
      setUserWalletBalance(userWalletBalance - betAmt)    
    }

    setSelectedNumber(undefined);
    if (rolling) return; // Prevent multiple clicks during animation
  
    setRolling(true);

    // Simulate dice roll and delay updating the face until animation ends
    setTimeout(() => {
      setRolling(false);
    }, 200);
  };

  const resetScore = () => {
    setScore(0);
  };

  return (
    <div className="grid grid-cols-12 h-full grid-flow-col ">
    <MainContainer className="bg-[#0f212e] h-full col-span-9">
  
    <ul className="flex justify-center gap-4 mt-4">
  {lastFiveScores.map((score, index) => (
    <li
      key={index}
      className="flex items-center justify-center w-10 h-10 rounded-full text-white"
      style={{
        backgroundColor: score.isWin ? "green" : "gray",
      }}
    >
      {score.value}
    </li>
  ))}
</ul>

      <RoleDice rolling={rolling} currentDice={currentDice} roleDice={roleDice} />
      <div className="top_section  mt-32">
        {/* <TotalScore result={result} /> */}
        <NumberSelector
          setError={setError}
          selectedNumber={selectedNumber}
          setSelectedNumber={setSelectedNumber}
        />
      </div>
      {/* <div className="btns"> */}
        {/* <OutlineButton onClick={resetScore}>Reset Score</OutlineButton> */}
        {/* <Button onClick={() => setShowRules((prev) => !prev)}>
          {showRules ? "Hide" : "Show"} Rules
        </Button>
      </div> */}
      <audio ref={audioRef} src={win_sound} />
      <audio ref={audioRefDice} src={dice_spin} />
      {showRules && <Rules />}
    </MainContainer>
    
    <div className=" bg-blue-600 col-span-3 rounded-r-lg overflow-hidden">
          <BetCalculator  roleDice={roleDice} error={error}/>
    </div>
    </div>
  );
};

export default GamePlay;

const MainContainer = styled.main`
  padding-top: 70px;
  .top_section {
    display: flex;
    justify-content: space-around;
    align-items: end;
    margin-bottom:100px

  }
  .btns {
    margin-top: 40px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  
`;
