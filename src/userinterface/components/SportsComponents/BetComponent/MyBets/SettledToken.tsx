import { useState } from "react";
import { FaBitcoin } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { GiThrownCharcoal } from "react-icons/gi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { BiListMinus } from "react-icons/bi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const SettledToken=()=>{
   const [estPayout, setEstPayout] = useState(0);
       const [betAmount, setBetAmount] = useState(0);
       const data = [
           {
               time: "10:00 AM", 
               date: "20 Nov 2025",
               Overs:130.5,
               BwtOver:"32-36",
               isLive: true,
               isSettled: false,
               StockRate: "increase",
               Runrate: 1.77,
               Odds: 1.33,
               Payout:2.00,
               Stack:45
           },
           {
               time: "10:00 AM", 
               date: "20 Nov 2025",
               Overs:130.5,
               BwtOver:"32-36",
               isLive: false,
               isSettled: false,
               StockRate: "decrease",
               Runrate:2.22,
               Odds: 1.33,
               Payout:2.00,
               Stack:45
           },
           {
               time: "10:00 AM", 
               date: "20 Nov 2025",
               Overs:130.5,
               BwtOver:"32-36",
               isLive: true,
               isSettled: true,
               StockRate: "increase",
               Runrate:2.22,
               Odds: 1.33,
               Payout:2.00,
               Stack:45
           },
           {
               time: "10:00 AM", 
               date: "20 Nov 2025",
               Overs:130.5,
               BwtOver:"32-36",
               EstPayout: 0,
               BetAmount: 0,
               isLive: true,
               isSettled: true,
               StockRate: "increase",
               Runrate:2.22,
               Odds: 1.33,
               Payout:2.00,
               Stack:45
           },
       ];
   
       
       return (
           <>
               {data.map((item, index) => (
                   <div
                   key={index}
                   className="flex rounded-md bg-[#22313b] w-[92%] m-2 pb-2 flex-col justify-between relative"
                 >
                   <div
                     className="absolute bottom-0 left-0 w-full h-[12px]"
                     style={{
                       background: `
                         radial-gradient(circle at bottom, #0e1921 6px, transparent 6px)`,
                       backgroundSize: '12px 12px',
                       backgroundRepeat: 'repeat-x',
                     }}
                     
                   ></div>
                 
                       <div className="bg-[#2e4250] text-[15px] py-1.5 px-3 rounded-t-md font-medium w-[100%] flex items-center justify-between flex-row">
                           <div className="flex flex-row space-x-2 items-center">
                               {item.isLive && (
                                   <div className="text-[12px] text-black font-bold bg-[#b8e6f5] px-1 rounded-sm">Loss</div>
                               )}
                               <div>{item?.time}</div>
                               <div>{item?.date}</div>
                           </div>
                           <BiListMinus color="#c9c9c9" size={25} />
                       </div>
                       <div className="flex flex-col w-full py-2">
                       <div className="text-white font-bold px-3 flex-row flex items-center"><GiThrownCharcoal className="mr-1"/> Sunriser Hydrabad</div>
                           <div className="justify-between px-3 text-[15px] text-white opacity-[70%]">
                               Match Total Runs
                           </div>
                           <div className="justify-between flex items-end flex-row px-3 text-[15px] text-white">
                              <div className="flex flex-row space-x-2 items-center">
                              <ImCross color="#61748b" size={10}/>
                               <div className="text-white font-bold">Over {item.Overs}</div>
                               </div>
                               
                               {item.isSettled === false ?
                                   <div className="text-[#ffffff] items-center flex flex-row font-bold">
                                       <div>{item.Runrate}</div>
                                   </div> : <div className="text-red-500">Settled</div>}
                           </div>
                           <div className="px-3 text-[15px] font-bold text-yellow-800">{item.BwtOver}</div>
                           {/*  */}
                           <div className="flex flex-row justify-between space-x-3 mt-3 mb-2 items-center">
                            <div className="w-full h-[1.5px] bg-[#61748b]"></div>
                            <div>Stack</div>
                            <div className="w-full h-[1.5px] bg-[#61748b]"></div>
                           </div>
                           <div className="flex flex-col px-3">
                                 <div className="flex flex-row justify-between items-center">
                                      <div className="text-[15px] text-white opacity-[70%]">Odds</div>
                                      <div className="text-[15px] text-[#0595ff] opacity-[70%] font-bold">{item.Odds}</div>
                                 </div>
                                 <div className="flex flex-row justify-between items-center">
                                      <div className="text-[15px] text-white opacity-[70%]">Stake</div>
                                      <div className="text-[15px] text-white flex items-center">₹{item.Stack} <RiMoneyRupeeCircleFill color="yellow" className="ml-1"/></div>
                                 </div>
                                 <div className="flex flex-row justify-between items-center">
                                      <div className="text-[15px] text-white opacity-[70%]">Payout</div>
                                      <div className="text-[15px] text-white flex items-center">₹{item.Payout} <RiMoneyRupeeCircleFill color="yellow" className="ml-1"/></div>
                                 </div>
                           </div>
                       </div>
                   </div>
               ))}
           </>
       );
}
export default SettledToken