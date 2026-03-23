import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import "./index.css"; // small complement file for 3D CSS (see notes)
import { useSocket } from "../../context/SocketContext";
import { useUserInfo } from "../../context/UserInfoContext";
import BetCalculatorCoinGame from "./BetCalculatorCoinGame";
import { CoinFlipResult, CoinGameState } from "../../utils/types/Games";
import { deleteAllGameSessions, deleteGameSession, getGameSession, saveGameSession } from "../../utils/security/StoreGameSession";
import GameLayout from "../../userinterface/components/CasinoComponents/GameLayout";





const ENCRYPTION_PASSWORD = "SuperSecretPass!"; 

export default function CoinFlip3D() {
 
  const initialCoinState: CoinGameState = {
  gameId: "",
  isClient: false,
  status: null,
  stake: 0,
  selectedSide: 'heads',
  winAmount: 0,
  profit: 0.0,
  history: [],
  lastResult: null,
  gameMessage: "",
};

  const [coinGameState, setCoinGameState] = useState<CoinGameState>(initialCoinState);

  const [isFlipping, setIsFlipping] = useState(false);
  const [isPlacingBet, setIsPlacingBet] = useState(false);
  
  const gameIdRef = useRef<string>('');

  // const [selectedSide, setSelectedSide] = useState<"heads" | "tails">("heads");
  // const [status, setStatus] = useState<"lost" | "active" | "cashed_out" | null>(null);
  // const [history, setHistory] = useState<CoinFlipResult[]>(() => {
  //   try {
  //     const raw = localStorage.getItem("coinflip_history");
  //     return raw ? JSON.parse(raw) : [];
  //   } catch (e) {
  //     return [];
  //   }
  // });
  // const [lastResult, setLastResult] = useState<CoinFlipResult | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {userId,betAmtCoinFlip} = useUserInfo()

  // audio
  const audioContextRef = useRef<AudioContext | null>(null);
  const flipBufferRef = useRef<AudioBuffer | null>(null);
  const winBufferRef = useRef<AudioBuffer | null>(null);
  const loseBufferRef = useRef<AudioBuffer | null>(null);

  // framer controls
  const controls = useAnimation();
  const coinRef = useRef<HTMLDivElement | null>(null);

 const {joinCasinoRoom, leaveRoom, emit, on} = useSocket();

 useEffect(() => {
    joinCasinoRoom("coinflip");
    return () => {
      leaveRoom("coinflip");
    };
  }, [joinCasinoRoom, leaveRoom]);

  // helpers - encryption for storing session (simple; in production use secure storage)
  const encrypt = useCallback((data: any) => {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_PASSWORD).toString();
    } catch (e) {
      return "";
    }
  }, []);

  const decrypt = useCallback((cipher: string) => {
    try {
      const bytes = CryptoJS.AES.decrypt(cipher, ENCRYPTION_PASSWORD);
      const json = bytes.toString(CryptoJS.enc.Utf8);
      return json ? JSON.parse(json) : null;
    } catch (e) {
      return null;
    }
  }, []);

  // audio loader
  useEffect(() => {
    audioContextRef.current = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
    const load = async (url: string, ref: React.MutableRefObject<AudioBuffer | null>) => {
      try {
        const resp = await fetch(url);
        const array = await resp.arrayBuffer();
        if (audioContextRef.current) ref.current = await audioContextRef.current.decodeAudioData(array);
      } catch (e) {
        // silent fail if asset missing
      }
    };

    // small clicky / flip / win / lose sounds - replace with real assets
    load("/sounds/coinFlip.mp3", flipBufferRef);
    load("/sounds/win.mp3", winBufferRef);
    load("/sounds/lose.mp3", loseBufferRef);

    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  const playSound = useCallback((buffer: AudioBuffer | null) => {
    if (!audioContextRef.current || !buffer) return;
    try {
      const src = audioContextRef.current.createBufferSource();
      src.buffer = buffer;
      src.connect(audioContextRef.current.destination);
      src.start();
    } catch (e) {
      // ignore
    }
  }, []);

  // persist history
  // useEffect(() => {
  //   try {
  //     localStorage.setItem("coinflip_history", JSON.stringify(history.slice(0, 200)));
  //   } catch (e) {}
  // }, [history]);

  // Restore session on component mount or reconnection
   useEffect(() => {
     const Game_Session_Id = localStorage.getItem("coinflip_gameId");
     if (!Game_Session_Id) {
    
       return;
     }
     (async () => {
       try {
         const savedState = await getGameSession(
           Game_Session_Id,
           ENCRYPTION_PASSWORD
         );
         if (savedState) {
          console.log("Restoring game state:", savedState);
          
           setCoinGameState(savedState as CoinGameState);
           console.log("Restored game state:", savedState);
           gameIdRef.current = savedState.gameId ;
         }
       } catch (error) {
         console.error("Error restoring session:", error);
       } finally {
        //  setIsLoadingBet(false);

       }
     })();
   }, []);
  

  const calculatePayout = useCallback((stake: number, win: boolean) => {
       
    if (!win) return 0;
    const gross = stake * 2;
    const fee = gross * 0.02;
    return Math.round((gross - fee) * 100) / 100;
  }, []);

// 1. Bet placed
  const onBetPlaced = (payload: any) => {
      
    if (!payload?.success) {
      setIsPlacingBet(false);
      return;
    }

   const { gameId, updatedBalance } = payload;
    gameIdRef.current = gameId;
    setIsPlacingBet(false);
    setIsFlipping(false);
    setCoinGameState((prev) => ({ ...prev, gameId, isClient: true, status: "active" }));
    // setStatus("active");
  
    
    
   
    try { localStorage.setItem("coinflip_gameId", gameId); } catch {}
  
  };

// 2. Result from server
  const onCoinflipResult = useCallback((payload: any) => {
  
    if (!payload?.success || !payload?.resultSide) {
      setIsPlacingBet(false);
      setIsFlipping(false);
      return;
    }
    const { resultSide, win, payout, streak, gameId, multiplier, updatedBalance } = payload;
  
    const coinflipResult: CoinFlipResult = {
      id: gameId,
      timestamp: Date.now(),
      side: resultSide,
      stake: betAmtCoinFlip,
      payout: payout,
      profit: payout + betAmtCoinFlip,
    };

    if (win) {
   
      playSound(winBufferRef.current);
      setCoinGameState((prev) => ({ ...prev, status: "active", lastResult: coinflipResult}));


    } else if(!win){
    
      playSound(loseBufferRef.current);
      setCoinGameState(initialCoinState);
     
    }

    // setLastResult(coinflipResult);
    // setHistory((h) => [coinflipResult, ...h].slice(0, 200));

    // playSound(coinflipResult.payout > 0 ? winBufferRef.current : loseBufferRef.current);
    try { Cookies.set("last_coinflip", encrypt(coinflipResult), { expires: 1 }); } catch {}

    // clear flags
    setIsPlacingBet(false);
    setIsFlipping(false);
    // setStatus("idle");
    // setCoinGameState((prev) => ({ ...prev, status: "idle", lastResult: coinflipResult }));
   
  },[])

  // 3) Cashout success
 const onCashoutSuccess =  useCallback(async(data: any) => {
   if (!data?.success) return;
   
  setCoinGameState((prev) => ({
    ...prev,
    status: "cashed_out",
    winAmount: data.payout,
  }));

  if (data.success === true) {
    try {
      await deleteGameSession(gameIdRef.current);
      console.log("Game session deleted for:", gameIdRef.current);
    } catch (error) {
      console.error("Error deleting session:", error);
    }

    setCoinGameState(initialCoinState);
  }
},[])


  // 4) Errors
  const onCoinflipError = useCallback((err: any) => {
    alert(err?.message || "Coinflip error");
    setIsPlacingBet(false);
    setIsFlipping(false);
  }, []);

useEffect(() => {


  const unsub0 = on("betPlaced", onBetPlaced);
  const unsub1 = on("coinflipResult", onCoinflipResult);
  const unsub2 = on("coinflipCashoutSuccess", onCashoutSuccess);
  const unsub3 = on("coinflipError", onCoinflipError);

   return () => {
    unsub0?.();
    unsub1?.();
    unsub2?.();
    unsub3?.();
  };
}, [on,onBetPlaced])

const flipAnimation = useCallback(async () => {
  if (!coinRef.current) return;
  // just animate, don't set state again
  const rotations = 6 + Math.floor(Math.random() * 6);
  const spin = rotations * 180 + (Math.random() < 0.5 ? 0 : 180);
  await controls.start({ rotateY: spin }, { duration: 1.6, ease: [0.2, 0.9, 0.2, 1] });
  await controls.start({ rotateY: spin + (Math.random() < 0.5 ? -10 : 10) }, { duration: 0.35 });
  controls.set({ rotateY: spin % 360 });
  // after animation, flip state off if no server yet
  setIsFlipping(false);
}, [controls]);

// player actions
const handleHeadsOrTails = useCallback((side: "heads" | "tails") => {
  if (!userId || !gameIdRef.current) {
    console.warn("No active gameId. Place bet first.");
    return;
  }
  if (isFlipping || isPlacingBet) return;

  
  setIsFlipping(true);
  flipAnimation(); 
  // send choice to server
  emit?.("headsOrTails", { userId, gameId: gameIdRef.current, selectedSide: side });
}, [emit, userId, flipAnimation]);

// cashout
const handleCashoutCoinflip = useCallback(() => {
  if (!userId || !gameIdRef.current) return;
 
  setIsPlacingBet(false);
  setIsFlipping(false);
  setCoinGameState((prev) => ({ ...prev, status: "cashed_out" }));
  // setStatus("cashed_out");

  // send cashout to server
  emit?.("cashoutCoinflip", { userId, gameId: gameIdRef.current });
}, [emit, userId]);


const handlePlaceBet = async () => {
  if (betAmtCoinFlip <= 0 || isFlipping || isPlacingBet) return;

  setIsPlacingBet(true);
  setIsFlipping(true);
  setCoinGameState((prev) => ({ ...prev, status: "active", stake: betAmtCoinFlip }));
  // setStatus("active");

  playSound(flipBufferRef.current);

  // send bet to server
  emit?.("placeBet", {
    userId,
    betAmount: Number(betAmtCoinFlip),
  });

 
  // flipAnimation(); 
};

// Spacebar to flip
useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.code === "Space" && !isFlipping && !isPlacingBet) {
      e.preventDefault();
      handlePlaceBet();
    }
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, [isFlipping, isPlacingBet]);

// Preview stake & potential payout (uses your local calculatePayout just for display)
const balancePreview = useMemo(() => {
  const winPayout = calculatePayout(betAmtCoinFlip, true);
  return { stake: betAmtCoinFlip, potential: winPayout };
}, [betAmtCoinFlip, calculatePayout]);

// UI helpers
const formatTime = useCallback((ts: number) => new Date(ts).toLocaleString(), []);

const clearHistory = () => {
  // setHistory([]);
  setCoinGameState((prev) => ({ ...prev, history: [] }));
  // localStorage.removeItem("coinflip_history");
};

useEffect(() => {
  if (status !== "active") {
    // localStorage.removeItem("coinflip_history");
  }
}, []);

// Save or delete game session on state changes
 const handleSave = async (gameId: string): Promise<void> => {
    try {
      if (coinGameState.status === "active" || gameIdRef.current) {
        await saveGameSession(gameId, coinGameState, ENCRYPTION_PASSWORD);
        console.log("Game session saved securely.");
      }
    
    } catch (error) {
      console.error("Error saving session:", error);
    }
  };

   const handleDelete = async (GameId:string): Promise<void> => {
      try {
        await deleteGameSession(GameId);
        console.log("Game session deleted.");
      } catch (error) {
        console.error("Error deleting session:", error);
      }
    };

    useEffect(() => {
      if (coinGameState.status==='active' && coinGameState.gameId) {
        handleSave(gameIdRef.current);   
      }else{
        deleteAllGameSessions();
       handleDelete(gameIdRef.current);
      }
    }, [coinGameState.gameId, coinGameState.status]); 
  

    const gameContent = (<>
     {/* <div className="flex-1 flex flex-col items-center gap-4"> */}
          

          <div className="relative">
            <motion.div
              ref={coinRef}
              animate={controls}
              style={{ perspective: 1200 }}
              className="coin-viewport"
            >
              <div className={`coin-container ${isFlipping ? "is-flipping" : ""}`}>
                {/* HEADS face */}
                <div className="coin-face coin-heads flex items-center justify-center select-none">
                  <svg width="96" height="96" viewBox="0 0 100 100" className="drop-shadow-lg">
                    <circle cx="50" cy="50" r="46" stroke="goldenrod" strokeWidth="2" fill="url(#g)" />
                    <defs>
                      <radialGradient id="g" cx="50%" cy="30%">
                        <stop offset="0%" stopColor="#fff7d6" />
                        <stop offset="80%" stopColor="#ffd54a" />
                      </radialGradient>
                    </defs>
                    <text x="50%" y="56%" textAnchor="middle" fontSize="22" fontWeight={700} fill="#7a4100">H</text>
                  </svg>
                </div>

                {/* TAILS face */}
                <div className="coin-face coin-tails flex items-center justify-center select-none">
                  <svg width="96" height="96" viewBox="0 0 100 100" className="drop-shadow-lg">
                    <circle cx="50" cy="50" r="46" stroke="#bfbfbf" strokeWidth="2" fill="url(#g2)" />
                    <defs>
                      <radialGradient id="g2" cx="30%" cy="40%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="80%" stopColor="#c0c0c0" />
                      </radialGradient>
                    </defs>
                    <text x="50%" y="56%" textAnchor="middle" fontSize="22" fontWeight={700} fill="#333">T</text>
                  </svg>
                </div>

                {/* edge */}
                <div className="coin-edge" />

                {/* shiny overlay for reflection effect */}
                <div className="coin-shine pointer-events-none" />
              </div>
            </motion.div>

            {/* result badge */}
            {coinGameState.lastResult && (
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-md text-sm">
                Last: {coinGameState.lastResult.side.toUpperCase()} • {coinGameState.lastResult.payout} payout
              </div>
            )}
          </div>

        {/* </div> */}

        {/* Right: History / Stats */}
        {/* <div className={`w-full md:w-1/3 transition-all ${isSidebarOpen ? "opacity-100" : "opacity-80"}`}> */}
          {/* <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold">History</h3>
            <div className="text-sm text-gray-300">{coinGameState.history.length} recent</div>
          </div> */}

          {/* <div className="bg-[#071018] rounded p-3 max-h-96 overflow-auto">
            {coinGameState.history.length === 0 ? (
              <div className="text-gray-400 text-sm">No plays yet. Your recent flips will appear here.</div>
            ) : (
              <ul className="space-y-2">
                {coinGameState.history.map((h) => (
                  <li key={h.id} className="flex items-center justify-between bg-[#0f2a33] p-2 rounded">
                    <div>
                      <div className="text-sm text-gray-200">{h.side.toUpperCase()}</div>
                      <div className="text-xs text-gray-400">{formatTime(h.timestamp)}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm ${h.profit >= 0 ? "text-green-300" : "text-red-400"}`}>{h.payout}</div>
                      <div className="text-xs text-gray-400">stake {h.stake}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-3 flex gap-2">
              <button onClick={clearHistory} className="flex-1 py-2 rounded bg-[#152b33] text-gray-200">Clear</button>
              <button onClick={() => { navigator.clipboard?.writeText(JSON.stringify(coinGameState.history.slice(0, 50))); }} className="py-2 px-3 rounded bg-[#0f3b4a] text-gray-200">Export</button>
            </div>
          </div> */}

          {/* mini-stats */}
          {/* <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-gray-300">
            <div className="bg-[#0b222a] p-2 rounded text-center">
              <div className="font-semibold">Plays</div>
              <div>{history.length}</div>
            </div>
            <div className="bg-[#0b222a] p-2 rounded text-center">
              <div className="font-semibold">Win %</div>
              <div>{coinGameState.history.length ? Math.round((coinGameState.history.filter(h => h.profit>0).length / coinGameState.history.length) * 100) : 0}%</div>
            </div>
            <div className="bg-[#0b222a] p-2 rounded text-center">
              <div className="font-semibold">Total Profit</div>
              <div>{Math.round(coinGameState.history.reduce((s, r) => s + (r.profit || 0), 0) * 100) / 100}</div>
            </div>
          </div> */}
        {/* </div> */}
    </>);

  return ( <>
    {/* // <div className=" w-full h-[675px] bg-red-900 max-w-8xl mx-auto p-4"> */}
    {/* //   <div className="bg-[#0f212e] rounded-xl shadow-2xl p-4 flex flex-col md:flex-row gap-6"> */}
        {/* Left: Controls & coin */}
       
        <GameLayout
          gameName="Coin Flip"
          betComponent={
           <BetCalculatorCoinGame
     
              Bet={handlePlaceBet}
              setGameState={setCoinGameState}
              profit={balancePreview.potential / betAmtCoinFlip - 1}
              status={coinGameState.status}
              isLoading={isPlacingBet || isFlipping}
              handleCashout={handleCashoutCoinflip}
              lastBetAmt={coinGameState.stake}
              handleHeadsOrTails={handleHeadsOrTails}
            />}
            gameComponent={gameContent}
          />

    {/* //   </div> */}

    {/* // </div> */}
     </> );
}
