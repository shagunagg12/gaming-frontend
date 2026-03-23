import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useBet } from '../../../context/betContext';
import { BetQuestion, MatchData } from '../../../utils/types/sports';
import BetSlip from './BetComponent/BetSlip/BetSlip';
import { randomUUID } from 'crypto';

type Props = {
  options: string  | undefined;
  odd: number | null | undefined;
  selectedOption: {
    _id: string;
    name: string;
    odds: number;
  } | null | undefined;
  matchDetails: MatchData;
  betQuestions:BetQuestion
  setActiveBets: React.Dispatch<React.SetStateAction<string[]>>
  activeBets: string[]
};

function OddsButton({ options, odd, selectedOption, matchDetails, betQuestions, setActiveBets, activeBets }: Props) {
  const { setIsBetSlipOpen } = useAuth();
  
  const [isTriggered, setIsTriggered] = useState(false);
  const [flyPos, setFlyPos] = useState<{ top: number; left: number, width: number} | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const {setBetSlip, betSlip, betSlipRef} = useBet();


useEffect(() => {
  localStorage.setItem("activeBetSlips", JSON.stringify(activeBets));
}, [activeBets]);


  const alreadyExists = betSlip.find(
  (bet) => bet.market === betQuestions._id && bet.selection === selectedOption?._id
);
 
  

const handleClick = () => {


  // console.log('aaaaaaaaaaaaaaaaaaaa',alreadyExists)

  let isActive 
  if (selectedOption?._id) {
   isActive = activeBets.includes(selectedOption._id);
    
  }
  
  if (isActive) {
    setActiveBets((prev) => prev.filter((id) => id !== selectedOption?._id));
    setBetSlip((prev) =>
      prev.filter((bet) =>
        !(bet.market ===  betQuestions?._id && bet.selection === selectedOption?._id)
      )
    );
  } else {
    if(selectedOption?._id){
    setActiveBets((prev) => [...prev, selectedOption._id]);

    }

    setIsBetSlipOpen(true);
    
    setBetSlip((prev) => [
      ...prev,
      {
      
        match: matchDetails._id,
        market: betQuestions._id,
        selection: selectedOption?._id || '',
        BetTime: new Date().toISOString(),
        stake: '0.00', 
        sport: matchDetails.category.title,
        currency: 'INR',
        isLiveFr: true,
        isSettledFr: false,
        TeamAFr: matchDetails.team1.title,
        TeamBFr: matchDetails.team2.title,
        questionFr: betQuestions.question,
        selectedOptionFr: selectedOption?.name || '',
        initialOddFr: selectedOption?.initialOdds,
        currentOddFr: selectedOption?.currentOdds,

      },
    ]);


    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setFlyPos({ top: rect.top, left: rect.left, width: rect.width });
      setIsTriggered(true);
      setTimeout(() => setIsTriggered(false), 1000);
    }
  }
};
 

   const animateToBetSlip = (event: React.MouseEvent) => {
  const target = event.currentTarget as HTMLElement;
  const startRect = target.getBoundingClientRect();
  const endRect = betSlipRef.current?.getBoundingClientRect();

  if (!endRect) return;

  const flyElem = document.createElement('div');
  flyElem.className = 'w-4 h-4 bg-yellow-400 rounded-full fixed z-50';
  flyElem.style.left = `${startRect.left + startRect.width / 2}px`;
  flyElem.style.top = `${startRect.top + startRect.height / 2}px`;
  document.body.appendChild(flyElem);

  const animation = flyElem.animate([
    {
      transform: `translate(0, 0)`,
      opacity: 1
    },
    {
      transform: `translate(${endRect.left - startRect.left}px, ${endRect.top - startRect.top}px)`,
      opacity: 0
    }
  ], {
    duration: 400,
    easing: 'ease-in-out'
  });

  animation.onfinish = () => {
    flyElem.remove();
  };
};




  const targetPos = {
    top: 150,     
    left: window.innerWidth  - 300, 
  };

  

  return (
    <>{
      selectedOption?._id &&(
         <button
        onClick={(e) => handleClick()}
        ref={buttonRef}
        className={`h-[60px] text-start px-3 flex flex-col justify-center gap-1 font-bold hover:bg-blue-900 hover:text-white hover:bg-opacity-50 ${
          activeBets.includes( selectedOption._id ) ? 'bg-blue-600 text-black font-extrabold' : 'bg-[#071824]'
        } p-1 rounded transition-all ease-in-out duration-300`}
      >
        <div className="text-[13px]">{options}</div>
        <div className={`text-[13px] ${activeBets.includes( selectedOption._id ) ? 'text-white' : 'text-blue-400'}`}>{odd}</div>
      </button>
      )
    }
     

      {createPortal(
        <AnimatePresence>
          {isTriggered && flyPos && (
            <motion.div
              initial={{ top: flyPos.top, left: flyPos.left, opacity: 1, scale: 1,width: flyPos.width }}
              animate={{
                top: targetPos.top,
                left: targetPos.left,
                opacity: 0,
                scale: 0.5,
                width: 500
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className={`fixed z-[9999]  h-[60px] bg-blue-600 rounded shadow-lg flex items-center justify-center`}
              style={{ width: flyPos.width }} 
            >
              <div className="text-white font-bold"></div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

export default OddsButton;
