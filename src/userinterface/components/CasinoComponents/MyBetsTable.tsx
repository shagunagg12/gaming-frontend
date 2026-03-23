
import React from "react";
import { IconType } from "react-icons";
import { BsIncognito } from "react-icons/bs";
import { FaBomb } from "react-icons/fa";




interface TableData {
  GameName:string,
icon:IconType
  Time:number,
  BetAmt:number,
  Multiplier:number,
  Payout:number

}






export default function MyBetsTable():React.JSX.Element{
  const data:TableData[] =[
    {
		GameName: 'Dice',
        icon:FaBomb,
		Time: 18,
    BetAmt: 2000,
    Multiplier:2,
    Payout: 4000,
	},
  {
		GameName: 'poker',
        icon:FaBomb,
		Time: 1988,
    BetAmt: 2000,
    Multiplier:2,
    Payout: 0,
	},
  {
		GameName: 'carrom',
        icon:FaBomb,
		Time: 1988,
    BetAmt: 5,
    Multiplier:3,
    Payout:1500
	},
  {
		GameName: 'carrom',
        icon:FaBomb,
		Time: 1988,
    BetAmt: 5,
    Multiplier:3,
    Payout:1500
	},
  {
		GameName: 'carrom',
        icon:FaBomb,
		Time: 1988,
    BetAmt: 5,
    Multiplier:3,
    Payout:1500
	},
  {
		GameName: 'carrom',
        icon:FaBomb,
		Time: 1988,
    BetAmt: 5,
    Multiplier:3,
    Payout:1500
	},
  {
		GameName: 'carrom',
        icon:FaBomb,
		Time: 1988,
    BetAmt: 5,
    Multiplier:3,
    Payout:1500
	},

]
const tableHeadings=[{title:'Game',key:'game'},
                    {title:'Time',key:'time'},
                    {title:'BetAmount',key:'bet-amount'},
                    {title:'Multiplier',key:'multiplier'},
                    {title:'Payout',key:'payout'},
                
                ] 


	return (


<div className="py-5  h-auto font-bold  text-[13px] select-none">

  <table className="  md: w-full ">
    <thead className=" h-[50px]    md:text-left sm:text-left  ">
    <tr  className="xl:grid-cols-5 md:grid-cols-4 grid-cols-2 grid   px-5 h-[50px]">
        {tableHeadings.map((th)=>(<>
            <th key={th.key} className={` flex ${th.key === 'time' ? 'max-xl:hidden' : ''} ${th.key === 'bet-amount' ? 'max-md:hidden' : ''}${th.key === 'multiplier' ? 'max-md:hidden' : ''} `} >{th.title}</th>
        
          </>))}
    
      {/* <th className="xl:flex max-sm:flex  flex-row "> GameName</th>
      <th className="xl:flex  md:flex hidden flex-row " > User</th>
      <th className="xl:flex hidden flex-row" > Time</th>
      <th className="xl:flex hidden flex-row"> Bet Amount</th>
      <th className="xl:flex md:flex hidden flex-row "> Multiplier</th>
      <th className="xl:flex max-sm:flex  flex-row"> Payout</th> */}
      </tr>


    </thead>


    <tbody className="">
      {data.map((item)=>(
    
         <tr className=" xl:grid-cols-5 md:grid-cols-4 grid-cols-2 grid h-[50px]  items-center px-5   bg-opacity-50 even:bg-[#316163] even:rounded-md">

<a href="">
<td className=" flex  gap-1    w-[95%]     items-center ">
  <FaBomb size={'14px'} className="hover:text-white"/>
  <span className="truncate text-white">{item.GameName}</span>
</td>
  </a>
<td className="max-xl:hidden" >{item.Time}</td>
<td className="max-md:hidden  ">{item.BetAmt}</td>
<td className=" max-md:hidden">{item.Multiplier}x</td>
<td >{item.Payout}</td>
</tr>
        
      )

      )}


    </tbody>


  </table>


</div>
	)
}
