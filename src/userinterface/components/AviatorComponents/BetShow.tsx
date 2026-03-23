import { useEffect, useState } from 'react';
import Avtar from '../../../assets/images/dummyImg/av-15.png';
import './css/custom.css';
import './css/gameOut.css';
import './css/responsive.css';
import './css/responsiveGameOut.css';
import './css/styles.css';

// Types
interface BetItem {
  date?: string;
  Bet: number;
  xPercent: number;
  win?: number;
  history?: boolean;
  image?: string;
  name?: string;
  isFake?: boolean;
}

interface BetShowProps {
  socket?: {
    on: (event: string, callback: (data: any) => void) => void;
    emit: (event: string, payload: any) => void;
  };
  cashoutUser?: any;
  userData?: any;
  runningY?: string | number;
}

export default function BetShow({
  socket,
  cashoutUser,
  userData,
  runningY,
}: BetShowProps) {
  const [showBet, setShowBet] = useState<'allBet' | 'myBet'>('allBet');
  const [allBetData, setAllBetData] = useState<BetItem[]>([]);
  const [totalBet, setTotalBet] = useState<number>(0);
  const [allMyData, setMyBetData] = useState<BetItem[]>([]);
  const [timeG, setTimeG] = useState<number | undefined>(undefined);

  useEffect(() => {
    socket?.on('getAllBet', (getAllBet: BetItem[]) => {
      setAllBetData(getAllBet);
    });
    socket?.on('getMyBet', (getMyBet: BetItem[]) => {
      setMyBetData(getMyBet);
    });
    socket?.on('time', (time: number) => {
      setTimeG(time);
    });
  }, [socket]);

  useEffect(() => {
    if (timeG !== undefined && timeG >= -12 && timeG <= -8) {
      setTotalBet(0);
      setAllBetData([]);
    }
  }, [timeG]);

  useEffect(() => {
    if (showBet === 'myBet') {
      socket?.emit('getMyBet', {
        // userId: GETUSER?._id
      });
    }
  }, [showBet, socket]);

  useEffect(() => {
    const total = allBetData?.reduce((sum, item) => sum + (item?.Bet || 0), 0);
    setTotalBet(total);
  }, [allBetData]);

  const dateFormet = (date?: string): string => {
    if (!date) return '';
    const dt = new Date(date);
    const hours = dt.getHours().toString().padStart(2, '0');
    const minutes = dt.getMinutes().toString().padStart(2, '0');
    const seconds = dt.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="betBoxShow">
      <div className="betTableShow">
        <div className="betTopButton">
          <button onClick={() => setShowBet('allBet')} className={showBet === 'allBet' ? 'activeBet' : ''}>
            All Bets
          </button>
          <button onClick={() => setShowBet('myBet')} className={showBet === 'myBet' ? 'activeBet' : ''}>
            My Bets
          </button>
        </div>

        {showBet === 'myBet' ? (
          <div className="betBodyShow">
            <div className="showTable">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Bet INR</th>
                    <th>X</th>
                    <th>Cash out INR</th>
                  </tr>
                </thead>
                <tbody>
                  {allMyData?.map((item, index) => (
                    <tr key={index} className={item?.history ? 'cashoutUsd' : ''}>
                      <td><span>{dateFormet(item?.date)}</span></td>
                      <td><span>{item?.Bet}</span></td>
                      <td>
                        {item?.history && (
                          <span
                            className="betxShow"
                            style={{
                              color:
                                item?.xPercent < 2.0
                                  ? 'rgb(52, 180, 255)'
                                  : item?.xPercent < 10.0
                                  ? 'rgb(145, 62, 248)'
                                  : 'rgb(192, 23, 180)',
                            }}
                          >
                            {item?.xPercent}x
                          </span>
                        )}
                      </td>
                      <td>{item?.history && <span>{item?.win}</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="betBodyShow">
            <div className="allBetDetails" style={{ position: 'relative' }}>
              <h6>All Bets</h6>
              <h5>{totalBet}</h5>
            </div>
            <div className="showTable">
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
                  {allBetData?.map((item, index) => {
                    const condition =
                      ((item?.xPercent < Number(runningY) && item?.isFake) ||
                        (!item?.isFake && item?.history));

                    return (
                      <tr key={index} className={condition ? 'cashoutUsd' : ''}>
                        <td>
                          <div className="userBet">
                            <img
                              src={item?.image || Avtar}
                              alt="bet"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = Avtar;
                              }}
                            />
                            <h6>{item?.name}</h6>
                          </div>
                        </td>
                        <td><span>{item?.Bet}</span></td>
                        <td>
                          {condition && (
                            <span
                              className="betxShow"
                              style={{
                                color:
                                  item?.xPercent < 2.0
                                    ? 'rgb(52, 180, 255)'
                                    : item?.xPercent < 10.0
                                    ? 'rgb(145, 62, 248)'
                                    : 'rgb(192, 23, 180)',
                              }}
                            >
                              {item?.xPercent}x
                            </span>
                          )}
                        </td>
                        <td>{condition && <span>{item?.win}</span>}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
