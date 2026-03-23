import React, { useState } from "react";

const RefferedUser = () => {
    const menuItems1 = [
        { label: "ManishDhub(0 Deposits)", href: "#" },
    ];
    const menuItems2 = [
        { label: "Created", href: "#" },
        { label: "Deposite Count", href: "#" },
        { label: "Commission", href: "#" },
    ];
    interface MenuItem {
        label: string;
        href: string;
    }

    interface Props {
        menuItems: MenuItem[];
    }

    const Dropdown: React.FC<Props> = ({ menuItems }) => {
        const [isOpen, setIsOpen] = useState(false);
        const [selectedValue, setSelectedValue] = useState(menuItems[0].label);

        // Define menu items in a constant array


        const toggleDropdown = () => {
            setIsOpen(!isOpen);
        };

        const handleSelect = (label: any) => {
            setSelectedValue(label);
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
                    className="text-white bg-[#0d1a22] text-[10px] sm:text-[14px] md:text-[14px] lg-text-[16px] font-semibold hover:border-[#6d99b6] border-2 border-[#395972] focus:ring-0 focus:outline-none rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                    type="button"
                >
                    {selectedValue}
                    <svg
                        className="w-2.5 h-2.5 ms-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6" >
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
    const List = ["Username", "Registered", "Total Deposits", "Last Deposit", "Wagered", "Commission"]
    return (
        <div className="flex flex-col gap-y-10 justify-center w-full">
            <div className="flex gap-x-4 sm:flex-row sm:mt-0 mt-4 sm:space-y-0 md:space-y-0 lg:space-y-0 space-y-2 flex-col">
                <div className="flex flex-col">
                    <div className="text-[#99bde1] font-bold text-[15px]">Campaign Name</div>
                    {/* Drop Down */}
                    <Dropdown menuItems={menuItems1} />

                </div>
                <div className="flex flex-col">
                    <div className=" text-[#99bde1] font-bold text-[15px]">Sort by</div>
                    {/* Drop Down */}
                    <Dropdown menuItems={menuItems2} />
                </div>
            </div>
            <div className="w-full flex flex-wrap gap-4 sm:gap-6 md:gap-8 lg:gap-10 justify-start items-start">
                {List.map((item) => (
                    <div className="text-[#99bde1] font-bold text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px]">
                        {item}
                    </div>
                ))}
            </div>
            <div className="flex gap-5 text-[15px] text-gray-400 font-bold opacity-[80%] justify-center items-center">
                <div className="cursor-pointer">Previous</div>
                <div className="cursor-pointer">Next</div>
            </div>
        </div>
    )
}
export default RefferedUser;