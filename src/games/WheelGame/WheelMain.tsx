import { useState, useEffect } from "react"
import type { GameState } from "../BlackJackGame/types"
import { BetControls } from "./BetControl"
import { GameActions } from "./GameActions"
import { createDeck, calculateHandValue, isBlackjack } from "../BlackJackGame/utils"
import { motion } from "framer-motion";
import { BiSad, BiSolidTag, BiTrophy, BiHandicap, BiUser } from "react-icons/bi";
import GameAudio from "../BlackJackGame/GameAudio"
import BlackjackAudio from "../../assets/sounds/BlackjackAudio.m4a"
import SpinningWheel from "./SpinningWheel"
import { CustomWheel } from "./customWheels"
const INITIAL_BALANCE = 1000

export default function WheelMain() {
  // socket connection
  //   const { socket, emitEvent, onEvent, connected } = useGameSocket('blackjack');
  const [gameState, setGameState] = useState<GameState>({
    phase: "betting",
    deck: createDeck(),
    playerHands: [[]],
    dealerHand: [],
    currentBet: 0,
    playerBalance: INITIAL_BALANCE,
    currentHandIndex: 0,
    message: "",
    canSplit: false,
    canDouble: false,
    insurance: 0,
  })
  const [smallScreen, setIsSmallScreen] = useState(false)
  useEffect(() => {
    if (gameState.phase === "player-turn") {
      const playerValue = calculateHandValue(gameState.playerHands[gameState.currentHandIndex])
      if (playerValue > 21) {
        setGameState((prev) => ({
          ...prev,
          message: "Bust! You lose.",
          phase: "game-over",
        }))
      } else if (playerValue === 21) {
        handleStand()
      }
    }
  }, [gameState.playerHands, gameState.currentHandIndex, gameState.phase])


  const GameMessage = ({ gameState }: { gameState?: { message?: string } }) => {
    if (!gameState?.message) return null;

    console.log("Current Message:", gameState.message); // Debugging

    // Define styles based on message
    const messageConfig: Record<string, { bg: string; icon: JSX.Element; animation: any }> = {
      "Bust! You lose.": {
        bg: "bg-red-600 border-red-800",
        icon: <BiSad className="text-[40px] text-white" />,
        animation: { rotate: [0, -5, 5, -5, 0] },
      },
      "Dealer busts! You win!": {
        bg: "bg-green-600 border-green-800",
        icon: <BiTrophy className="text-[40px] text-yellow-400" />,
        animation: { y: [0, -10, 0, -5, 0] },
      },
      "You win!": {
        bg: "bg-green-500 border-green-700",
        icon: <BiTrophy className="text-[40px] text-yellow-400" />,
        animation: { y: [0, -10, 0, -5, 0] },
      },
      "Dealer wins!": {
        bg: "bg-gray-600 border-gray-800",
        icon: <BiUser className="text-[40px] text-white" />,
        animation: { opacity: [0.5, 1, 0.5] },
      },
      "Push!": {
        bg: "bg-blue-600 border-blue-800",
        icon: <BiHandicap className="text-[40px] text-white" />,
        animation: { scale: [1, 1.1, 1] },
      },
    };

    const config = messageConfig[gameState.message] || messageConfig["Push!"];

    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`flex items-center justify-center text-white px-2 py-1 rounded-full shadow-xl border-4 w-full ${config.bg}`}
      >
        <motion.div animate={config.animation} transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}>
          {config.icon}
        </motion.div>
        <p className="text-[16px] font-bold ml-2">{gameState.message}</p>
      </motion.div>
    );
  };

  //socket connection
  // Games functions

  const RISK_THRESHOLD = 0.5; // 50% of player's balance

  const assessRisk = (betAmount: number, playerBalance: number) => {
    return betAmount > playerBalance * RISK_THRESHOLD;
  };

  const dealInitialCards = () => {
    // Check if the current bet is valid
    if (gameState.currentBet <= 0 || gameState.currentBet > gameState.playerBalance) {
      setGameState((prev) => ({ ...prev, message: "Invalid bet amount" }));
      return;
    }

    // Assess risk
    const isHighRisk = assessRisk(gameState.currentBet, gameState.playerBalance);
    if (isHighRisk) {
      setGameState((prev) => ({
        ...prev,
        message: "High risk bet! Dealer has a better chance to win.",
      }));
    }

    // Create a new deck and deal cards
    const deck = [...gameState.deck];
    const playerHand = [deck.pop()!, deck.pop()!]; // Deal two cards to the player
    const dealerHand = [deck.pop()!, { ...deck.pop()!, hidden: true }]; // Deal two cards to the dealer (second card hidden)

    // Update the game state
    const newState: GameState = {
      ...gameState,
      phase: "player-turn", // Set the phase to player turn
      deck,
      playerHands: [playerHand], // Set the player's hands
      dealerHand,
      playerBalance: gameState.playerBalance - gameState.currentBet, // Deduct the bet from the player's balance
      canSplit: playerHand[0].rank === playerHand[1].rank, // Check if the player can split
      canDouble: true, // Allow doubling after the initial deal
      message: "", // Clear any previous messages
    };

    // Check for player Blackjack
    if (isBlackjack(playerHand)) {
      // If the player has Blackjack, handle the dealer's turn immediately
      handleDealerTurn(newState);
    } else {
      // Otherwise, update the game state
      setGameState(newState);
    }
  };
  const handleStand = () => {
    if (gameState.phase !== "player-turn") return; // Only allow standing during the player's turn

    if (gameState.currentHandIndex < gameState.playerHands.length - 1) {
      // Move to the next hand if there are multiple hands (after splitting)
      setGameState((prev) => ({
        ...prev,
        currentHandIndex: prev.currentHandIndex + 1,
      }));
    } else {
      // If it's the last hand, end the player's turn and start the dealer's turn
      handleDealerTurn(gameState);
    }
  };




  const handleDealerTurn = (currentState: GameState) => {
    const dealerHand = currentState.dealerHand.map((card) => ({ ...card, hidden: false })); // Reveal hidden card
    const deck = [...currentState.deck];

    // Assess risk based on player's current bet
    const isHighRisk = assessRisk(currentState.currentBet, currentState.playerBalance);

    // Dealer draws until hand value is at least 17 or 18 if the player's bet is high
    const dealerStandThreshold = isHighRisk ? 18 : 17; // Stand on 18 if high risk, otherwise 17

    while (calculateHandValue(dealerHand) < dealerStandThreshold && deck.length > 0) {
      const nextCard = deck.pop();
      if (nextCard) {
        dealerHand.push({ ...nextCard, hidden: false });
      }
    }

    const dealerValue = calculateHandValue(dealerHand);
    const playerValue = calculateHandValue(currentState.playerHands[0]);
    let message = "";
    let balanceChange = 0;

    // Determine game outcome
    if (playerValue > 21) {
      message = "Bust! You lose.";
    } else if (dealerValue > 21) {
      message = "Dealer busts! You win!";
      balanceChange = currentState.currentBet * 2;
    } else if (playerValue > dealerValue) {
      message = "You win!";
      balanceChange = currentState.currentBet * 2;
    } else if (dealerValue > playerValue) {
      message = "Dealer wins!";
    } else {
      message = "Push!";
      balanceChange = currentState.currentBet;
    }

    setGameState((prev) => ({
      ...prev,
      phase: "game-over",
      dealerHand,
      deck,
      playerBalance: prev.playerBalance + balanceChange,
      message,
      canDouble: false, // Disable doubling when the game is over
      canSplit: false,   // Disable splitting when the game is over
    }));
  };
  const handleNewGame = () => {
    if (gameState.playerBalance <= 0) {
      setGameState((prev) => ({
        ...prev,
        message: "Game Over! Resetting balance...",
        playerBalance: INITIAL_BALANCE,
      }))
      return
    }

    setGameState((prev) => ({
      ...prev,
      phase: "betting",
      deck: createDeck(),
      playerHands: [[]],
      dealerHand: [],
      currentBet: 0,
      currentHandIndex: 0,
      message: "",
      canSplit: false,
      canDouble: false,
      insurance: 0,
    }))
  }
  useEffect(() => {
    const updateScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 767);
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return (
    <div className="min-h-screen  items-center text-white flex-shrink-0 flex flex-col">
      <div className={` flex flex-shrink-0 flex-row ${smallScreen && "w-full"} w-[95%] min-h-fit m-10 bg-[#192b37] rounded-lg items-start`}>


        {/* Controls Area */}
        <div className={`px-3 py-2 md:w-[25%] flex flex-shrink-0 rounded-md`}>
          <div className="w-full mx-auto space-y-3">
            <div className="flex flex-shrink-0 items-center justify-between">
              <div className="text-[14px] text-blue-100 font-semibold">Bet Amount</div>
              <div className="text-[12px] text-blue-100 font-semibold">${gameState.playerBalance.toFixed(2)}</div>
            </div>


            {/* Balance Display */}
            {/* {gameState.phase === "betting" && ( */}
            <BetControls
              balance={gameState.playerBalance}
              currentBet={gameState.currentBet}
              onBetChange={(amount) => setGameState((prev) => ({ ...prev, currentBet: amount }))}
              onBet={gameState.message.length == 0 ? dealInitialCards : handleNewGame}
              btnState={gameState.phase}
            />

            {/* {gameState.phase === "player-turn" && ( */}
            <GameActions />

            {/* game message */}
            <GameMessage gameState={gameState} />
          </div>
        </div>
        <div className={`bg-[#0e1722] flex flex-col items-center md:w-[75%] rounded-r-lg pb-[100px] gap-y-4`}>

          {/* <SpinningWheel /> */}
          <CustomWheel/>

          {/* <div className="flex pr-5 justify-end">
          <GameAudio audioFile={BlackjackAudio} />
          </div> */}
          <div className="w-[85%] justify-center flex">
            <div className="grid-rows-5 flex-row w-full mt-5 justify-evenly flex gap-3">
              <div className="group relative overflow-hidden text-[13px] font-bold text-white border-b-[7px] border-b-slate-600 bg-[#2c4651] px-[50px] py-[10px] rounded-[7px] flex">
                <div className="absolute inset-0 bg-slate-600 origin-bottom scale-y-0 transition-transform duration-300 ease-in-out group-hover:scale-y-100 z-0"></div>
                <span className="z-10">0.00</span>
                <span className="mt-[-2px] z-10">x</span>
              </div>
              <div className="group relative overflow-hidden text-[13px] font-bold text-white border-b-[7px] border-b-slate-600 bg-[#2c4651] px-[50px] py-[10px] rounded-[7px] flex">
                <div className="absolute inset-0 bg-slate-600 origin-bottom scale-y-0 transition-transform duration-300 ease-in-out group-hover:scale-y-100 z-0"></div>
                <span className="z-10">0.00</span>
                <span className="mt-[-2px] z-10">x</span>
              </div>  <div className="group relative overflow-hidden text-[13px] font-bold text-white border-b-[7px] border-b-slate-600 bg-[#2c4651] px-[50px] py-[10px] rounded-[7px] flex">
                <div className="absolute inset-0 bg-slate-600 origin-bottom scale-y-0 transition-transform duration-300 ease-in-out group-hover:scale-y-100 z-0"></div>
                <span className="z-10">0.00</span>
                <span className="mt-[-2px] z-10">x</span>
              </div>  <div className="group relative overflow-hidden text-[13px] font-bold text-white border-b-[7px] border-b-slate-600 bg-[#2c4651] px-[50px] py-[10px] rounded-[7px] flex">
                <div className="absolute inset-0 bg-slate-600 origin-bottom scale-y-0 transition-transform duration-300 ease-in-out group-hover:scale-y-100 z-0"></div>
                <span className="z-10">0.00</span>
                <span className="mt-[-2px] z-10">x</span>
              </div>  <div className="group relative overflow-hidden text-[13px] font-bold text-white border-b-[7px] border-b-slate-600 bg-[#2c4651] px-[50px] py-[10px] rounded-[7px] flex">
                <div className="absolute inset-0 bg-slate-600 origin-bottom scale-y-0 transition-transform duration-300 ease-in-out group-hover:scale-y-100 z-0"></div>
                <span className="z-10">0.00</span>
                <span className="mt-[-2px] z-10">x</span>
              </div>


            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

