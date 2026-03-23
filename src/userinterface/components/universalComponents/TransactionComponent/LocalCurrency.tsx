import React, { useEffect, useState } from "react";
import { HiDownload } from "react-icons/hi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const LocalCurrency = () => {
     const [isLoading, setIsLoading] = useState(true); // For shimmer effect
        const Shimmer = ({ className }: { className: string }) => (
            <div className={`shimmer-effect rounded-md ${className}`}></div>
        );

        useEffect(() => {
            const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
            return () => clearTimeout(timer);
        }, []);
    const ITEMS_PER_PAGE = 15; // Number of items per page

    const FundData = {
        Details: [
            { status: "Fail", time: "1:00 AM", date: "30/12/24", amount: 1000, transactionId: "XCTYUIJ#8765456", icon1: HiDownload },
            { status: "Success", time: "1:00 AM", date: "30/12/24", amount: 1000, transactionId: "XCTYUIJ#8765456", icon1: HiDownload },
            { status: "Success", time: "1:00 AM", date: "30/12/24", amount: 1000, transactionId: "XCTYUIJ#8765456", icon1: HiDownload },
            { status: "Fail", time: "1:00 AM", date: "30/12/24", amount: 1000, transactionId: "XCTYUIJ#8765456", icon1: HiDownload },
            { status: "Success", time: "1:00 AM", date: "30/12/24", amount: 1000, transactionId: "XCTYUIJ#8765456", icon1: HiDownload },
            { status: "Success", time: "1:00 AM", date: "30/12/24", amount: 1000, transactionId: "XCTYUIJ#8765456", icon1: HiDownload },
            { status: "Fail", time: "1:00 AM", date: "30/12/24", amount: 1000, transactionId: "XCTYUIJ#8765456", icon1: HiDownload },
            { status: "Success", time: "1:00 AM", date: "30/12/24", amount: 1000, transactionId: "XCTYUIJ#8765456", icon1: HiDownload },
            { status: "Success", time: "1:00 AM", date: "30/12/24", amount: 1000, transactionId: "XCTYUIJ#8765456", icon1: HiDownload },
            { status: "Success", time: "1:00 AM", date: "30/12/24", amount: 1000, transactionId: "XCTYUIJ#8765456", icon1: HiDownload },
            { status: "Fail", time: "1:00 AM", date: "30/12/24", amount: 1000, transactionId: "XCTYUIJ#8765456", icon1: HiDownload },
            { status: "Fail", time: "1:00 AM", date: "30/12/24", amount: 1000, transactionId: "XCTYUIJ#8765456", icon1: HiDownload },
            { status: "Fail", time: "1:00 AM", date: "30/12/24", amount: 1000, transactionId: "XCTYUIJ#8765456", icon1: HiDownload },
            { status: "Fail", time: "1:00 AM", date: "30/12/24", amount: 1000, transactionId: "XCTYUIJ#8765456", icon1: HiDownload },
            { status: "Fail", time: "1:00 AM", date: "30/12/24", amount: 1000, transactionId: "XCTYUIJ#8765456", icon1: HiDownload },
            { status: "Fail", time: "1:00 AM", date: "30/12/24", amount: 1000, transactionId: "XCTYUIJ#8765456", icon1: HiDownload },
            { status: "Fail", time: "1:00 AM", date: "30/12/24", amount: 1000, transactionId: "XCTYUIJ#8765456", icon1: HiDownload },
            { status: "Fail", time: "1:00 AM", date: "30/12/24", amount: 1000, transactionId: "XCTYUIJ#8765456", icon1: HiDownload },
            { status: "Fail", time: "1:00 AM", date: "30/12/24", amount: 1000, transactionId: "XCTYUIJ#8765456", icon1: HiDownload },
        ],
    };

    const fundValues = Object.values(FundData)[0]; // Flattening as there's only one key-value pair
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(fundValues.length / ITEMS_PER_PAGE);

    // Get current page items
    const currentItems = fundValues.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

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
        <div className="flex flex-col justify-between mt-5 sm:mt-0 items-start w-full gap-4">
            <div className="flex w-full px-5 mt-5 py-5 rounded-md bg-[#0f1c2bda]">
{isLoading?
    (<div className="w-full mb-5 max-w-[90%] sm:max-w-[80%]">
        <div className="grid grid-cols-2 gap-4 sm:gap-3 lg:gap-5">
          {Array.from({ length: 3 }).map((_, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {Array.from({ length: 4 }).map((_, colIndex) => (
                <Shimmer
                  key={colIndex}
                  className="h-4 sm:h-5 lg:h-6 w-full"
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>)
:
                <div className="flex-1 w-full grid grid-rows-2 sm:gap-x-4 md:gap-0 text-[12px] md:text-[14px] [&>div:nth-child(odd)]:bg-[#2d485b]">
                    {currentItems.map((item, index) => (
                        <div
                            key={index}
                            className="py-4 flex justify-between rounded-md flex-row gap-1 font-bold text-blue-50 px-4"
                        >
                            <div className="flex items-center space-x-1 flex-row">
                                <HiDownload size={18} />
                                <div className="flex flex-col">
                                   <div>{item.status}</div>
                                    <div className="text-gray-400 font-semibold">
                                        {item.time} {item.date}
                                    </div>
                                </div>
                            </div>
                            <div className="flex text-gray-400 items-end font-semibold flex-col">
                                <div className="flex-row space-x-1 items-center flex">
                                    <div>{item.amount}</div>
                                    <div>
                                        <RiMoneyRupeeCircleFill color="#06fc0a" size={15} />
                                    </div>
                                </div>
                                <div>{item.transactionId}</div>
                            </div>
                        </div>
                    ))}
                </div>
}
            </div>
                
            <div className="flex w-full justify-center gap-y-3 items-start flex-col">
                <div className="flex gap-5 text-[15px] text-gray-400 font-bold w-full opacity-[80%] justify-center items-center">
                    <div
                        className={`cursor-pointer ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}
                        onClick={handlePreviousPage}
                    >
                        Previous
                    </div>
                    <div
                        className={`cursor-pointer ${
                            currentPage === totalPages && "opacity-50 cursor-not-allowed"
                        }`}
                        onClick={handleNextPage}
                    >
                        Next
                    </div>
                </div>
                <button
                    type="button"
                    className="text-black bg-gradient-to-r w-full sm:w-fit from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-bold rounded-lg text-[15px] px-5 py-2.5 text-center me-2 mb-2"
                >
                    Download All Deposits
                </button>
            </div>
        </div>
    );
};

export default LocalCurrency;
