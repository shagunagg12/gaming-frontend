import { IoCopySharp } from "react-icons/io5";
import { FaBitcoin } from "react-icons/fa";
import { RiArrowDropDownLine, RiArrowDropLeftLine } from "react-icons/ri";
import { useEffect, useState } from "react";

const Campaigns = () => {
    const CampaignList = [{ title: "Campaign Hits", value: 0 }, { title: "Referrals", value: 0 }, { title: "Available Commission", value: 0 }, { title: "Total Commission", value: 0 }, { title: "Total Deposits", value: 0 }, { title: "Unique Deposits", value: 0 }, { title: "Commission Rate", value: 0 }]
    const MainHeading=[{heading:"Campaign Hits", value:0}, {heading:"Referrals", value:0},{heading:"Total Deposits", value:0},{heading:"Unique Deposits", value:0},]
    const [campaign, setCampaign] = useState(false)
    const [isCopied, setIsCopied] = useState(false);
     const [isLoading, setIsLoading] = useState(true); // For shimmer effect
     const Shimmer = ({ className }: { className: string }) => (
        <div className={`shimmer-effect rounded-md ${className}`}></div>
      );
        useEffect(() => {
            const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
            return () => clearTimeout(timer);
        }, []);
    const text = "stake.ac/?c=l4EElosm";
    const handleCopy = () => {
        // The text to be copied
        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1000); // Hide message after 1 second
        });
    };
    return (
        <div className="text-white min-h-fit mt-4 sm:mt-0 md:p-6 sm:p-4 p-2 rounded-md bg-[#0f1c2bda] w-full">
            {/* Top stats section */}
            <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4 sm:gap-1 mb-6 text-white opacity-[90%] text-center">
            {MainHeading.map((item, index) => (
  <div key={index} className="flex flex-col">
    {/* Heading */}
    <h4
      className={`text-[15px] sm:text-[12px] font-semibold ${
        isLoading ? "h-[20px]" : "md:h-[25px] sm:h-[20px] h-[20px]"
      }`}
    >
      
        {item.heading}
    </h4>

    {/* Value */}
    <p className="text-[13px] sm:text-[10px] text-[#a7adbe] font-bold">
      {isLoading ? (
        <Shimmer className="h-4 w-[80%] mt-5"></Shimmer>
      ) : (
        item.value
      )}
    </p>
  </div>
))}

            </div>
            {/* Campaign card */}
            <div className="bg-[#263e48] shadow-lg hover:shadow-xl transition-shadow duration-300 shadow-black/20 rounded-md flex-col flex justify-between items-center mb-6">
                <div onClick={() => setCampaign(prev => !prev)} className="w-full flex cursor-pointer items-center flex-col sm:flex-row py-3 justify-between px-5">
                   {isLoading?<Shimmer className="w-[120px] h-5"></Shimmer>:
                    <p className="text-[15px] font-semibold text-[#bfc4d9]">ManDhub</p>}

                    <p className="text-[15px] font-medium text-[#bfc4d9] flex flex-row items-center">
                        Commission: {isLoading?<Shimmer className="w-[130px] ml-2 h-5"></Shimmer>:<span className="text-[#bfc4d9] text-[15px] flex gap-x-1 ml-2 flex-row items-center">0.00000000 <FaBitcoin color="#ec8c08" /> {!campaign ? <RiArrowDropLeftLine size={25} /> : <RiArrowDropDownLine size={25} />} </span>}
                    </p>
                </div>
                {campaign &&
                    <>

                        <div className="w-full h-[2px] bg-[#d1d1d1] opacity-[50%]"></div>
                        <div className="w-full py-5 px-4 sm:px-10">
                            <div className="grid sm:grid-cols-3 grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-7">
                                {CampaignList.map((item, i) => (
                                    <div key={i} className={`${i === CampaignList.length - 1 ? 'col-start-1' : ''}`}>
                                        <div className="text-[15px] font-semibold">
                                            {item.title}
                                        </div>
                                        {isLoading?<Shimmer className="w-10 h-5"></Shimmer>:
                                        <div className="text-[13px] text-[#a7adbe] font-bold">
                                            {item.value}
                                        </div>}
                                    </div>
                                ))}

                            </div>
                            <div className="flex relative flex-col text-[15px] w-[100%] font-semibold my-4 md:w-[70%] sm:w-[50%] gap-1 justify-center items-start">

                                <div>Link</div>
                                <div className="flex flex-row">
                                    <input
                                        type="text"
                                        value={text}
                                        readOnly
                                        className="bg-[#34495e] w-full text-[14px] md:text-[15px] py-1.5 px-2 font-semibold text-white rounded-l-[5px] border-2 border-transparent hover:border-[#3f5a70] focus:outline-none"
                                    />
                                    {isCopied && (
                                    <div className="absolute md:left-[200px] z-10 top-0 bg-green-600 text-white text-sm px-2 py-1 rounded shadow">
                                        Copied!
                                    </div>
                                )}
                                    <button onClick={handleCopy} className="bg-[#34495e] rounded-r-[5px] px-4 hover:bg-[#3f5a70]">
                                        <IoCopySharp />
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    </>
                }
            </div>
            <div className="flex gap-5 text-[15px] text-gray-400 font-bold opacity-[80%] justify-center items-center">
                <div className="cursor-pointer">Previous</div>
                <div className="cursor-pointer">Next</div>
            </div>
            <div className="bg-[#263e48] cursor-pointer sm:w-full mt-5 hover:bg-[#77939e62] text-[14px] font-bold px-5 py-3 md:w-fit shadow-lg rounded-md flex-row flex justify-between items-center">
                Create New campaign
            </div>
        </div>
    );
}
export default Campaigns;