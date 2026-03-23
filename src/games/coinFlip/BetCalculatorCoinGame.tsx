
import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

import { CoinGameState, MinesGameState } from "../../utils/types/Games";
import { rupeeSign } from "../hilo";
import { BetPanel } from "../../userinterface/components/CasinoComponents/BetPanel";

import { useUserInfo } from "../../context/UserInfoContext";
import ManualBetAmount from "../../userinterface/components/CasinoComponents/ManualBetAmount";
import { Circle,  DiamondIcon } from "lucide-react";

interface Props {
  Bet: () => void;
  status: string | null;
  isLoading: boolean;
  setGameState: React.Dispatch<React.SetStateAction<CoinGameState>>;
  handleCashout: () => void;
  profit: number;
  handleHeadsOrTails: (side: "heads" | "tails") => void
  lastBetAmt: number;
}

export default function BetCalculatorCoinGame(props: Props) {
  const {
    status,
    Bet,
    isLoading,
    setGameState,
    handleCashout,
    profit,
    handleHeadsOrTails,
    lastBetAmt
  } = props;

  const { betAmtCoinFlip, setBetAmtCoinFlip} = useUserInfo();


  return (
    <BetPanel
      status={status}
      isLoading={isLoading}
      onBet={() => {
        setGameState((prev) => ({ ...prev, status: "active" }));
        Bet();
      }}
      onCashout={() => {
        handleCashout();
        setGameState((prev) => ({ ...prev, status: "cashed_out" }));
      }}
      secondaryButton={{
        label: "Random Pick",
        onClick: () => { setGameState((prev) => ({ ...prev, status: "active" }));
          const randomSide = Math.random() < 0.5 ? "heads" : "tails";
          handleHeadsOrTails(randomSide);
        },
        icon: <FaAngleDoubleRight size={16} color="white" />,
      }}
      actionLabelIdle="Bet"
      actionLabelActive="Cashout"
    >
      {/* === GAME SPECIFIC CONTENT === */}
      <ManualBetAmount lastBetAmt={lastBetAmt} betAmt={betAmtCoinFlip} setBetAmt={setBetAmtCoinFlip} isGameStarted={status === "active"} />
  <div className="mt-2 grid grid-cols-2 gap-2">
          <button
          onClick={() =>handleHeadsOrTails("heads")}
          className="mt-3 text-white bg-[#2f4553] hover:bg-[#354e5e] text-sm font-bold text-center px-4 h-12 rounded w-full flex justify-center items-center gap-2"
        >
          Heads
          <Circle fill="orange" size={16} color="white" />
        </button>

           <button
          onClick={() => handleHeadsOrTails("tails")}
          className="mt-3 text-white bg-[#2f4553] hover:bg-[#354e5e] text-sm font-bold text-center px-4 h-12 rounded w-full flex justify-center items-center gap-2"
        >
          Tails
          <DiamondIcon  fill="blue" size={16} color="white" className="border-none " />
        </button>
</div>

      {status === "active" && (
        <>
  
    
          {/* Profit */}
          <div className="flex flex-col mt-2">
            <h6 className="secondaryTextColor text-[14px] font-bold">
              Total Profit{`(${profit>0 && profit.toFixed(2)})`}
            </h6>
            <div className="border-[#2f4553] border-2 bg-[#2f4553] text-white text-sm font-bold text-center px-4 h-11 rounded flex justify-between items-center gap-2">
              <strong>{betAmtCoinFlip &&  profit >0 &&(betAmtCoinFlip * profit).toFixed(2)}</strong>
              <span className="w-4 h-4 bg-[#eaff2a] rounded-full text-[#5e626a] text-sm font-extrabold flex justify-center items-center">
                {rupeeSign}
              </span>
            </div>
          </div>
        </>
      )}
    </BetPanel>
  );
}
