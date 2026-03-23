import { useEffect, useRef, useState } from "react";
import GeneralSettings from "../components/Settings/GeneralSettings";
import SecuritySettings from "../components/Settings/SecuritySettings";
import PreferencesSettings from "../components/Settings/PreferencesSettings";
import { IoIosArrowForward, IoMdSettings } from "react-icons/io";
import APISettings from "../components/Settings/APISettings";
import SessionsSettings from "../components/Settings/SessionsSettings";
import IgnoredUsers from "../components/Settings/IgnoredUsers";
import VerifySettings from "../components/Settings/VerifySettings";
import OffersSettings from "../components/Settings/OffersSettings";

const Settings=()=>{
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const menuItems1 = [
        { id: 1, name: "General", link: "/settings/general" },
        { id: 2, name: "Security", link: "/settings/security" },
        { id: 3, name: "Preferences", link: "/settings/preferences" },
        { id: 4, name: "API", link: "/settings/api" },
        { id: 5, name: "Sessions", link: "/settings/sessions" },
        { id: 6, name: "Ignored Users", link: "/settings/ignored_users" },
        { id: 7, name: "Verify", link: "/settings/verify" },
        { id: 8, name: "Offers", link: "/settings/offers" },
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
    const handleClick = (key: number) => {
        if (activeCategory === key) {
            null
        } else {
            setActiveCategory(key);
        }
    };
    const [isModalOpen, setModalOpen] = useState(true);

  const handleClose = () => {
    setModalOpen(false);
  };
    return (
        <div className="flex flex-col md:flex-row w-full bg-[#192b37] justify-start pb-10 sm:gap-3 md:gap-5 lg:gap-7 items-start pt-10">
            {/* Sticky Affiliate Header */}
            <div className="flex flex-col gap-y-4 w-full md:w-[30%] lg:w-[20%] py-1 justify-center items-start pl-[10px] lg:items-center md:sticky top-10">
                <div className="flex items-center gap-1 justify-start pl-4 flex-row w-[200px]">
                    <IoMdSettings size={20} color="#d6d6d6" />
                    <div className="text-white font-bold text-[17px]">Settings</div>
                </div>
                <div className="flex flex-col items-center md:items-start">
                    {!isSmallScreen ?
                        <div id="dropdown" className="bg-[#0f1c2bda] divide-y divide-gray-100 rounded-lg shadow w-44">
                            <ul className="py-2 text-sm text-[16px] text-white" aria-labelledby="dropdownDefaultButton">

                                {menuItems1.map((item) => (
                                    <div className="cursor-pointer" onClick={() => {handleClick(item.id), item.id===7 && setModalOpen(true)}} key={item.id}>
                                        <div className={`${activeCategory === item.id ? 'bg-[#0e1722] border-l-2 border-blue-500' : ''} block px-4 py-3 hover:bg-[#0e1722]`}>
                                            {item.name}
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div> :
                        <div className="flex pl-[25px] flex-row gap-x-4 justify-center items-center">
                            <div className="bg-[#0e1722] rounded-md px-4 py-3.5">
                                <IoIosArrowForward size={15} />
                            </div>
                            <div>
                                <Dropdown menuItems={menuItems1} />
                            </div>
                        </div>}
                </div>
            </div>
            {/* Side Screens */}
            <div className="flex w-full overflow-hidden md:mt-[45px] md:w-[80%] justify-start px-[10px] lg:pr-[50px] md:pr-[25px] xl:pr-[100px] items-start">
                {activeCategory === 1 && <GeneralSettings />}
                {activeCategory === 2 && <SecuritySettings />}
                {activeCategory === 3 && <PreferencesSettings />}
                {activeCategory === 4 && <APISettings />}
                {activeCategory === 5 && <SessionsSettings />}
                {activeCategory === 6 && <IgnoredUsers />}
                {activeCategory === 7 && <VerifySettings isOpen={isModalOpen} onClose={handleClose}/>}
                {activeCategory === 8 && <OffersSettings />}
            </div>
        </div>
    );
}
export default Settings;