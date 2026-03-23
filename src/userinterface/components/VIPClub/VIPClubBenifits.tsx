import Boost from "../../../assets/images/VIPBenifits/Boost.png"
import PlayBounses from "../../../assets/images/VIPBenifits/PlayBounses.png"
import Bespoke from "../../../assets/images/VIPBenifits/Bespoke.png"
import VIPHost from "../../../assets/images/VIPBenifits/VIPHost.png"
import LevelUp from "../../../assets/images/VIPBenifits/LevelUp.png"
import { useEffect, useState } from "react"
const VIPClubBenifits = () => {
    const [isLoading, setIsLoading] = useState(true); // For shimmer effect
    const Shimmer = ({ className }: { className: string }) => (
        <div className={`shimmer-effect rounded-md ${className}`}></div>
    );

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 200000); // Simulate 2 seconds of loading
        return () => clearTimeout(timer);
    }, []);
    const VIPBenifits = [{ icon: Boost, title: "Boost", benifits: "Every week and every month, expect a fresh bonus based on your recent games. The more you play, the higher the bonuses." },
    { icon: VIPHost, title: "Recent Play bonuses", benifits: "Receive your own dedicated VIP host who will support and cater to your betting needs." },
    { icon: PlayBounses, title: "Recent Play bonuses", benifits: "Having a rough streak of luck? Stake offers money back on losses every time you level up." },
    { icon: LevelUp, title: "Recent Play bonuses", benifits: "Reach a new level and get paid. The level-ups get better the higher you go." },
    { icon: Bespoke, title: "Recent Play bonuses", benifits: "Work with your dedicated VIP host to tailor benefits to your gaming needs." },
    ]
    return (
        <div className="flex items-center justify-center w-full">
            <div className="flex flex-col w-full sm:mx-[25px] mx-[20px] md:mx-[60px] items-center sm:my-[30px] md:my-[50px] my-[20px] gap-y-10 justify-start">
                <div className="text-[20px] font-extrabold">Stake VIP Club benefits</div>
                <div className="md:grid flex flex-col md:grid-rows-3 md:grid-cols-2 sm:gap-5 gap-3">
                    {VIPBenifits.map((item) => (
                        <div className="flex flex-row px-4 py-4 items-center rounded-lg bg-[#193356a3] gap-x-6">
                            <img src={item.icon} />
                            <div className="flex flex-col gap-y-1">
                                <div className="text-white font-bold text-[16px]">{item.title}</div>
                                <div className="text-blue-100 text-[14px] leading-tight">{item.benifits}</div>
                            </div>
                        </div>))}
                </div>
            </div>
        </div>
    )
}
export default VIPClubBenifits;