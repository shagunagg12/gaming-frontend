import { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { LuDot } from "react-icons/lu";

const NotificationBar:React.FC=()=>{
    const [isSM, setIsSM] = useState(false);
          const [isMD, setIsMD] = useState(false);
     useEffect(() => {
            const updateScreenSize = () => {
                setIsSM(window.innerWidth <= 639);
                setIsMD(window.innerWidth <= 767) // Adjust for `sm` and `md` breakpoints
            };
    
            updateScreenSize();
            window.addEventListener('resize', updateScreenSize);
    
            return () => window.removeEventListener('resize', updateScreenSize);
        }, []);
    return(
        <div className="w-full rounded-sm flex flex-row shadow-md shadow-black bg-[#263e48]">
            <div className="md:px-6 sm:px-5 px-4 md:pb-7 sm:pb-6 pb-5 md:pt-6 sm:pt-5 pt-4 bg-[#1b2c33]">
            <FaWallet size={isSM?15:isMD?20:25} color="#4ced11"/>
            </div>
            <div className="flex flex-col justify-center items-end w-full md:px-4 sm:px-2.5 px-1.5">
                <div className="md:text-[12px] gap-x-4 sm:text-[10px] text-[8px] font-bold flex items-center text-white w-full justify-between"><div>Deposite Process Initiated</div><span className="text-blue-100 md:text-[12px] sm:text-[10px] text-[8px] font-normal flex items-center flex-row">11:29 AM<LuDot size={isSM?16:isMD?22:30} color="#4ced11" /></span></div>
                <div className="md:text-[11px] sm:text-[8px] text-[6px] font-normal items-start w-full text-blue-100">Your deposite of ₹500 have been initiated</div>
            </div>
        </div>
    )
}
export default NotificationBar;