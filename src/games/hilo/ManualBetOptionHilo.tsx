import React, { useState } from "react";
import { useUserInfo } from "../../context/UserInfoContext";
import { FaIndianRupeeSign } from "react-icons/fa6";

function ManualBetOptionHilo() {
  const { betAmtHilo, setBetAmtHilo } = useUserInfo();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const parsedValue = parseFloat(value);

    if (isNaN(parsedValue)) {
      setBetAmtHilo(0);
    } else {
      setBetAmtHilo(parsedValue);
    }
  };

  const { userWalletBalance } = useUserInfo();
  const wallet = userWalletBalance;
  const handleMultiply = () => {
    if (wallet >= 1) {
      const newBetAmt = betAmtHilo * 2;
      setBetAmtHilo(newBetAmt >= wallet ? wallet : newBetAmt);
    }
  };
  const handleMax = () => {
    setBetAmtHilo(wallet);
  };
  const handleDivide = () => {
    setBetAmtHilo((prevBetAmt: number) => {
      const newValue = parseFloat((prevBetAmt / 2).toFixed(2));
      return newValue <= 0.01 ? 0.0 : newValue;
    });
  };
  return (
    <>
      <div className="primaryTextColor flex justify-between">
        <span className="font-bold text-[13px]">Bet Amount</span>
        <span className="font-extrabold text-[11px]">₹{0.0 + betAmtHilo}</span>
      </div>
      <div className="bg-[#355161] rounded flex items-center group shadow-lg">
        <input
          onChange={handleChange}
          value={betAmtHilo}
          id="bet-amount"
          className="  w-3/6 rounded-l px-3  text-sm/6 text-whit font-extrabold
             bg-[#0f212e]  data-[focus]:-outline-offset-2  focus:outline-none  h-11 border-[2px] group-hover:border-[#54798f] transition-all duration-150  ease-in-out focus:border-slate-500 border-[#355161]"
          type="number"
          step={0.01}
        />
        <button
          onClick={handleDivide}
          className="font-extrabold text-[13px] p-3 h-full hover:bg-[#54798f] transition-all duration-100 ease-in-out  "
        >
          1/2{" "}
        </button>
        <span className="border  border-black h-5 bg-black"> </span>
        <button
          onClick={handleMultiply}
          className="font-extrabold text-[14px] p-3 hover:bg-[#54798f] transition-all duration-150 ease-in-out"
        >
          2x
        </button>
        <span className="border border-black h-5 bg-black"> </span>
        <button
          onClick={handleMax}
          className="font-extrabold text-[14px] p-3 hover:bg-[#54798f] transition-all duration-150 ease-in-out"
        >
          Max
        </button>
      </div>
    </>
  );
}

export default ManualBetOptionHilo;
