
import React from "react";
import { IconType } from "react-icons";
import { BsIncognito } from "react-icons/bs";
import { FaBomb } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";

interface TableData {
  rank:string,
user:string
  date:number,
  bet:number,
  multiplier:number,
  payout:number

}

export default function LuckyWinsTable():React.JSX.Element{
  const data:TableData[] =[
    {
		rank: 'Dice',
       user:'FaBomb',
		date: 18,
    bet: 2000,
    multiplier:2,
    payout: 4000,
	},
  {
		rank: 'poker',
        user:'Megadonnnn',
		date: 1988,
        bet: 2000,
        multiplier:2,
        payout: 0,
	},
  {
		rank: 'carrom',
        user:'hidden',
		date: 1988,
        bet: 5,
        multiplier:3,
        payout:1500
	},
  {
		rank: 'carrom',
        user:'hidden',
		date: 1988,
        bet: 5,
        multiplier:3,
        payout:1500
	},
  {
		rank: 'carrom',
        user:'hidden',
		date: 1988,
        bet: 5,
        multiplier:3,
        payout:1500
	},
  {
		rank: 'carrom',
        user:'hidden',
		date: 1988,
        bet: 5,
        multiplier:3,
        payout:1500
	},
  {
		rank: 'carrom',
        user:'hidden',
		date: 1988,
        bet: 5,
        multiplier:3,
        payout:1500
	},

]
const tableHeadings=[{title:'Game',key:'game'},
                    {title:'Time',key:'time'},
                    {title:'BetAmount',key:'bet-amount'},
                    {title:'Multiplier',key:'multiplier'},
                    {title:'Payout',key:'payout'},
                
                ] 


	return (


        <div className=" overflow-x-auto scrollbar-thin scrollbar-thumb-[#192e38] scrollbar-track-[#24434d]  ">
        <table className="min-w-full text-sm font-semibold text-[#b1bad3]">
          <thead>
            <tr>
              <th className="py-2 px-4  text-left ">Rank</th>
              <th className="py-2 px-4  text-center">User</th>
              <th className="py-2 px-4  text-center">Date</th>
              <th className="py-2 px-4  text-center">Bet</th>
              <th className="py-2 px-4  text-center">Multiplier</th>
              <th className="py-2 px-4  text-right">Payout</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="odd:bg-[#213743] ">
                <td className="py-4 px-4 text-left   min-w-28 rounded-l-[3px]">{item.rank}</td>
                <td className="py-4 px-4 text-center min-w-28">{item.user}</td>
                <td className="py-4 px-4 text-center min-w-28">{item.date}</td>
                <td className="py-4 px-4 text-center min-w-28">{item.bet}</td>
                <td className="py-4 px-4 text-center min-w-28">{item.multiplier}</td>
                <td className="py-4 px-4 text-right rounded-r-[3px] min-w-28">{item.payout}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
	)
}
