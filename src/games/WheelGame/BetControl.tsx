import { FaBitcoin } from "react-icons/fa";

interface BetControlsProps {
  balance: number;
  currentBet: number;
  onBetChange: (amount: number) => void;
  onBet: () => void;
  btnState: string; // This should reflect the current game state (e.g., "betting", "player-turn", "game-over")
}

export function BetControls({ balance, btnState, currentBet, onBetChange, onBet }: BetControlsProps) {
  // Determine if the input and buttons should be enabled or disabled
  const isInputEnabled = btnState === "betting"; // Enable input only in the betting phase
  const handleBetChange = (value: string) => {
    const amount = Number.parseFloat(value);
    if (isNaN(amount) || amount < 0) {
      onBetChange(0);
    } else if (amount > balance) {
      onBetChange(balance);
    } else {
      onBetChange(amount);
    }
  };

  return (
    <div className="space-y-3">
      {/* Bet Input Box */}
      <div className="flex items-center w-full p-[1.5px] rounded-[4px] bg-[#2c4651] shadow-sm shadow-gray-900">
        <div className="flex justify-between w-[70%] px-2 items-center bg-[#1c2633] border-slate-700 border-[1.5px] hover:border-[#4b5c64] rounded-l-[4px]">
          <input
            type="number"
            value={currentBet}
            onChange={(e) => handleBetChange(e.target.value)}
            className="w-full py-2 border-none text-[14px] font-bold bg-[#1c2633] focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            min={0}
            max={balance}
            disabled={!isInputEnabled} // Controlled by game state
          />
          <FaBitcoin size={18} color="#fd8905" />
        </div>

        {/* Bet Control Buttons */}
        <div className="flex w-[30%] items-center">
          <button
            onClick={() => handleBetChange((currentBet / 2).toString())}
            className="hover:bg-[#889cb0] w-[50%] h-[40px] text-[14px] font-bold"
            disabled={!isInputEnabled} // Controlled by game state
          >
            ½
          </button>
          <div className="h-[20px] w-[2px] bg-[#1c2633]"></div>
          <button
            onClick={() => handleBetChange((currentBet * 2).toString())}
            className="hover:bg-[#889cb0] rounded-r-[4px] w-[50%] h-[40px] text-[14px] font-bold"
            disabled={!isInputEnabled} // Controlled by game state
          >
            2×
          </button>
        </div>
      </div>

      {/* Bet / End Game Button */}
      <button
        onClick={btnState === "game-over" ? onBet : onBet}
        className="w-full text-black font-bold py-3 px-6 mb-2 bg-[#1fec07] hover:bg-green-700 disabled:bg-green-600/50 disabled:cursor-not-allowed rounded-[4px] transition-colors"
      >
        {btnState === "game-over" ? "Start again" : "Bet"}
      </button>
    </div>
  );
}

