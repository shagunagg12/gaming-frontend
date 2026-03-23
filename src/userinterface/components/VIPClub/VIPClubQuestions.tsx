import { useEffect, useRef, useState } from "react";
import { FaCodeBranch } from "react-icons/fa";
import VIPFAQGeneral from "./VIPFaqGeneral";
import VIPFAQBenifits from "./VIPFaqBenifits";
import VIPFAQHost from "./VIPFaqHost";

const VIPClubQuestions=()=>{
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const menuItems1 = [
        { id: 1, name: "General", link: "/affiliate/overview" },
        { id: 2, name: "Benefits", link: "/affiliate/campaigns" },
        { id: 3, name: "VIP Host", link: "/affiliate/funds" },
    ];
    useEffect(() => {
        const updateScreenSize = () => {
            setIsSmallScreen(window.innerWidth <= 720); // Adjust for `sm` and `md` breakpoints
        };

        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);

        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);
    const [activeCategory, setActiveCategory] = useState<number>(1)
    interface MenuItem {
        id: number;
        name: string;
        link: string;
    }

    interface Props {
        menuItems: MenuItem[];
    }
    const [selectedName, setSelectedName] = useState(menuItems1[0].name);
    const Dropdown: React.FC<Props> = ({ menuItems }) => {
            const [isOpen, setIsOpen] = useState(false);
            const dropdownRef = useRef<HTMLDivElement |null> (null);
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
                            className="z-20 absolute top-full left-[50%] translate-x-[-50%] bg-[#0d1a22] border-[#395972] border-[1px] divide-y divide-gray-100 rounded-lg shadow min-w-max"
                        >
                            <ul className="py-2 text-sm text-white font-semibold" aria-labelledby="dropdownDefaultButton">
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
        const handleClick = (key: number) => {
            if (activeCategory === key) {
                null
            } else {
                setActiveCategory(key);
            }
        };
    return(
        <div className="my-10">
            <div className="text-[20px] font-extrabold w-full text-center">Frequently Asked Questions</div>
            <div className="text-[16px] text-blue-100 mt-1 font-medium w-full text-center mb-10">Reach out to our award winning support team</div>
            <div className={`flex ${!isSmallScreen? "flex-row":"flex-col gap-y-2 px-2"}  sm:mx-5 md:mx-10 lg:mx-[95px] justify-start items-start sm:gap-x-4 md:gap-x-6 md:sticky top-10`}>
            
                            <div className="flex flex-col items-center md:items-start">
                                {!isSmallScreen ?
                                    <div id="dropdown" className="bg-[#0f1c2bda] divide-y divide-gray-100 rounded-lg shadow w-44">
                                        <ul className="py-2 text-sm text-[16px] text-white" aria-labelledby="dropdownDefaultButton">
            
                                            {menuItems1.map((item) => (
                                                <div onClick={() => handleClick(item.id)} key={item.id}>
                                                    <div className={`${activeCategory === item.id ? 'bg-[#0e1722] border-l-2 border-blue-500' : ''} block px-4 py-3 hover:bg-[#0e1722]`}>
                                                        {item.name}
                                                    </div>
                                                </div>
                                            ))}
                                        </ul>
                                    </div> :
                                    <div className="flex flex-row gap-x-4 justify-center items-center">
                                        <div className="">
                                            <Dropdown menuItems={menuItems1} />
                                        </div>
                                    </div>}
                            </div>
                            <div className="flex w-full md:w-full bg-[#0f1c2bda] rounded-lg justify-start px-[20px] pb-[20px] items-start">
                {activeCategory === 1 && <VIPFAQGeneral/>}
                {activeCategory === 2 && <VIPFAQBenifits/>}
                {activeCategory === 3 && <VIPFAQHost/>}
            </div>
                        </div>
                        
        </div>
    )
}
export default VIPClubQuestions;