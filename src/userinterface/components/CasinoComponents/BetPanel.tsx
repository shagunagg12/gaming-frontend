import React from "react";
import { useAuth } from "../../../context/authContext";
import { useDialog } from "../../../context/DialogContext";

export interface BetPanelProps {
  status: string | null;
  isLoading: boolean;
  onBet: () => void;
  onCashout: () => void;
  actionLabelIdle?: string;
  actionLabelActive?: string;
  children?: React.ReactNode;
  secondaryButton?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    disabled?: boolean; // Added disabled prop
  };
}

export const BetPanel: React.FC<BetPanelProps> = ({
  status,
  isLoading,
  onBet,
  onCashout,
  actionLabelIdle = "Bet",
  actionLabelActive = "Cashout",
  children,
  secondaryButton,
}) => {
  const { isLoggedIn } = useAuth();
  const { openSignupDialog } = useDialog();

  const handlePrimary = () => {
    console.log("handlePrimary called, status:", status, "isLoading:", isLoading);
    if (!isLoggedIn) {
      openSignupDialog();
      return;
    }
    if (status === "active") {
      onCashout();
    } else {
      onBet();
    }
  };

  return (
    <div className="bg-[#213743] h-full p-3">
      {/* Slot for game-specific controls */}
      {children}

      {/* Optional secondary button */}
      {secondaryButton && (
        <button
          onClick={() => {
            console.log("secondaryButton clicked, disabled:", secondaryButton.disabled);
            secondaryButton.onClick();
          }}
          disabled={secondaryButton.disabled || isLoading} // Respect disabled prop and isLoading
          className={`mt-3 text-white bg-[#2f4553] hover:bg-[#354e5e] text-sm font-bold text-center px-4 h-12 rounded w-full flex justify-center items-center gap-2 ${
            secondaryButton.disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {secondaryButton.label}
          {secondaryButton.icon}
        </button>
      )}

      <button
        disabled={isLoading}
        onClick={handlePrimary}
        className={`mt-6 text-black bg-[#04d001] hover:bg-[#059213] shadow-md text-sm font-bold text-center px-4 h-14 rounded w-full ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading
          ? "Loading..."
          : status === "active"
          ? actionLabelActive
          : actionLabelIdle}
      </button>
    </div>
  );
};