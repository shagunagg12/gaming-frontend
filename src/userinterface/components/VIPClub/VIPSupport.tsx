import { useEffect, useRef, useState } from "react";

const VIPSupport = () => {
    const [activeCategory, setActiveCategory] = useState<number>(1)
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isMD, setIsMD] = useState(false);
    interface MenuItem {
        id: number;
        name: string;
    }

    interface Props {
        menuItems: MenuItem[];
    }
    const menuItems1 = [
        { id: 1, name: "English"},
        { id: 2, name: "Japanise"},
        { id: 3, name: "Hindi"},
        { id: 3, name: "French"},
    ];
    const [selectedName, setSelectedName] = useState(menuItems1[0].name);
    const Dropdown: React.FC<Props> = ({ menuItems }) => {
        const [isOpen, setIsOpen] = useState(false);
        const dropdownRef = useRef<HTMLDivElement | null>(null);
        const handleSelect = (item: MenuItem) => {
            if (activeCategory == item.id) {
                null //do nothing, enjoy your hunger
            }
            else {
                setIsOpen(false);
                setActiveCategory(item.id);
                setSelectedName(item.name);
            }

        };

        // const handleClick = (key: number) => {
        //     if (activeCategory === key) {
        //         null
        //     } else {
        //         setActiveCategory(key);
        //     }
        // };
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            };

            document.addEventListener("click", handleClickOutside);
            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
        }, []);
        useEffect(() => {
            const updateScreenSize = () => {
                setIsSmallScreen(window.innerWidth <= 720);
                setIsMD(window.innerWidth <= 1130) // Adjust for `sm` and `md` breakpoints
            };
    
            updateScreenSize();
            window.addEventListener('resize', updateScreenSize);
    
            return () => window.removeEventListener('resize', updateScreenSize);
        }, []);

        return (
            <div
                ref={dropdownRef}
                className="relative inline-block text-left"
            >
                {/* Dropdown Button */}
                <button
                    id="dropdownDefaultButton"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen((prev) => !prev);
                    }}
                    className="text-white bg-[#0d1a22] font-semibold hover:border-[#6d99b6] border-2 border-[#395972] focus:ring-0 focus:outline-none rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                    type="button"
                >
                    {selectedName}
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
                        className="z-20 absolute bottom-full left-[50%] translate-x-[-50%] bg-[#0d1a22] border-[#395972] border-[1px] divide-y divide-gray-100 rounded-lg shadow min-w-max"
                    >
                        <ul
                            className="py-2 text-sm text-white font-semibold"
                            aria-labelledby="dropdownDefaultButton"
                        >
                            {menuItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => {
                                            handleSelect(item);
                                            setIsOpen(false);
                                        }}
                                        className="block w-full text-left pl-2 pr-8 py-2 hover:bg-blue-500"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    };
    return (
        <div className="sm:mx-5 md:mx-10 lg:mx-[95px] my-10">
            <div className={`flex ${isMD?"flex-col justify-start gap-y-3":"flex-row"} w-full justify-between sm:px-4 md:px-6 lg:px-10 px-3 py-8 gap-x-2 rounded-lg bg-[#1b2d34] items-start`}>
                <div className="flex flex-col">
                    <div className="text-[20px] text-white font-extrabold">Live, 24-hour customer support</div>
                    <div className="text-[14px] font-medium text-blue-100">Real support from real people. We're available through instant live chat and email to help you.</div>
                </div>
                <div className="flex flex-col gap-y-1">
                    <div className="text-[14px] text-blue-100 font-medium">Preferred language</div>
                    <div className="flex flex-row gap-x-3">
                        <div className={`flex flex-row gap-x-4 justify-center items-center`}>
                            <Dropdown menuItems={menuItems1} />
                            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center ">Chat with us</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default VIPSupport;