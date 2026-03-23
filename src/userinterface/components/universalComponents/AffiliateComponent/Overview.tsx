import Banner from "../../../../assets/images/AffiliateOverviewBanner.png";
import Banner2 from "../../../../assets/images/AffiliateBanner2.png";
import AddVideo from "./VideoComponent";
import { PiNotePencilBold } from "react-icons/pi";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { FaBolt, FaInfinity, FaPercent, FaBitcoin, FaLanguage } from "react-icons/fa";
import TemplateBanner from "../../../../assets/images/TemplateBanner.jpg"
import FAQGeneral from "./FAQGeneral";
import { FaArrowRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { IoImages } from "react-icons/io5";

const Overview = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isMD, setIsMD] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // For shimmer effect
    const Shimmer = ({ className }: { className: string }) => (
        <div className={`shimmer-effect rounded-md ${className}`}></div>
    );

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        const updateScreenSize = () => {
            setIsSmallScreen(window.innerWidth <= 720);
            setIsMD(window.innerWidth <= 1074) // Adjust for `sm` and `md` breakpoints
        };

        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);

        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);





    const FeaturesGrid: React.FC = () => {
        const features = [
            {
                id: 1,
                icon: <FaBolt size={28} color="white" />,
                title: "Instant payout",
                description: "Skip the wait. See earnings instantly in your account.",
            },
            {
                id: 2,
                icon: <FaInfinity size={28} color="white" />,
                title: "Lifetime commission",
                description: "If the people you refer keep playing, you keep getting paid.",
            },
            {
                id: 3,
                icon: <FaPercent size={28} color="white" />,
                title: "Market leading player value",
                description: "Grow your earnings with some of the highest returns offered to players.",
            },
            {
                id: 4,
                icon: <PiNotePencilBold size={28} color="white" />,
                title: "Customise your commission",
                description: "Tailor your commission plan to fit your unique business needs.",
            },
            {
                id: 5,
                icon: <FaBitcoin size={28} color="white" />,
                title: "Crypto & local currencies",
                description: "Earn your way with support for both cryptocurrency and local currencies.",
            },
            {
                id: 6,
                icon: <FaLanguage size={28} color="white" />,
                title: "24x7 Multi language support",
                description: "Get the help you want in your preferred language all day, everyday.",
            },
        ];

        return (
            <div className="grid grid-cols-1 sm:w-full md:grid-cols-2 gap-2">
                {features.map((feature) => (
                    <div
                        key={feature.id}
                        className="flex gap-4 items-center bg-[#263e48] p-4 rounded-[5px] shadow-lg"
                    >
                        {isLoading ? <Shimmer className="w-[50px] h-[50px]"></Shimmer> :
                            <div className="flex-shrink-0 bg-green-600 p-2 rounded-md">
                                {feature.icon}
                            </div>}
                        {isLoading ? <><Shimmer className="h-7 w-[60%] rounded animate-pulse"></Shimmer>
                            <Shimmer className="h-6 w-[90%] rounded animate-pulse"></Shimmer></> :
                            <div>

                                <h3 className="text-white font-bold text-[16px]">{feature.title}</h3>
                                <p className="text-white font-medium text-[14px]">{feature.description}</p>
                            </div>}
                    </div>
                ))}
            </div>
        );
    };
    const ReferLink = () => {
        const [isCopied, setIsCopied] = useState(false);
        const text = "stake.ac/?c=l4EElosm";

        const handleCopy = () => {
            navigator.clipboard.writeText(text).then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 1000); // Hide message after 1 second
            });
        };

        return (
            <div className="w-full min-sm:bg-green-800 bg-[#263e48] rounded-md">
                {isLoading ? (
                    <div className="p-4">
                        {/* Shimmer for text */}
                        <Shimmer className="w-full h-6 mb-4" />

                        {/* Shimmer for input and button container */}
                        <div className="flex flex-col md:flex-row w-full gap-y-2 md:gap-x-2">
                            <Shimmer className="w-full md:w-[55%] h-10" />
                            <Shimmer className="w-full md:w-fit h-10" />
                        </div>
                    </div>
                ) : (
                    <div className="flex w-full md:gap-y-3 flex-col md:flex-col lg:flex-row sm:flex-col items-center justify-between p-4 gap-y-4">
                        <div className="text-white w-full md:w-[100%] md:text-[14px] lg:text-[16px] font-semibold">
                            Ready to earn commission? Tap the 'Copy referral link' button and share your default campaign.
                        </div>
                        <div className="flex relative flex-col md:flex-row w-full md:w-[100%] items-center lg:justify-end gap-y-2 md:gap-x-2">
                            <input
                                type="text"
                                value="stake.ac/?c=l4EElosm"
                                readOnly
                                className="bg-[#243346] w-full md:w-[55%] text-[14px] md:text-[15px] py-1.5 px-2 font-semibold text-white rounded-md border-2 border-transparent focus:border-gray-500 focus:outline-none"
                            />
                            {isCopied && (
                                <div className="absolute z-10 md:bottom-1 lg:bottom-10 xl:bottom-10 md:right-1 sm:right-20 bg-green-600 text-white text-sm px-2 py-1 rounded shadow">
                                    Copied!
                                </div>
                            )}
                            <button
                                onClick={handleCopy}
                                className="text-[14px] md:w-fit w-full md:text-[15px] font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none"
                            >
                                Copy referral link
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };
    const ExclusiveAdvantages = () => {
        return (
            <div className="flex w-full flex-col items-start justify-center gap-y-4">
                {isLoading ? <Shimmer className="w-60 h-6"></Shimmer> :
                    <div className="text-[22px] md:text-[30px] leading-8 md:leading-10 text-white font-bold w-full md:w-[60%]">
                        Exclusive advantages
                    </div>}
                <FeaturesGrid />
            </div>

        )
    }
    const Parternering = () => {
        return (
            <div className="flex w-full flex-col items-start justify-center gap-y-4">
                {/* Title */}
                <div className="text-[22px] md:text-[30px] leading-8 md:leading-10 text-white font-bold w-full md:w-[60%]">
                    {isLoading ? (
                        <Shimmer className=" h-6 w-full "></Shimmer>
                    ) : (
                        "Partnering with us is easy"
                    )}
                </div>

                {/* Main Content */}
                <div className="flex flex-col md:flex-col bg-[#263e48] p-4 w-full rounded-md gap-4">
                    <div
                        className={`w-full flex ${isLoading ? "md:flex-row font-bold" : "flex-col"
                            } flex-col lg:flex-row`}
                    >
                        {/* Steps Section */}
                        <div className="w-full md:w-1/2 flex flex-col gap-y-4">
                            <div className="flex md:w-[90%] sm:text-[20px] flex-col gap-y-4">
                                {isLoading ? (
                                    <>
                                        <div className="text-white flex flex-col md:text-[14px]">
                                            <Shimmer className="h-6 w-[70%] mb-2"></Shimmer>
                                            <Shimmer className="h-6 w-[90%] rounded animate-pulse"></Shimmer>
                                        </div>
                                        <div className="text-white sm:text-[20px] flex flex-col md:text-[14px]">
                                            <Shimmer className="h-6 w-[70%] rounded mb-2"></Shimmer>
                                            <Shimmer className="h-6 w-[90%] rounded"></Shimmer>
                                        </div>
                                        <div className="text-white flex flex-col md:text-[14px]">
                                            <Shimmer className=" h-6 w-[70%] rounded animate-pulse mb-2"></Shimmer>
                                            <Shimmer className="h-6 w-[90%] rounded animate-pulse"></Shimmer>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-white flex flex-col md:text-[14px]">
                                            <div className="font-medium">Step 1</div>
                                            <div className="font-medium">Create your referral campaign</div>
                                        </div>
                                        <div className="text-white sm:text-[20px] flex flex-col md:text-[14px]">
                                            <div className="font-medium">Step 2</div>
                                            <div className="font-medium">Share the referral link</div>
                                        </div>
                                        <div className="text-white flex flex-col md:text-[14px]">
                                            <div className="font-medium">Step 3</div>
                                            <div className="font-medium">Earn and withdraw your commission</div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Video Section */}
                        <div
                            className={`w-full sm:w-[100%] lg:w-[50%] mt-5 md:mt-0 md:w-[60%]`}
                        >
                            {isLoading ? (
                                

<div role="status" className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg shimmer-effect">
    <svg className="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z"/>
  </svg>
</div>

                            ) : (
                                <AddVideo />
                            )}
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className="text-[12px] sm:text-[15px] text-gray-300 p-3 border-2 border-dashed rounded-md border-white">
                        {isLoading ? (
                            <>
                                <Shimmer className="h-6 w-[80%] mb-2"></Shimmer>
                                <Shimmer className="h-6 w-[70%] "></Shimmer>
                            </>
                        ) : (
                            <>
                                Have a large following and exceptional reach online? You could earn higher commissions through a customized program. To see if you're eligible, please{" "}
                                <span className="underline">contact our Affiliate Team.</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    }
    const CommissionRules = () => {
        return (
            <div className="flex w-full flex-col items-start justify-center gap-y-3">
                {isLoading ? <Shimmer className="w-60 h-6"></Shimmer> :
                    <div className="text-[22px] md:text-[30px] leading-8 md:leading-10 text-white font-bold w-full md:w-[60%]">
                        Commissions rules
                    </div>}
                {isLoading ? <Shimmer className="w-full h-4"></Shimmer> :
                    <div className="text-[15px] text-white font-medium">Our default commission rate is 10% but you can calculate specific rates for our products using the formulas below.</div>}
                {/*  */}
                <div className="bg-[#263e48] rounded-md p-6">
                    {/* Main Grid */}
                    <div className="flex flex-col lg:flex-row items-start gap-6 pb-6">

                        {/* Casino Section */}

                        <div className="flex-1 lg:space-y-1 w-full md:space-y-4">
                            {isLoading ? <Shimmer className="w-[30%] mb-5 h-5"></Shimmer> :
                                <h3 className="text-white font-bold text-lg">Casino</h3>}
                            {isLoading ? <Shimmer className="w-[90%] h-5"></Shimmer> :
                                <p className="text-white md:text-[12px] flex items-center text-[14px] opacity-[90%] h-[100px] lg:h-[130px] mt-2 md:h-[80px]">
                                    All of our games have a different house edge. You can derive your
                                    commission using the following formula:
                                </p>}
                            <div className="bg-[#203345] text-gray-300 text-sm h-[55px] px-4 py-2 rounded-md mt-4">
                                {isLoading ? <Shimmer className="w-[150px] h-10"></Shimmer> : "   (Edge as decimal * wagered / 2) * commission rate"}
                            </div>
                        </div>

                        {/* Vertical Line */}
                        <div className=" lg:h-[220px] lg:w-[1.5px] h-[1.5px] w-full md:h-[1.5px] md:w-full  bg-gray-600 opacity-[70%]"></div>

                        {/* Sportsbook Section */}

                        <div className="flex-1 lg:space-y-1 md:space-y-4">
                            {isLoading ? <Shimmer className="w-[30%] mb-5 h-5"></Shimmer> :
                                <h3 className="text-white font-bold text-lg">Sportsbook</h3>}
                            {isLoading ? <Shimmer className="w-[90%] h-5"></Shimmer> :
                                <p className="text-white md:text-[12px] flex items-center text-[14px] opacity-[90%] h-[100px] lg:h-[130px] mt-2 md:h-[80px]">
                                    All sports bets are applied at a 3% theoretical house edge. You can
                                    derive your commission using the following formula:
                                </p>}
                            <div className="bg-[#203345] text-gray-300 text-sm px-4 py-2 h-[55px] rounded-md mt-4">
                                {isLoading ? <Shimmer className="w-[150px] h-10"></Shimmer> : "(0.03 * wagered / 2) * commission rate"}
                            </div>
                        </div>

                        {/* Vertical Line */}
                        <div className=" lg:h-[220px] lg:w-[1.5px] h-[1.5px] w-full md:h-[1.5px] md:w-full  bg-gray-600 opacity-[70%]"></div>
                        {/* Poker Section */}
                        <div className="flex-1 lg:space-y-1 md:space-y-4">
                            {isLoading ? <Shimmer className="w-[30%] mb-5 h-5"></Shimmer> :
                                <h3 className="text-white font-bold text-lg">Poker</h3>}
                            {isLoading ? <Shimmer className="w-[90%] h-5"></Shimmer> :
                                <p className="text-white md:text-[12px] flex items-center text-[14px] opacity-[90%] h-[100px] lg:h-[130px] mt-2 md:h-[80px]">
                                    We collect a small percentage of each pot (known as Rake) as a fee
                                    for hosting the game. Your commission is calculated using Rake. You
                                    can use the formula below to derive your commission:
                                </p>}
                            <div className="bg-[#203345] text-gray-300 text-sm px-4 h-[55px] py-2 rounded-md mt-4">
                                {isLoading ? <Shimmer className="w-[150px] h-10"></Shimmer> : "Rake * commission rate"}
                            </div>
                        </div>
                    </div>

                    {/* Footer Text */}
                    <div className="mt-6">
                        <p className="text-gray-300 text-sm border-dashed border-white border-[1px] p-3 rounded-lg">
                            {isLoading ? <Shimmer className="w-[80%] h-5"></Shimmer> :
                                <div>
                                    Have a large following and exceptional reach online? You could earn
                                    higher commissions through a customised program. To see if you're
                                    eligible, please{" "}
                                    <a href="#" className="text-blue-400 underline">
                                        contact our Affiliate Team.
                                    </a>
                                </div>}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
    const Templates = () => {
        return (
            <div className="flex w-full flex-col items-start justify-center gap-y-3">
                {isLoading ?<> <Shimmer className="w-[60%] relative h-7"></Shimmer><div className="absolute left-[55%] mt-5"><IoImages size={40} /></div> </>:
                    <div className="text-[22px] md:text-[30px] leading-8 md:leading-10 text-white font-bold w-full md:w-[60%]">
                        Templates to help your campaign stand out
                    </div>}
                {isLoading ? <Shimmer className="w-[70%] mt-2 h-4"></Shimmer> :
                    <div className="text-[15px] text-white font-medium">We’ve created digital banner templates to make it easier for you to promote your campaigns online.</div>}
                <div className="flex flex-col bg-[#263e48] rounded-md p-4 gap-4 w-full justify-center items-end">
                    {isLoading ? <Shimmer className="w-full h-[200px]"></Shimmer> :
                        <div className="">
                            <img className="rounded-md" src={TemplateBanner} />
                        </div>}
                    <div>
                        {isLoading ? <Shimmer className="w-[100px] h-7"></Shimmer> :
                            <button
                                className="text-[14px] md:text-[15px] flex flex-row items-center gap-2 font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none"
                            >
                                Browse Templates <LuSquareArrowOutUpRight />
                            </button>}
                    </div>
                </div>
            </div>
        )
    }
    const FAQ = () => {
        const [readMore, setReadMore] = useState(false)
        return (
            <div className="flex w-full flex-col items-start justify-center gap-y-2">
                {isLoading ? <Shimmer className="w-20 h-7"></Shimmer> :
                    <div className="text-[22px] md:text-[30px] leading-8 md:leading-10 text-white font-bold w-full md:w-[60%]">
                        FAQ
                    </div>}
                <div className="w-full flex flex-col items-end">
                    <FAQGeneral />
                    {/* [${readMore?"#5e818de9":""}] */}
                    {isLoading ? <Shimmer className="w-20 mt-2 h-4"></Shimmer> :
                        <div onMouseEnter={() => setReadMore(true)} onMouseLeave={() => setReadMore(false)} className={`bg-[${!readMore ? "#334f5ffd" : "#5e818de9"}] cursor-pointer flex items-center gap-2 text-white font-semibold px-4 py-2 mt-2 rounded-md`}>
                            <div className="text-[14px] font-semibold">Read more</div>
                            <div>
                                <FaArrowRight />
                            </div>
                        </div>}
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col w-full gap-y-7 items-start justify-center md:gap-y-4 lg:gap-y-10">
            <div className={`${!isSmallScreen ? "relative" : ""} w-full`}>
                {isLoading ? (
                    <Shimmer className="h-[200px] w-full rounded-lg" />
                ) : (
                    <>
                        <div
                            className={`${!isSmallScreen ? "absolute" : ""} top-0 left-0 flex flex-col w-full h-full p-2 md:p-4 text-white text-2xl font-bold ${isSmallScreen ? "bg-gradient-to-r mt-5 from-pink-500 via-purple-500 to-indigo-500" : ""} bg-opacity-50 rounded-lg`}
                        >
                            <div className="text-[15px] leading-tight md:text-[20px] lg:text-[25px] xl:text-[30px] w-full md:w-[60%] lg:leading-snug">
                                Refer and earn big with our Affiliate Program
                            </div>
                            <div className="text-[12px] leading-tight md:text-[14px] lg:text-[15px] xl:text-[18px] opacity-90">
                                Earn commission for all bets placed by your referrals across Casino and Sportsbook.
                            </div>
                            {!isMD && (
                                <div className="w-full lg:h-24 h-fit sm:h-fit md:w-[65%] flex flex-col gap-y-2 mt-5 lg:mt-2 bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-md">
                                    <div className="flex w-full justify-between gap-x-2 md:gap-x-4">
                                        <div className="flex-1 text-base md:text-lg font-bold">21.7M</div>
                                        <div className="flex-1 text-base md:text-lg font-bold">32</div>
                                        <div className="flex-1 text-base md:text-lg font-bold">16</div>
                                    </div>
                                    <div className="flex font-medium w-full md:leading-tight justify-between gap-x-2 md:gap-x-4 text-[12px] md:text-[14px]">
                                        <div className="flex-1">Worldwide customers</div>
                                        <div className="flex-1">Payment methods</div>
                                        <div className="flex-1">Languages supported</div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {!isSmallScreen ? (
                            <img className="w-full h-auto bg-cover rounded-lg" src={Banner} alt="Banner" />
                        ) : (
                            <div className="w-full flex mt-10 justify-center items-center">
                                <img className="w-[200px] h-auto bg-cover rounded-lg" src={Banner2} alt="Banner" />
                            </div>
                        )}
                    </>
                )}
            </div>

            {isMD && (
                <div className={`w-full lg:h-24 text-center justify-start sm:justify-center h-fit sm:h-fit md:w-[100%] flex flex-col gap-y-2 bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-md`}>
                    {isLoading ? (
                        <Shimmer className="h-20 w-full rounded-lg" />
                    ) : (
                        <>
                            <div className="flex w-full justify-between gap-x-2 md:gap-x-4">
                                <div className="flex-1 text-base md:text-lg font-bold">21.7M</div>
                                <div className="flex-1 text-base md:text-lg font-bold">32</div>
                                <div className="flex-1 text-base md:text-lg font-bold">16</div>
                            </div>
                            <div className="flex font-medium w-full md:leading-tight justify-between gap-x-2 md:gap-x-4 text-[12px] sm:text-[10px] md:text-[12px]">
                                <div className="sm:flex-1">Worldwide customers</div>
                                <div className="sm:flex-1">Payment methods</div>
                                <div className="sm:flex-1">Languages supported</div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Called Components Without Shimmer */}
            <ReferLink />
            <Parternering />
            <ExclusiveAdvantages />
            <ReferLink />
            <CommissionRules />
            <Templates />
            <FAQ />
        </div>
    );
};

export default Overview;
