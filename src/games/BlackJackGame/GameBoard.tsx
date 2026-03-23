import { useState, useEffect } from "react"
import type { GameState } from "../BlackJackGame/types"
import { BetControls } from "../BlackJackGame/BetControl"
import { GameActions } from "../BlackJackGame/GameActions"
import { PlayerHand } from "../BlackJackGame/PlayerHand"
import { DealerHand } from "../BlackJackGame/Dealerhand"
import { createDeck, calculateHandValue, isBlackjack } from "../BlackJackGame/utils"
import { motion } from "framer-motion";
import { BiSad, BiSolidTag, BiTrophy, BiHandicap, BiUser } from "react-icons/bi";
import { useGameSocket } from "../../hooks/useGameSocket"
import { useUserInfo } from "../../context/UserInfoContext"
import GameAudio from "./GameAudio"
import BlackjackAudio from "../../assets/sounds/BlackjackAudio.m4a"
const INITIAL_BALANCE = 1000

export default function Blackjack() {
  // socket connection
  // const { socket, emitEvent, onEvent, connected } = useGameSocket('blackjack');
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
  const { userId } = useUserInfo();

  // const dealInitialCards2 = () => {
  //   if (!socket) return;
  //   socket.emit("placeBet", {
  //     userId,
  //     betAmount: 10,
  //   });
  // };

  // const handleHit2 = () => {
  //   if (!socket) return;
  //   socket.emit("placeBet", {
  //     userId,
  //     betAmount: 10,
  //   });
  // };
  // const handleSplit2 = () => {
  //   if (!socket) return;
  //   socket.emit("placeBet", {
  //     userId,
  //     betAmount: 10,
  //   });
  // };

  // const handleStand2 = () => {
  //   if (!socket) return;
  //   socket.emit("placeBet", {
  //     userId,
  //     betAmount: 10,
  //   });
  // };

  // const handleDouble2 = () => {
  //   if (!socket) return;
  //   socket.emit("placeBet", {
  //     userId,
  //     betAmount: 10,
  //   });
  // };

  // const handleDealerTurn2 = () => {
  //   if (!socket) return;
  //   socket.emit("placeBet", {
  //     userId,
  //     betAmount: 10,
  //   });
  // };

  // Games functions

 
  const RISK_THRESHOLD = 0.5; // 50% of player's balance

  const assessRisk = (betAmount:number, playerBalance:number) => {
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
  
  const handleHit = () => {
    if (gameState.phase !== "player-turn") return; // Only allow hitting during the player's turn
  
    const deck = [...gameState.deck];
    const playerHands = [...gameState.playerHands];
    const currentHand = playerHands[gameState.currentHandIndex];
  
    // Draw a new card
    const newCard = deck.pop()!;
    currentHand.push(newCard);
  
    // Calculate the new hand value
    const handValue = calculateHandValue(currentHand);
    const isBusted = handValue > 21;
  
    setGameState((prev) => {
      let newState = {
        ...prev,
        deck,
        playerHands,
        canDouble: false, // Disable doubling after hitting
      };
  
      if (isBusted) {
        // If the player busts, end the player's turn and start the dealer's turn
        newState.message = "Bust! You lose.";
        newState.phase = "game-over";
        handleDealerTurn(newState);
      }
  
      return newState;
    });
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
  
  const handleSplit = () => {
    if (!gameState.canSplit || gameState.phase !== "player-turn") return; // Only allow splitting during the player's turn
  
    const deck = [...gameState.deck];
    const playerHands = [...gameState.playerHands];
    const currentHand = playerHands[gameState.currentHandIndex];
  
    // Ensure the player has exactly two cards of the same rank
    if (currentHand.length !== 2 || currentHand[0].rank !== currentHand[1].rank) return;
  
    // Draw one additional card for each split hand
    const newCard1 = deck.pop()!;
    const newCard2 = deck.pop()!;
  
    // Create two new hands
    const newHands = [
      [currentHand[0], newCard1],
      [currentHand[1], newCard2],
    ];
  
    // Replace the current hand with the two new hands
    playerHands.splice(gameState.currentHandIndex, 1, ...newHands);
  
    setGameState((prev) => ({
      ...prev,
      deck,
      playerHands,
      currentHandIndex: 0, // Start playing the first split hand
      canSplit: false, // Disable further splitting
      canDouble: true, // Allow doubling after splitting
      playerBalance: prev.playerBalance - prev.currentBet, // Deduct the additional bet for the split
    }));
  };
  
  const handleDouble = () => {
    // Only allow doubling if it's the player's turn and they can double
    if (!gameState.canDouble || gameState.phase !== "player-turn") return;
  
    const deck = [...gameState.deck];
    const playerHands = [...gameState.playerHands];
    const currentHand = playerHands[gameState.currentHandIndex];
  
    // Ensure the player has exactly two cards before doubling
    if (currentHand.length !== 2) return;
  
    // Draw one additional card (final card for this hand)
    const newCard = deck.pop()!;
    currentHand.push(newCard);
  
    setGameState((prev) => {
      const newState = {
        ...prev,
        deck,
        playerHands,
        playerBalance: prev.playerBalance - prev.currentBet, // Deduct the additional bet
        canDouble: false, // Disable further doubling
      };
  
      // End the player's turn and start the dealer's turn
      handleDealerTurn(newState);
  
      return newState;
    });
  };
  // game function end.


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
            {/* Balance Display */}
            <div className="flex flex-shrink-0 items-center justify-between">
              <div className="text-[14px] text-blue-100 font-semibold">Bet Amount</div>
              <div className="text-[12px] text-blue-100 font-semibold">${gameState.playerBalance.toFixed(2)}</div>
            </div>



            {/* {gameState.phase === "betting" && ( */}
            <BetControls
              balance={gameState.playerBalance}
              currentBet={gameState.currentBet}
              onBetChange={(amount) => setGameState((prev) => ({ ...prev, currentBet: amount }))}
              onBet={gameState.message.length == 0 ? dealInitialCards : handleNewGame}
              btnState={gameState.phase}
            />

            {/* {gameState.phase === "player-turn" && ( */}
            <GameActions
              canHit={gameState.phase === "player-turn" ? true : false}
              canStand={gameState.phase === "player-turn" ? true : false}
              canSplit={gameState.canSplit}
              canDouble={gameState.canDouble}
              onHit={handleHit}
              onStand={handleStand}
              onSplit={handleSplit}
              onDouble={handleDouble}
            />

            {/* game message */}
            <GameMessage gameState={gameState} />
          </div>
        </div>
        <div className={`bg-[#0e1722] md:w-[75%] rounded-r-lg pb-[100px] gap-y-4`}>
          <div className="w-full flex pb-10 justify-end">
            <div className="w-[100px] mr-10 h-[40px] rounded-b-[8px] border-l-[3px] border-r-[3px] border-white bg-blue-500 shadow-[0px_3px_0px_white,0px_6px_0px_rgba(255,255,255,0.9),0px_9px_0px_rgba(255,255,255,0.8),0px_12px_0px_rgba(255,255,255,0.7),0px_15px_0px_rgba(255,255,255,0.6)]"></div>
          </div>

          <DealerHand activeDealer={gameState.phase !== "player-turn"} msg={gameState.message} hand={gameState.dealerHand} />
          <div className="w-full items-center justify-center flex">
            <div className=" justify-center  w-[500px] flex items-center">

              <div className=" w-full my-10 mt-20 flex justify-center items-center">
                <div className="w-[80px] relative h-[30px] bg-[#192b37]"></div>
                <div className="rotate-180 right-50 mr-[50px] center absolute z-10 w-fit">
                  <BiSolidTag size={60} color="#0e1722" /></div>
                <div className="w-[200px] text-[12px] text-blue-100 font-bold flex uppercase absolute text-center justify-center items-center z-10 ml-[250px] rounded-[4px] h-[35px] border-[3px] border-[#0e1722] mb-5 bg-[#192b37]">
                  BLACKJACK PAYS 3 TO 2
                  <div className="absolute top-9 z-10">INSURANCE PAYS 2 TO 1</div>
                </div>

              </div>
              <div className=" w-full my-10 mt-20 flex justify-center items-center">
                <div className="w-[80px] relative h-[30px] bg-[#192b37]"></div>
                <div className=" left-50 ml-[50px] center absolute z-10 w-fit">
                  <BiSolidTag size={60} color="#0e1722" /></div>
              </div>
            </div>
          </div>

          <PlayerHand
            hand={gameState.playerHands[0]}
            msg={gameState.message}
            activePlayer={gameState.phase === "player-turn"}
            value={calculateHandValue(gameState.playerHands[0])}
          />

          <div className="flex pr-5 justify-end">
            <GameAudio audioFile={BlackjackAudio} />
          </div>
        </div>
      </div>
    </div>
  )
}

