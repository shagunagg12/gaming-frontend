import { GiTrophy } from "react-icons/gi";
import NoTrophiesData from "../../../../assets/images/NoData.png"
import DropdownStatistics, { MenuItem } from "./DropDownStatistics";
import { useEffect, useState } from "react";
const Trophies = () => {
    const users: MenuItem[] = [
        { title: "Luckiest" },
        { title: "Biggest" },
    ];
      const [isLoading, setIsLoading] = useState(true); // For shimmer effect
        const Shimmer = ({ className }: { className: string }) => (
            <div className={`bg-[#aaaabcd7] rounded-md shimmer-effect ${className}`}></div>
        );
        useEffect(() => {
            const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
            return () => clearTimeout(timer);
        }, []);
    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between py-3 items-center">
                <div className="text-[15px] font-bold gap-x-2 text-white flex items-center"><GiTrophy /> Luckiest Wins</div>
                <div> 
                {isLoading?<Shimmer className="w-[60px] h-6"></Shimmer>:
                    <DropdownStatistics
                    buttonText={users[0].title}
                    menuItems={users}
                />}
                </div>
            </div>
            <div className="flex flex-col w-full justify-center items-center px-5 mt-5 py-5 rounded-md">
                <img className="md:w-[100px] w-[50px]" src={NoTrophiesData} />
                <div className="text-blue-100 text-[15px] mt-5 md:text-[18px] font-semibold">
                    This user has no visible statistics.
                </div>
            </div>
        </div>
    )
}
export default Trophies;