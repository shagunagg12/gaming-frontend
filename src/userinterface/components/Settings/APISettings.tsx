import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoCopySharp } from "react-icons/io5";
import NoData from "../../../assets/images/NoData.png"

const APISettings = () => {
    const [isLoading, setIsLoading] = useState(true); // For shimmer effect
            const Shimmer = ({ className }: { className: string }) => (
                <div className={`shimmer-effect rounded-md ${className}`}></div>
            );
        
            useEffect(() => {
                const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
                return () => clearTimeout(timer);
            }, []);
    const tokenText = "jhgfhuyyt76%&^%*&^Thu765tyu8y7^%$RT&^TTYTY&^TGY7665rtg6tyui76tgfr67t65rtyyt6fyugyf"
    const [isReveal, setisReveal] = useState<boolean>(false)
    const [isDeactivated, setisDeactivated] = useState<boolean>(true)
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(tokenText).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };
    useEffect(() => {
        // localStorage.setItem('isReveal', JSON.stringify(isReveal));
        // localStorage.setItem('isDeactivated', JSON.stringify(isDeactivated));
    }, [isReveal]);
    const ActiveTokenItems = { Device: "Chrome", IPAddress: "110.227.54.13", Created: { date: "1/9/2025", time: "4:18 PM" }, Updated: { date: "1/9/2025", time: "4:20 PM" }, Deactivated: "Deactivated" }
    return (
        <div className="text-white flex flex-col min-h-fit mt-4 sm:mt-0 md:p-6 sm:p-4 p-2 space-y-8 rounded-lg bg-[#0f1c2bda] w-full">

            <div className="w-full rounded-lg flex bg-[#273849] pt-6 py-4 items-center justify-center flex-col">
                <div className="px-6 w-full text-start font-bold text-[18px] mb-4">
                    Token Creation
                </div>
                <div className={`text-[14px] font-medium w-full text-start px-6 pb-4 text-blue-100`}>
                    Disclaimer: Stake.com support will never ask you for this token. In giving this token to other people, you are granting them full access to your account.
                </div>
                <div className="w-[95%] border-t border-[#6e8190]"></div>
                <div className="flex flex-col gap-y-1 items-start py-4 w-full px-2 md:px-6">
                    <div className={`text-[14px] font-medium w-full text-start  text-blue-100`}>
                        Token
                    </div>
                    {isLoading?<Shimmer className="w-[20%] h-5"></Shimmer>:
                    <div className="flex flex-row">
                        <div className={`px-3 py-2 border-2 text-[14px] font-semibold sm:w-[200px] md:w-[400px] w-[150px] overflow-auto scrollbar-none ${!isReveal ? "text-[#9aa1a7]" : "text-white"} border-[#2f465d] hover:border-[#94b0ca] rounded-l-md bg-[#2f465d] shadow-lg`}>
                            {isReveal ? tokenText : "*".repeat(tokenText.length)}
                        </div>
                        <div onClick={handleCopy} className="flex items-center px-3 py-2 rounded-r-md bg-[#2f465d] border-2 border-[#2f465d] hover:border-[#94b0ca]">
                            {!copied ?
                                <IoCopySharp color="#9aa1a7" />
                                :
                                <FaCheck color="#9aa1a7" />}
                        </div>
                    </div>}

                </div>
                <div className="w-full border-t border-[#6e8190] mb-5"></div>
                <div className="w-full flex items-center px-4 pb-2 justify-between">
                    <div className={`text-[14px] font-bold text-start   text-white`}>
                        Do not share this!
                    </div>
                    <div onClick={() => setisReveal(true)} className={`px-7 py-3 text-[14px] shadow-md font-bold text-white rounded-md ${!isReveal?"hover:bg-[#6c839b] cursor-pointer":"opacity-[50%] cursor-default"}  bg-[#2f465d]`}>Reveal</div>
                </div>
            </div>
            {/*  */}
            <div className="w-full rounded-lg flex bg-[#273849] pt-6 py-4 items-center justify-center flex-col">
                <div className="px-6 w-full text-start font-bold text-[18px] mb-4">
                    Active Tokens
                </div>
                <div className={`text-[14px] font-medium w-full text-start px-6 pb-4 text-blue-100`}>
                    Stake currently operates with a closed API and therefore the use of these tokens are very limited.
                    Every time you choose to reveal a new API token using the "Token Creation" form, you are initiating a
                    new independent session. Old tokens are not deactivated until you use the click to disable all tokens.
                </div>
                <div className="w-[95%] border-t border-[#6e8190]"></div>
                {isReveal && isDeactivated ?
                    <>
                        <div className="w-full px-6 pt-8 pb-5 overflow-x-auto">
                            {/* Wrapper to ensure grid content does not shrink */}
                            <div className="min-w-max">
                                <div className="grid grid-cols-5 gap-4 text-blue-50">
                                    {/* Keys Row */}
                                    {Object.entries(ActiveTokenItems).map(([key]) =>
                                        key !== "Deactivated" ? (
                                            <div key={key} className="font-semibold text-[14px] text-center">
                                                {key}
                                            </div>
                                        ) : null
                                    )}
                                    <div className="font-semibold text-[14px] text-center"></div>
                                </div>

                                {/* Values Row */}
                                <div className="grid grid-cols-5 gap-4 mt-2 bg-[#1c2833] py-4 items-center rounded-md">
                                    {Object.entries(ActiveTokenItems).map(([key, value]) => (
                                        <div onClick={key=="Deactivated"?()=>setisDeactivated(false):undefined} key={key} className={`text-[14px] ${value==="Deactivated"?" bg-[#3d566f] mr-4 shadow-sm cursor-pointer hover:bg-[#6c839b] shadow-black py-3 rounded-md":""} font-semibold text-center`}>
                                            {typeof value === "object"
                                                ? `${value.date}, ${value.time}`
                                                : value}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="w-full border-t border-[#6e8190] mb-5"></div>
                        <div className="w-full flex items-center px-4 pb-2 justify-between">
                            <div className={`text-[14px] font-medium text-start text-blue-100`}>
                                Deactivating API tokens cannot be undone, however you can create a new one above.
                            </div>
                        </div>
                    </> :
                    <div className="flex flex-col w-full justify-center items-center px-5 mt-5 py-5 rounded-md">
                        <img className="md:w-[100px] w-[50px]" src={NoData} />
                        <div className="text-blue-100 text-[15px] mt-5 md:text-[18px] font-semibold">No Active API Tokens</div>
                    </div>
                }
            </div>
        </div>
    )
}
export default APISettings;