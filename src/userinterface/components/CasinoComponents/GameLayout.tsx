// import React, { useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import logo from "../../../assets/images/gamblegrid.png";
// import { IoSettings } from "react-icons/io5";
// import { RiRectangleLine } from "react-icons/ri";
// import { MdAreaChart } from "react-icons/md";
// import { GoStar, GoStarFill } from "react-icons/go";
// import { IoMdSettings } from "react-icons/io";
// import { FaChartBar } from "react-icons/fa";
// import TooltipComponent from "../universalComponents/ToolTipComponent";
// import BetCalculator from "./BetCalculator";
// import GamePlay from "../../../games/dice_role";
// import StartGame from "../../../games/dice_role/components/StartGame";
// import HiLo from "../../../games/hilo";
// import MinesHome from "../../../games/mines/Index";
// import CoinFlipG, { CoinGame } from "../../../games/coinFlip/test";
// import Coin3DGame from "../../../games/coinFlip/app";
// // import Mines from "../../../games/mines";
// // import DiceRoller from '../../../games/diceTotal/main';

// function GameLayout() {
//   const params = useParams();
//   const game = params.game;
//   const [theaterMode, setTheaterMode] = useState<boolean>(false);

//   const handleTheaterMode = () => {
//     setTheaterMode((theaterMode) => !theaterMode);
//     console.log(theaterMode);
//   };

//   const [isGameStarted, setIsGameStarted] = useState(false);

//   const toggleGamePlay = () => {
//     setIsGameStarted((prev) => !prev);
//   };

//   return (
//     <div className="flex justify-center px-6 mt-10   ">
//       <div
//         className={` lg:w-[1200px] lg:grid lg:grid-cols-12  w-full relative ${
//           theaterMode ? "lg:w-[1400px] h-[90rem] " : ""
//         }  w-[550px]  rounded-md`}
//       >
//         <div className="  grid col-span-12 rounded-l-lg overflow-hidden">
//           {/* <div className="w-full h-full overflow-hidden   "> */}
//             <>
//               {
//                 // <GamePlay />
//                 // <HiLo logo=""/>
//                 // <Mines/>
//                 // <MinesHome />
//                 // <CoinGame/>
//                 <Coin3DGame />
//                 // <CoinFlipG />

                
//               }
//             </>

//             {/* <DiceRoller/> */} 
//           </div>
//         {/* </div> */}
  
//         <div className="lg:col-span-12  flex items-center bg-[#0f212e] border-t-4 border-t-[#263f4d] rounded-b-lg  w-full h-[65px] z-50 absolute -bottom-[66px] sm:-[400px] ">
//           <div className="flex  items-center text-[#9cbad3] ml-5 cursor-pointer border-r-[.05rem] ">
//             <TooltipComponent tooltipText="Game Setting">
//               {" "}
//               <IoMdSettings className="hover:text-white m-4" />
//             </TooltipComponent>
//             <TooltipComponent tooltipText="Enable Theater Mode">
//               {" "}
//               <RiRectangleLine
//                 onClick={handleTheaterMode}
//                 className="hover:text-white m-4 text-[18px]  md:flex hidden "
//               />
//             </TooltipComponent>
//             <TooltipComponent tooltipText="Open Live Stats">
//               {" "}
//               <FaChartBar className="hover:text-white m-4" />
//             </TooltipComponent>
//             <TooltipComponent tooltipText="Favourite Game">
//               {" "}
//               <GoStar className="hover:text-white m-4" />
//             </TooltipComponent>
//             <TooltipComponent tooltipText="Favourite Game">
//               {" "}
//               <GoStarFill className="hover:text-white m-4" />
//             </TooltipComponent>
//           </div>
//           <div className="w-full flex justify-center">
//             <img src={logo} alt="" className="w-20 1330px:ml-64 ml-10" />
//           </div>
//           <div className="1170px:flex  w-full hidden justify-end px-10"> Gamble Grid</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GameLayout;




import React, { useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../../../assets/images/gamblegrid.png";
import { IoMdSettings } from "react-icons/io";
import { RiRectangleLine } from "react-icons/ri";
import { FaChartBar } from "react-icons/fa";
import { GoStar, GoStarFill } from "react-icons/go";
import TooltipComponent from "../universalComponents/ToolTipComponent";
import { useAuth } from "../../../context/authContext";
import useWindowSize from "../../../hooks/useWindowSize";
import GameInformationDropdown from "./GameInformationDropdown";
import ToggleTableComponent from "../LandingPageComponents/ToggleTableComponent";

interface GameLayoutProps {
  betComponent: React.ReactNode;
  gameComponent: React.ReactNode;
  gameName?: string;
}

interface toggleOptionProp {
  title:string;
  key:string;
}

function GameLayout({ betComponent, gameComponent, gameName = "Game" }: GameLayoutProps) {
  const params = useParams();
  const game = params.game || gameName;
  const [theaterMode, setTheaterMode] = useState<boolean>(false);
  const { isBetSlipOpen, isSidebarOpen } = useAuth();
  const { width: windowWidth } = useWindowSize();

  const handleTheaterMode = () => {
    setTheaterMode((prev) => !prev);
  };

  
const toggleOption:toggleOptionProp[] = [
  { title: "My Bets", key: 'my-bets' },
  { title: "All Bets", key: 'all-bets'},
  { title: "High Rollers", key: 'high-rollers'},
  { title: "Race Leaderboard", key: 'race-leaderboard' },
];


   return (
    <div className={` px-4 bg-red-800 sm:px-6 max-480px:px-1 max-sm:mt-2 max-915px:mt-6 mt-10 mb-16 min-h-screen  items-center justify-center
     ${ windowWidth < 915 || (isBetSlipOpen && isSidebarOpen && windowWidth < 1024)
                ? "flex flex-col  "
                : "flex flex-col "
        }${isBetSlipOpen && "1330px:flex 1330px:flex-col " }
    `}>
      {/* Main Game Container */}
      <div
        className={`w-full  max-w-[1200px] relative rounded-md bg-[#0f212e]
          ${theaterMode ? "lg:max-w-[1400px]" : ""} 
           ${
              windowWidth < 915 || (isBetSlipOpen && isSidebarOpen && windowWidth < 1024)
                ? "max-w-[425px]"
                : "w-full"
            }
                ${isBetSlipOpen && "1330px:min-w-full max-w-[425px]" } 
          `}
      >
        <div
          className={`flex w-full rounded-xl 915px:aspect-video aspect-auto h-[calc(100vh-120px)] 915px:h-full
            ${
              windowWidth < 915 || (isBetSlipOpen && isSidebarOpen && windowWidth < 1024)
                ? "flex flex-col-reverse h-full"
                : "flex-row"
            }${isBetSlipOpen && "1330px:flex 1330px:flex-row flex-col-reverse min-h-[calc(100vh-120px)]  1330px:min-h-full bg-emerald-800" }
                 sm:items-center sm:shadow-2xl `}
        >
          <div
            className={`${
              windowWidth < 915 || (isBetSlipOpen && isSidebarOpen && windowWidth < 1024)
                ? "w-full "
                : "w-[420px] "
            } ${isBetSlipOpen && "w-full" }
                h-full `}
          >
            {betComponent}
          </div>
          <div className={`${isBetSlipOpen && ""} w-full h-full flex items-center justify-center p-2 sm:p-4 `}>
            {gameComponent}
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center bg-[#0f212e] border-t-4 border-t-[#263f4d] rounded-b-lg w-full h-[65px] absolute -bottom-[65px]">
          <div className="flex items-center text-[#9cbad3] ml-5 cursor-pointer border-r-[0.05rem]">
            <TooltipComponent tooltipText="Game Settings">
              <IoMdSettings className="hover:text-white m-4" />
            </TooltipComponent>
            <TooltipComponent tooltipText="Enable Theater Mode">
              <RiRectangleLine
                onClick={handleTheaterMode}
                className="hover:text-white m-4 text-[18px] md:flex hidden"
              />
            </TooltipComponent>
            <TooltipComponent tooltipText="Open Live Stats">
              <FaChartBar className="hover:text-white m-4" />
            </TooltipComponent>
            <TooltipComponent tooltipText="Favourite Game">
              <GoStar className="hover:text-white m-4" />
            </TooltipComponent>
            <TooltipComponent tooltipText="Favourite Game">
              <GoStarFill className="hover:text-white m-4" />
            </TooltipComponent>
          </div>
          <div className="w-full flex justify-center">
            <img src={logo} alt="GambleGrid Logo" className="w-20 lg:ml-64 ml-10" />
          </div>
          <div className="hidden lg:flex w-full justify-end px-10">Gamble Grid</div>
        </div>
      </div>

      {/* Game Information and Toggle Table */}
      <div className="flex justify-center mt-20  w-full">
        <div className="w-full max-w-[1200px] ">
          <GameInformationDropdown />
          <div className="hidden md:block">
            <ToggleTableComponent toggleOption={toggleOption} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameLayout;