import Navbar from "./Navbar";
import { useContext, useState } from "react";
import GamePage from "./GamePage";
import { UserDataContext } from "./UserDataContext"
import  './css/custom.css'
import  './css/gameOut.css'
import  './css/responsive.css'
import  './css/responsiveGameOut.css'
import  './css/styles.css'
export const Aviator = () => {

const [showMenu, setShowMenu] = useState(false)
const [runningY, setRunningY] = useState(0)
const [soundOnSwicth, setSoundOnSwicth] = useState(true)

const {
  socketRef,
  socketuserData,

} = useContext(UserDataContext)

  return (
    <div  className="gameShow">
      <Navbar
        userData={socketuserData}
        socket={socketRef.current}
        setShowMenu={setShowMenu}
        showMenu={showMenu}
        runningY={runningY}
        soundOnSwicth={soundOnSwicth}
        setSoundOnSwicth={setSoundOnSwicth}
      />
      <GamePage socket={socketRef.current} userData={socketuserData} setShowMenu={setShowMenu} setRunningY={setRunningY} showMenu={showMenu} runningY={runningY} soundOnSwicth={soundOnSwicth} setSoundOnSwicth={setSoundOnSwicth} />

    </div>
  );
};
