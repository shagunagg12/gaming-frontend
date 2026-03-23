import VIPProgressCard from "../../Screens/sports/VIPProgressCard";
import VIPHeaderImage from "../../../assets/images/VIPHeader.png"
import { useEffect, useState } from "react";
import { RiVipFill } from "react-icons/ri";
const VIPClubHeader = () => {
    const [isLoading, setIsLoading] = useState(true); // For shimmer effect

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
        return () => clearTimeout(timer);
    }, []);
    return (
        <div style={{ backgroundImage: `url(${VIPHeaderImage})` }} className={`w-full bg-cover flex flex-row py-[60px] sm:px-[80px] sm:justify-between justify-center items-center p-4 bg-[#0f212e] text-white`}>
            <div className="flex sm:justify-center">
           {isLoading?
           
           <div role="status" className="flex items-center justify-center rounded-lg shimmer-effect  sm:w-[290px] sm:h-[120px] md:w-[250px] md:h-[100px] lg:h-[150px] lg:w-[340px] h-[110px] w-[280px]">
           <RiVipFill size={30} /></div>:
            <VIPProgressCard />}
            </div>
        </div>
    )
}
export default VIPClubHeader;