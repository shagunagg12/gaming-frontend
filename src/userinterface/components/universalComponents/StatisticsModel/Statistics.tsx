import { useEffect, useState } from "react";
import DropdownStatistics, { MenuItem } from "./DropDownStatistics";
import { MdCurrencyExchange } from "react-icons/md";
import { MdCurrencyBitcoin } from "react-icons/md";
import { MdCurrencyFranc } from "react-icons/md";
import { MdCurrencyPound } from "react-icons/md";
import { MdCurrencyRupee } from "react-icons/md";
import { MdOutlineCurrencyYen } from "react-icons/md";
import { MdCurrencyLira } from "react-icons/md";
import { HiDownload } from "react-icons/hi";
import { FaInfoCircle } from "react-icons/fa";
import { CgDollar } from "react-icons/cg";
import { BiSolidDollarCircle } from "react-icons/bi";
const Statistics = () => {

    const users: MenuItem[] = [
        { title: "All" },
        { title: "Casino" },
        { title: "Sports" },
    ];
    const users2: MenuItem[] = [
        { title: "All" },
        { title: "Pound", image: MdCurrencyPound },
        { title: "Rupee", image: MdCurrencyRupee },
        { title: "Franc", image: MdCurrencyFranc },
        { title: "Bitcoin", image: MdCurrencyBitcoin },
        { title: "Exchange", image: MdCurrencyExchange },
        { title: "CurrencyYen", image: MdOutlineCurrencyYen },
        { title: "Lira", image: MdCurrencyLira },
    ];
    const TypeStatistics = {
        All: { totalBet: 1222, losses: 234, wins: 555, wegered: 2356 },
        Casino: { totalBet: 3865, losses: 952, wins: 334, wegered: 2356 },
        Sports: { totalBet: 1678, losses: 444, wins: 321, wegered: 7654 },
    }
    const [typeValue, setTypeValue] = useState("All")
    const handleItemClick = (item: MenuItem) => {
        setTypeValue(item.title); // Set the selected title to the typeValue state
    };
    const [isLoading, setIsLoading] = useState(true); // For shimmer effect
    const Shimmer = ({ className }: { className: string }) => (
        <div className={`bg-[#aaaabcd7] rounded-md shimmer-effect ${className}`}></div>
    );
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="w-full flex flex-col py-3 gap-y-2">
            <div className="flex flex-row">
                <div className="flex flex-row items-start gap-x-2 w-full justify-between">
                    <div className="flex flex-col gap-y-1 w-[50%]">
                        <div className="text-[13px] font-semibold text-blue-100">Type</div>
                        {isLoading?<Shimmer className="w-[100%] h-8"></Shimmer>:
                        <DropdownStatistics
                            buttonText={users[0].title}
                            menuItems={users}
                            onItemClick={handleItemClick}
                        />}
                    </div>
                    <div className="flex flex-col gap-y-1 w-[50%] items-start">
                        <div className="text-[13px] font-semibold text-blue-100">
                            Currency
                        </div>
                        {isLoading?<Shimmer className="w-[100%] h-8"></Shimmer>:
                        <DropdownStatistics
                            buttonText={users2[0].title}
                            menuItems={users2}
                        />}
                    </div>

                </div>

            </div>
            <div className="flex flex-row gap-2 mt-1 w-full">
                <div className="gap-2 flex flex-col w-1/2">
                    <div className="flex flex-col rounded-md px-3 py-2 bg-[#2d4864]">
                        <div className="text-blue-50 font-semibold text-[12px]">Total Bet</div>
                        <div className="text-white font-bold text-[14px]">{isLoading?<Shimmer className="w-12 h-3"></Shimmer>: <>{typeValue == "All" && TypeStatistics.All.totalBet || typeValue == "Casino" && TypeStatistics.Casino.totalBet || typeValue == "Sports" && TypeStatistics.Sports.totalBet}</>}</div>
                    </div>
                    <div className="flex flex-col rounded-md px-3 py-2 bg-[#2d4864]">
                        <div className="text-blue-50 font-semibold text-[12px]">Number of Looses</div>
                        <div className="text-white font-bold text-[14px]">{isLoading?<Shimmer className="w-12 h-3"></Shimmer>: <>{typeValue == "All" && TypeStatistics.All.losses || typeValue == "Casino" && TypeStatistics.Casino.losses || typeValue == "Sports" && TypeStatistics.Sports.losses}</>}</div>
                    </div>
                </div>
                <div className="gap-2 flex flex-col w-1/2 ">
                    <div className="flex flex-col rounded-md px-3 py-2 bg-[#2d4864]">
                        <div className="text-blue-50 font-semibold text-[12px]">Number of Wins</div>
                        <div className="text-white font-bold text-[14px]">{isLoading?<Shimmer className="w-12 h-3"></Shimmer>: <>{typeValue == "All" && TypeStatistics.All.wins || typeValue == "Casino" && TypeStatistics.Casino.wins || typeValue == "Sports" && TypeStatistics.Sports.wins}</>}</div>
                    </div>
                    <div className="flex flex-col rounded-md px-3 py-2 bg-[#2d4864]">
                        <div className="text-blue-50 font-semibold text-[12px] flex items-center gap-x-1"><span>Wagered</span><FaInfoCircle /></div>
                        {isLoading?<Shimmer className="w-12 h-3"></Shimmer>:    <div className="text-white font-bold text-[14px] items-center flex"><CgDollar /><span className="mt-0.5"> {typeValue == "All" && TypeStatistics.All.wegered || typeValue == "Casino" && TypeStatistics.Casino.wegered || typeValue == "Sports" && TypeStatistics.Sports.wegered}</span> <BiSolidDollarCircle color="#17de20" /></div>}
                    </div>
                </div>
            </div>
            {/*  */}

            <div className="w-full justify-center items-center rounded-sm text-[13px] font-bold py-2 hover:bg-[#6685a1] gap-x-2 hover:shadow-sm cursor-pointer bg-[#364c61] flex"><HiDownload size={15} /> Request Statistics</div>

        </div>
    );
};

export default Statistics;
