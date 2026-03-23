// // CoinGame.jsx
// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://your-backend-url:4000');

// function CoinGame({ userId }) {
//   const [choice, setChoice] = useState('heads');
//   const [bet, setBet] = useState(0);
//   const [history, setHistory] = useState([]);
//   const [currentRecord, setCurrentRecord] = useState(null);

//   useEffect(() => {
//     // Listen for result
//     socket.on('flip_result', ({ record }) => {
//       setCurrentRecord(record);
//       setHistory(prev => [record, ...prev]);
//     });

//     socket.on('history', ({ history }) => {
//       setHistory(history);
//     });

//     // fetch history on mount
//     socket.emit('get_history', { userId });

//     return () => {
//       socket.off('flip_result');
//       socket.off('history');
//     };
//   }, [userId]);

//   const flipCoin = () => {
//     socket.emit('request_flip', { userId, choice, betAmount: bet });
//   };

//   return (
//     <div>
//       <h2>Coin Flip</h2>
//       <div>
//         <button onClick={()=>setChoice('heads')}>Heads</button>
//         <button onClick={()=>setChoice('tails')}>Tails</button>
//       </div>
//       <div>
//         <input
//           type="number"
//           value={bet}
//           onChange={e => setBet(Number(e.target.value))}
//           placeholder="Bet amount"
//         />
//       </div>
//       <button onClick={flipCoin}>Flip</button>

//       {currentRecord && (
//         <div>
//           <p>Result: {currentRecord.result}</p>
//           <p>You {currentRecord.win ? 'Won!' : 'Lost'}</p>
//         </div>
//       )}

//       <h3>History</h3>
//       <ul>
//         {history.map((rec, idx) => (
//           <li key={idx}>
//             {rec.timestamp}: You chose {rec.choice}, result {rec.result} — {rec.win ? 'Win' : 'Lose'} {rec.win ? `+${rec.betAmount}` : `-${rec.betAmount}`}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CoinGame;
