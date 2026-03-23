import React, { useEffect, useState } from "react";
import { AiFillAlipayCircle } from "react-icons/ai";
interface AllItems {
    name: string;
    amount: number;
    icon: React.ComponentType<{ size?: number }>
}
interface FundProps {
    Available: AllItems[];
    Commission: AllItems[];
    Withdrawn: AllItems[];
}
const Funds = () => {
    const [isLoading, setIsLoading] = useState(true); // For shimmer effect
    const Shimmer = ({ className }: { className: string }) => (
        <div className={`shimmer-effect rounded-md ${className}`}></div>
    );

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
        return () => clearTimeout(timer);
    }, []);
    const Dropdown = () => {

        const [isOpen, setIsOpen] = useState(false);
        const [selectedValue, setSelectedValue] = useState("Available"); // Track selected value

        // Define menu items in a constant array
        const menuItems = [
            { label: "Available", href: "#" },
            { label: "Commission", href: "#" },
            { label: "Withdrawn", href: "#" },
        ];

        const toggleDropdown = () => {
            setIsOpen(!isOpen);
        };

        const handleSelect = (label: any) => {
            setSelectedValue(label); // Update selected value
            setIsOpen(false); // Close dropdown
        };

        return (
            <div
                onMouseLeave={() => setIsOpen(false)}
                className="relative inline-block text-left"
            >
                {/* Dropdown Button */}
                <button
                    id="dropdownDefaultButton"
                    onClick={toggleDropdown}
                    className="text-white bg-[#0d1a22] font-semibold hover:border-[#6d99b6] border-2 border-[#395972] focus:ring-0 focus:outline-none rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center  "
                    type="button"
                >
                    {selectedValue}
                    <svg
                        className="w-2.5 h-2.5 ms-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div
                        id="dropdown"
                        className="z-10 absolute top-full left-[50%] translate-x-[-50%] bg-[#0d1a22] border-[#395972] border-[1px] divide-y divide-gray-100 rounded-lg shadow min-w-max"

                    >
                        <ul
                            className="py-2 text-sm text-white font-semibold"
                            aria-labelledby="dropdownDefaultButton"
                        >
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => handleSelect(item.label)} // Update value on click
                                        className="block w-full text-left pl-2 pr-8 py-2 hover:bg-blue-500"
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    };
    const FundData: FundProps = {
        Available: [{ name: "NGM", amount: 10, icon: AiFillAlipayCircle },
        { name: "CFE", amount: 10, icon: AiFillAlipayCircle },
        { name: "AWQ", amount: 10, icon: AiFillAlipayCircle },
        { name: "KIY", amount: 10, icon: AiFillAlipayCircle },
        { name: "NGM", amount: 10, icon: AiFillAlipayCircle },
        { name: "CFE", amount: 10, icon: AiFillAlipayCircle },
        { name: "AWQ", amount: 10, icon: AiFillAlipayCircle },
        { name: "KIY", amount: 10, icon: AiFillAlipayCircle },
        { name: "NGM", amount: 10, icon: AiFillAlipayCircle },
        { name: "CFE", amount: 10, icon: AiFillAlipayCircle },
        { name: "AWQ", amount: 10, icon: AiFillAlipayCircle },
        { name: "KIY", amount: 10, icon: AiFillAlipayCircle },],
        Commission: [{ name: "NGM", amount: 10, icon: AiFillAlipayCircle },
        { name: "CFE", amount: 10, icon: AiFillAlipayCircle },
        { name: "AWQ", amount: 10, icon: AiFillAlipayCircle },
        { name: "KIY", amount: 10, icon: AiFillAlipayCircle },
        { name: "NGM", amount: 10, icon: AiFillAlipayCircle },
        { name: "CFE", amount: 10, icon: AiFillAlipayCircle },
        { name: "AWQ", amount: 10, icon: AiFillAlipayCircle },
        { name: "KIY", amount: 10, icon: AiFillAlipayCircle },
        { name: "NGM", amount: 10, icon: AiFillAlipayCircle },
        { name: "CFE", amount: 10, icon: AiFillAlipayCircle },
        { name: "AWQ", amount: 10, icon: AiFillAlipayCircle },
        { name: "BBB", amount: 10, icon: AiFillAlipayCircle },],
        Withdrawn: [{ name: "NGM", amount: 10, icon: AiFillAlipayCircle },
        { name: "CFE", amount: 10, icon: AiFillAlipayCircle },
        { name: "AWQ", amount: 10, icon: AiFillAlipayCircle },
        { name: "KIY", amount: 10, icon: AiFillAlipayCircle },
        { name: "NGM", amount: 10, icon: AiFillAlipayCircle },
        { name: "CFE", amount: 10, icon: AiFillAlipayCircle },
        { name: "AWQ", amount: 10, icon: AiFillAlipayCircle },
        { name: "KIY", amount: 10, icon: AiFillAlipayCircle },
        { name: "NGM", amount: 10, icon: AiFillAlipayCircle },
        { name: "CFE", amount: 10, icon: AiFillAlipayCircle },
        { name: "AWQ", amount: 10, icon: AiFillAlipayCircle },
        { name: "AAA", amount: 10, icon: AiFillAlipayCircle },]
    }
    const fundKeys = Object.keys(FundData);
    const fundValues = Object.values(FundData);
    const keyLastIndex = fundKeys.length - 1
    return (
        <div className="flex flex-col justify-between mt-5 sm:mt-0 items-start w-full gap-4">
            <div className="flex flex-col">
                <div className=" text-[#99bde1] font-bold text-[15px]">Sort by</div>
                {/* Drop Down */}
                <Dropdown />
            </div>
{isLoading?

(<div className="w-full mb-5 max-w-[90%] sm:max-w-[80%]">
    <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
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
  </div>
  
  
  )
           : <div className="flex w-full">
                {fundKeys.map((key, index) => (
                    <div className={`flex-1 flex w-full flex-col [&>div:nth-child(odd)]:bg-[#192b37] [&>div:nth-child(even)]:bg-[#2d485b]`}>
                        <div className={`flex ${index == 0 && 'justify-start'} ${index == 1 && 'justify-center'} ${keyLastIndex == index && 'justify-end'} w-full`}>
                            <div className={`px-4 py-4 text-[#99bde1] font-semibold text-[14px]`}>{key}</div>
                        </div>
                        
                        {fundValues[index].map((item: AllItems) => (
                          
                                
                                    <div
                                        className={`py-4 flex ${index === 1 && "justify-center"
                                            } ${index === 0 && "rounded-l-md justify-start"} ${keyLastIndex === index && "rounded-r-md justify-end"
                                            } flex-row gap-1 text-[12px] font-bold text-blue-50 px-4`}
                                    >
                                        <div>{(item as AllItems).name}</div>
                                        <div>{(item as AllItems).amount}</div>
                                        <div>
                                            <AiFillAlipayCircle color="#06fc0a" size={15} />
                                        </div>
                                    </div>
                               

                          
                        ))}
                    </div>))}
            </div>}
            <div className="flex w-full justify-center gap-y-2 items-center flex-col">
                <button type="button" className="text-black bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-bold rounded-lg text-[15px] px-5 py-2.5 text-center me-2 mb-2">Withdrawn Available Commission</button>
                <div className="text-[#99bde1] font-semibold text-[12px] sm:text-[14px]">Transfers affiliate commission to your available balance.</div>
            </div>
        </div>
    )
};
export default Funds;