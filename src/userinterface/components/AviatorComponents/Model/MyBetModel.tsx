import React, { useEffect, useState } from 'react'

export default function MyBetModel(props) {
  const { open, setOpen, socket } = props
  const [myBetData, setMyBetData] = useState([])

  useEffect(() => {
    socket &&
      socket.on("getMyBet", (getMyBet) => {
        setMyBetData(getMyBet)
      });
  }, [socket])


  const dateFormet = (date) => {
    if (date) {
      var date = new Date(date);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var formattedTime = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
      return formattedTime
    }
  }
  return (
    <>
      {
        open && (
          <div className='model myBetShowModel'>
            <div className='mainBox'>
              <div className='modelHead'>
                <h6>My bet history</h6>
                <button onClick={() => setOpen(false)}>
                  < i class="fa-solid fa-xmark" ></i>
                </button>
              </div>
              <div className='modelBody'>
                <div className='showTable'>
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Bet INR</th>
                        <th>X</th>
                        <th>Cash out INR</th>
                      </tr>
                    </thead>
                    {
                      myBetData?.length > 0 ?
                        <tbody>
                          {
                            myBetData?.map((item) => {
                              return (
                                <tr className={`${item?.history === true ? "cashoutUsd" : ""}`}>
                                  <td><span>{dateFormet(item?.date)}</span></td>
                                  <td><span>{item?.Bet}</span></td>
                                  <td> {item?.history === true && <span className='betxShow' style={{ color: `${item?.xPercent < 2.0 ? "rgb(52, 180, 255)" : item?.xPercent < 10.0 ? "rgb(145, 62, 248)" : item?.xPercent > 10.0 ? "rgb(192, 23, 180)" : ""}` }}>{item?.xPercent + "x"}</span>}</td>
                                  <td>{item?.history === true && <span>{item?.win}</span>}</td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                        :
                        <h6>Not bet...</h6>
                    }
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
