import React, { useState } from "react";

const BetCalculatorPump = ({ bet, setBet, startGame, pump, multiplier }) => {

  const [difficulty, setDifficulty] = useState("Easy");

  const profit = bet * multiplier;

  return (
    <div className="bet-panel">

      <div className="bet-input">
        <label>Bet Amount</label>

        <input
          type="number"
          value={bet}
          onChange={(e) => setBet(Number(e.target.value))}
        />

        <div className="bet-buttons">
          <button onClick={() => setBet(bet / 2)}>½</button>
          <button onClick={() => setBet(bet * 2)}>2x</button>
        </div>
      </div>

      <div className="difficulty">
        <label>Difficulty</label>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      <button
        className="bet-btn"
        onClick={() => startGame(difficulty)}
      >
        Bet
      </button>

      <button
        className="pump-btn"
        onClick={pump}
      >
        Pump
      </button>

      <div className="profit-box">
        <label>Total Profit ({multiplier.toFixed(2)}x)</label>

        <input
          type="text"
          value={profit.toFixed(8)}
          readOnly
        />
      </div>

    </div>
  );
};

export default BetCalculatorPump;