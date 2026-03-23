import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { CgDollar } from "react-icons/cg";
import { PiBeachBallLight } from "react-icons/pi";

interface EventItems {
    teamname: string;
    icon: IconType;
}

interface UserItems {
    icon: IconType
    username: string;
}

interface TimeItems {
    time: string;
}
interface OddsItems {
    odds: number;

}

interface BetAmountItems {
    amount: number;
    icon: IconType;
}
interface FundDataType {
    Event: EventItems[];
    User: UserItems[];
    Time: TimeItems[];
    Odds: OddsItems[];
    "Bet Amount": BetAmountItems[];
}

const ScoreboardToggle2AllBets = () => {
    const [isLoading, setIsLoading] = useState(true);

    const Shimmer = ({ className }: { className: string }) => (
        <div className={`shimmer-effect rounded-md ${className}`}></div>
    );

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
        return () => clearTimeout(timer);
    }, []);

    const FundData: FundDataType = {
        Event: [
            { teamname: "India", icon: CgDollar },
            { teamname: "Australia", icon: CgDollar },
            { teamname: "Australia", icon: CgDollar },
            { teamname: "Australia", icon: CgDollar },
            { teamname: "Australia", icon: CgDollar },
            { teamname: "Australia", icon: CgDollar },
            { teamname: "Australia", icon: CgDollar },
            { teamname: "Australia", icon: CgDollar },
            { teamname: "Australia", icon: CgDollar },
            { teamname: "Australia", icon: CgDollar },
            { teamname: "Australia", icon: CgDollar },
            { teamname: "Australia", icon: CgDollar },
        ],
        User: [
            { username: "Rohan", icon: CgDollar },
            { username: "Rohan", icon: CgDollar },
            { username: "Rohan", icon: CgDollar },
            { username: "Rohan", icon: CgDollar },
            { username: "Rohan", icon: CgDollar },
            { username: "Rohan", icon: CgDollar },
            { username: "Rohan", icon: CgDollar },
            { username: "Rohan", icon: CgDollar },
            { username: "Rohan", icon: CgDollar },
            { username: "Rohan", icon: CgDollar },
            { username: "Rohan", icon: CgDollar },
            { username: "Rohan", icon: CgDollar },
        ],
        Time: [
            { time: "2:30 PM" },
            { time: "2:30 PM" },
            { time: "2:30 PM" },
            { time: "2:30 PM" },
            { time: "2:30 PM" },
            { time: "2:30 PM" },
            { time: "2:30 PM" },
            { time: "2:30 PM" },
            { time: "2:30 PM" },
            { time: "2:30 PM" },
            { time: "2:30 PM" },
            { time: "2:30 PM" },
        ],
        Odds: [
            { odds: 0 },
            { odds: 1 },
            { odds: 8 },
            { odds: 2 },
            { odds: 0 },
            { odds: 1 },
            { odds: 8 },
            { odds: 2 },
            { odds: 2 },
            { odds: 2 },
            { odds: 2 },
            { odds: 2 },
        ],
        "Bet Amount": [
            { amount: 10, icon: PiBeachBallLight },
            { amount: 10, icon: PiBeachBallLight },
            { amount: 10, icon: PiBeachBallLight },
            { amount: 10, icon: PiBeachBallLight },
            { amount: 10, icon: PiBeachBallLight },
            { amount: 10, icon: PiBeachBallLight },
            { amount: 10, icon: PiBeachBallLight },
            { amount: 10, icon: PiBeachBallLight },
            { amount: 10, icon: PiBeachBallLight },
            { amount: 10, icon: PiBeachBallLight },
            { amount: 10, icon: PiBeachBallLight },
            { amount: 10, icon: PiBeachBallLight },
        ],


    };


    const ITEMS_PER_PAGE = 5;
    const fundKeys = Object.keys(FundData);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(FundData[fundKeys[0] as keyof FundDataType].length / ITEMS_PER_PAGE);
    const paginatedItems = Object.entries(FundData).map(([key, items]) => ({
        key,
        items: items.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
        ),
    }));

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div className="flex flex-col justify-between flex-shrink-0 mt-5 sm:mt-0 items-start w-full gap-4 overflow-x-auto">
            <div className="flex w-full min-w-[500px]">
                {paginatedItems.map(({ key, items }, index) => (
                    <div
                        key={key}
                        className="flex-1 flex w-full flex-col [&>div:nth-child(odd)]:bg-[#1a2c38] [&>div:nth-child(even)]:bg-[#2d485b]"
                    >
                        {/* Column Header */}
                        <div
                            className={`justify-center flex ${index === 0
                                ? "justify-start"
                                : index === 1
                                    ? "justify-center pl-5"
                                    : "justify-end"
                                } w-full`}
                        >
                            <div className="px-4 py-4 text-[#99bde1] font-semibold text-[14px]">
                                {key}
                            </div>
                        </div>
                        {/* Data Rows */}
                        {items.map((item: any) => (
                            <>
                                {isLoading ? (
                                    <Shimmer className="w-full max-w-[90%] mb-2 sm:max-w-[80%] h-5 sm:h-6 lg:h-8" />
                                ) : (
                                    <div
                                        className={`justify-center py-4 flex ${index === 1 && "justify-center"
                                            } ${index === 0 && "rounded-l-md justify-start"
                                            } ${index === fundKeys.length - 1 &&
                                            "rounded-r-md justify-end"
                                            } flex-row text-[11px] space-x-1 font-bold text-blue-50 px-4`}
                                    >
                                        {key === "Event" && (
                                            <>
                                                <div>
                                                    <item.icon size={15} />
                                                </div>
                                                <div>{(item as EventItems).teamname}k</div>
                                            </>
                                        )}
                                        {key === "User" && <div className="pl-5">{(item as UserItems).username}</div>}
                                        {key === "Time" && <div>{(item as TimeItems).time}</div>}
                                        {key === "Odds" && <div>{(item as OddsItems).odds}</div>}
                                        {key === "Bet Amount" &&
                                            (<>
                                                <div>{(item as BetAmountItems).amount}</div>
                                                <div>
                                                    <item.icon size={15} />
                                                </div>
                                            </>
                                            )}
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex w-full justify-center gap-y-3 items-start flex-col">
                <div className="flex gap-5 text-[15px] text-white font-bold w-full justify-center items-center">
                    <div
                        className={`cursor-pointer ${currentPage === 1 && "opacity-50 cursor-not-allowed"
                            }`}
                        onClick={handlePreviousPage}
                    >
                        Previous
                    </div>
                    <div
                        className={`cursor-pointer ${currentPage === totalPages && "opacity-50 cursor-not-allowed"
                            }`}
                        onClick={handleNextPage}
                    >
                        Next
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScoreboardToggle2AllBets;
