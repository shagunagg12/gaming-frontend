import { BiSolidTimer } from "react-icons/bi";
import GameCardSliderComponent from "../components/CasinoComponents/GameCardSliderComponent";
import VIPProgressCard from "./sports/VIPProgressCard";
import CasinoBox from "../../assets/images/CasinoBox.png"
import SportsbookBox from "../../assets/images/SportsBox.png"
import gameshows from '../../assets/images/exclusiveGames/games (1).png'
import { IoIosBasketball } from "react-icons/io";
import AdvertiseBanner from "../../assets/images/AdvertiseBanner.jpg"
import { GiCardRandom } from "react-icons/gi";
import { useEffect, useState } from "react";
import ToggleTableComponent from "../components/LandingPageComponents/ToggleTableComponent";
import { RiVipFill } from "react-icons/ri";
import { FaChess } from "react-icons/fa";
import { PiCricketBold } from "react-icons/pi";
interface GameProp {
    title: string;
    description: string;
    img: string;
    link?: string;
    category: string;
}
interface toggleTableOption {
    title: string;
    key: string;
  }
  const toggleTableOption: toggleTableOption[] = [
    { title: "My Bets", key: 'my-bets' },
    { title: "All Bets", key: 'all-bets' },
    { title: "High Rollers", key: 'high-rollers' },
    { title: "Race Leaderboard", key: 'race-leaderboard' },
  ];
const TrendingGames: GameProp[] = [
    {
        title: 'Cricket',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'cricket'

    },
    {
        title: 'Tennis',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'tennis'

    }, {
        title: 'Cricket',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'cricket'

    },
    {
        title: 'Soccer',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'soccer'

    }, {
        title: 'Racing',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'racing'

    }, {
        title: 'Baseball',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'baseball'

    }, {
        title: 'Tennis',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'tennis'

    }, {
        title: 'Cricket',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'cricket'

    },
    {
        title: 'Soccer',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'soccer'

    }, {
        title: 'Racing',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'racing'

    }, {
        title: 'Baseball',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'baseball'

    },

    {
        title: 'Tennis',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'tennis'

    }, {
        title: 'Cricket',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'cricket'

    },
    {
        title: 'Soccer',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'soccer'

    }, {
        title: 'Racing',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'racing'

    }, {
        title: 'Baseball',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'baseball'

    },
];

const TrendingSports: GameProp[] = [
    {
        title: 'Cricket',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'cricket'

    },
    {
        title: 'Tennis',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'tennis'

    }, {
        title: 'Cricket',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'cricket'

    },
    {
        title: 'Soccer',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'soccer'

    }, {
        title: 'Racing',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'racing'

    }, {
        title: 'Baseball',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'baseball'

    }, {
        title: 'Tennis',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'tennis'

    }, {
        title: 'Cricket',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'cricket'

    },
    {
        title: 'Soccer',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'soccer'

    }, {
        title: 'Racing',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'racing'

    }, {
        title: 'Baseball',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'baseball'

    },

    {
        title: 'Tennis',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'tennis'

    }, {
        title: 'Cricket',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'cricket'

    },
    {
        title: 'Soccer',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'soccer'

    }, {
        title: 'Racing',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'racing'

    }, {
        title: 'Baseball',
        description: 'Description for Game 1',
        img: gameshows,
        category: "avatar",
        link: 'baseball'

    },
];

const Home: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true); // For shimmer effect
    const Shimmer = ({ className }: { className: string }) => (
        <div className={`shimmer-effect rounded-md ${className}`}></div>
    );

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
        return () => clearTimeout(timer);
    }, []);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isMD, setIsMD] = useState(false);
    const [isextraSmall, setIsExtraSmall] = useState(false);

    const [imageUp, setImageUp] = useState(0)
    useEffect(() => {
        const updateScreenSize = () => {
            setIsSmallScreen(window.innerWidth <= 756);
            setIsMD(window.innerWidth <= 1088)
            setIsExtraSmall(window.innerWidth <= 435)
        };

        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);

        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);
    return (
        <>
            <div className="w-full">
                <div className={`flex w-full background-div md:flex-row flex-col items-center md:px-5 lg:px-20 ${isSmallScreen ? "gap-x-2" : " md:gap-x-5"} sm:px-5 px-2 py-5 justify-between`}>
                    <div className="z-10">
                        {isLoading?

<div role="status" className="flex items-center justify-center rounded-lg shimmer-effect  sm:w-[290px] sm:h-[120px] md:w-[250px] md:h-[100px] lg:h-[150px] lg:w-[340px] h-[110px] w-[280px]">
<RiVipFill size={30} />
</div>
:
                        
                        <VIPProgressCard />}
                    </div>
                    <div className={`flex-row p-5 z-10 ${isextraSmall? "justify-evenly w-full":""} ${isSmallScreen ? "gap-x-2" : "gap-x-4"} items-center flex`}>
                        <div className="">
                            {isLoading?<div role="status" className={`flex items-center justify-center rounded-lg shimmer-effect ${isextraSmall ? "w-[90px] h-[90px]" : ""} ${isMD ? "w-[200px] h-[180px]" : "sm:w-[2220px] h-[140px] w-[150px] lg:h-[230px] lg:w-[260px] md:h-[150px] md:w-[220px]"} ${isSmallScreen ? "w-[190px]" : ""}`}>
                            <FaChess size={30} />
                            </div>:
                            <div onMouseEnter={() => setImageUp(1)} onMouseLeave={() => setImageUp(0)} className={`relative ${isextraSmall ? "w-[90px]" : ""} transform transition-transform duration-300 ${imageUp === 1 ? "translate-y-[-10px]" : ""} ${isMD ? "w-[200px]" : "sm:w-[2220px] w-[150px] lg:w-[260px] md:w-[220px]"} ${isSmallScreen ? "w-[190px]" : ""} `}>
                                {/* Image */}
                                <img className="rounded-t-lg w-full" src={CasinoBox} />

                                {/* Border Effect */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {/* Top Border */}
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-green-500 to-transparent"></div>

                                    {/* Left Border */}
                                    <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-green-500 to-transparent"></div>

                                    {/* Right Border */}
                                    <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-green-500 to-transparent"></div>
                                </div>

                                {/* Bottom Section */}
                                <div className={`flex justify-start ${isextraSmall?"text-[12px]":"text-[15px]"}  font-bold flex-row rounded-b-md bg-[#305131] px-3 py-2 items-center`}>
                                   {isextraSmall?<></>: <GiCardRandom className="mr-2" />}
                                    Casino
                                </div>
                            </div>}
                        </div>
                        {/*  */}
                        <div className="">
                        {isLoading?<div role="status" className={`flex items-center justify-center rounded-lg shimmer-effect ${isextraSmall ? "w-[90px] h-[90px]" : ""} ${isMD ? "w-[200px] h-[180px]" : "sm:w-[2220px] h-[140px] w-[150px] lg:h-[230px] lg:w-[260px] md:h-[150px] md:w-[220px]"} ${isSmallScreen ? "w-[190px]" : ""}`}>
                            <PiCricketBold size={30} />
                            </div>:
                            <div onMouseEnter={() => setImageUp(2)} onMouseLeave={() => setImageUp(0)} className={`relative ${isextraSmall ? "w-[90px]" : ""} transform transition-transform duration-300 ${imageUp === 2 ? "translate-y-[-10px]" : ""} ${isMD ? "w-[200px]" : "sm:w-[220px] w-[150px] lg:w-[260px] md:w-[220px]"} ${isSmallScreen ? "w-[190px]" : ""} `}>
                                <img className={`rounded-t-lg w-full`} src={SportsbookBox} />


                                {/* Border Effect */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {/* Top Border */}
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-green-500 to-transparent"></div>

                                    {/* Left Border */}
                                    <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-green-500 to-transparent"></div>

                                    {/* Right Border */}
                                    <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-green-500 to-transparent"></div>
                                </div>

                                {/* Bottom Section */}
                                <div className={`flex justify-start ${isextraSmall?"text-[10px]":"text-[15px]"} font-bold flex-row rounded-b-md bg-[#305131] px-3 py-2 items-center`}>
                                {isextraSmall?<></>: <IoIosBasketball className="mr-2" />}
                                    Sportsbook
                                </div>
                            </div>}
                        </div>

                    </div>
                </div>
                <div className="md:px-5 flex py-5 bg-[#2830388d] flex-col lg:px-20 sm:px-5 px-2">
                    <GameCardSliderComponent games={TrendingGames} name="Trending Games" icon={GiCardRandom} disableLink={true} />
                    <GameCardSliderComponent games={TrendingSports} name="Trending Sports" icon={IoIosBasketball} disableLink={true} />
                    <div className="flex w-full justify-start flex-col">
                        <div className='sm:text-lg text-sm relative w-fit font-bold my-4 ml-2 items-center flex gap-2 '> <BiSolidTimer size={20}/> Races & Raffles</div>
                        <div className="flex overflow-auto w-full flex-row justify-between gap-x-4">
                            
                               { Array(3).fill(null).map(() => (
                                    isLoading?<Shimmer className="md:w-[300px] md:h-[150px] w-[200px] h-[100px]"></Shimmer>:
                                <img className="w-[350px]" src={AdvertiseBanner}/>))}
                        </div>
                    </div>
                    <div className="flex w-full justify-start flex-col py-7">
                    <ToggleTableComponent toggleOption={toggleTableOption} />
                    </div>
                </div>
            </div>

        </>
    )
}
export default Home;