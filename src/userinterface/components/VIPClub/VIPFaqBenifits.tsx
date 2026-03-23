import { useState } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";

const VIPFAQBenifits=()=>{
   const QNASlides = [
                   {
                       id: 1,
                       Ques: "How can I promote Stake as an affiliate?",
                       Ans:"Affiliates can promote Stake through various channels, including social media networks, live streaming, websites & any other traffic sources they may have. We provide a range of banners, links, and other marketing promotions to help you succeed."
                   },
                   {
                       id: 2,
                       Ques: "How can I create new campaigns?",
                       Ans: "Visit the campaigns section of your affiliate dashboard to effortlessly create new campaigns and optimise your results for enhanced analysis."
                   },
                   {
                       id: 3,
                       Ques: "How do I check the performance of my campaigns?",
                       Ans: "You can monitor your campaign performance by visiting the campaigns section for an overview of your active campaigns and results, and by reviewing the referred users section for detailed insights into player activity and conversions."
                   },
                   {
                       id: 4,
                       Ques: "Where can I find banners & creatives to promote my campaigns?",
                       Ans: "You can find marketing materials here  to use in your campaigns. Additionally, check our casino and sports promotions here to boost traffic and enhance your campaign effectiveness."
                   },
                   {
                       id:5,
                       Ques:"What countries can I target through my campaigns?",
                       Ans:"You can promote Stake.com in all countries except those listed in our prohibited jurisdictions. For more information, refer to the Stake Terms of Service ."
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
                                   <div>{item.Ques}</div>
                                   <div className="cursor-pointer">
                                       {activeSlide[item.id] ? (
                                           <IoIosArrowDown size={20} />
                                       ) : (
                                           <IoIosArrowBack size={20} />
                                       )}
                                   </div>
                               </div>
                               
                               {activeSlide[item.id] ?
                               (<>
                               <div className="w-full h-[2px] bg-[#d1d1d1] opacity-[50%] mt-3"></div>
                                   <div className="flex flex-row py-3 items-center px-4">
                                       <div className="text-[14px] font-semibold text-[#c4d8ec]">{item.Ans}</div>
                                   </div>
                                   </>)
                                   :(<></>)
           }
                           </div>
                       ))}
                   </div>
               );
}
export default VIPFAQBenifits;