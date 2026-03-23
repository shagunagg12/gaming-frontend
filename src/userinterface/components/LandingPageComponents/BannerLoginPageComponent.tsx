import React from "react";

import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiSamsung } from "react-icons/si";
import { RiMastercardFill } from "react-icons/ri";
import cricketImg from "../../../assets/images/cricketImg.png"

export default function BannerLoginPageComponent(){
    return(
        <div className="md:grid-cols-2 select-none">
        <div className="w-full min-h-16 bg-[#0F212E] flex items-center justify-between my-10 rounded-md">
              <button className="bg-[#789461] hover:bg-[#50623A] text-sm text-white font-bold text-center px-4  h-10 rounded-sm w-30 m-6">
                                      Learn More
            </button>
            <h2>GambleGrid Bet</h2>
           <img src={cricketImg} alt="img here" className="px-8 h-20"/>
        </div>
        <div className="w-full min-h-16 bg-[#0F212E] flex items-center justify-between my-10 rounded-md">
              
            <h2 className="pl-8">No Cypto? No Problem</h2>
        <div className="sm:flex flex-row justify-evenly w-96 items-center">
                    <div><RiMastercardFill size={30} /></div>
                    <div className="sm:flex flex-row justify-center items-center text-2xl"><FaApple size={23} />Pay</div>
                    <div className="sm:flex flex-row justify-center items-center text-2xl"><FcGoogle size={23} />Pay</div>
                    <div className="sm:flex flex-col justify-center items-center "><SiSamsung size={55} className="-top-10" />Pay</div>
            
        </div>
           <button className="bg-[#789461] hover:bg-[#50623A] text-sm text-white font-bold text-center px-4  h-10 rounded-sm w-30 m-6">
            Buy Crypto
            </button>
        </div>
        </div>
    )
}