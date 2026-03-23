import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";

export default function FAQEarning() {
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
            Ques: "How is the commission calculated for the affiliate program?",
            Ans: "As a default, the commission is set to 10% wager share commission which is calculated as follows ."
        },
        {
            id: 2,
            Ques: "How much commission can I earn by becoming an affiliate?",
            Ans: "There’s no limit to your earnings; it depends on the number of referrals you generate and their wagering activity."
        },
        {
            id: 3,
            Ques: "When and how do I get paid?",
            Ans: "As a wager share affiliate, you can claim your commission instantly from the funds tab. The commission will continue to generate as long as there is wagering activity under your campaigns, and you can transfer any available balance to your Stake wallet at any time."
        },
        {
            id: 4,
            Ques: "Can I track my earnings in real-time?",
            Ans: "Yes, you can track your earnings in real-time using the campaigns tab, which provides data on your available commission, withdrawn commission, and lifetime commissions earned through your campaigns."
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
                            {isLoading?<Shimmer className="w-[400px] h-[20px]"></Shimmer>:
                            <div>{item.Ques}</div>}
                                {isLoading?<Shimmer className="w-[20px] h-[20px]"></Shimmer>:
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
    );
}