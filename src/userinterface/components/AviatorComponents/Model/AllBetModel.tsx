import React, { useEffect, useState } from 'react'

export default function AllBetModel(props) {
  const { open, setOpen, socket,runningY } = props
  const [allBetData, setAllBetData] = useState([])
  const [refereshGame, setRefereshGame] = useState(false)

  useEffect(() => {
    socket &&
      socket.on("getAllBet", (getAllBet) => {
        setAllBetData(getAllBet)
      });

    socket &&
    socket.on("refresh", (refresh) => {
      if (refresh === true) {
        setRefereshGame(refresh)
      }
    });
  }, [socket])

  useEffect(() => {

      const updatedData = allBetData?.map(item => {
          if (item.xPercent < Number(runningY) && item?.isFake === true) {
              return {
                  ...item,
                  history: true
              };
          }
          return item;
      });
  
      if (JSON.stringify(updatedData) !== JSON.stringify(allBetData)) {
          setAllBetData(updatedData);
      }
}, [allBetData,runningY]);

  return (
    <>
      {
        open && (
          <div className='model'>
            <div className='mainBox'>
              <div className='modelHead'>
                <h6>All Bets history</h6>
                <button onClick={() => setOpen(false)}>
                  < i class="fa-solid fa-xmark" ></i>
                </button>
              </div>
              <div className='modelBody'>
                <div className='showTable'>
                  <table>
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>INR</th>
                        <th>X</th>
                        <th>Cash out INR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        allBetData?.map((item) => {
                          return (
                            <tr className={`${item?.history === true ? "cashoutUsd" : ""}`}>
                              <td><div className='userBet'><img src={item?.image} /><h6>{item?.name}</h6></div></td>
                              <td><span>{item?.Bet}</span></td>
                              <td> {item?.history === true && <span className='betxShow' style={{ color: `${item?.xPercent < 2.0 ? "rgb(52, 180, 255)" : item?.xPercent < 10.0 ? "rgb(145, 62, 248)" : item?.xPercent > 10.0 ? "rgb(192, 23, 180)" : ""}` }}>{item?.xPercent + "x"}</span>}</td>
                              <td>{item?.history === true && <span>{item?.win}</span>}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}
