import React from 'react';

// Define the type for a single game object
interface Game {
  status: boolean;
  betAmount: number;
  multiplier: number;
  payout: number;
}

// Define the props for the Table component
interface TableProps {
  games: Game[];
}

const Table: React.FC<TableProps> = ({ games }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs md:table-md table-pin-rows">
        {/* Table Head */}
        <thead className="text-slate-800">
          <tr>
            <th>#</th>
            <th>Result</th>
            <th>Bet Amount</th>
            <th>Multiplier</th>
            <th>Payout</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody className="text-slate-300">
          {games.map((game, index) => (
            <tr
              key={index}
              className={`${
                game.status ? 'text-green-500' : 'text-red-500'
              } ${game.payout <= 0 ? 'bg-gray-700' : ''}`}
            >
              <td>{index + 1}</td>
              <td>{game.status ? 'Win' : 'Lose'}</td>
              <td>{game.betAmount}</td>
              <td>{game.multiplier}</td>
              <td className={game.payout < 0 ? 'text-red-500' : ''}>
                {game.payout}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
