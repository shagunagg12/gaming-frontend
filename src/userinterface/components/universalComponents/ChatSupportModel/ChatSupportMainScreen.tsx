import { useEffect, useState } from "react";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { ImCross } from "react-icons/im";
import ChatSupport from "./ChatSupport";
const ChatSupportMainScreen = () => {
    const [isSM, setIsSM] = useState<boolean>(false);
      const [isOpen, setOpen] = useState<boolean>(
        () => JSON.parse(localStorage.getItem("isOpen") || "true")
      );
      const [isChatOpen, setChatOpen] = useState<boolean>(
        // () => JSON.parse(localStorage.getItem("isChatOpen") || "false")
        false
      );
    
      useEffect(() => {
        localStorage.setItem("isOpen", JSON.stringify(isOpen));
        localStorage.setItem("isChatOpen", JSON.stringify(isChatOpen));
      }, [isOpen, isChatOpen]);
    
    useEffect(() => {
        const updateScreenSize = () => {
            setIsSM(window.innerWidth <= 415);
        };
        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);

        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);
    return (
        <div className="h-screen flex flex-col justify-end items-end">
            {isOpen == true &&
                <div className={`flex-1 mt-16 z-20 mr-4  ${isSM ? "w-[300px]" : "w-96"} bg-white shadow-xl rounded-2xl relative overflow-hidden`}>
                    <div className="bg-gradient-to-r from-blue-500 to-blue-800 h-64 rounded-t-lg absolute w-full"></div>
                    <div className="flex flex-col overflow-y-auto scrollbar-thin scrollbar-track-[#142936] scrollbar-thumb-[#4cb0ef] border-[1px] border-white h-full p-4 space-y-4">
                        <div className="flex flex-col z-10 ml-4 text-white">
                            <div className="flex flex-row justify-between items-center">
                                <svg className="w-10 h-10 mb-3 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4">
                                    </path>
                                </svg>
                                <div onClick={() => setOpen(false)} className="cursor-pointer">
                                    <ImCross /></div></div>
                            <div className="text-[35px] font-extrabold">Hi Manish 👋</div>
                            <div className="text-[35px] w-full tracking-tighter font-extrabold mb-1">
                                How can we help?</div>
                        </div>
                        <div className="border-0 border-t-4 border-blue-500 rounded z-10 shadow-md text-sm">
                            <div className="bg-white border border-t-0 rounded-t-none rounded-b flex flex-col space-y-2">
                                <div className="px-6 py-4 flex flex-col items-start gap-3">
                                    <div className="font-semibold text-green-500">Start a conversation</div>
                                    <div className="flex flex-row gap-3">
                                        <div className="flex flex-row -space-x-10">
                                            <img className="w-16 h-16 rounded-full border-2 border-white"
                                                src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=facearea&w=256&h=256&facepad=2" />
                                            <img className="w-16 h-16 rounded-full border-2 border-white"
                                                src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=facearea&w=256&h=256&facepad=2" />
                                            <img className="w-16 h-16 rounded-full border-2 border-white"
                                                src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=facearea&w=256&h=256&facepad=2" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <div className="text-gray-600">Our usual reply time</div>
                                            <div className="flex flex-row items-center gap-1 text-[#5294cb] font-semibold">
                                                <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                                A few minutes
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => { setChatOpen(true), setOpen(false) }} type="button"
                                        className="bg-blue-700 rounded-full text-white flex flex-row gap-2 py-3 px-5">
                                        <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                        </svg>
                                        Send us a message
                                    </button>
                                </div>
                                <div className="border-t px-6 py-4">
                                    <a href="#" className="text-sm text-blue-500 hover:text-blue-300">See all your
                                        conversations</a>
                                </div>
                            </div>
                        </div>
                        <div className="border-0 border-t-4 border-blue-500 rounded z-10 shadow-md">
                            <div className="bg-white border border-t-0 rounded-t-none rounded-b p-6 flex flex-col space-y-2">
                                <div className="font-semibold text-gray-600 text-sm">Find your answer now</div>
                                <div className="flex flex-row">
                                    <input type="text" placeholder="Search our articles"
                                        className="border flex-1 rounded-l p-2 text-sm text-gray-600 shadow-inner outline-none bg-gray-50 focus:bg-white" />
                                    <button type="button" className="bg-blue-700 p-2 rounded-r">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {Array(2).fill(null).map(() => (
                            <div className="bg-white text-gray-400 border rounded flex items-center justify-center p-8 z-10">
                                this is a card
                            </div>))}
                    </div>
                </div>
            }
            {isChatOpen && <ChatSupport isChatOpen={isChatOpen} setChatOpen={setChatOpen} setOpenMainScreen={setOpen} />}
            <div onClick={() => { setOpen(prev => !prev), setChatOpen(false) }} className="bg-[#0f1c2bda] rounded-full w-12 h-12 m-4 flex items-center justify-center cursor-pointer shadow-xl">
                <TfiHeadphoneAlt />
            </div>
        </div>
    )
}
export default ChatSupportMainScreen;
