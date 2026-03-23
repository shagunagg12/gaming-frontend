import { ImCross } from "react-icons/im";
import { FaBitcoin } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BetProvider, useBet } from "../../../../../context/betContext";
import { BetSlip } from "../../../../../utils/types/sports";
import { GiEmptyHourglass } from "react-icons/gi";
interface Props {
  setCalculator: (value: boolean) => void;
}
const SingleBetToken: React.FC<Props> = ({ setCalculator }) => {
  const { betSlip, setBetSlip, activeBets, setActiveBets, betSlipRef } = useBet();
 

  const removeBetSlip = (item: BetSlip) => () => {
    setBetSlip((prev) => prev.filter((bet) => bet !== item));
    setActiveBets((prev) => prev.filter((id) => id !== item.selection));

  };
  

  const handleStakeChange = (
    item: BetSlip,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
   const newStake = e.target.value;

    setBetSlip((prev) =>
      prev.map((bet) =>
        bet.match === item.match &&
        bet.market === item.market &&
        bet.selection === item.selection
          ? { ...bet, stake: newStake }
          : bet
      )
    );
  };

  return (
    <>
      {betSlip.length > 0 ? betSlip.map((item, index) => (
        <motion.div
          initial={{ translateX: 100, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          exit={{ translateX: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          key={index}
          ref={betSlipRef}
          className="flex rounded-md bg-[#22313b] overflow-hidden m-2 pb-2 flex-col justify-between relative"
        >
          <div
            className="absolute bottom-0 left-0 w-full h-[12px]"
            style={{
              background: `
                      radial-gradient(circle at bottom, #0e1921 6px, transparent 6px)`,
              backgroundSize: "12px 12px",
              backgroundRepeat: "repeat-x",
            }}
          ></div>

          <div className="bg-[#2e4250] text-[15px] py-1.5 px-3 rounded-t-md font-medium w-[100%] flex items-center justify-between flex-row">
            <div className="flex flex-row space-x-2 items-center">
              {item.isLiveFr && (
                <div className="text-[12px] bg-[#d30d01] px-1 rounded-sm">
                  Live
                </div>
              )}
              <div>{item?.TeamAFr + " - " + item?.TeamBFr}</div>
            </div>
            <ImCross
              onClick={removeBetSlip(item)}
              color="#c9c9c9"
              size={10}
              className="cursor-pointer"
            />
          </div>
          <div className="flex flex-col w-full py-2">
            <div className="justify-between px-3 text-[15px] primaryTextColor">
              {item?.questionFr}
            </div>
            <div className="justify-between flex items-end flex-row px-3 text-[15px] text-white">
              <div className="text-white font-bold">{item?.selectedOptionFr}</div>
              {item.isSettledFr === false ? (
                <div className="text-[#0595ff] items-center flex flex-row font-bold">
                  {item?.currentOddFr &&
                    item?.initialOddFr &&
                    item?.currentOddFr < item?.initialOddFr && (
                      <IoMdArrowDropdown size={17} color="red" />
                    )}
                  {item?.currentOddFr &&
                    item?.initialOddFr &&
                    item?.currentOddFr > item?.initialOddFr && (
                      <IoMdArrowDropup size={17} color="#88ff00" />
                    )}
                  <div>{item.currentOddFr}</div>
                </div>
              ) : (
                <div className="text-red-500">Settled</div>
              )}
            </div>
            <div className="justify-between items-center flex flex-row px-3 mt-1 text-[15px] text-white">
              <div className="w-[170px] justify-between items-center border-gray-700 border-2 flex flex-row rounded-sm bg-[#0d1e29] px-2 py-2">
                <input
                  type="text"
                  step={0.01}
                  min={0.00}
                  onChange={(e) => handleStakeChange(item, e)}
                  onClick={() => setCalculator(true)}
                  className="w-full text-white font-semibold bg-transparent border-none outline-none caret-white placeholder-gray-400"
                  value={item.stake ?? ""}
                  placeholder="0.00"
                 
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.value = target.value.replace(/[^0-9.]/g, ""); 
                  }}
                />
              </div>
              <div className="flex space-y-1 items-end text-white flex-col leading-tight">
                <div className="text-[12px] opacity-[70%]">Est payout</div>
                <div className="text-[14px] flex flex-row items-center">
                  <div className="opacity-[70%]">
                    {typeof item.stake === "number" &&
                    typeof item.currentOddFr === "number"
                      ? (item.stake * item.currentOddFr).toFixed(2)
                      : "0.00"}
                  </div>
                  <div>
                    <FaBitcoin color="#ec8c08" className="ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))
    :
    (<>
        <div className="flex flex-col items-center text-[16px] gap-5 justify-center h-full w-full text-gray-500">
          <GiEmptyHourglass size={70}/> 

          No bets placed yet.
          <span className="text-[#0595ff] font-bold text-[14px] -mt-4">Start betting now</span>
        </div>
      </>)}
      
    
    </>
  );
};
export default SingleBetToken;
