import SettledToken from "./SettledToken";
import { useEffect, useState } from "react";
import { SiInstatus } from "react-icons/si";
// interface BetPropsItem {
//     onClickOutside: (value: boolean) => void;
// }

// interface Props {
//     betProps: BetPropsItem | undefined;
// }
const Settled: React.FC = ({ }) => {
    // const [OddDialog, setOddDialog] = useState(false)
    // const handleOutsideClick = () => {
    //     setOddDialog(false)
    //     if (betProps) {
    //         betProps.onClickOutside(false);
    //     }
    // };
    const [isLoading, setIsLoading] = useState(true); // For shimmer effect
        useEffect(() => {
            const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
            return () => clearTimeout(timer);
        }, []);
    return (
        <div className="w-full flex relative max-h-screen h-[75%] justify-between items-start">
            <div className="w-full h-full">
                <div className="w-full h-[2px] z-10 bg-[#2e4250] my-2"></div>
                <div className="h-auto max-h-full scrollbar-thin scrollbar-thumb-[#1d3947] scrollbar-track-[#192e38] overflow-y-auto select-none">
                    {isLoading ?

                        <div className="w-full flex flex-col">
                            <div
                                role="status"
                                className="flex items-center h-14 sm:h-16 w-full shimmer-effect mb-2 last:mb-0 rounded-lg"
                            >
                                {/* Icon */}
                                <div className="flex items-center justify-center h-full w-14 sm:w-16">
                                    <SiInstatus size={24} className="text-gray-500" />
                                </div>
                                {/* Shimmer Text Lines */}
                                <div className="flex flex-col justify-center w-full px-4">
                                    <div className="w-2/3 h-3 sm:h-4 shimmer-effect mb-1 rounded"></div>
                                    <div className="w-1/2 h-3 sm:h-4 shimmer-effect rounded"></div>
                                </div>
                            </div>
                        </div>
                        :

                        <SettledToken />}
                </div>
            </div>

        </div>
    )
}
export default Settled;