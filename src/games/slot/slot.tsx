import React, { useState } from "react";

const SlotGame: React.FC = () => {
  const [credits, setCredits] = useState(400);
  const [bet, setBet] = useState(10);
  const [winAmount, setWinAmount] = useState(0);
  const [autoSpin, setAutoSpin] = useState(false);

  const handleSpin = () => {
    console.log("Spin triggered!");
  };

  const toggleAutoSpin = () => setAutoSpin((prev) => !prev);
  const increaseBet = () => setBet((prev) => prev + 10);
  const decreaseBet = () => setBet((prev) => (prev > 10 ? prev - 10 : prev));

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: `url("https://n1md7.github.io/slot-game/img/background.webp")` }}>
      
      {/* Winner Display */}
      <div className="text-yellow-400 font-bold text-2xl border-0 rounded-lg p-2 mb-3">
        WIN: <span id="win-amount">${winAmount}</span>
      </div>

      {/* Canvas */}
      <canvas
        id="slot"
        width="440"
        height="240"
        className="border-4 border-gray-800 rounded-lg"
      />

      {/* Controls */}
      <div className="flex items-end justify-between w-full max-w-lg px-4 mt-4">
        {/* Left Section */}
        <div className="text-yellow-300 text-lg flex flex-col">
          <span>
            Credit:{" "}
            <span id="credits" className="text-white">
              ${credits}
            </span>
          </span>
          <span>
            Bet:{" "}
            <span id="bet" className="text-white">
              ${bet}
            </span>
          </span>
        </div>

        {/* Middle Section */}
        <div className="flex items-center space-x-4">
          <button
            id="minus-bet"
            className="bg-gray-800 text-white rounded-full w-12 h-12 flex items-center justify-center hover:opacity-80"
            onClick={decreaseBet}
          >
            -
          </button>
          <button
            id="spin-manual"
            className="bg-red-800 text-yellow-200 border-4 border-red-500 rounded-lg py-4 px-6 text-xl font-bold hover:opacity-80"
            onClick={handleSpin}
          >
            SPIN
          </button>
          <button
            id="plus-bet"
            className="bg-gray-800 text-white rounded-full w-12 h-12 flex items-center justify-center hover:opacity-80"
            onClick={increaseBet}
          >
            +
          </button>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end space-y-2">
          <button
            id="pay-table"
            className="bg-gray-800 text-yellow-200 border-4 border-gray-600 rounded-lg py-2 px-4 text-sm hover:opacity-80"
          >
            Pay Table
          </button>
          <button
            id="spin-auto"
            className="bg-gray-800 text-yellow-200 border-4 border-gray-600 rounded-lg py-2 px-4 text-sm hover:opacity-80"
            onClick={toggleAutoSpin}
          >
            AUTO | {autoSpin ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {/* Pay Table Modal */}
      <div
        id="pay-table-modal"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 hidden"
      >
        <div className="bg-black text-white rounded-lg max-w-lg w-full">
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700">
            <h5 className="text-lg font-bold">Pay Table</h5>
            <button
              className="text-gray-400 hover:text-white"
              onClick={() =>
                (document.getElementById("pay-table-modal")!.style.display =
                  "none")
              }
            >
              Close
            </button>
          </div>
          <div className="p-4">
            <p>Pay table details go here...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotGame;
