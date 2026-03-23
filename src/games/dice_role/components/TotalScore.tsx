import React from "react";
import styled from "styled-components";

interface TotalScoreProps {
  result: string;
}

const TotalScore: React.FC<TotalScoreProps> = ({ result }) => {
  return (
    <ScoreContainer>
      {result ==='Won'? <h1 className="text-green-700">{result}</h1>: <h1 className="text-red-700">{result}</h1>}
     
    
    </ScoreContainer>
  );
};

export default TotalScore;

const ScoreContainer = styled.div`
  max-width: 200px;
  text-align: center;
  h1 {
    font-size: 100px;
    line-height: 100px;
  }
  p {
    font-size: 24px;
    font-weight: 500;
  }
`;
