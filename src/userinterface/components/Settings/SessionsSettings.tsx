import { useEffect, useState } from "react";
import { AiFillAlipayCircle } from "react-icons/ai";

interface Browser {
    device: string,
    source: string
}
interface Near {
    country: string,
    state: string
}
interface IP_Address {
    address: string
}
interface Last_Used {
    time: number,
    unit: string
}
interface Action {
    action: string
}
interface SessionDataType {
    Browser: Browser[];
    Near: Near[];
    "IP Address": IP_Address[];
    "Last Used": Last_Used[];
    Action: Action[]
}
const SessionsSettings = () => {
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
        const [selectedValue, setSelectedValue] = useState("All"); // Track selected value

        // Define menu items in a constant array
        const menuItems = [
            { label: "All", href: "#" },
            { label: "Active", href: "#" },
            { label: "Inactive", href: "#" },
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
                    className="text-white bg-[#0d1a22] font-semibold hover:border-[#6d99b6] border-2 border-[#395972] focus:ring-0 focus:outline-none rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
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
    const SessionData: SessionDataType = {
        Browser: [
            { device: "Chrome", source: "unknown" },
            { device: "Firefox", source: "known" },
            { device: "Safari", source: "unknown" },
            { device: "Edge", source: "corporate" },
            { device: "Opera", source: "known" },
            { device: "Brave", source: "private" },
            { device: "Vivaldi", source: "experimental" },
            { device: "Tor", source: "private" },
            { device: "UC Browser", source: "unknown" },
            { device: "Internet Explorer", source: "deprecated" },
            { device: "Samsung Internet", source: "known" },
            { device: "Dolphin", source: "unknown" },
            { device: "Yandex", source: "corporate" },
            { device: "Pale Moon", source: "experimental" },
            { device: "Maxthon", source: "unknown" },
            { device: "Avast Secure Browser", source: "private" },
            { device: "Epic", source: "private" },
            { device: "K-Meleon", source: "unknown" },
            { device: "CocCoc", source: "corporate" },
            { device: "Seamonkey", source: "experimental" }
        ],
        Near: [
            { country: "UN", state: "Argentina" },
            { country: "US", state: "California" },
            { country: "IN", state: "Maharashtra" },
            { country: "JP", state: "Tokyo" },
            { country: "DE", state: "Berlin" },
            { country: "FR", state: "Paris" },
            { country: "UK", state: "London" },
            { country: "AU", state: "Sydney" },
            { country: "CN", state: "Beijing" },
            { country: "RU", state: "Moscow" },
            { country: "BR", state: "Rio de Janeiro" },
            { country: "ZA", state: "Cape Town" },
            { country: "NG", state: "Lagos" },
            { country: "EG", state: "Cairo" },
            { country: "ES", state: "Madrid" },
            { country: "IT", state: "Rome" },
            { country: "CA", state: "Toronto" },
            { country: "MX", state: "Mexico City" },
            { country: "KR", state: "Seoul" },
            { country: "TH", state: "Bangkok" }
        ],
        "IP Address": [
            { address: "1.22.35.554" },
            { address: "192.168.0.1" },
            { address: "10.0.0.1" },
            { address: "172.16.0.5" },
            { address: "203.0.113.10" },
            { address: "198.51.100.5" },
            { address: "224.0.0.1" },
            { address: "8.8.8.8" },
            { address: "8.8.4.4" },
            { address: "4.4.4.4" },
            { address: "185.199.108.153" },
            { address: "104.244.42.129" },
            { address: "51.15.6.8" },
            { address: "209.85.231.104" },
            { address: "216.58.216.164" },
            { address: "17.253.144.10" },
            { address: "23.55.101.45" },
            { address: "34.117.59.81" },
            { address: "45.33.32.156" },
            { address: "172.217.12.206" }
        ],
        "Last Used": [
            { time: 2, unit: "minute" },
            { time: 5, unit: "hour" },
            { time: 1, unit: "day" },
            { time: 3, unit: "week" },
            { time: 4, unit: "minute" },
            { time: 6, unit: "hour" },
            { time: 2, unit: "day" },
            { time: 1, unit: "month" },
            { time: 10, unit: "second" },
            { time: 20, unit: "minute" },
            { time: 8, unit: "hour" },
            { time: 5, unit: "day" },
            { time: 2, unit: "week" },
            { time: 9, unit: "month" },
            { time: 15, unit: "second" },
            { time: 25, unit: "minute" },
            { time: 12, unit: "hour" },
            { time: 7, unit: "day" },
            { time: 4, unit: "week" },
            { time: 3, unit: "month" }
        ],
        Action: [
            { action: "Current" },
            { action: "Removed" },
            { action: "Updated" },
            { action: "Archived" },
            { action: "Pending" },
            { action: "Rejected" },
            { action: "Accepted" },
            { action: "Completed" },
            { action: "Cancelled" },
            { action: "In Progress" },
            { action: "Draft" },
            { action: "Published" },
            { action: "Deleted" },
            { action: "Restored" },
            { action: "Expired" },
            { action: "Suspended" },
            { action: "Activated" },
            { action: "Deactivated" },
            { action: "Flagged" },
            { action: "Approved" }
        ]
    };
    const ITEMS_PER_PAGE = 15;
    const fundKeys = Object.keys(SessionData);
    const fundValues = Object.values(SessionData);
    const keyLastIndex = fundKeys.length - 1;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(fundValues[0].length / ITEMS_PER_PAGE);
    const currentItems = fundValues.map((items) =>
        items.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
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
            <div className="flex flex-col">
                <div className=" text-[#99bde1] font-bold text-[15px]">Session Filter</div>
                {/* Drop Down */}
                <Dropdown />
            </div>
            {isLoading?
        
        (<div className="w-full mb-5 max-w-[90%] sm:max-w-[80%]">
            <div className="grid grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
              {Array.from({ length: 3 }).map(() => (
                <>
                  {Array.from({ length: 5 }).map((_, colIndex) => (
                    <Shimmer
                      key={colIndex}
                      className="h-4 sm:h-5 lg:h-6 w-full"
                    />
                  ))}
                </>
              ))}
            </div>
          </div>
          
          
          )
                   :
            <div className="flex w-full overflow-x-auto flex-shrink-0 whitespace-nowrap">
                {fundKeys.map((key, index) => (
                    <div
                        key={index}
                        className={`flex-1 flex w-full flex-col min-w-[150px] [&>div:nth-child(odd)]:bg-[#192b37] [&>div:nth-child(even)]:bg-[#2d485b]`}
                    >
                        {/* Header Row */}
                        <div
                            className={`flex w-full ${index === 0 && "justify-start"} justify-center ${keyLastIndex === index && "justify-end"}`}
                        >
                            <div className="px-4 py-4 text-[#99bde1] font-semibold text-[14px]">
                                {key}
                            </div>
                        </div>

                        {/* Data Rows */}
                        {currentItems[index].map((item: any) => (
                            <div

                                className={`py-4 flex gap-2 text-[12px] font-bold text-blue-50 px-0 ${index === 0 && "justify-start rounded-l-md"
                                    } justify-center ${keyLastIndex === index && "justify-end rounded-r-md"
                                    }`}
                            >
                                {/* Render dynamic content based on key */}
                                {key === "Browser" && (
                                    <>
                                        <div>{item.device}</div>
                                        <div>({item.source})</div>
                                    </>
                                )}
                                {key === "Near" && (
                                    <>
                                        <div>{item.country},</div>
                                        <div>{item.state}</div>
                                    </>
                                )}
                                {key === "IP Address" && <div>{item.address}</div>}
                                {key === "Last Used" && (
                                    <>
                                        <div>{item.time}</div>
                                        <div>{item.unit}</div>
                                    </>
                                )}
                                {key === "Action" && <div>{item.action}</div>}
                                {/* Common fields for items with 'name', 'amount', and 'icon' */}
                                {item.name && (
                                    <>
                                        <div>{item.name}</div>
                                        <div>{item.amount}</div>
                                        <div>
                                            <AiFillAlipayCircle color="#06fc0a" size={15} />
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
}
            <div className="flex gap-5 text-[15px] text-gray-400 font-bold w-full opacity-[80%] justify-center items-center">
                <div
                    className={`cursor-pointer ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}
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
    )
}
export default SessionsSettings;