import { FaTshirt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { IoIosCheckmarkCircle, IoIosStar } from "react-icons/io";
import { GiCutDiamond } from "react-icons/gi";


const VIPClubRanking = () => {
    const VIPSectionsDetails = [
        { category: "Bronze", minAmt: 10, icon: FaRegStar, benifits: ["Monthly Bonus", "Level Up bonuses", "Rakeback", "Weekly bonuses"] },
        { category: "Silver", minAmt: 50, icon: FaRegStar, benifits: ["Monthly Bonus", "Level Up bonuses", "Rakeback", "Weekly bonuses", "Bonus growth"] },
        { category: "Gold", minAmt: 100, icon: FaRegStar, benifits: ["Monthly Bonus", "Level Up bonuses", "Rakeback", "Weekly bonuses", "Bonus growth"] },
        { category: "Premium I-III", minAmt: 250, maxAmt: 1, icon: IoIosStar, benifits: ["Monthly Bonus", "Level Up bonuses", "Rakeback", "Weekly bonuses", "Bonus growth", "Daily bonuses/ Reloads"] },
        { category: "Premium IV-VI", minAmt: 2.5, maxAmt: 10, icon: IoIosStar, benifits: ["Bonus from VIP host in currency of your choice", "Weekly & Monthly bonuses", "Renewable Reloads", "Level Up bonuses", "Rakeback", "Daily bonuses/ Reloads"], host: "Dedicated VIP host" },
        { category: "Diamond I-V", minAmt: 25, icon: GiCutDiamond, benifits: ["Bonus from VIP host in currency of your choice", "Weekly & Monthly bonuses", "Renewable Reloads", "Level Up bonuses", "Rakeback", "Daily bonuses/ Reloads"], host: "Dedicated VIP host" },
    ]
    const colors = ["#C69C6D", "#8de6f9", "#FFC300", "#43def0", "#43def0", "#fff"];

    return (
        <div className="flex items-center justify-center w-full">
            <div className="flex flex-col w-full mx-[80px] items-center my-[50px] gap-y-10 justify-start">
                <div className="text-[20px] font-extrabold">Stake VIP ranking system</div>
                <div className="flex flex-row w-[87%] justify-start items-center gap-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-[#192e38] scrollbar-track-[#44bbfa]">
                    {VIPSectionsDetails.map((item, index) => (
                        <div className="flex flex-col mb-1 space-y-5">
                            <div className={`w-full relative flex flex-row items-center gap-x-4 justify-center`}>
                                <div className="flex flex-none rounded-full p-2 bg-[#193356a3]" style={{ lineHeight: 1 }}>
                                    <item.icon color={colors[index] || undefined} size={35} />
                                    <div className={`absolute top-5 ${index == 3 && "left-6"} ${index == 5 && "left-6"} left-5  text-[12px] pt-0.5 text-black font-extrabold`}>{index == 3 || index == 5 ? "I" : ""}{index == 4 && "IV"}</div>
                                </div>
                                <div className="flex-none w-[235px] h-[3px] rounded-md bg-[#405e959c]"></div>

                            </div>
                            {/*  */}
                            <div className="flex flex-col px-5 py-4 space-y-4 h-[330px] bg-[#193356a3] rounded-lg">
                                <div
                                    className="flex flex-col rounded-md font-medium px-2 w-fit text-[14px] text-black py-1"
                                    style={{ backgroundColor: colors[index] || undefined }}
                                >
                                    {item.category}
                                </div>
                                <div className="flex flex-col leading-tight">
                                    <div className="text-white text-[25px] font-extrabold" >${item.minAmt}k {item.maxAmt ? `-${item.maxAmt}M` : ""}</div>
                                    <div className="text-[14px] text-blue-100">Wager Amount</div>
                                </div>
                                <div className="flex flex-col gap-1 text-[14px] font-medium text-white">
                                    {item.benifits.map((benefit) => (
                                        <div className="flex flex-row items-center space-x-1">

                                            <IoIosCheckmarkCircle className="flex-shrink-0" size={20} color={`${colors[index]}`} />
                                            <div className="rounded leading-tight">
                                                {benefit}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {item.host ?
                                    <div className="flex text-[14px] ml-1 items-center flex-row gap-1">
                                        <FaTshirt />
                                        {item.host}</div>
                                    : <></>}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>

    )
}
export default VIPClubRanking;