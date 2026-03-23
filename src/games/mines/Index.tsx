import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import "./index.css";
import Winning from "./Winning";
import BetCalculatorMines from "./BetCalculatorMines";
import gemSound from "./assets/gemSound.mp3";
import bombSound from "./assets/bombSound.mp3";
import betButtonSound from "./assets/betButtonSound.mp3";
import cashoutSound from "./assets/cashoutSound.mp3";
import ReShuffle from "./ReShuffle";
import { useUserInfo } from "../../context/UserInfoContext";
import { useGameSocket } from "../../hooks/useGameSocket";
import gemImg from "./assets/gem.svg";
import bombImg from "./assets/bomb.svg";
import bombEffectGif from "./assets/mineEffect.CTwuSNug.gif"
import {
  saveGameSession,
  deleteGameSession,
  getGameSession,
  deleteAllGameSessions,
} from "../../utils/security/StoreGameSession";
import { MinesGameState } from "../../utils/types/Games";
import { use } from "matter-js";
import Cookies from "js-cookie";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/authContext";
import { useResizeObserver } from "../../hooks/useResizeObserver";
import useWindowSize from "../../hooks/useWindowSize";

export default function MinesHome() {
  const initialState: MinesGameState = {
    gameId: "",
    grid: Array(25).fill(""),
    winningPopUp: false,
    isClient: false,
    reshuffling: false,
    negativeBet: false,
    status: null,
    amountInWallet: null,
    gemCount: 0,
    bomb: "3",
    winAmount: 0,
    maxWinAmount: 0,
    profit: 0.0,
    clickedMines: [],
    gameMessage: "",
    clickedIndex: null,
    clickedIndices: [],
  };
  const [gameState, setGameState] = useState<MinesGameState>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingBet, setIsLoadingBet] = useState<boolean>(false);
  const gameIdRef  = useRef<string>("");

 
    
  const {isBetSlipOpen, isSidebarOpen, setIsSidebarOpen} = useAuth()  

  
    const { joinCasinoRoom, leaveRoom, emit, on } = useSocket();

  const userId = Cookies.get("userId") || "";
  const { betAmtMines } = useUserInfo();
  const audioContextRef = useRef<AudioContext | null>(null);
  const bombBufferRef = useRef<AudioBuffer | null>(null);
  const betButtonBufferRef = useRef<AudioBuffer | null>(null);
  const cashoutBufferRef = useRef<AudioBuffer | null>(null);
  const gemBufferRef = useRef<AudioBuffer | null>(null);


  const ENCRYPTION_PASSWORD: string = "SuperSecretPass!";


 useEffect(() => {
    joinCasinoRoom("mines");

    return () => {
      leaveRoom("mines");
    };
  }, [joinCasinoRoom, leaveRoom]);


  useEffect(() => {
    audioContextRef.current = new ((window as any).AudioContext ||
      (window as any).webkitAudioContext)();

    const loadAudio = async (
      file: string,
      bufferRef: React.MutableRefObject<AudioBuffer | null>
    ) => {
      const response = await fetch(file);
      const arrayBuffer = await response.arrayBuffer();
      if (audioContextRef.current) {
        bufferRef.current = await audioContextRef.current.decodeAudioData(
          arrayBuffer
        );
      }
    };

    loadAudio(bombSound, bombBufferRef);
    loadAudio(betButtonSound, betButtonBufferRef);
    loadAudio(cashoutSound, cashoutBufferRef);
    loadAudio(gemSound, gemBufferRef);

    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  // useEffect(() => {
   
  //   const handleGameStatus = async () => {
  //     if (gameState.status === "lost") {
  //       await deleteAllGameSessions();
  //       return;
  //     } else if (gameState.status === "cashed_out") {
  //       await deleteAllGameSessions();
  //       return;
  //     }
  //   };
  //   handleGameStatus();
  // }, []);

   // game session storage
   const handleSave = async (gameId: string): Promise<void> => {
    try {
      if (gameState.status === "active" || gameIdRef.current) {
        await saveGameSession(gameId, gameState, ENCRYPTION_PASSWORD);
        console.log("Game session saved securely.");
      }
    
    } catch (error) {
      console.error("Error saving session:", error);
    }
  };

  // Restore session on component mount or reconnection
  useEffect(() => {
    setIsLoadingBet(true);
    const Game_Session_Id = localStorage.getItem("gameIdMines");
    if (!Game_Session_Id) {
      setIsLoadingBet(false);
      return;
    }
    (async () => {
      try {
        const savedState = await getGameSession(
          Game_Session_Id,
          ENCRYPTION_PASSWORD
        );
        if (savedState) {
          setGameState(savedState as MinesGameState);
          console.log("Restored game state:", savedState);
          gameIdRef.current = savedState.gameId ;
        }
      } catch (error) {
        console.error("Error restoring session:", error);
      } finally {
        setIsLoadingBet(false);
      }
    })();
  }, []);

  // Delete session example (e.g., when game is completed)
  const handleDelete = async (GameId:string): Promise<void> => {
    try {
      await deleteGameSession(GameId);
      console.log("Game session deleted.");
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  const playSound = (buffer: AudioBuffer | null) => {
    if (!audioContextRef.current || !buffer) return;

    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);
    source.start(0);
  };
  // useEffect(() => {
  //   const handleGameOver = ({ minePositions, gemPositions }: { minePositions: number[]; gemPositions: number[] }) => {
  //     setGrid((prev) => {
  //       const newGrid = [...prev];
  //       minePositions.forEach((index) => (newGrid[index] = "💣"));
  //       gemPositions.forEach((index) => (newGrid[index] = "💎"));
  //       return newGrid;
  //     });
  //     // setMessage("Game Over! All mines and gems revealed.");
  //     // setGameId(null);
  //     setIsLoading(false);
  //   };

  //   onEvent("gameOver", handleGameOver);

  //   return () => {

  //   };
  // }, []);

  // Handle bet button click
  const betButtonClicked = async () => {
    setIsLoadingBet(true);
    // if (!socket) return;
    if (gameState.status === "lost") {          
      await deleteAllGameSessions();
    }
    setGameState(prev => ({ ...prev, ...initialState, bomb:gameState.bomb }));
    playSound(betButtonBufferRef.current);
   
    emit("placeBet", {
      userId,
      betAmount: betAmtMines,
      bombCount: gameState.bomb,
    });
  };

  // Handle mine click
  const clickingMine = (index: number) => {
    if (
      gameState.status === "lost" ||
      gameState.clickedMines.includes(index)
    )
      return;
    setIsLoading(true);
    setGameState((prev) => ({
      ...prev,
      clickedIndex: index,
    }));
   const gameId = gameIdRef.current;
    emit("clickMine", { gameId, index, userId });
  };


const handleGameStart = useCallback((data:any) => {
  gameIdRef.current = data.gameId;
  setGameState((prev) => ({ ...prev, gameId: data.gameId, status: "active" }));
  setIsLoadingBet(false);
  try {
    localStorage.setItem("gameIdMines", data.gameId);
  } catch (e) { console.error(e); }
}, []);


 const betError = useCallback((data:any) => {
  console.log("betError", data);
}, []);


 const handleGameError = useCallback(({ message }:{message:any}) => {
  console.error("Game Error:", message);
  setGameState((prev) => ({ ...prev, gameMessage: message }));
}, []);

const handleTileClicked = async ({
  type,
  message,
  index,
  bombPositions,
  gemPositions,
  GameId,
  profitMultiplier
}: {
  type: "bomb" | "gem";
  message: string;
  index: number;
  bombPositions: number[];
  gemPositions: number[];
  GameId: string;
  profitMultiplier: number;
}) => {
  setIsLoading(true);

  // If the game is already lost, do nothing
  if (gameState.status === "lost") {
    setIsLoading(false);
    return;
  }

  // Update the grid with the clicked tile info
  setGameState((prev) => {
    // Prevent updating if the tile is already revealed
    if (prev.grid[index] !== "") return prev;

    const newGrid = [...prev.grid];
    newGrid[index] = type === "bomb" ? "bomb" : "gem";

    const newGemCount = type === "gem" ? prev.gemCount + 1 : prev.gemCount;
    const newClickedIndices = [...prev.clickedIndices, index];

    // Keep the status active while playing
    const _status = "active";

    return {
      ...prev,
      grid: newGrid,
      gemCount: newGemCount,
      status: _status,
      clickedIndices: newClickedIndices,
      profit: profitMultiplier
    };
  });

  // Play sound based on tile type
  playSound(type === "bomb" ? bombBufferRef.current : gemBufferRef.current);

  setIsLoading(false);

  // If the user hit a bomb - game over logic
  if (message === "💥 Game Over! You hit a bomb.") {
    // Update status to lost
    setGameState((prev) => ({
      ...prev,
      status: "lost",
    }));

    // Delete the saved game session
    try {
      await deleteGameSession(GameId);
      console.log("Game session deleted.");
    } catch (error) {
      console.error("Error deleting session:", error);
    }

    // Calculate remaining gem positions (not clicked and not bombs)
    const remainingGemPositions = gameState.grid
      .map((_, i) => i)
      .filter((i) => !bombPositions.includes(i))
      .filter((i) => !gameState.clickedIndices.includes(i));

    // Reveal all bombs and remaining gems
    setGameState((prev) => {
      const newGrid = [...prev.grid];

      // Reveal bombs
      bombPositions.forEach((bombIndex) => {
        if (newGrid[bombIndex] === "") {
          newGrid[bombIndex] = "bomb";
        }
      });

      // Reveal remaining gems
      remainingGemPositions.forEach((gemIndex) => {
        if (newGrid[gemIndex] === "") {
          newGrid[gemIndex] = "gem";
        }
      });

      return { ...prev, grid: newGrid };
    });
  }
};


 const handleCashout = () => {
  if (!gameIdRef.current) {
    console.warn("No active game to cash out from.");
    return;
  }

  setIsLoadingBet(true);
  emit("cashout", { userId, gameId: gameIdRef.current });
};

 const Cashout = async (data: any) => {
  setIsLoadingBet(false);

  setGameState((prev) => ({
    ...prev,
    status: "cashed_out",
    winAmount: data.payout,
    profit: data.profitMultiplier,
  }));

  if (data.success === true) {
    try {
      await deleteGameSession(gameIdRef.current);
      console.log("Game session deleted for:", gameIdRef.current);
    } catch (error) {
      console.error("Error deleting session:", error);
    }

    setGameState((prev) => {
      
      const remainingGemPositions = prev.grid
        .map((_, i) => i)
        .filter((i) => !data.bombPositions.includes(i))
        .filter((i) => !prev.clickedIndices.includes(i));

      const newGrid = [...prev.grid];

      
      data.bombPositions.forEach((bombIndex: number) => {
        if (newGrid[bombIndex] === "") {
          newGrid[bombIndex] = "bomb";
        }
      });

     
      remainingGemPositions.forEach((gemIndex) => {
        if (newGrid[gemIndex] === "") {
          newGrid[gemIndex] = "gem";
        }
      });

      return {
        ...prev,
        grid: newGrid,
        winningPopUp: true,
      };
    });
  }
};

useEffect(() => {
  if (!on) return;

  const unsubBetPlaced = on("betPlaced", handleGameStart);
  const unsubBetError = on("betError", betError);
  const unsubBombClicked = on("bombClicked", (data) => handleTileClicked({ ...data, type: "bomb" }));
  const unsubGemClicked = on("gemClicked", (data) => handleTileClicked({ ...data, type: "gem" }));
  const unsubGameError = on("gameError", handleGameError);
  const unsubCashoutSuccess = on("cashoutSuccess", Cashout);

  return () => {
    unsubBetPlaced();
    unsubBetError();
    unsubBombClicked();
    unsubGemClicked();
    unsubGameError();
    unsubCashoutSuccess();
  };
}, [on, handleGameStart, betError, handleTileClicked, handleGameError, Cashout]);


  useEffect(() => {
    if (gameState.status==='active' && gameState.gameId) {
      handleSave(gameIdRef.current);   
    }else{
      deleteAllGameSessions();
     handleDelete(gameIdRef.current);
    }
  }, [gameState.grid, gameState.status]); 

    // pick a random number between 0 and 24
    const generateRandomNumber = (): number => {
     const number = Math.floor(Math.random() * 25);     
      if (gameState.clickedIndices.includes(number)) {
        return generateRandomNumber();
      }
      return number;
    }

    const handleClickPickRandomTile = () => {
      if (gameState.status === "active") {
        const randomIndex = generateRandomNumber();
        
        clickingMine(randomIndex);
      }else return
      
    }


  // const gems = 25 - Number(bomb);

  //SETTING ISCLIENT TO TRUE WHEN THE COMPONENT LOADS ON CLIENT SIDE
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // //USE EFFECT TO SET THE NEW AMOUNT IN LOCAL STORAGE WHENEVER THE AMOUNT IN WALLET CHANGES
  // useEffect(() => {
  //   if (isClient) {
  //     const storedAmount = localStorage.getItem("walletAmount");
  //     if (storedAmount) {
  //       setAmountInWallet(JSON.parse(storedAmount));
  //     }
  //   }
  // }, [isClient]);

  // useEffect(() => {
  //   if (isClient) {
  //     localStorage.setItem("walletAmount", JSON.stringify(amountInWallet));
  //   }
  // }, [amountInWallet, isClient]);

  //FUNCTION WHICH IS HANDLING THE ADD BUTTON ON ADD MONEY COMPONENT AND ADDING THE AMOUNT TO WALLET
  // const addButtonClicked = () => {
  //   // FUNCTION THAT SETS THE WALLET AMOUNT UPTO 2 DECIMAL PLACES AFTER ADDING MONEY IN THE WALLET
  //   setAmountInWallet((prevAmount) => {
  //     let updatedAmount;

  //     if (prevAmount !== null) {
  //       updatedAmount = prevAmount + Number(addAmountField);
  //     } else {
  //       updatedAmount = amountInWallet;
  //     }

  //     if (updatedAmount !== null) {
  //       return parseFloat(updatedAmount.toFixed(2));
  //     }
  //     return amountInWallet;
  //   });

  //   setAddMoneyButton(false);
  //   setAddAmountField(null);
  // };

 

  //FUNCTION HANDLING THE BET BUTTON AND IT WILL SUBTRACT THE BET AMOUNT FROM THE AMOUNT IN WALLET ONLY IF AMOUNT IN WALLET IS GREATER THAN OR EQUAL TO THE BET AMOUNT
  // const betButtonClicked = () => {
  //   if (betAmtMines === "") {
  //     // setBetAmountAlert(true);
  //     console.log("bet amount is not entered");
  //   } else {
  //     if (Number(betAmtMines) < 0) {
  //       // setNegativeBet(true);
  //     } else if (
  //       amountInWallet !== null &&
  //       amountInWallet >= Number(betAmount)
  //     ) {
  //       //LOGIC TO IMPLEMENT THE WALLET BALANCE UPTO 2 DECIMAL PLACES AFTER SUBTRACTING THE AMOUNT IN WALLET WITH BET AMOUNT
  //       setAmountInWallet((prevAmount) => {
  //         let updatedAmountInWallet;
  //         if (prevAmount !== null) {
  //           updatedAmountInWallet = prevAmount - Number(betAmount);
  //         } else {
  //           updatedAmountInWallet = amountInWallet;
  //         }

  //         if (updatedAmountInWallet !== null) {
  //           return parseFloat(updatedAmountInWallet.toFixed(2));
  //         }
  //         return amountInWallet;
  //       });

  //       //ARRAY STORING THE INDEX WHERE BOMB WILL BE PLACED
  //       let bombArr: number[] = [];

  //       //GENERATING RANDOM NUMBERS AND THEN STORING THEM IN THE BOMBCOUNT ARRAY
  //       while (bombArr.length < Number(bomb)) {
  //         let randomNumber = generateRandomNumber();
  //         if (!bombArr.includes(randomNumber)) {
  //           bombArr.push(randomNumber);
  //         }
  //       }
  //       // console.log("Generated bomb array:", bombArr);
  //       setBombCount(bombArr);

  //       //SWITCHING OFF THE BET BUTTON WHEN THE USER STARTS A BET
  //       setActiveBet(true);
  //       setBombClicked(false);
  //       console.log("new bet started and active bet is ON");

  //       //SWITCHING ON THE SHUFFLING BUTTON WHEN THE USER STARTS A BET
  //       setShuffleAllowed(true);
  //       setWinningPopUp(false);
  //       setClickedIndices({});
  //       setProfit(1);
  //       setGemCount(0);
  //       setMaxWin(false);
  //       console.log("Number of gems:", gems);
  //       setWinAmount(0);
  //       playSound(betSoundRef);
  //     } else {
  //       setGreaterBet(true);
  //     }
  //   }
  // };

 

  //FUNCTION TO HANDLE THE LOGIC WHEN CASHOUT BUTTON IS CLICKED
  // const cashoutClicked = () => {
  //   setActiveBet(false);
  //   setWinningPopUp(true);
  //   const calculatedWinAmount = (profit * Number(betAmtMines)).toFixed(2);
  //   setAmountInWallet((prev) =>
  //     Number((prev! + Number(calculatedWinAmount)).toFixed(2))
  //   );
  //   setWinAmount(Number(calculatedWinAmount));

  //   //WHEN CASHOUT BUTTON CLICKED, THIS SOUND PLAYS
  //   // playSound(cashoutSoundRef);
  // };

  // //FUNCTION TO UPDATE MULTIPLIER ON EVERY MINE CLICK
  // const profitMultiplier = () => {
  //   if (bomb === "1") {
  //     setProfit(oneBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "2") {
  //     setProfit(twoBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "3") {
  //     setProfit(threeBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "4") {
  //     setProfit(fourBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "5") {
  //     setProfit(fiveBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "6") {
  //     setProfit(sixBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "7") {
  //     setProfit(sevenBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "8") {
  //     setProfit(eightBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "9") {
  //     setProfit(nineBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "10") {
  //     setProfit(tenBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "11") {
  //     setProfit(elevenBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "12") {
  //     setProfit(twelveBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "13") {
  //     setProfit(thirteenBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "14") {
  //     setProfit(fourteenBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "15") {
  //     setProfit(fifteenBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "16") {
  //     setProfit(sixteenBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "17") {
  //     setProfit(seventeenBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "18") {
  //     setProfit(eighteenBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "19") {
  //     setProfit(nineteenBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "20") {
  //     setProfit(twentyBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "21") {
  //     setProfit(twentyOneBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "22") {
  //     setProfit(twentyTwoBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "23") {
  //     setProfit(twentyThreeBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "24") {
  //     setProfit(twentyFourBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   }
  // };

  // //FUNCTION WHICH WILL WORK WHEN A MINE IS CLICKED, LOGGING TO THE CONSOLE
  // const mineClicked = (index: number) => {
  //   console.log("Clicked index:", index);
  //   console.log("Bomb count array:", bombCount);
  //   if (bombCount.includes(index)) {
  //     setClickedIndices((prev) => ({ ...prev, [index]: "bomb" }));
  //     console.log("Bomb Clicked");
  //     playSound(bombSoundRef);
  //   } else {
  //     setClickedIndices((prev) => ({ ...prev, [index]: "gem" }));
  //     console.log("Gem Clicked");
  //     setGemCount((prev) => prev + 1);
  //     playSound(gemSoundRef);

  //     if (gemCount === gems) {
  //       maxWinFunction();
  //     }

  //     profitMultiplier();
  //   }

  //   if (bombCount.includes(index)) {
  //     setBombClicked(true);
  //     setActiveBet(false);
  //     setProfit(0);
  //     console.log("bet has been set to false again");
  //   }
  // };

  // const maxWinFunction = () => {
  //   setMaxWin(true);

  //   if (bomb === "1") {
  //     const lastIndex = oneBombArr.length - 1;
  //     //  maxWinAmount = oneBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(oneBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "2") {
  //     const lastIndex = twoBombArr.length - 1;
  //     //  maxWinAmount = twoBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(twoBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "3") {
  //     const lastIndex = threeBombArr.length - 1;
  //     // maxWinAmount = threeBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(threeBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "4") {
  //     const lastIndex = fourBombArr.length - 1;
  //     //  maxWinAmount = fourBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(fourBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "5") {
  //     const lastIndex = fiveBombArr.length - 1;
  //     //  maxWinAmount = fiveBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(fiveBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "6") {
  //     const lastIndex = sixBombArr.length - 1;
  //     // maxWinAmount = sixBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(sixBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "7") {
  //     const lastIndex = sevenBombArr.length - 1;
  //     //  maxWinAmount = sevenBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(sevenBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "8") {
  //     const lastIndex = eightBombArr.length - 1;
  //     //  maxWinAmount = eightBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(eightBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "9") {
  //     const lastIndex = nineBombArr.length - 1;
  //     //  maxWinAmount = nineBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(nineBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "10") {
  //     const lastIndex = tenBombArr.length - 1;
  //     //  maxWinAmount = tenBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(tenBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "11") {
  //     const lastIndex = elevenBombArr.length - 1;
  //     //  maxWinAmount = elevenBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(elevenBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "12") {
  //     const lastIndex = twelveBombArr.length - 1;
  //     //  maxWinAmount = twelveBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(twelveBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "13") {
  //     const lastIndex = thirteenBombArr.length - 1;
  //     //  maxWinAmount = thirteenBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(thirteenBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "14") {
  //     const lastIndex = fourteenBombArr.length - 1;
  //     //  maxWinAmount = fourteenBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(fourteenBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "15") {
  //     const lastIndex = fifteenBombArr.length - 1;
  //     //  maxWinAmount = fifteenBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(fifteenBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "16") {
  //     const lastIndex = sixteenBombArr.length - 1;
  //     //  maxWinAmount = sixteenBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(sixteenBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "17") {
  //     const lastIndex = seventeenBombArr.length - 1;
  //     //  maxWinAmount = seventeenBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(seventeenBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "18") {
  //     const lastIndex = eighteenBombArr.length - 1;
  //     //  maxWinAmount = eighteenBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(eighteenBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "19") {
  //     const lastIndex = nineteenBombArr.length - 1;
  //     // maxWinAmount = nineteenBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(nineteenBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "20") {
  //     const lastIndex = twentyBombArr.length - 1;
  //     //  maxWinAmount = twentyBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(twentyBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "21") {
  //     const lastIndex = twentyOneBombArr.length - 1;
  //     //  maxWinAmount = twentyOneBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(twentyOneBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "22") {
  //     const lastIndex = twentyTwoBombArr.length - 1;
  //     //  maxWinAmount = twentyTwoBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(twentyTwoBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "23") {
  //     const lastIndex = twentyThreeBombArr.length - 1;
  //     // maxWinAmount = twentyThreeBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(twentyThreeBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "24") {
  //     const lastIndex = twentyFourBombArr.length - 1;
  //     //  maxWinAmount = twentyFourBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(twentyFourBombArr[lastIndex] * Number(betAmount));
  //   }

  //   setActiveBet(false);

  //   console.log("All gems are clicked");
  // };

  // useEffect(() => {
  //   if (gemCount === gems) {
  //     maxWinFunction();
  //   }
  // }, [gemCount]);

  //array of length 25 to display all div boxes through loop
  const divs = Array.from({ length: 25 });
  const [containerRef, size] = useResizeObserver();

 
const { width: windowWidth } = useWindowSize();
const slipOrSidebarClasses = useMemo(() => {
   if (isBetSlipOpen && isSidebarOpen) {
    // BOTH open: subtract 545px, adjust aggressively
    if (windowWidth >= 1400) return "w-[5.6rem] h-[5.6rem]";
    if (windowWidth >= 1320) return "w-[4.8rem] h-[4.8rem]";
    if (windowWidth >= 850) return "w-[4.2rem] h-[4.2rem]";
    if (windowWidth >= 480) return "w-[3.9rem] h-[3.9rem]";
    return "w-[3.4rem] h-[3.4rem]";
  }

  if (isSidebarOpen) {
    // ONE open: subtract ~235-310px
    if (windowWidth >= 1220) return "w-[7.4rem] h-[7.4rem]";
    if (windowWidth >= 1100) return "w-[6.4rem] h-[6.4rem]";
    if (windowWidth >= 915) return "w-[5.4rem] h-[5.4rem]";
    if (windowWidth >= 850) return "w-[4.5rem] h-[4.5rem]";
    if (windowWidth >= 480) return "w-[3.9rem] h-[3.9rem]";
    return "w-[3.4rem] h-[3.4rem]";
  }
  if (isBetSlipOpen) {
    // ONE open: subtract ~235-310px
    if (windowWidth >= 1420) return "w-[7.4rem] h-[7.4rem]";
    if (windowWidth >= 1330) return "w-[6.4rem] h-[6.4rem]";
    if (windowWidth >= 1230) return "w-[5.4rem] h-[5.4rem]";
    if (windowWidth >= 1080) return "w-[4.5rem] h-[4.5rem]";
    if (windowWidth >= 915) return "w-[3rem] h-[3rem]";
    return "w-[4.8rem] h-[4.4rem]";
  }

  return "";
}, [isBetSlipOpen, isSidebarOpen, windowWidth]);


  // ... same logic as above





  return (
    <>
      <div
        className={` h-full w-full bg-[#0f212e] rounded-xl flex flex-col-reverse items-center shadow-2xl
        
           sm:rounded-xl sm:flex sm:flex-col-reverse  sm:items-center sm:shadow-2xl
        
          

          ${isBetSlipOpen && isSidebarOpen && windowWidth < 1260 ? "flex flex-col-reverse" : " 915px:rounded-xl 915px:flex 915px:flex-row  915px:items-center 915px:shadow-2xl"}
${
          gameState.reshuffling ? "blur-sm" : ""
        } `}
      >
        <div className={` ${isBetSlipOpen && isSidebarOpen && windowWidth < 1260 ? "w-fit " : "480px:w-[420px] " } h-full `}>
          <BetCalculatorMines
            handleClickPickRandomTile={handleClickPickRandomTile}
            bomb={gameState.bomb}
            setGameState={setGameState}
            Bet={betButtonClicked}
            isLoading={isLoadingBet}
            gemCount={gameState.gemCount}
            status={gameState.status}
            handleCashout={handleCashout}
            profit={gameState.profit}
            winAmount={gameState.winAmount}
            betAmt={betAmtMines}
          />
        </div>

        {/* GRID BOX */}
       <div  className={`w-full h-fit flex items-center p-2 justify-center`}>
        <div
          ref={containerRef}
          className={`  grid grid-rows-5 grid-cols-5 w-fit  gap-2 gap-y-3 justify-items-center  h-fit   ${isBetSlipOpen ? "min-h-fit" : ""}  items-center   rounded-lg  
            
         
            ${gameState.winningPopUp ? "" : ""}  `}
        >
          {/* LOOPING THROUGH THE DIV TO SHOW MINES */}
          {gameState.grid.map((tile, index) => {
            const isCurrentIndexClicked = gameState.clickedIndex == index;
            const isClicked = gameState.clickedIndices?.includes(index);
            const imageSizeClass = isClicked ? "p-5 " : "p-8 opacity-30";
            const bombClicked = gameState.grid.includes("bomb");

            return (
              <button
                disabled={isLoadingBet}
                
                key={index}
                className={`
    
    ${slipOrSidebarClasses ? slipOrSidebarClasses : `w-[3.4rem] h-[3.4rem]
    390px:w-[3.9rem] 390px:h-[3.9rem]
    480px:w-[4.8rem] 480px:h-[4.8rem]
    850px:w-[4.8rem] 850px:h-[4.8rem]
    915px:w-[6rem] 915px:h-[6rem]
    1040px:w-[7.4rem] 1040px:h-[7.4rem]`}
    bg-[#2f4553] aspect-video flex justify-center items-center rounded-lg mineField 
    ${isClicked ? "mineClicked" : ""}
    ${bombClicked ? "mineClicked" : ""}
    ${isLoading && isCurrentIndexClicked && gameState.status !== "lost" ? "pulse" : ""}
  `}
                onClick={() => {
                  if (!isClicked) {
                    clickingMine(index);
                  }
                }}
              >
                {tile === "bomb" && (<>
                {isClicked &&   
                <img
                  
                  src={`${bombEffectGif}?t=${Date.now()}`}
                  className="absolute justify-center items-center duration-150"
                  />
                  }
                
                  <img
                    src={bombImg}
                    alt="Bomb"
                    className={` popUp ${imageSizeClass}`}
                  />
              </>  )}
                {tile === "gem" && (
                  <img
                    src={gemImg}
                    alt="Gem"
                    className={` popUp ${imageSizeClass}`}
                  />
                )}
              </button>
            );
          })}
        </div>
       </div>
      </div>

      {/* {maxWin && (
        <Winning winningMultiplier={profit} winningAmount={maxWinAmount} />
      )} */}

      {gameState.winningPopUp && (
        <Winning
          winningMultiplier={gameState.profit}
          winningAmount={gameState.winAmount}
        />
      )}

      {gameState.reshuffling && <ReShuffle />}
    </>
  );
}
