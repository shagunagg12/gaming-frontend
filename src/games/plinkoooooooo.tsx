// // DiceGame.tsx
// import React, { useState } from 'react';
// import './plinko.css';

// const WINNING_SCORE = 20;

// const DiceGame: React.FC = () => {
//   const [playerScores, setPlayerScores] = useState([0, 0]);
//   const [currentPlayer, setCurrentPlayer] = useState(0);
//   const [roundScore, setRoundScore] = useState(0);
//   const [diceValue, setDiceValue] = useState<number | null>(null);
//   const [gameOver, setGameOver] = useState(false);

//   const rollDice = () => {
//     if (gameOver) return;

//     const rolledNumber = Math.floor(Math.random() * 6) + 1;
//     setDiceValue(rolledNumber);

//     if (rolledNumber === 1) {
//       // Switch turn if the dice rolls a 1
//       endTurn();
//     } else {
//       // Accumulate round score
//       setRoundScore(prev => prev + rolledNumber);
//     }
//   };

//   const hold = () => {
//     if (gameOver) return;

//     const updatedScores = [...playerScores];
//     updatedScores[currentPlayer] += roundScore;
//     setPlayerScores(updatedScores);

//     // Check if the player won
//     if (updatedScores[currentPlayer] >= WINNING_SCORE) {
//       setGameOver(true);
//     } else {
//       endTurn();
//     }
//   };

//   const endTurn = () => {
//     setRoundScore(0);
//     setCurrentPlayer(prev => (prev === 0 ? 1 : 0));
//     setDiceValue(null);
//   };

//   const newGame = () => {
//     setPlayerScores([0, 0]);
//     setCurrentPlayer(0);
//     setRoundScore(0);
//     setDiceValue(null);
//     setGameOver(false);
//   };

//   return (
//     <div className="dice-game">
//       <h1>Dice Game</h1>
//       <div className="scores">
//         <div className={`player-score ${currentPlayer === 0 ? 'active' : ''}`}>
//           <h2>Player 1</h2>
//           <p>Score: {playerScores[0]}</p>
//         </div>
//         <div className={`player-score ${currentPlayer === 1 ? 'active' : ''}`}>
//           <h2>Player 2</h2>
//           <p>Score: {playerScores[1]}</p>
//         </div>
//       </div>

//       <div className="dice-area">
//         <button onClick={rollDice} disabled={gameOver}>Roll Dice</button>
//         <button onClick={hold} disabled={gameOver}>Hold</button>
//         {diceValue && (
//           <div className="dice">
//             <p>Dice Rolled: {diceValue}</p>
//           </div>
//         )}
//         {gameOver && (
//           <div className="winner-message">
//             <h2>Player {currentPlayer + 1} Wins!</h2>
//             <button onClick={newGame}>New Game</button>
//           </div>
//         )}
//       </div>

//       <div className="round-score">
//         <p>Current Round Score: {roundScore}</p>
//       </div>
//     </div>
//   );
// };

// export default DiceGame;
