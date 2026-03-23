interface TokenValueProps {
    amount: number;  // The amount of tokens to display
  }
  
  const TokenValue: React.FC<TokenValueProps> = ({ amount }) => {
    // Format the amount as a string with commas (optional)
    const formattedAmount = amount.toLocaleString();
  
    return (
      <span>{formattedAmount} Tokens</span>
    );
  };
  
  export default TokenValue;
  