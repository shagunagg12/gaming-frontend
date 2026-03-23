import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

import { MinesGameState } from "../../utils/types/Games";
import { rupeeSign } from "../hilo";
import { BetPanel } from "../../userinterface/components/CasinoComponents/BetPanel";
import { useUserInfo } from "../../context/UserInfoContext";
import ManualBetAmount from "../../userinterface/components/CasinoComponents/ManualBetAmount";

interface Props {
  Bet: () => void;
  status: string | null;
  gemCount: number;
  isLoading: boolean;
  setGameState: React.Dispatch<React.SetStateAction<MinesGameState>>;
  bomb: string;
  handleCashout: () => void;
  handleClickPickRandomTile: () => void;
  profit: number;
  winAmount: number;
  betAmt: number;
}

export default function BetCalculatorMines(props: Props) {
  const {
    gemCount,
    status,
    Bet,
    isLoading,
    setGameState,
    bomb,
    handleCashout,
    handleClickPickRandomTile,
    profit,
    betAmt,
  } = props;

  const { betAmtMines, setBetAmtMines } = useUserInfo();


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
        label: "Pick random tile",
        onClick: handleClickPickRandomTile,
        icon: <FaAngleDoubleRight size={16} color="white" />,
      }}
      actionLabelIdle="Bet"
      actionLabelActive="Cashout"
    >
      {/* === GAME SPECIFIC CONTENT === */}
      <ManualBetAmount betAmt={betAmtMines} setBetAmt={setBetAmtMines} isGameStarted={status === "active"} />

      {status !== "active" && (
        <div className="w-full">
              <h6 className="font-bold text-[14px] secondaryTextColor mt-2 ">Mines</h6>

          <select
            className="w-full border-[#355161] hover:border-[#54798f] duration-300 rounded text-white bg-[#0F212E] mr-20 h-11 p-2 text-sm border-2 font-bold"
            value={bomb}
            onChange={(e) =>
              setGameState((prev) => ({
                ...prev,
                bomb: e.target.value,
              }))
            }
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      )}

      {status === "active" && (
        <>
          {/* Bomb / Gems */}
          <div className="grid grid-cols-2 gap-2 items-center mt-2">
            <span>
              <h6 className="font-bold text-[14px] secondaryTextColor ">Mines</h6>
              <div className="border-[#2f4553] border-2 bg-[#2f4553] text-white text-sm font-bold text-center px-4 h-11 rounded flex items-center">
                {bomb}
              </div>
            </span>

            <span>
              <h6 className="font-bold text-[14px] secondaryTextColor">Gems</h6>
              <div className="border-[#2f4553] border-2 bg-[#2f4553] text-white text-sm font-bold text-center px-4 h-11 rounded flex items-center">
                {25 - parseInt(bomb) - gemCount}
              </div>
            </span>
          </div>

          {/* Profit */}
          <div className="flex flex-col mt-2">
            <h6 className="secondaryTextColor text-[14px] font-bold">
              Total Profit{`(${profit>0 && profit.toFixed(2)})`}
            </h6>
            <div className="border-[#2f4553] border-2 bg-[#2f4553] text-white text-sm font-bold text-center px-4 h-11 rounded flex justify-between items-center gap-2">
              <strong>{betAmt &&  profit >0 &&(betAmt * profit).toFixed(2)}</strong>
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
