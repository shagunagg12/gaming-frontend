import React from "react";
import styled from "styled-components";

interface NumberSelectorProps {
  setError: (error: string) => void;
  selectedNumber: number|undefined;
  setSelectedNumber: (value: number) => void;
}

const NumberSelector: React.FC<NumberSelectorProps> = ({
  setError,
  selectedNumber,
  setSelectedNumber,
}) => {
  const arrNumber = [1, 2, 3, 4, 5, 6];

  const numberSelectorHandler = (value: number) => {
    setSelectedNumber(value);
    setError("");
  };

  return (
    <NumberSelectorContainer>
    
  
      <div className="flex">
        {arrNumber.map((value) => (
          <Box
            isSelected={value === selectedNumber}
            key={value}
            onClick={() => numberSelectorHandler(value)}
          >
            {value}
          </Box>
        ))}
      </div>
    </NumberSelectorContainer>
  );
};

export default NumberSelector;

const NumberSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  cursor: pointer;
  .flex {
    display: flex;
    gap: 24px;
  }
  p {
    font-size: 24px;
    font-weight: 700;
  }
`;

interface BoxProps {
  isSelected: boolean;
}

const Box = styled.div<BoxProps>`
  height: 72px;
  width: 72px;
  border: 1px solid black;
  display: grid;
  place-items: center;
  font-size: 24px;
  font-weight: 700;
  background-color: ${(props) => (props.isSelected ? "#00e701" : "#e9113c")};
  color: ${(props) => (props.isSelected ? " A0D683" : "#FFE3E3")};
`;
