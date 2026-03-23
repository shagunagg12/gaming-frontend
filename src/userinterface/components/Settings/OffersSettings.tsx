import { useState } from "react";
import TextField from "./Textfield";

const OffersSettings = () => {
    const [Code1, setCode1] = useState("")
    const [Code2, setCode2] = useState("")
    return (
        <div className="text-white flex flex-col mb-20 min-h-fit mt-4 sm:mt-0 md:p-6 sm:p-4 p-2 space-y-8 rounded-lg bg-[#0f1c2bda] w-full">
            <div className="w-full rounded-lg flex bg-[#273849] pt-6 py-4 items-center justify-center flex-col">
                <div className="px-6 w-full text-start font-bold text-[18px] mb-3">Welcome offer</div>
                <div className="text-[14px] w-full flex items-start px-6 font-medium mb-3 text-blue-100">
                    To claim your welcome offer, please enter your code within 24 hours of signing up.
                </div>

                {/* Horizontal Line */}
                <div className="w-[95%] border-t border-[#6e8190]"></div>
                <div className="flex flex-col w-full items-start px-6 mt-4 mb-5 justify-start">
                    <div className="text-[14px] font-medium text-blue-100">Code <span className="text-red-400">*</span></div>
                    <input value={Code2} onChange={(e) => setCode2(e.target.value)} className={`px-3 py-2 border-2 md:w-[60%] w-full text-[14px] font-semibold overflow-auto scrollbar-none border-[#2f465d] hover:border-[#94b0ca] rounded-md bg-[#2f465d] shadow-lg`} />
                </div>
                <div className="w-full border-t border-[#6e8190] mb-5"></div>
                <div className="w-full flex items-center justify-end">
                    <button type="button" className="focus:outline-none text-white bg-[#2878e2] hover:bg-[#2c6ec5] focus:ring-4 focus:ring-blue-600 font-bold rounded-lg text-sm px-5 py-2.5 me-4">Submit</button>
                </div>
            </div>
            {/*  */}
            <div className="w-full rounded-lg flex bg-[#273849] pt-6 py-4 items-center justify-center flex-col">
                <div className="px-6 w-full text-start font-bold text-[18px] mb-3">Claim bonus drop</div>
                <div className="text-[14px] w-full flex items-start px-6 font-medium mb-3 text-blue-100">Find bonus drop codes on our social media's such as x.com (Twitter) & Telegram.</div>

                {/* Horizontal Line */}
                <div className="w-[95%] border-t border-[#6e8190]"></div>
                <div className="flex flex-col w-full items-start px-6 mt-4 mb-5 justify-start">
                    <div className="text-[14px] font-medium text-blue-100">Code <span className="text-red-400">*</span></div>
                    <input value={Code1} onChange={(e) => setCode1(e.target.value)} className={`px-3 py-2 border-2 md:w-[60%] w-full text-[14px] font-semibold overflow-auto scrollbar-none border-[#2f465d] hover:border-[#94b0ca] rounded-md bg-[#2f465d] shadow-lg`} />
                </div>
                <div className="w-full border-t border-[#6e8190] mb-5"></div>
                <div className="w-full flex items-center justify-end">
                    <button type="button" className="focus:outline-none text-white bg-[#2878e2] hover:bg-[#2c6ec5] focus:ring-4 focus:ring-blue-600 font-bold rounded-lg text-sm px-5 py-2.5 me-4">Submit</button>
                </div>
            </div>
        </div>
    )
}
export default OffersSettings;