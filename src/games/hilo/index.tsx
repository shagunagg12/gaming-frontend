import React, { useState, useMemo, useEffect, useRef } from 'react';
import TokenValue  from './TokenValue'; // Replace with your actual token library
import { Card, CardContainer, CardPreview, CardsContainer, Container, Option, Options, Profit } from './styles'; // Style components
import { MAX_CARD_SHOWN, RANKS, RANK_SYMBOLS , SOUND_CARD, SOUND_FINISH, SOUND_LOSE, SOUND_PLAY, SOUND_WIN} from './constants';
import BetCalculator from '../../userinterface/components/CasinoComponents/BetCalculator';
import BetCalculatorHilo from './BetCalculatorHilo';
import { FaChevronUp } from 'react-icons/fa';
import { TiArrowDownThick, TiArrowUpThick } from 'react-icons/ti';
import { useUserInfo } from '../../context/UserInfoContext';
import { parse } from 'path';
import { useAuth } from '../../context/authContext';
import { useDialog } from '../../context/DialogContext';
import { toast } from 'react-toastify';
import io from 'socket.io-client';



const BPS_PER_WHOLE = 10000;
export const rupeeSign = "\u20B9";
const randomRank = () => 1 + Math.floor(Math.random() * (RANKS - 1));


const card = (rank = randomRank()): Card => ({
  key: Math.random(),
  rank,
});

interface Card {
  key: number;
  rank: number;
}

  export interface HiLoConfig {
    logo: string; // The logo prop for the game configuration
  }
const generateBetArray = (currentRank: number, isHi: boolean) => {
  return Array.from({ length: RANKS }).map((_, i) => {
    const result = (() => {
      if (isHi) {
        return currentRank === 0
          ? i > currentRank ? BigInt(RANKS * BPS_PER_WHOLE) / BigInt((RANKS - 1) - currentRank) : BigInt(0)
          : i >= currentRank ? BigInt(RANKS * BPS_PER_WHOLE) / BigInt((RANKS - currentRank)) : BigInt(0);
      }
      return currentRank === RANKS - 1
        ? i < currentRank ? BigInt(RANKS * BPS_PER_WHOLE) / BigInt(currentRank) : BigInt(0)
        : i <= currentRank ? BigInt(RANKS * BPS_PER_WHOLE) / BigInt((currentRank + 1)) : BigInt(0);
    })();
    return Number(result) / BPS_PER_WHOLE;
  });
};

const adjustBetArray = (betArray: number[]) => {
  const maxLength = betArray.length;
  const sum = betArray.reduce((acc, val) => acc + val, 0);
  if (sum > maxLength) {
    const maxIndex = betArray.findIndex(val => val === Math.max(...betArray));
    betArray[maxIndex] -= sum - maxLength;
    if (betArray[maxIndex] < 0) betArray[maxIndex] = 0;
  }
  return betArray;
};



// Custom sound utility
const useSound = () => {
  const play = (sound: string, options: { playbackRate: number }) => {
    const audio = new Audio(sound);
    audio.playbackRate = options.playbackRate;
    audio.play();
  };

  return { play };
};

export default function HiLo(props: HiLoConfig) {
  const [cards, setCards] = useState([card()]);
  const [claiming, setClaiming] = useState(false);
  const [initialWager, setInitialWager] = useState(1);
  const [profit, setProfit] = useState(0);

  const currentRank = cards[cards.length - 1].rank;
  const {betAmtHilo,userWalletBalance,setUserWalletBalance} = useUserInfo();

  const [option, setOption] = useState<'hi' | 'lo'>(currentRank > RANKS / 2 ? 'lo' : 'hi');
  const [hoveredOption, setHoveredOption] = useState<'hi' | 'lo'>();
  const [winningStreak, setWinningStreak] = useState(0); // To track consecutive wins
  const [isCashingOut, setIsCashingOut] = useState(false); // To check if the player is cashing out  
  const [betPlaced , setBetPlaced] = useState(false);
  const [initialBalance, setInitialBalance] = useState<number>(userWalletBalance); // Store initial balance for first bet
  const [currentProfit, setCurrentProfit] = useState<number>(0); // Track profit
  const [firstRound, setFirstRound] = useState(true);
  const [win , setWin] = useState<boolean|null>(null);
  const [user, setUser] = useState(null);
  const [hiloUser, setHiloUser] = useState(null);
  const [betHistory, setBetHistory] = useState([]);
  const [userBalance, setUserBalance] = useState(0);
  const [autoCashOut, setAutoCashOut] = useState(false);



  

const socket = io("ws://localhost:3000", {
  withCredentials: true, // Ensures credentials (cookies) are sent with the request
  transports: ["websocket", "polling"], // Make sure to use websocket and/or polling transport
  path: '/socket.io',
});




const userId = '678152db49f9260817a07b03'; // user ID or global room identifier



// socket.on("connect", () => {
//   console.log("Connected to WebSocket server with id:", socket.id);
// });
// Fetch user data on component mount and handle WebSocket events
useEffect(() => {
  // Join the room based on the userId

  socket.on('connect', () => {
  });

  socket.emit('joinRoom', { userId });

  // Listen for 'startGame' event to receive initial game data
  socket.on('startGame', (userData) => {
    setUser(userData);
    setUserBalance(userData.diamond);
  });

  socket.on('getMyBet', (historyData) => {
    setBetHistory(historyData);
  });

  // Listen for updates to Hilo user data
  socket.on('hiloUser', (hiloUserData) => {
    setHiloUser(hiloUserData);
  });

  // Handle cleanup when component unmounts
  return () => {
    socket.off('start');
    socket.off('getMyBet');
    socket.off('hiloUser');
    socket.emit('leaveRoom', { userId }); // Leave room on component unmount
  };
}, [userId]);



// Update auto-cash out settings
const updateAutoCashOut = (autoCashOutCoin:number) => {
  socket.emit('autoCashOut', {
    userId,
    AutoCashOutCoin: autoCashOutCoin,
    AutoCashOut: true,
  });
  setAutoCashOut(true);
};




  const {isLoggedIn} =useAuth()
  const optionRef = useRef<'hi' | 'lo'>(currentRank > RANKS / 2 ? 'lo' : 'hi'); // Initial value based on the currentRank

  const{openSigninDialog} = useDialog()
  const addCard = (rank: number) => setCards((cards) => [...cards, card(rank)].slice(-MAX_CARD_SHOWN));

  const sounds = useSound();

  const betHi = useMemo(() => generateBetArray(currentRank, true), [currentRank]);
  const betLo = useMemo(() => generateBetArray(currentRank, false), [currentRank]);

  const _bet = useMemo(() => {
    const _option = hoveredOption ?? option;
    if (_option === 'hi') return betHi;
    if (_option === 'lo') return betLo;
    return [0];
  }, [betHi, betLo, hoveredOption, option]);

  const handleSelectHi = () => {
    optionRef.current = 'hi';  // Set the option to "hi"
  };

  const handleSelectLo = () => {
    optionRef.current = 'lo';  // Set the option to "lo"
  };

    
  const resetGame = async () => {
    try {
      if (claiming) return;
      sounds.play(SOUND_FINISH, { playbackRate: 0.8 });
      setTimeout(() => {
        setProfit(0);
        sounds.play(SOUND_CARD, { playbackRate: 0.8 });
        addCard(randomRank());
        setClaiming(false);
        setWin(null);
      }, 300);
    } catch {
      setClaiming(false);
    }
  };

  const bet = adjustBetArray(_bet);

  const multipler = Math.max(...bet);
  const maxWagerForBet = 1000 / multipler; // Replace with your pool or max payout logic
  const wager = Math.min(maxWagerForBet, profit || initialWager);

  // const handleFirstBet = async () => {
  //   if (!isLoggedIn) {
  //     openSigninDialog();
  //     return;
  //   }
  
  //   if (betAmtHilo > userWalletBalance) {
  //     toast("You don't have enough balance");
  //     return;
  //   }
  
  //   // Deduct the bet amount from the wallet balance
  //   setUserWalletBalance(userWalletBalance - betAmtHilo);
  //   setInitialBalance(userWalletBalance - betAmtHilo); // Save initial balance after bet deduction
  //   sounds.play(SOUND_PLAY, { playbackRate: 1 });
  
  //   // Proceed with game logic
  //   const resultIndex = randomRank();
  //   addCard(resultIndex); // Draw the first card
  //   return; // Exit to prevent betting logic from running immediately
  // };
  // const play = async () => {
  //   if (!isLoggedIn) {
  //     openSigninDialog();
  //     return;
  //   }
  
  //   if (betAmtHilo > userWalletBalance) {
  //     toast("You don't have enough balance");
  //     return;
  //   }
  
 
  //   sounds.play(SOUND_PLAY, { playbackRate: 1 });
  
  //   // If it's the first round (no second card), just add a new card without checking for a bet
  //   if (cards.length === 1) {
  //     setFirstRound(false);
  //     const resultIndex = randomRank();
  //     addCard(resultIndex); // Draw the first card
      
  //     return; // Exit to prevent betting logic from running immediately
      
  //   }
  //   setUserWalletBalance(userWalletBalance - betAmtHilo);
  //   setInitialBalance(userWalletBalance - betAmtHilo); 
  //   const resultIndex = randomRank();
  //   addCard(resultIndex); // Add the second card
  
  //   // Check if the player won or lost based on the selected "hi" or "lo" option
  //   let winning = false;
  
  //   // if (option === 'hi') {
  //   //   // Win if the new card's rank is greater than or equal to the first card's rank
  //   //   winning = resultIndex >= currentRank;
  //   // } else if (option === 'lo') {
  //   //   // Win if the new card's rank is less than or equal to the first card's rank
  //   //   winning = resultIndex <= currentRank;
  //   // }
  
  //   if (optionRef.current === 'hi') {
  //     winning = resultIndex >= currentRank; // Win if new card's rank is greater than or equal to the first card's rank
  //     setCurrentProfit( winning ? betAmtHilo * parseFloat(Math.max(...betHi).toFixed(2)) : 0)

  //   } else if (optionRef.current === 'lo') {
  //     winning = resultIndex <= currentRank; // Win if new card's rank is less than or equal to the first card's rank
  //     setCurrentProfit( winning ? betAmtHilo * parseFloat(Math.max(...betLo).toFixed(2)) : 0)
   
  //   }

  //   // Update the winning streak
  //   if (winning) {
  //     setWinningStreak(prev => prev + 1); // Increment the winning streak
  //   } else {
  //     setWinningStreak(0); // Reset the streak on a loss
  //   }
  
  //   // Set the result as win or lose
  //   setWin(winning);
  
  //   // Calculate the payout (wager * 2 for win)
  //   const payout = winning ? betAmtHilo * currentProfit  : 0;
  
  //   // Update the profit and wallet balance after the result
  //   setTimeout(() => {
  //     setProfit(payout);
  
  //     // Adjust the user's wallet balance based on the win/loss
  //     if (winning) {
  //       sounds.play(SOUND_WIN, { playbackRate: 1 });
  //     } else { 
  //       sounds.play(SOUND_LOSE, { playbackRate: 1 });
  //       setFirstRound(true);
       
  //     }
  //   }, 300);
  // };
  
  // const cashout = () => {
  //   if (isCashingOut) return;
  
  //   setIsCashingOut(true); // Prevent further play while cashing out
  
  //   // Add the total winnings to the user's wallet
  //   const totalWinnings = profit 
  
  //   // Update the user's wallet balance with the total winnings
  //   setUserWalletBalance(userWalletBalance + totalWinnings);
  
  //   // Reset the game state
  //   setFirstRound(true);
  //   setWin(null);
  //   setProfit(0);
  //   setCards([card()]); // Reset cards for the next round
  //   setWinningStreak(0); // Reset the winning streak
  //   setOption(currentRank > RANKS / 2 ? 'lo' : 'hi'); // Reset the option
  //   sounds.play(SOUND_FINISH, { playbackRate: 0.8 }); // Play cashout sound
  //   toast(`You have cashed out with ${totalWinnings.toFixed(2)} profit!`);
  //   setIsCashingOut(false); // Allow play again
  // };



  const play = () => {
    if (!isLoggedIn) {
      openSigninDialog(); // This could be a modal/dialog for signing in
      return;
    }

    if (betAmtHilo > userWalletBalance) {
      toast("You don't have enough balance");
      return;
    }

    sounds.play(SOUND_PLAY, { playbackRate: 1 });

    // Emit play event to the server
    socket.emit('playHilo', { userId, betAmtHilo, username: "test", option });
  };  

  // Set up socket event listener using useEffect
  useEffect(() => {
    const handleGameResult = (response:any) => {
      if (response) {
        console.log("Game result:", response);

        if (response.result === "win") {
          sounds.play(SOUND_WIN, { playbackRate: 1 });
        } else {
          sounds.play(SOUND_LOSE, { playbackRate: 1 });
        }
      } else {
        // Handle failure: show error message, etc.
        console.log("Error:", response.message);
        toast(response.message); // Show error message
      }
    };

    // Set up the socket listener for game results
    socket.on("gameResult", handleGameResult);

    // Clean up the listener when the component is unmounted
    return () => {
      socket.off("gameResult", handleGameResult);
    };
  }, [play]); // Empty dependency array ensures this runs only once when the component mounts

  
  socket.on("gameError", (response) => {
    if (response.success) {
      console.log("Game Error:", response.message);
    } else {
      // Handle failure: show error message, etc.
      console.log("Error:", response.message);
      toast(response.message); // Show error message
    }
  });
  
  socket.on("updateWalletBalance", (response) => {
    if (response.success) {
      console.log("Updated wallet balance:", response);
    } else {
      // Handle failure: show error message, etc.
      console.log("response:", response);
      toast(response.message); // Show error message
    }
  });
  

  socket.on("skipBet", (data) => {
    // You can handle the skip bet success here
    if (data.success) {
      console.log("Bet skipped, new card generated:", data.newCard);
    } else {
      console.log("Not enough balance to skip the bet");
    }
  });
  
  socket.on("coinLess", (data) => {
    alert(data.message); // Show alert or notification for insufficient balance
  });
  
  socket.on("amount", (data) => {
    // Update the wallet balance on the frontend
    console.log("Updated balance: ", data.balance);
  });
  
  socket.on("newCard", (data) => {
    // Update the frontend with the new card
    console.log("New card generated: ", data.newCard);
  });

  const cashout = () => {
    socket.emit('cashOut', { userId });
  };
  return (
    <>
    <div className='grid grid-cols-12'>
      <div  className={`col-span-9 ${claiming ? 'opacity-50 pointer-events-none' : ''} user-select-none bg-[#0f212e] h-[72vh] w-full user-select: none transition-opacity duration-200 ease-in-out  flex flex-col   `}>
    
          <div className='transition-transform  duration-200 ease-in perspective-500  relative w-full h-[50%] flex justify-center  bg-red-100 '>
            {cards.map((card, i) => {
              const offset = -(cards.length - (i + 1));
              const xxx = cards.length > 3 ? i / cards.length : 1;
              const opacity = Math.min(1, xxx * 3);
              const isTopCard = i === cards.length - 1;
              return (
                <div
                 className={`absolute  bottom-0 transition-all  duration-250 ease-out filter drop-shadow-[10px_10px_0px_#00000011] transform-origin-bottom perspective-500   ${isTopCard &&  win===false  ? 'border-[4px] rounded-xl  border-red-600  rotateZ(-5deg) rotateY(5deg)'  : ''}  ${win && isTopCard ? 'border-[4px] rounded-xl  border-green-300  rotateZ(-5deg) rotateY(5deg)'  : ''}`}
                  key={card.key}
                  style={{
                    transform: `translate(${offset * 50}px, ${-offset * 0}px) rotateZ(-1deg) rotateY(5deg)`,
                    opacity,
                  }}
                >
                  <Card>
                    <div className="rank ">{RANK_SYMBOLS[card.rank]}</div>
                    <div className="suit bg-red-200 rounded-full" style={{ backgroundImage: 'url(' + props.logo + ')' }} />
                  </Card>
                </div>
              );
            })}
          </div>
          {/* <Options>
            <Option
              selected={option === 'hi'}
              onClick={() => setOption('hi')}
              onMouseEnter={() => hoverOption('hi')}
              onMouseLeave={() => hoverOption(undefined)}
            >
              <div>👆</div>
              <div>HI - ({Math.max(...betHi).toFixed(2)}x)</div>
            </Option>
            <Option
              selected={option === 'lo'}
              onClick={() => setOption('lo')}
              onMouseEnter={() => hoverOption('lo')}
              onMouseLeave={() => hoverOption(undefined)}
            >
              <div>👇</div>
              <div>LO - ({Math.max(...betLo).toFixed(2)}x)</div>
            </Option>
          </Options> */}
   


        {/* card selector */}
        <div className='flex justify-center w-[100%] h-fit my-5'>
          {Array.from({ length: RANKS }).map((_, rankIndex) => {
            const opacity = bet[rankIndex] > 0 ? 0.9 : 0.5;
            return (
              <Card key={rankIndex} $small style={{ opacity }} onClick={() => addCard(rankIndex)}>
                <div className="rank">{RANK_SYMBOLS[rankIndex]}</div>
              </Card>
            );
          })}
        </div>

        {/* profit indicator */}

        <div className='grid grid-cols-3 gap-5 p-5  bg-[#213743] h-28 rounded-md m-5'> 
     
        <div className='grid flex-col  items-center '>
        <label htmlFor="" className="text-[#a7b2c9] text-sm font-bold "> Profit Higher ({Math.max(...betHi).toFixed(2)}x)</label>
        <label  className="  bg-[#2f4553] shadow shadow-black text-white  text-sm  font-bold text-center px-4  h-12 rounded w-full flex justify-between items-center gap-2">
        <strong className='flex '><TiArrowUpThick size={20} color='#a7b2c9'/> {( betAmtHilo * parseFloat( (Math.max(...betHi).toFixed(2)))).toFixed(2)} </strong> 
        <span className='w-4 h-4 bg-[#eaff2a] rounded-full mr-2 text-[#5e626a] text-md font-extrabold flex justify-center items-center'>{rupeeSign}</span>
        </label>
        </div>

        <div className='grid flex-col  items-center '>
        <label htmlFor="" className="text-[#a7b2c9] text-sm font-bold "> Profit Lower ({Math.max(...betLo).toFixed(2)}x)</label>
        <label  className="  bg-[#2f4553] shadow shadow-black text-white  text-sm  font-bold text-center px-4  h-12 rounded w-full flex justify-between items-center gap-2">
        <strong className='flex '><TiArrowDownThick size={20} color='#a7b2c9'/>{(0.00 + betAmtHilo * parseFloat( (Math.max(...betLo).toFixed(2)))).toFixed(2)}</strong> 
        <span className='w-4 h-4 bg-[#eaff2a] rounded-full mr-2 text-[#5e626a] text-md font-extrabold flex justify-center items-center'>{rupeeSign}</span>
        </label>
        </div>

        <div className='grid flex-col  items-center '>
        <label htmlFor="" className="text-[#a7b2c9] text-sm font-bold "> Total Profit </label>
        <label  className="  bg-[#2f4553] shadow shadow-black text-white  text-sm  font-bold text-center px-4  h-12 rounded w-full flex justify-between items-center gap-2">
        <strong className='flex '> {0.00 + profit}</strong> 
        <span className='w-4 h-4 bg-[#eaff2a] rounded-full mr-2 text-[#5e626a] text-md font-extrabold flex justify-center items-center'>{rupeeSign}</span>
        </label>
        </div>

        
        </div>

{/* 
        {profit > 0 && (
          <Profit key={profit} onClick={resetGame}>
            <TokenValue amount={profit} /> +{Math.round((profit / initialWager) * 100 - 100).toLocaleString()}%
          </Profit>
        )} */}
      </div>
     
      <div className='  col-span-3'> 
                <BetCalculatorHilo handleSelectHigher={handleSelectHi} handleSelectLower={handleSelectLo} firstRound={firstRound}  setHoveredOption={setHoveredOption} setBetPlaced={setBetPlaced} cashout={cashout} isCashingOut={isCashingOut} winningStreak={winningStreak} setWin={setWin} setOption={setOption} error='' Bet={play} randomRank={randomRank}   addCard={addCard}/>
      </div>
      </div>
      <div>
        {!profit ? (
          <>
            <input
              type="number"
              value={initialWager}
              onChange={(e) => setInitialWager(Number(e.target.value))}
            />
            <button disabled={!option || initialWager > maxWagerForBet} onClick={play}>
              Deal card
            </button>
            {initialWager > maxWagerForBet && (
              <button onClick={() => setInitialWager(maxWagerForBet)}>Set max</button>
            )}
          </>
        ) : (
          <>
          <div className='bg-red-800 w-96'>
          <TokenValue amount={wager} />
          </div>
           
            <button disabled={claiming} onClick={resetGame}>
              Finish
            </button>
            <button disabled={!option} onClick={play}>
              Deal card
            </button>
          </>
        )}
      </div>
    </>
  );
}
