import React, { useContext, useEffect, useState } from 'react'
import { ToastConent } from '../ToastConent'
import { UserDataContext } from './UserDataContext'

export default function BetButtonShow(props) {
    const { time, socket, yData, showGameStep, userData, newStartGame, crashRocket, setAutoBetCashOutDimond, autoBetCashOutDimond } = props
    const [autoButton, setAutoButton] = useState("bet")
    const [betCoin, setBetCoin] = useState(10)
    // const { GETUSER } = useContext(UserDataContext);
    const [showWinnerTost, setShowWinnerTost] = useState(false)
    const [checkBalance, setCheckBalance] = useState(true)
    const [winner, setWinner] = useState(false)
    const [betCashOut, setBetCashOut] = useState(10)
    const [betCashOutCrash, setBetCashOutCrash] = useState(1.0)
    const [betButton, setBetButton] = useState({
        cancel: false,
        cashOut: false,
        betClick: true
    })

    useEffect(() => {
        socket &&
            socket.on("refreshAddBet", (refreshAddBet) => {
                console.log("refreshAddBet",refreshAddBet)
                const refreshAddBetCheck = refreshAddBet?.map((item) => {
                    setBetCoin(item?.Bet)
                    setBetCashOut(item?.Bet)
                    if (item?.history === false) {
                        if (newStartGame === true) {
                            console.log("betButton=====", betButton)
                            setBetButton({
                                ...betButton,
                                cancel: false,
                                cashOut: true,
                                betClick: false,
                            })
                        }
                        console.log("betButton=====", betButton)
                    } else {
                        console.log("betButton=====", betButton)
                        setBetButton({
                            ...betButton,
                            cancel: true,
                            cashOut: false,
                            betClick: false,
                        })
                    }
                    console.log("betButton=====", betButton)

                })
            });
        socket &&
            socket.on("coinLess", (coinLess) => {
                console.log("coinLess",coinLess)
                if (coinLess) {
                    setCheckBalance(false)
                    setBetButton({
                        ...betButton,
                        cancel: false,
                        cashOut: false,
                        betClick: true,
                    })
                }
            });
    }, [socket, newStartGame])

    useEffect(() => {
        if (userData?.diamond <= 10) {
            setCheckBalance(false)
            setBetButton({
                ...betButton,
                cancel: false,
                cashOut: false,
                betClick: true,
            })
        } else {
            setCheckBalance(true)
        }
    }, [userData])

    useEffect(() => {
        if (time === -10) {
            setWinner((false))
        }
    }, [time])


    useEffect(() => {
        if (newStartGame === true && betButton?.cancel === true && checkBalance && time === 0) {
            setBetButton({
                ...betButton,
                cancel: false,
                cashOut: true,
                betClick: false,
            })
        }
    }, [newStartGame, betButton, winner, checkBalance])

    useEffect(() => {
        if (crashRocket === true && betButton?.cashOut === true) {
            setBetButton({
                ...betButton,
                cancel: false,
                cashOut: false,
                betClick: true,
            })
        }
    }, [crashRocket, betButton])


    useEffect(() => {
        if (showGameStep?.showLoader === true && betButton?.cancel === true && checkBalance === true) {
            console.log("showGameStep",showGameStep)
            console.log("addBet")
          setTimeout(() => {
              socket &&
                socket.emit("addBet", {
                    diamond: betCoin,
                    // userId: GETUSER?._id
                });
          }, 1000);
        }
    }, [showGameStep?.showLoader, betButton, checkBalance])


    useEffect(() => {
        if (showWinnerTost === true) {
            setTimeout(() => {
                setShowWinnerTost(false)
            }, 2000);
        }
    }, [showWinnerTost])

    const betIncrement = (type) => {
        if (betButton.betClick === true) {
            if (type === "minus") {
                if (betCoin >= 11) {
                    const decrementValue = parseFloat((betCoin - 10).toFixed(2));
                    setBetCoin(decrementValue)
                }
            } else {
                if (betCoin <= 7999) {
                    const incrementValue = parseFloat((betCoin + 10).toFixed(2));
                    setBetCoin(incrementValue)
                }
            }
        }
    }

    const handleOnBet = () => {
        if (time >= -4 && time <= -1) {

        } else {
            if (betButton?.betClick === true) {
                setBetButton({
                    ...betButton,
                    cancel: true,
                    cashOut: false,
                    betClick: false,
                })
            }

            if (betButton?.cancel === true && time > -9 && time < 0) {
                socket.emit("cancelBet", {
                    diamond: betCoin,
                    // userId: GETUSER?._id
                });
            }

            if (betButton?.cashOut === true) {
                socket &&
                socket.emit("cashOut", {
                    collectPercent: Number(yData),
                    diamond: betCoin,
                    // userId: GETUSER?._id
                });

                if (showWinnerTost === false) {
                    setShowWinnerTost(true)
                    setBetCashOut(betCoin)
                    setBetCashOutCrash(yData)
                }
            }

            if (betButton?.cancel === true || betButton?.cashOut === true) {
                setBetButton({
                    ...betButton,
                    cancel: false,
                    cashOut: false,
                    betClick: true,
                })
            }

          
        }

        if (betButton?.cashOut === true) {
            socket &&
                socket.emit("cashOut", {
                    collectPercent: Number(yData),
                    diamond: betCoin,
                    // userId: GETUSER?._id
                });
        }

    }

    const handleBetIncrement = (coin) => {
        if (betButton?.betClick === true) {
            if (betCoin >= 10 && betCoin <= 7999) {
                let value = parseFloat((betCoin + coin).toFixed(2))
                value = value < 10 ? 10 : value > 8000 ? 8000 : value;
                setBetCoin(value)
            }
        }
    }

    const hadnleBetButton = (type) => {
        if (type === "bet") {
            setAutoButton("bet")
        }
    }

    return (
        <>
            <div className='betButtonShow'>
                <div className='showButton' style={{ opacity: `${time >= -4 && time <= -1 ? "0.6" : "1"}`, border: `${betButton?.cancel === true ? "1px solid #cb011a" : betButton?.cashOut === true ? "1px solid #d07206" : ""}`, padding: `${autoButton === "auto" ? "10px 14px 0px 10px" : "20px 14px"}` }}>
                    <div className='showBetButtonBet'>
                        <div className='betTopButton'>
                            <button onClick={() => hadnleBetButton("bet")} className={`${autoButton === "bet" ? "activeBet" : ""}`}>Bet</button>
                            {/* <button onClick={() => hadnleBetButton("auto")} className={`${autoButton === "auto" ? "activeBet" : ""}`}>Auto</button> */}
                        </div>
                    </div>
                    <div className='buttonAutoNumber row'>
                        <div className='col-6 p-0 autoBetDetails'>
                            <div className='autoButton' style={{ opacity: `${betButton.betClick === true ? "1" : "0.6"}` }}>
                                <i className="fa-solid fa-circle-minus" onClick={() => betIncrement("minus")}></i>
                                <span>{parseFloat(betCoin)}</span>
                                <i className="fa-solid fa-circle-plus" onClick={() => betIncrement("plus")}></i>
                            </div>
                            <div className='showNumber'>
                                <span onClick={(() => handleBetIncrement(50))} style={{ opacity: `${betButton.betClick === true ? "1" : "0.6"}` }}>50</span>
                                <span onClick={(() => handleBetIncrement(100))} style={{ opacity: `${betButton.betClick === true ? "1" : "0.6"}` }}>100</span>
                                <span onClick={(() => handleBetIncrement(500))} style={{ opacity: `${betButton.betClick === true ? "1" : "0.6"}` }}>500</span>
                                <span onClick={(() => handleBetIncrement(1000))} style={{ opacity: `${betButton.betClick === true ? "1" : "0.6"}` }}>1000</span>
                            </div>
                        </div>
                        <div className='col-6 p-0 betButton'>
                            {
                                betButton?.cancel === true ?
                                    <>
                                        <div style={{ display: "flex", flexDirection: `${time > -9 && time < 0 ? "unset" : "column"}`, alignItems: "center", width: "100%" }}>
                                            <span style={{ marginBottom: "6px", display: `${time > -9 && time < 0 ? "none" : "block"}` }}> Waiting for next round </span>
                                            <div className={`betMainButton ${betButton?.cancel === true ? "waitBet" : betButton?.cashOut === true ? "showBet" : ""}`} onClick={() => handleOnBet()}>
                                                <h5 style={{ margin: `${time > -9 && time < 0 ? "17px 0px" : "10px 0px"}` }}>CANCEL</h5>
                                            </div>
                                        </div>
                                    </>
                                    : betButton?.cashOut === true ?
                                        <div className={`betMainButton ${betButton?.cancel === true ? "waitBet" : betButton?.cashOut === true ? "showBet" : ""}`} onClick={() => handleOnBet()}>
                                            <h6 style={{ marginBottom: " 10px 0px" }}>CASH OUT</h6>
                                            <h5 > {(yData * betCashOut)?.toFixed(2)} INR </h5>
                                        </div>
                                        : <div className={`betMainButton ${betButton?.cancel === true ? "waitBet" : betButton?.cashOut === true ? "showBet" : ""}`} onClick={() => handleOnBet()} >
                                            <h6>BET</h6>
                                            <h5>{parseFloat(betCoin)} INR </h5>
                                        </div>
                            }
                        </div>
                    </div>
                </div>

            </div >
            {
                showWinnerTost && (
                    <div className='showWinnerTost'>
                        <div className='showLeftContent'>
                            <h6>You have crashed out!</h6>
                            <h5>{betCashOutCrash}</h5>
                        </div>
                        <div className='showRightContent '>
                            <div className='showImg'>
                                <h6>Win INR</h6>
                                <h5>{(betCashOutCrash * betCashOut)?.toFixed(2)}</h5>
                            </div>
                        </div>
                        < i className="fa-solid fa-xmark" onClick={() => setShowWinnerTost(false)}></i>
                    </div>
                )
            }
        </>
    )
}
