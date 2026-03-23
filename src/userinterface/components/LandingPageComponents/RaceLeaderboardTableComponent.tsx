
import React from "react";
import { BsIncognito } from "react-icons/bs";
import { FaBomb } from "react-icons/fa";




interface TableData {
 rank:string;
 username:string;
 wagered:number;
 price:number;

}






export default function RaceLeaderboardTableComponent():React.JSX.Element{
  const data:TableData[] =[
    {
        rank: '1st',
        username: 'dyan',
        wagered: 150,
        price: 0,
	},
         {
        rank: '2nd',
        username: 'nobita',
        wagered: 110002,
        price: 1590000,
        },
        {
        rank: '3rd',
        username: 'soniyo',
        wagered: 50,
        price: 150,
        },

        {
        rank: '4th',
        username: 'giyan',
        wagered: 500,
        price: 0,
        },    
]
	return (


<div className="py-5  h-auto font-bold text-[#b1bad3] text-[13px] select-none">

  <table className="  md: w-full relative ">
    <thead className=" h-[50px]    md:text-left sm:text-left ">
      <tr  className="xl:grid-cols-4 md:grid-cols-4 grid-cols-2 grid justify-evenly  px-5 h-[50px]">
      <th className="xl:flex max-sm:flex  flex-row "> Rank</th>
      <th className="xl:flex  md:flex hidden flex-row " > User</th>
      <th className="xl:flex hidden flex-row" >Wagered</th>
      <th className="xl:flex hidden flex-row">Price</th>

      </tr>


    </thead>


    <tbody className="">
      {data.map((item)=>(
    
<tr className=" xl:grid-cols-4 md:grid-cols-4 grid-cols-2 grid h-[50px]  items-center px-5   bg-opacity-50 even:bg-[#316163] even:rounded-md">
<a href=""><td className=" xl:flex sm:flex    w-[95%]   flex-row -py-1 items-center "><FaBomb size={'14px'} className="hover:text-white"/><span className="truncate text-white">{item.rank}</span></td></a>
<td className="xl:flex  md:flex hidden flex-row items-center gap-[2px]"><BsIncognito />{item.username}</td>
<td className="xl:flex hidden flex-row" >{item.wagered}</td>
<td className="xl:flex hidden flex-row">{item.price}</td>   
</tr>
        
      )

      )}


    </tbody>


  </table>


</div>
	)
}