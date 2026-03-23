import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";

const ScorecardToggleMap1 = () => {
     const [isLoading, setIsLoading] = useState(true); // For shimmer effect
        const Shimmer = ({ className }: { className: string }) => (
            <div className={`shimmer-effect rounded-md ${className}`}></div>
        );
    
        useEffect(() => {
            const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
            return () => clearTimeout(timer);
        }, []);
    const QNASlides = [
            {
                id: 1,
                Ques: "What is the Stake Affiliate Program?",
                Ans: "The Stake Affiliate Program allows individuals, businesses, and influencers to earn commissions by referring new players to Stake.com."
            },
            {
                id: 2,
                Ques: "Who can join the Stake Affiliate Program?",
                Ans: "The Stake Affiliate Program is open to anyone who has a network or audience to which they can promote Stake."
            },
            {
                id: 3,
                Ques: "How do I join the Stake Affiliate Program?",
                Ans: "To begin, you need to sign up for an account on Stake.com. Once you have an account, you’ll be able to start promoting your referral link and earn commission. Once you’ve done this, you can also get in touch with the affiliate team via the contact form to discuss personalised deals based on your audience and network."
            },
            {
                id: 4,
                Ques: "What are the benefits of joining the Stake Affiliate Program?",
                Ans: "Affiliates can enjoy competitive commission rates, real-time tracking, promotional materials, and dedicated affiliate support. As a world leading casino & sportsbook, Stake offers an exciting product that you can earn from by promoting it."
            }
        ];
    
        const [activeSlide, setActiveSlide] = useState<Record<number, boolean>>({});
    
        const toggleSlide = (id: number) => {
            // alert("III"+ id)
            setActiveSlide((prev) => ({
                ...prev,
                [id]: !prev[id] || false
            }));
        };
    return (
        <div className="flex flex-col text-[14px] font-bold mt-5 text-white items-center gap-y-3 w-full">
                    {QNASlides.map((item) => (
                        <div key={item.id} className="bg-[#263e48] rounded-md flex flex-col w-full py-3 shadow-lg hover:shadow-xl transition-shadow duration-300 shadow-black/20">
                            <div onClick={() => toggleSlide(item.id)} className="flex cursor-pointer flex-row items-center justify-between px-4">
                                {isLoading ? <Shimmer className="w-[400px] h-[20px]"></Shimmer> :
                                    <div>{item.Ques}</div>}
                                {isLoading ? <Shimmer className="w-[20px] h-[20px]"></Shimmer> :
                                    <div className="cursor-pointer">
                                        {activeSlide[item.id] ? (
                                            <IoIosArrowDown size={20} />
                                        ) : (
                                            <IoIosArrowBack size={20} />
                                        )}
                                    </div>}
                            </div>
                            {activeSlide[item.id] ?
                                (<>
                                    <div className="w-full h-[2px] bg-[#d1d1d1] opacity-[50%] mt-3"></div>
                                    <div className="flex flex-row py-3 items-center px-4">
                                        <div className="text-[14px] font-semibold text-[#c4d8ec]">{item.Ans}</div>
                                    </div>
                                </>)
                                : (<></>)
                            }
                        </div>
                    ))}
                </div>
    )
}
export default ScorecardToggleMap1;