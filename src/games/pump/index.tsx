import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";

// Chance % for each multiplier stage (approx. inverse of multiplier, capped)
const getChance = (multiplier: number): number => {
  // P(survive) ≈ 99% / multiplier  (house edge 1%)
  return Math.min(99.99, parseFloat(((0.99 / multiplier) * 100).toFixed(6)));
};

type Mode = "Manual" | "Auto";
type Difficulty = "Easy" | "Medium" | "Hard";
type GameState = "idle" | "running" | "popped" | "cashed_out";

// ── Web Audio API Sound Effects ──────────────────────────────────────
const audioCtxRef = { current: null as AudioContext | null };

function getAudioCtx(): AudioContext {
  if (!audioCtxRef.current) {
    audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtxRef.current;
}

/** Short air-blow / inflate sound */
function playInflateSound() {
  try {
    const ctx = getAudioCtx();
    const duration = 0.18;

    // Noise buffer for the "pff" blow
    const bufferSize = ctx.sampleRate * duration;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    // Band-pass filter to shape the blow
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 800;
    filter.Q.value = 1.5;

    // Envelope
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    noise.start(ctx.currentTime);
    noise.stop(ctx.currentTime + duration);
  } catch (_) { /* ignore audio errors */ }
}

/** Pop / burst sound */
function playPopSound() {
  try {
    const ctx = getAudioCtx();

    // Low-frequency "thud" oscillator
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.2);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.6, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);

    // Noise burst for the "crack"
    const bufferSize = ctx.sampleRate * 0.12;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const nd = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      nd[i] = (Math.random() * 2 - 1);
    }
    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = noiseBuffer;

    const hpf = ctx.createBiquadFilter();
    hpf.type = "highpass";
    hpf.frequency.value = 1000;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.7, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    noiseSrc.connect(hpf);
    hpf.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noiseSrc.start(ctx.currentTime);
    noiseSrc.stop(ctx.currentTime + 0.12);
  } catch (_) { /* ignore audio errors */ }
}

// ── Component ────────────────────────────────────────────────────────
export default function PumpGame() {
  // UI State
  const [mode, setMode] = useState<Mode>("Manual");
  const [difficulty, setDifficulty] = useState<Difficulty>("Hard");
  const [betAmount, setBetAmount] = useState<number>(0);

  // Game State
  const [gameState, setGameState] = useState<GameState>("idle");
  const [multiplier, setMultiplier] = useState<number>(1.00);
  const [crashMultiplier, setCrashMultiplier] = useState<number>(1.00);
  const [profit, setProfit] = useState<number>(0);
  const [pumpCount, setPumpCount] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([]);

  // Tooltip State
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  // Keep crash multiplier in a ref for the pop display
  const lastCrashRef = useRef<number>(1.00);

  // Generate a crash point based on typical casino crash logic (inverse distribution)
  const generateCrashPoint = () => {
    const r = Math.random();
    if (r === 0) return 1.00;
    const point = 0.99 / r;
    return Math.min(1000, Math.max(1.00, parseFloat(point.toFixed(2))));
  };

  const resetGame = () => {
    setGameState("idle");
    setMultiplier(1.00);
    setProfit(0);
    setPumpCount(0);
    setCrashMultiplier(1.00);
  };

  const handleBet = () => {
    if (gameState === "running") return;
    setGameState("running");
    setMultiplier(1.00);
    setProfit(0);
    setPumpCount(0);
    const cp = generateCrashPoint();
    setCrashMultiplier(cp);
    lastCrashRef.current = cp;
  };

  const handlePop = useCallback((crashVal: number) => {
    playPopSound();
    lastCrashRef.current = crashVal;
    setMultiplier(parseFloat(crashVal.toFixed(2)));
    setGameState("popped");
    setProfit(0);
    updateHistory(parseFloat(crashVal.toFixed(2)));

    setTimeout(() => {
      resetGame();
    }, 2500);
  }, []);

  const handlePump = () => {
    if (gameState !== "running") return;

    playInflateSound();

    const growthRate = 0.12;
    const nextMultiplier = parseFloat((multiplier + (multiplier * growthRate)).toFixed(2));

    if (nextMultiplier >= crashMultiplier) {
      handlePop(crashMultiplier);
    } else {
      setMultiplier(nextMultiplier);
      const currentProfit = betAmount * nextMultiplier;
      setProfit(currentProfit);
      setPumpCount(c => c + 1);
    }
  };

  const handleCashOut = () => {
    if (gameState !== "running" || pumpCount === 0) return;

    setGameState("cashed_out");
    const finalProfit = betAmount * multiplier;
    setProfit(finalProfit);
    updateHistory(multiplier);

    setTimeout(() => {
      resetGame();
    }, 2000);
  };

  const updateHistory = (newMultiplier: number) => {
    setHistory((prev) => {
      const newHistory = [Math.floor(newMultiplier * 100) / 100, ...prev];
      return newHistory.slice(0, 10);
    });
  };

  const isRunning = gameState === "running";
  const isCrashed = gameState === "popped";
  const isCashedOut = gameState === "cashed_out";
  const isEnded = isCrashed || isCashedOut;

  // ── Balloon scale logic ──
  // idle   → normal full balloon (scale 1)
  // running pumpCount===0 → deflated small (scale ~0.35)
  // running pumpCount>0   → grows with multiplier
  const getBalloonScale = () => {
    if (!isRunning) return 1; // idle = normal
    if (pumpCount === 0) return 0.35; // just bet, deflated
    return 0.35 + Math.log10(multiplier + 0.01) * 1.4;
  };

  const getBalloonY = () => {
    if (!isRunning) return 0;
    if (pumpCount === 0) return 80;
    return Math.max(0, 80 - Math.log10(multiplier + 0.01) * 80);
  };

  return (
    <div className="pump-container">
      {/* Left Panel - Controls */}
      <div className="pump-controls">
        <div className="mode-toggle">
          <button
            className={mode === "Manual" ? "active" : ""}
            onClick={() => setMode("Manual")}
            disabled={isRunning || isEnded}
          >
            Manual
          </button>
          <button
            className={mode === "Auto" ? "active" : ""}
            onClick={() => setMode("Auto")}
            disabled={isRunning || isEnded}
          >
            Auto
          </button>
        </div>

        <div className="input-group">
          <label>Bet Amount</label>
          <div className="bet-input-wrapper">
            <input
              type="number"
              value={betAmount === 0 ? "" : betAmount}
              onChange={(e) => {
                setBetAmount(Number(e.target.value));
              }}
              placeholder="0.00000000"
              disabled={isRunning || isEnded}
            />
            <div className="bet-actions">
              <button disabled={isRunning || isEnded} onClick={() => { setBetAmount((b) => b / 2); }}>½</button>
              <div className="divider"></div>
              <button disabled={isRunning || isEnded} onClick={() => { setBetAmount((b) => b * 2); }}>2×</button>
            </div>
          </div>
        </div>

        <div className="input-group">
          <label>Difficulty</label>
          <div className="select-wrapper">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              disabled={isRunning || isEnded}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* TOP BUTTON: Bet or Cash Out */}
          {gameState === "idle" || isEnded ? (
            <button
              className="action-btn bet-btn"
              onClick={handleBet}
              disabled={isEnded}
              style={{ marginTop: 0 }}
            >
              Bet
            </button>
          ) : (
            <button
              className="action-btn cashout-btn"
              onClick={handleCashOut}
              disabled={pumpCount === 0 || !isRunning}
              style={{ marginTop: 0 }}
            >
              Cash Out
            </button>
          )}

          {/* BOTTOM BUTTON: Pump */}
          <button
            className="action-btn"
            onClick={handlePump}
            disabled={!isRunning}
            style={{
              marginTop: 0,
              backgroundColor: isRunning ? '#2f4553' : '#1a2c38',
              color: isRunning && pumpCount === 0 ? '#fff' : (isRunning ? '#fff' : '#8790a7'),
              opacity: isRunning ? 1 : 0.6,
              cursor: isRunning ? 'pointer' : 'not-allowed'
            }}
          >
            Pump
          </button>
        </div>

        <div className="profit-display">
          <label>Total Profit ({multiplier.toFixed(2)}×)</label>
          <div className="profit-value">
            {profit.toFixed(8)}
          </div>
        </div>
      </div>

      {/* Right Panel - Game Area */}
      <div className="pump-game-area">
        <div className="balloon-scene">

          {/* ── IDLE & RUNNING balloon ── */}
          <AnimatePresence mode="wait">
            {(gameState === "idle" || isRunning) && (
              <motion.div
                key="active-balloon"
                className="balloon"
                initial={false}
                animate={{
                  scale: getBalloonScale(),
                  y: getBalloonY(),
                  rotate: isRunning && multiplier > 1.2 ? [0, -2, 2, -1, 1, 0] : 0,
                }}
                transition={{
                  scale: { type: "spring", stiffness: 300, damping: 15 },
                  y: { type: "spring", stiffness: 300, damping: 15 },
                  rotate: {
                    repeat: isRunning ? Infinity : 0,
                    duration: Math.max(0.1, 0.4 - Math.log10(multiplier) * 0.2),
                    ease: "easeInOut"
                  }
                }}
                exit={{
                  scale: getBalloonScale() * 1.6,
                  opacity: 0,
                  filter: "brightness(2) blur(8px)",
                  transition: { duration: 0.12, ease: "easeOut" }
                }}
              >
                <div className="multiplier-text">
                  {`${multiplier.toFixed(2)}×`}
                </div>
                <div className="balloon-shine"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── POPPED state: multiplier + "Pop" text, no balloon ── */}
          <AnimatePresence>
            {isCrashed && (
              <motion.div
                key="pop-display"
                className="pop-display"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <div className="pop-multiplier">{multiplier.toFixed(2)}x</div>
                <div className="pop-label">Pop</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── CASHED OUT state ── */}
          <AnimatePresence>
            {isCashedOut && (
              <motion.div
                key="cashout-display"
                className="balloon cashed-out-bg"
                initial={{ scale: getBalloonScale() }}
                animate={{ scale: getBalloonScale() }}
              >
                <div className="cashout-box">
                  <div className="cashout-multiplier">{multiplier.toFixed(2)}×</div>
                  <div className="cashout-divider"></div>
                  <div className="cashout-profit">
                    {profit.toFixed(8)} <span className="coin-icon">T</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Pump Base ── */}
          <div className="pump-base">
            <div className="pump-handle"></div>
            <div className="pump-body">
              <div className="pump-lights">
                <div className={`light ${isRunning ? "on" : ""}`}></div>
                <div className={`light ${isCrashed ? "red" : (isRunning ? "on" : "")}`}></div>
                <div className={`light ${isCrashed ? "red" : ""}`}></div>
                <div className={`light ${isRunning ? "on" : ""}`}></div>
              </div>
            </div>

            {/* Multiplier stages */}
            <div className="pump-stages-container">
              {[1.00, 1.23, 1.55, 1.98, 2.56, 3.36, 4.48, 6.08, 8.41, 11.92, 17.34, 26.01, 40.46, 65.74, 112.70, 206.22, 413.23, 929.77, 2479.40, 8677.90, 52067.40].map((val, idx) => (
                <div
                  key={idx}
                  className={`pump-stage-box ${multiplier >= val ? "reached" : ""} ${isCrashed && Math.abs(multiplier - val) < 0.1 ? "popped-stage" : ""}`}
                  style={{ color: multiplier >= val && val === 1.00 ? '#00e701' : '', position: 'relative' }}
                  onMouseEnter={() => setHoveredStage(val)}
                  onMouseLeave={() => setHoveredStage(null)}
                >
                  {val.toFixed(2)}×

                  {/* Quick Info Tooltip */}
                  {hoveredStage === val && (
                    <div className="stage-tooltip">
                      <div className="stage-tooltip-row">
                        <div className="stage-tooltip-col">
                          <span className="stage-tooltip-label">Profit on Win</span>
                          <div className="stage-tooltip-value-row">
                            <span className="stage-tooltip-currency">T</span>
                            <span className="stage-tooltip-value">
                              {(betAmount * val).toFixed(8)}
                            </span>
                          </div>
                        </div>
                        <div className="stage-tooltip-divider" />
                        <div className="stage-tooltip-col">
                          <span className="stage-tooltip-label">Chance</span>
                          <div className="stage-tooltip-value-row">
                            <span className="stage-tooltip-value">
                              {getChance(val).toFixed(6)}
                            </span>
                            <span className="stage-tooltip-pct">%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* History Bar */}
        <div className="pump-history">
          {history.length === 0 ? (
            <div className="history-placeholder">No history yet</div>
          ) : (
            history.map((h, i) => (
              <div key={i} className={`history-pill ${h >= 2 ? "high" : "low"}`}>
                {h.toFixed(2)}×
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}