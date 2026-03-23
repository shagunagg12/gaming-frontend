
import React from "react";
import { BsIncognito } from "react-icons/bs";
import { FaBomb } from "react-icons/fa";




interface TableData {
  GameName:string,
  UserName:string,
  Time:number,
  BetAmt:number,
  Multiplier:number,
  Payout:number

}






export default function SportsTableComponent():React.JSX.Element{
  const data:TableData[] =[
    {
		GameName: 'cricket',
		UserName: 'dyan',
		Time: 1982,
    BetAmt: 2,
    Multiplier:12,
    Payout: 400,
	},
  {
		GameName: 'golf',
		UserName: 'jisddas',
		Time: 1988,
    BetAmt: 2000,
    Multiplier:2,
    Payout: 0,
	},
  {
		GameName: 'hockey',
		UserName: 'Megabodst',
		Time: 1988,
    BetAmt: 5,
    Multiplier:3,
    Payout:1500
	},
  {
		GameName: 'carrom',
		UserName: 'Megabot',
		Time: 1988,
    BetAmt: 5,
    Multiplier:3,
    Payout:1500
	},
  {
		GameName: 'carrom',
		UserName: 'Megabot',
		Time: 1988,
    BetAmt: 5,
    Multiplier:3,
    Payout:1500
	},
  {
		GameName: 'carrom',
		UserName: 'Megabot',
		Time: 1988,
    BetAmt: 5,
    Multiplier:3,
    Payout:1500
	},
  {
		GameName: 'carrom',
		UserName: 'Megabot',
		Time: 1988,
    BetAmt: 5,
    Multiplier:3,
    Payout:1500
	},

]
	return (


<div className="py-5  h-auto font-bold text-[#b1bad3] text-[13px] select-none">

  <table className="  md: w-full relative ">
    <thead className=" h-[50px]    md:text-left sm:text-left ">
      <tr  className="xl:grid-cols-6 md:grid-cols-4 grid-cols-2 grid justify-evenly  px-5 h-[50px]">
      <th className="xl:flex max-sm:flex  flex-row "> GameName</th>
      <th className="xl:flex  md:flex hidden flex-row " > User</th>
      <th className="xl:flex hidden flex-row" > Time</th>
      <th className="xl:flex hidden flex-row"> Bet Amount</th>
      <th className="xl:flex md:flex hidden flex-row "> Multiplier</th>
      <th className="xl:flex max-sm:flex  flex-row"> Payout</th>
      </tr>


    </thead>


    <tbody className="">
      {data.map((item)=>(
    
         <tr className=" xl:grid-cols-6 md:grid-cols-4 grid-cols-2 grid h-[50px]  items-center px-5   bg-opacity-50 even:bg-[#316163] even:rounded-md">

<a href=""><td className=" xl:flex sm:flex    w-[95%]   flex-row -py-1 items-center "><FaBomb size={'14px'} className="hover:text-white"/><span className="truncate text-white">{item.GameName}</span></td></a>

<td className="xl:flex  md:flex hidden flex-row items-center gap-[2px]"><BsIncognito />{item.UserName}</td>
<td className="xl:flex hidden flex-row" >{item.Time}</td>
<td className="xl:flex hidden flex-row">{item.BetAmt}</td>
<td className="xl:flex md:flex hidden flex-row ">{item.Multiplier}x</td>
<td className="xl:flex max-sm:flex  flex-row">{item.Payout}</td>
</tr>
        
      )

      )}


    </tbody>


  </table>


</div>
	)
}