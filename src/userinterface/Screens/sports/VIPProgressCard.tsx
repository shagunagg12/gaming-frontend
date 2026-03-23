import { IoMdStarOutline } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoInformationCircle } from "react-icons/io5";

const VIPProgressCard = () => {
    return (
        <div className="sm:w-[290px] md:w-[250px] lg:w-[340px] w-[280px] bg-[#2a503fb1] text-white rounded-lg p-3">
        <div className="bg-[#1c5a1c6e] text-white rounded-lg border-2 border-gray-600 p-4 shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center md:mb-[20px] lg:mb-[30px] sm:mb-[15px] mb-[10px]">
            <h2 className="md:text-[17px] sm:text-[14px] text-[12px] font-extrabold">ManDhub</h2>
            <IoMdStarOutline className="text-gray-500" />
          </div>
    
          {/* VIP Progress */}
          <div className="text-sm mb-2 flex  justify-between sm:flex-row">
            <div className="md:text-[12px] lg:text-[15px] sm:text-[12px] flex flex-row items-center text-[10px] font-bold">Your VIP Progress <FaArrowRightLong className="ml-3"/></div>
            <div className="float-right lg:text-[15px] md:text-[12px] flex flex-row sm:text-[12px] text-[10px] font-bold items-center">0.00% <IoInformationCircle size={18} className="ml-0.5"/></div>
          </div>
    
          {/* Progress Bar */}
          <div className="relative bg-[#3a6488c3] h-2 rounded-full mb-2">
            <div
              className="absolute bg-gray-500 h-full rounded-full"
              style={{ width: "0%" }}
            ></div>
          </div>
    
          {/* VIP Status */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-1">
              <IoMdStarOutline className="text-gray-500" />
              <span className="md:text-[13px] sm:text-[10px] text-[8px]">None</span>
            </div>
            <div className="flex items-center space-x-1">
              <IoMdStarOutline className="text-yellow-500" />
              <span className="md:text-[13px] sm:text-[10px] text-[8px]">Bronze</span>
            </div>
          </div>
        </div>
        </div>
      );
    
}
export default VIPProgressCard;