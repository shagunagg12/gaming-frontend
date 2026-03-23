import { useState } from "react";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const OthersAll=()=>{
    const ITEMS_PER_PAGE = 15; // Number of items per page
    
        const FundData = {
            Details: [
            { status: "Cashier Withdrawal", time: "1:00 AM", date: "30/12/24", amount: 1000, },
            { status: "Cashier Deposit", time: "1:00 AM", date: "30/12/24", amount: 1000, },
            { status: "Cashier Withdrawal", time: "1:00 AM", date: "30/12/24", amount: 1000, },
            { status: "Cashier Deposit", time: "1:00 AM", date: "30/12/24", amount: 1000, },
            { status: "Cashier Withdrawal", time: "1:00 AM", date: "30/12/24", amount: 1000, },
            { status: "Cashier Deposit", time: "1:00 AM", date: "30/12/24", amount: 1000, },
            { status: "Cashier Withdrawal", time: "1:00 AM", date: "30/12/24", amount: 1000, },
            { status: "Cashier Deposit", time: "1:00 AM", date: "30/12/24", amount: 1000, },
            { status: "Cashier Withdrawal", time: "1:00 AM", date: "30/12/24", amount: 1000, },
            { status: "Cashier Deposit", time: "1:00 AM", date: "30/12/24", amount: 1000, },
            { status: "Cashier Withdrawal", time: "1:00 AM", date: "30/12/24", amount: 1000, },
            { status: "Cashier Deposit", time: "1:00 AM", date: "30/12/24", amount: 1000, },
            { status: "Cashier Withdrawal", time: "1:00 AM", date: "30/12/24", amount: 1000, },
            { status: "Cashier Deposit", time: "1:00 AM", date: "30/12/24", amount: 1000, },
            { status: "Cashier Withdrawal", time: "1:00 AM", date: "30/12/24", amount: 1000, },
            { status: "Cashier Deposit", time: "1:00 AM", date: "30/12/24", amount: 1000, },
            { status: "Cashier Withdrawal", time: "1:00 AM", date: "30/12/24", amount: 1000, },
            { status: "Cashier Deposit", time: "1:00 AM", date: "30/12/24", amount: 1000, },
            { status: "Cashier Withdrawal", time: "1:00 AM", date: "30/12/24", amount: 1000, },
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
    return(
    <div className="flex flex-col justify-between mt-5 sm:mt-0 items-start w-full gap-4">
                <div className="flex w-full px-5 mt-5 py-5 rounded-md bg-[rgba(15,28,43,0.86)]">
                    <div className="flex-1 w-full grid grid-rows-2 sm:gap-x-4 md:gap-0 text-[12px] md:text-[14px] [&>div:nth-child(odd)]:bg-[#2d485b]">
                        {currentItems.map((item, index) => (
                            <div
                                key={index}
                                className="py-4 flex justify-between rounded-md flex-row gap-1 font-bold text-blue-50 px-4"
                            >
                                <div className="flex items-center space-x-1 flex-row">
                                    <div className="flex flex-col">
                                        <div>{item.status}</div>
                                        <div className="text-gray-400 font-semibold">
                                            {item.time} {item.date}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex text-gray-400 items-center justify-center space-x-1 font-semibold flex-row">
                                    
                                        <div>{item.amount}</div>
                                            <RiMoneyRupeeCircleFill color="#06fc0a" size={15} />
                                        </div>
                                    </div>
                        ))}
                    </div>
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
                        Download All Statement
                    </button>
                </div>
            </div>
    )
}
export default OthersAll