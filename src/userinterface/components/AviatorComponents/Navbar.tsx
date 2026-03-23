import { useContext, useEffect, useState } from 'react'
import Logo from '../../../assets/images/logoAvitor.svg'
import Avtar from '../../../assets/images/dummyImg/av-15.png'
import AllBetModel from './Model/AllBetModel';
import MyBetModel from './Model/MyBetModel';
import {UserDataContext} from './store/UserDataContext'
import GameLimitModel from './Model/GameLimitModel';
import { useNavigate } from 'react-router-dom';

export default function Navbar(props:any) {
    const { socket, runningY } = props;
    // const { GETUSER,amountMain } = useContext(UserDataContext);
    const [allBetModel, setAllBetModel] = useState(false)
    const [myBetModel, setMyBetModel] = useState(false)
    const navigate = useNavigate()
    const [gameLimitModel, setGameLimitModel] = useState(false)


    useEffect(() => {
        const handleOutsideClick = (event:any) => {
            if (props.showMenu && !event.target.closest(".navbar")) {
                props.setShowMenu(false);
            }
        };
        if (props.showMenu) {
            document.addEventListener("click", handleOutsideClick);
        }
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [props.showMenu, props.setShowMenu]);

    const handleModelOpen = (type:any) => {
        if (type === "allBet") {
            setAllBetModel(true)
        } else if (type === "myBet") {
            socket &&
                socket.emit("getMyBet", {
                    // userId: GETUSER?._id
                });
            setMyBetModel(true)
        } else if (type === "gameLimit") {
            setGameLimitModel(true)
        }
    }
    return (
        <>
            <div className='navbar'>
                <div className='row w-100'>
                    <div className='col-6  p-0 col-md-4 logoShow' onClick={() => navigate("/")}>
                        <img src={Logo} />
                        {/* <div className='howToPlay'>
                            <i class="fa-regular fa-circle-question"></i>
                            <h6>How To Play?</h6>
                        </div> */}
                    </div>
                    <div className='col-6 p-0 col-md-8 showProfile'>
                        <div className='showProfileBalance'>
                            <div className='balance'>
                                {/* <h6>{amountMain?.diamond ? amountMain?.diamond : "0"} <span>INR</span></h6> */}
                            </div>
                            {/* <div className='profileShow'>
                            <div className='imgShow'>
                                <img src={props.userData?.image ? props.userData?.image : Avtar} />
                                <h6>{props.userData?.name ? props.userData?.name : "Player56"}</h6>
                            </div>
                        </div> */}
                            <button className="showMenu" onClick={() => props.setShowMenu(!props.showMenu)} ><i className="fa-solid fa-bars"></i></button>
                        </div>
                    </div>
                </div>
                {
                    props.showMenu && (
                        <div className="showMenuContent">
                            <div className="showMenuBody">
                                <div className='profileContent'>
                                    <div className='imgShow'>
                                        <img src={props.userData?.image ? props.userData?.image : Avtar} />
                                        <h6>{props.userData?.name ? props.userData?.name : "Player56"}</h6>
                                    </div>
                                </div>
                                <div className='showMenuButton'>
                                    <div className='showMenuBox'>
                                        <div className='showIcon'>
                                            <i className="fa-solid fa-volume-low"></i>
                                            <h5>Sound</h5>
                                        </div>
                                        <div className="ng-untouched ng-pristine ng-valid ng-star-inserted" onClick={() => props.setSoundOnSwicth(!props.soundOnSwicth)}>
                                            <div className={`input-switch off switch ${props.soundOnSwicth === false ? "offSwitch" : "onSwitch"}`} >
                                                <span className="oval"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='showMenuBox' onClick={() => handleModelOpen("allBet")}>
                                        <div className='showIcon'>
                                            <i className="fa-regular fa-file-lines"></i>
                                            <h5>All Bets</h5>
                                        </div>
                                    </div>
                                    <div className='showMenuBox' onClick={() => handleModelOpen("myBet")}>
                                        <div className='showIcon'>
                                            <i className="fa-solid fa-clock-rotate-left"></i>
                                            <h5>My Bets</h5>
                                        </div>
                                    </div>
                                    {/* <div className='showMenuBox' onClick={() => handleModelOpen("gameRule")}>
                                        <div className='showIcon'>
                                            <i class="fa-solid fa-scale-balanced"></i>
                                            <h5>Game Rules</h5>
                                        </div>
                                    </div> */}
                                    <div className='showMenuBox' onClick={() => handleModelOpen("gameLimit")}>
                                        <div className='showIcon'>
                                            <i className="fa-solid fa-money-check-dollar"></i>
                                            <h5>Game Limit</h5>
                                        </div>
                                    </div>

                                    <div className='showMenuBox' onClick={() => navigate("/user/profile")}>
                                        <div className='showIcon'>
                                            <i className="fa-solid fa-user"></i>
                                            <h5>Profile</h5>
                                        </div>
                                    </div>
                                    <div className='showMenuBox' onClick={() => navigate("/")}>
                                        <div className='showIcon'>
                                            <i className="fa-solid fa-house"></i>
                                            <h5>Home Page</h5>
                                        </div>
                                    </div>
                                    <div className='showMenuBox' >
                                        <div className='showIcon'>
                                            <i className="fa-solid fa-plane-departure"></i>
                                            <img src={Logo} style={{ marginLeft: "10px", width: "60px", height: "20px" }} />
                                        </div>
                                    </div>
                                    {/* <div className='showMenuBox' onClick={() =>navigate("game/deposit")}>
                                        <div className='showIcon'>
                                            <i class="fa-solid fa-money-bill-transfer"></i>
                                            <h5>Deposit Fund</h5>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <AllBetModel open={allBetModel} setOpen={setAllBetModel} socket={socket} runningY={runningY} />
            <MyBetModel open={myBetModel} setOpen={setMyBetModel} socket={socket} />
            <GameLimitModel open={gameLimitModel} setOpen={setGameLimitModel} socket={socket} />
        </>
    )
}
