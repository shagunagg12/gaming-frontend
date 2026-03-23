import  {  useEffect, useRef, useState } from "react";
import airplaneImage1 from "../../../assets/images/plane-0.svg";
import airplaneImage2 from "../../../assets/images/plane-1.svg";
import airplaneImage3 from "../../../assets/images/plane-2.svg";
import airplaneImage4 from "../../../assets/images/plane-3.svg";
import GameLoader from '../../../assets/images/logoAvitor.svg'
import GameBg from '../../../assets/images/bg-rotate-old.svg'
import { ToastConent } from './ToastConent'
import AudioPath from '../../../assets/images/plane-crash.mp3'
import { gameChartData, repeatUpDown } from "./gameChartData";
import BetButtonShow from "./BetButtonShow";
import  './css/custom.css'
import  './css/gameOut.css'
import  './css/responsive.css'
import  './css/responsiveGameOut.css'
import  './css/styles.css'

type GameChartProps = {
  time: number;
  newStartGame: boolean | null;
  crashRocket: boolean | null;
  dottStart: boolean;
  refreshNewStartGame: boolean;
  yCrash: number 
  soundOnSwicth:boolean
  
  setYCrash:React.Dispatch<any>
  setNewStartGame:React.Dispatch<React.SetStateAction<boolean>>
setCrashRocket:React.Dispatch<React.SetStateAction<boolean>>
setDottStart:React.Dispatch<React.SetStateAction<boolean>>
setRefreshNewStartGame:React.Dispatch<React.SetStateAction<boolean>>
setShowGameStep:React.Dispatch<React.SetStateAction<{
  showWinDetails: boolean;
  showLoader: boolean;
}>>
setRunningY:React.Dispatch<any>
  yData: number;
  setYData:React.Dispatch<React.SetStateAction<number>>
  canvasLoaderPlanRef: React.RefObject<HTMLCanvasElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  showGameStep: {
    showWinDetails: boolean;
    showLoader: boolean;
  };
  userData: any;
  socket: any;
  setAutoBetCashOutDimond: React.Dispatch<React.SetStateAction<any>>;
  autoBetCashOutDimond: any;
};

type CrashPosition = {
  height: number;
  width: number;
};


const airplaneImages = [
  airplaneImage1,
  airplaneImage1,
  airplaneImage1,
  airplaneImage1,
  airplaneImage1,
  airplaneImage1,
  airplaneImage1,
  airplaneImage1,
  airplaneImage2,
  airplaneImage2,
  airplaneImage2,
  airplaneImage2,
  airplaneImage2,
  airplaneImage2,
  airplaneImage2,
  airplaneImage2,
  airplaneImage3,
  airplaneImage3,
  airplaneImage3,
  airplaneImage3,
  airplaneImage3,
  airplaneImage3,
  airplaneImage3,
  airplaneImage3,
  airplaneImage4,
  airplaneImage4,
  airplaneImage4,
  airplaneImage4,
  airplaneImage4,
  airplaneImage4,
  airplaneImage4,
  airplaneImage4,
];


const GameChart: React.FC<GameChartProps> = ({

  newStartGame,
  crashRocket,
  dottStart,
  refreshNewStartGame,
  yCrash,
  setYCrash,
  yData,
  setYData,
  canvasLoaderPlanRef,
  canvasRef,
  showGameStep,
  setAutoBetCashOutDimond,
  autoBetCashOutDimond,
  socket,
  setRunningY,
  setCrashRocket,
  setNewStartGame,
   setShowGameStep,
   setDottStart,


}) => {

  // Canvas Refs
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [refreshTime, setRefreshTime] = useState<number | undefined>();
  const [refreshGameTime, setRefereshGameTime] = useState<boolean>(false);
  const [refreshGame, setRefereshGame] = useState<boolean>(false);
  const [getCrashPoint, setGetCrashPoint] = useState<any>(); 
  const [dataNew, setDataNew] = useState<any[]>([]);
  const [crashRocketPostion, setCrashRocketPostionStart] = useState<CrashPosition | undefined>();
  const [crashDataShow, setCrashDataShow] = useState<CrashPosition[]>([]);
  const [refreshStartGame, setRefreshStartGame] = useState(false);
  const [time, setTime] = useState()
  


  const timeRef = useRef<number | undefined>(time);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("time", (time: number) => {
      setTime(time);
      updateTimeGame(time);
      timeRef.current = time;
    });

    socket.on("refresh", (refresh: boolean) => {
      if (refresh) {
        setRefereshGame(refresh);
        setRefereshGameTime(refresh);
      }
    });

    socket.on("YCrash", (yCrash: number) => {
      setYCrash(yCrash);
    });

    socket.on("date0Now", (date0Now: number) => {
      setRefreshTime(date0Now);
    });

    socket.on("coinLess", (coinLess: boolean) => {
      if (coinLess) {
        ToastConent("You don't have enough diamonds now, please recharge first!");
      }
    });
  }, [socket]);

  useEffect(() => {
    if (time !== undefined && time >= -12 && time <= -8) {
      setRunningY(0);
    }
  }, [time]);

  useEffect(() => {
    if (!crashRocket) {
      if (time !== undefined && time >= 0 && refreshGameTime) {
        const addY = parseFloat((1 + time * 0.14).toFixed(2));
        if (!isNaN(addY)) {
          setYData(addY);
          setRunningY(addY);
          setRefereshGameTime(false);
        }
      } else if (time !== undefined && time >= 0) {
        const timer = setTimeout(() => {
          const addY = parseFloat((yData + 0.01).toFixed(2));
          if (!isNaN(addY)) {
            setYData(addY);
            setRunningY(addY);
          }
        }, 70);
        return () => clearTimeout(timer);
      }
    }
  }, [time, yData, refreshGameTime, crashRocket]);

  useEffect(() => {
    if (yCrash !== undefined && Number(yData) >= yCrash) {
      setCrashRocket(true);
      setRefereshGame(false);
    }
  }, [yData, yCrash]);

  useEffect(() => {
    if (yCrash !== undefined && yData > yCrash && refreshGame) {
      setRefreshStartGame(true);
    } else {
      setRefreshStartGame(false);
    }
  }, [yData, yCrash, refreshGame]);

  useEffect(() => {
    if (refreshGame && time !== undefined && time > 0) {
      if (refreshNewStartGame) {
        setYData(yCrash || 1);
        setNewStartGame(false);
        setCrashRocket(false);
        setShowGameStep(prev => ({
          ...prev,
          showWinDetails: true
        }));
      } else {
        setNewStartGame(true);
      }
    }

    if (time !== undefined && time >= -13 && time < -8 && crashRocket === false) {
      setCrashRocket(false);
      setNewStartGame(false);
      setShowGameStep(prev => ({
        ...prev,
        showWinDetails: true
      }));
    }
  }, [refreshGame, refreshNewStartGame, newStartGame, time, crashRocket, yCrash]);

  const updateTimeGame = (time: number) => {
    if (time > -9 && time <= -2 && showGameStep.showWinDetails === false) {
      setShowGameStep({
        ...showGameStep,
        showWinDetails: false,
        showLoader: true,
      });
    }

    if (time === -10) {
      setCrashDataShow([]);
      setDataNew([]);
      setDottStart(false);
      setCrashRocketPostionStart(undefined);
    }

    if (time === -2) {
      setShowGameStep({
        ...showGameStep,
        showWinDetails: false,
        showLoader: false,
      });
      setYData(1);
      setRefereshGame(false);
    }

    if (time === 0) {
      setNewStartGame(true);
      setShowGameStep({
        ...showGameStep,
        showWinDetails: false,
      });
      setYData(1);
      setCrashRocket(false);
    }
  };

  useEffect(() => {
    if (yData && newStartGame) {
      if (autoBetCashOutDimond === Number(yData)) {
        socket?.emit("autoCashOut", {
          AutoCashOutCoin: autoBetCashOutDimond,
        });
      }
    }
  }, [yData, newStartGame, socket]);

  useEffect(() => {
    if (crashRocketPostion) {
      let { height, width } = crashRocketPostion;
      let dataArray: CrashPosition[] = [];
      for (let i = width; i <= 105; i++) {
        dataArray.push({
          width: i,
          height: height--,
        });
      }
      setCrashDataShow(dataArray);
    }
  }, [crashRocketPostion]);

  useEffect(() => {
    const dataAdd: any[] = [];
    if (time !== undefined && time <= 0 && !refreshGame && !newStartGame) {
      dataAdd.push(...gameChartData);
      dataAdd.push(...repeatUpDown);
      setDataNew(dataAdd);
    }
  }, [time, refreshGame, newStartGame]);

  // Utility Conversion Functions
  const convertWithPx = (data: number): number => {
    const widthChart = canvasRef.current?.width || 0;
    return (widthChart * data) / 100;
  };

  const convertHeightPx = (data: number): number => {
    const heightChart = canvasRef.current?.height || 0;
    return (heightChart * data) / 100;
  };

  // Rocket Crash Trajectory Calculation
  useEffect(() => {
    if (crashRocketPostion) {
      let { height, width } = crashRocketPostion;
      const dataArray: { width: number; height: number }[] = [];
      for (let i = width; i <= 105; i++) {
        dataArray.push({
          width: i,
          height: height--,
        });
      }
      setCrashDataShow(dataArray);
    }
  }, [crashRocketPostion]);

// Data Merging After Game Ends
useEffect(() => {
  if (time && time <= 0 && !refreshGame && !newStartGame) {
    const dataAdd = [...gameChartData, ...repeatUpDown];
    setDataNew(dataAdd);
  }
}, [time, gameChartData, repeatUpDown, refreshGame, newStartGame]);

function findNearestIndex(data) {
  let nearestIndex = 0;
  let diffff = data - gameChartData[gameChartData.length - 1].time;
  if (diffff <= 0) {
    let minDiff = Math.abs(data - gameChartData[0].time);
    for (let i = 1; i < gameChartData.length; i++) {
      let diff = Math.abs(data - gameChartData[i].time);
      if (diff < minDiff) {
        minDiff = diff;
        nearestIndex = i;
      }
    }
    return { array: 1, index: nearestIndex };
  } else {
    let array2LastTime = repeatUpDown[repeatUpDown.length - 1].time;
    let intoTime = parseInt(diffff / array2LastTime);
    let data2 = diffff - array2LastTime * intoTime;

    let minDiff = Math.abs(data2 - repeatUpDown[0].time);
    for (let i = 1; i < repeatUpDown.length; i++) {
      let diff = Math.abs(data2 - repeatUpDown[i].time);
      if (diff < minDiff) {
        minDiff = diff;
        nearestIndex = i;
      }
    }
    return { array: 2, index: nearestIndex };
  }
}

// Refresh Chart Data on Game Refresh
useEffect(() => {
  if (refreshGame) {
    const realTime =refreshTime && Date.now() - refreshTime;
    const startIndex = findNearestIndex(realTime);
    if (startIndex?.array === 1) {
      setDataNew(gameChartData.slice(startIndex.index));
    } else if (startIndex?.array === 2) {
      setDataNew(repeatUpDown.slice(startIndex.index));
    }
  }
}, [refreshTime, refreshGame]);

// Canvas Resizing
useEffect(() => {
  if (!canvasRef.current) return;
  const canvas = canvasRef.current;
  const parent = canvas.parentNode as HTMLElement;

  const resizeCanvas = () => {
    canvas.width = parent.clientWidth;
    canvas.height = 400;
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  return () => {
    window.removeEventListener("resize", resizeCanvas);
  };
}, [canvasRef.current]);

// Plane Image Rendering on Static Canvas
useEffect(() => {
  if (!canvasLoaderPlanRef?.current) return;
  const canvas = canvasLoaderPlanRef.current;
  const context = canvas.getContext("2d");
  if (!context) return;

  const renderImage = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const airplane = new Image();
    airplane.src = airplaneImages[0];
    airplane.onload = () => {
      if (windowWidth < 500) {
        context.drawImage(airplane, 25, 300, 50, 80);
      } else {
        context.drawImage(airplane, 15, 325, 80, 60);
      }
    };
  };

  renderImage();
}, [time, airplaneImages, windowWidth]);

// Sound Play Logic
const playSoundFunction = async () => {
  if (props.soundOnSwicth) {
    const audio = new Audio(AudioPath);
    try {
      await audio.play();
    } catch (err) {
      console.error("Audio play error:", err);
    }
  }
};

// Main Animation
useEffect(() => {
  if (!canvasRef?.current) return;
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");
  if (!context) return;

  const airplane = new Image();
  airplane.src = airplaneImages[0];

  let dataIndex = 0;
  let crashDataIndex = 0;
  let imageIndex = 0;
  let lastFrameTime = 0;
  let lastFrameTimeCrash = 0;
  const animationInterval = 10;
  const speedY = 2;

  let animationRequestId: number;
  let animationRequestIdCrash: number;

  // Crash Animation
  const animateCrash = (timestamp: number) => {
    if (!crashRocket || !crashRocketPostion || crashDataShow.length === 0) return;

    const elapsed = timestamp - lastFrameTimeCrash;
    if (elapsed > animationInterval) {
      lastFrameTimeCrash = timestamp - (elapsed % animationInterval);

      context.clearRect(0, 0, canvas.width, canvas.height);
      const { width, height } = crashDataShow[crashDataIndex];
      const widthPx = convertWithPx(width);
      let heightPx = convertHeightPx(height) + speedY;

      if (heightPx > canvas.height) heightPx = -60;

      const img = new Image();
      img.src = width < 103 ? airplaneImages[imageIndex] : "";

      if (windowWidth < 500) {
        context.drawImage(img, widthPx - 2, heightPx - 40, 50, 80);
      } else {
        context.drawImage(img, widthPx - 6, heightPx - 60, 100, 60);
      }

      if (width === 103) {
        setCrashRocket(false);
        setShowGameStep(prev => ({ ...prev, showWinDetails: true }));
        setCrashDataShow([]);
        context.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationRequestIdCrash);
        return;
      }

      imageIndex = (imageIndex + 1) % airplaneImages.length;
      crashDataIndex = (crashDataIndex + 1) % crashDataShow.length;
    }
    animationRequestIdCrash = requestAnimationFrame(animateCrash);
  };

  // Standard Animation
  const animate = (timestamp: number) => {
    if (!newStartGame || refreshNewStartGame || dataNew.length === 0) return;

    const elapsed = timestamp - lastFrameTime;
    if (elapsed > animationInterval) {
      lastFrameTime = timestamp - (elapsed % animationInterval);
      const data = dataNew[dataIndex];

      context.clearRect(0, 0, canvas.width, canvas.height);

      if (data.width === dataNew.at(-1)?.width && data.height === dataNew.at(-1)?.height) {
        setDataNew(repeatUpDown);
      }

      const widthPx = convertWithPx(data.width);
      let heightPx = convertHeightPx(data.height) + speedY;
      if (heightPx > canvas.height) heightPx = -60;

      setGetCrashPoint({ width: data.width, height: data.height });

      context.beginPath();
      context.moveTo(0, canvas.height);
      context.quadraticCurveTo(widthPx + 6, heightPx + 30, widthPx, heightPx);
      context.lineTo(widthPx, canvas.height);
      context.lineTo(0, canvas.height);
      context.closePath();
      context.fillStyle = "rgba(239, 30, 48, 0.6)";
      context.fill();
      context.strokeStyle = "rgb(255, 23, 43)";
      context.lineWidth = windowWidth < 500 ? 2 : 4;
      context.stroke();

      const img = new Image();
      img.src = airplaneImages[imageIndex];
      if (windowWidth < 500) {
        context.drawImage(img, widthPx - 2, heightPx - 80, 50, 80);
      } else {
        context.drawImage(img, widthPx - 4, heightPx - 60, 100, 60);
      }

      imageIndex = (imageIndex + 1) % airplaneImages.length;
      dataIndex = (dataIndex + 1) % dataNew.length;

      if (data.width === 65.66 && data.height === 21.85) {
        setDottStart(true);
      }

      if (crashRocket) {
        setCrashRocketPostionStart(getCrashPoint);
        setNewStartGame(false);
        cancelAnimationFrame(animationRequestId);
        return;
      }
    }
    animationRequestId = requestAnimationFrame(animate);
  };

  // Image Onload Event
  airplane.onload = () => {
    if (crashRocket) animateCrash(0);
    if (newStartGame && !refreshNewStartGame) animate(0);
  };

  if (crashRocket) {
    playSoundFunction();
  }

  return () => {
    cancelAnimationFrame(animationRequestId);
    cancelAnimationFrame(animationRequestIdCrash);
  };
}, [
  canvasRef,
  airplaneImages,
  windowWidth,
  crashRocket,
  crashRocketPostion,
  crashDataShow,
  newStartGame,
  refreshNewStartGame,
  dataNew,
  repeatUpDown,
]);
return (
  <>
    <div
      className="chartShow"
      style={{ paddingLeft: `${time && time >= -8 && time < 0 ? '0' : '47px'}` }}
    >
      <img
        src={GameBg}
        className={`rotateimage ${
          newStartGame !== false || crashRocket !== false ? 'rotatebg' : ''
        }`}
      />

      {(newStartGame !== false || crashRocket !== false) && (
        <>
          {dottStart ? (
            <div className="shadowBlueImg" />
          ) : (
            <div className="shadowLighBlueImg" />
          )}
        </>
      )}

      <div className="showCanvasShow">
        { time && time >= -8 && time < 0 ? (
          <canvas
            ref={canvasLoaderPlanRef}
            height={400}
            style={{ border: 'none', width: '40%', height: '100%' }}
          />
        ) : (
          <>
            {!refreshNewStartGame && (
              <canvas
                ref={canvasRef}
                height={400}
                style={{
                  borderWidth: newStartGame === true ? '1px' : '0'
                }}
              />
            )}
            {newStartGame === true && (
              <>
                <div className="y-axis-animation">
                  {dottStart ? (
                    <div className="y-axis animations-y" />
                  ) : (
                    <div className="y-axis" />
                  )}
                </div>
                <div className="x-axis-animation">
                  {dottStart ? (
                    <div className="x-axis animations-x" />
                  ) : (
                    <div className="x-axis" />
                  )}
                </div>
              </>
            )}
          </>
        )}

        {showGameStep.showWinDetails && (
          <div className="winDetail">
            <h6>FLY AWAY!</h6>
            <h5>{yCrash ? `${yCrash}x` : ''}</h5>
          </div>
        )}

        {showGameStep.showLoader && (
          <div className="loaderGame">
            <img src={GameLoader} alt="Loading..." />
            <h6>WAITING FOR NEXT ROUND</h6>
            <div className="progressShow">
              <div className="progress progress-striped">
                <div className="progress-bar" />
              </div>
            </div>
          </div>
        )}

        <div
          className="yData"
          style={{ visibility: newStartGame === true ? 'visible' : 'hidden' }}
        >
          {`${yData}x`}
        </div>
      </div>
    </div>

    <BetButtonShow
      time={time}
      showGameStep={showGameStep}
      // userData={userData}
      // socket={socket}
      yData={yData}
      crashRocket={crashRocket}
      newStartGame={newStartGame}
      setAutoBetCashOutDimond={setAutoBetCashOutDimond}
      autoBetCashOutDimond={autoBetCashOutDimond}
    />
  </>
);
};

export default GameChart;