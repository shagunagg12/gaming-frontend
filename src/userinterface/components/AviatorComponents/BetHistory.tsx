import  { useEffect, useState } from 'react'
// import { BetHistoryData } from './BetDummyData'

export default function BetHistory(props) {
    const { socket } = props
    const [showAllBet, setShowAllbet] = useState(false)
    const [showAllBetData, setAllBetData] = useState(false)


    useEffect(() => {
        socket &&
            socket.on("lastHistory", (lastHistory) => {
                  setAllBetData(lastHistory)
            });

    }, [socket]);

    return (
        <div className={`betHistory ${showAllBet ? "showModel" : ""}`}>
            <div className='showBet'>
                {
                    showAllBet ?
                        <h6>Round History</h6> :
                        showAllBetData?.number?.map?.((item) => {
                            return (
                                <span style={{ color: `${item < 2.0 ? "rgb(52, 180, 255)" : item < 10.0 ? "rgb(145, 62, 248)" : item > 10.0 ? "rgb(192, 23, 180)" : ""}` }}>{item + "x"}</span>
                            )
                        })
                }
            </div>
            <div className='showButton'>
                <button onClick={() => setShowAllbet(!showAllBet)}>
                    <i className="fa-solid fa-clock-rotate-left"></i>
                    {
                        showAllBet ?
                            <i className="fa-solid fa-caret-up"></i>
                            :
                            <i className="fa-solid fa-caret-down"></i>
                    }
                </button>
            </div>
            {
                showAllBet && (
                    <div className='showBetModel'>
                        {
                            showAllBetData?.number?.map?.((item) => {
                                return (
                                    <span style={{ color: `${item < 2.0 ? "rgb(52, 180, 255)" : item < 10.0 ? "rgb(145, 62, 248)" : item > 10.0 ? "rgb(192, 23, 180)" : ""}` }}>{item + "x"}</span>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}
