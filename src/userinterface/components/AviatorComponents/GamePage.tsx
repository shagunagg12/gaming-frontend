import { useState, useRef } from 'react';
import GameChart from './GameChart';
import BetShow from './BetShow';
import './css/custom.css';
import './css/gameOut.css';
import './css/responsive.css';
import './css/responsiveGameOut.css';
import './css/styles.css';
import BetHistory from './BetHistory';

// Define types for the props
interface GamePageProps {
  userData: any; // Adjust this type based on the structure of your userData object
  setSoundOnSwicth: React.Dispatch<React.SetStateAction<boolean>>;
  soundOnSwicth: boolean;
  socket: any; // Define a more specific type if possible
  runningY: any; // Define a more specific type if possible
  setRunningY: React.Dispatch<React.SetStateAction<any>>;
  time: number;
  showMenu:boolean
  setShowMenu:React.Dispatch<React.SetStateAction<boolean>>
}

function GamePage({
  userData,
  setSoundOnSwicth,
  soundOnSwicth,
  socket,
  runningY,
  setRunningY,
  time,
}: GamePageProps) {

  const [newStartGame, setNewStartGame] = useState<boolean>(false);
  const [crashRocket, setCrashRocket] = useState<boolean>(false);
  const [dottStart, setDottStart] = useState<boolean>(false);
  const [refreshNewStartGame, setRefreshNewStartGame] = useState<boolean>(false);
  const [yCrash, setYCrash] = useState<any>(); // Adjust this type based on the actual structure of yCrash
  const [yData, setYData] = useState<number>(100);
  const [autoBetCashOutDimond, setAutoBetCashOutDimond] = useState<number>(1.10);
  const [showGameStep, setShowGameStep] = useState<{
    showWinDetails: boolean;
    showLoader: boolean;
  }>({
    showWinDetails: false,
    showLoader: false,
  });

  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasLoaderPlanRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <div className='row gameRow'>
          <div className='col-0 col-md-4 bg-red-300  betShow deskView'>
        <BetShow time={time} socket={socket} runningY={runningY}   />
        </div>
          <div className='col-12 col-md-8 bg-white gameBox'>
            <div className='game'>
        <BetHistory socket={socket} userData={userData}/>

          <GameChart
            time={time}
            newStartGame={newStartGame}
            crashRocket={crashRocket}
            dottStart={dottStart}
            refreshNewStartGame={refreshNewStartGame}
            yCrash={yCrash}
            setYCrash={setYCrash}
            yData={yData}
            setNewStartGame={setNewStartGame}
            setCrashRocket={setCrashRocket}
            setDottStart={setDottStart}
            setRefreshNewStartGame={setRefreshNewStartGame}
            setShowGameStep={setShowGameStep}
            setYData={setYData}
            canvasRef={canvasRef}
            canvasLoaderPlanRef={canvasLoaderPlanRef}
            showGameStep={showGameStep}
            userData={userData}
            socket={socket}
            autoBetCashOutDimond={autoBetCashOutDimond}
            setAutoBetCashOutDimond={setAutoBetCashOutDimond}
            setRunningY={setRunningY}
            soundOnSwicth={soundOnSwicth}
           
          />

        <div className='betShow onlyMobilebetShow'>
          <BetShow time={time} socket={socket} runningY={runningY} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamePage;
