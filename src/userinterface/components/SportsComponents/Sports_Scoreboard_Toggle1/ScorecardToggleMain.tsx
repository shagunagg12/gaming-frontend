import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";

const ScoreCardToggleMain = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [value1, setValue1] = useState(2)
    const [value2, setValue2] = useState(2)
    const Shimmer = ({ className }: { className: string }) => (
        <div className={`shimmer-effect rounded-md ${className}`}></div>
    );

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
        return () => clearTimeout(timer);
    }, []);
    const QNASlides = [
        {
            main_heading: "Match Winner",
            main_headind2: "Twoway",
            team1: "SaW",
            team2: "BC.Gamer",
            map_items: [
                { yes: undefined, no: undefined, earning: 2.3, bet: 2.2, betT1: undefined, betT2: undefined, team: undefined },
                { earning: 4.9, bet: 1.9, betT1: undefined, betT2: undefined, team: undefined },
            ],
        },
        {
            main_heading: "Total Maps",
            heading1: "Over",
            heading2: "Under",
            map_items: [
                { bet: 3.4, earning: 2.2, betT1: undefined, betT2: undefined, team: undefined, yes: undefined, no: undefined, },
                { bet: 2.9, earning: 3.2, betT1: undefined, betT2: undefined, team: undefined, yes: undefined, no: undefined, },
            ],
        },
        {
            main_heading: "Map Handicap",
            team1: "ENCE",
            team2: "YUO",
            map_items: [
                { bet: 3.3, earning: 2.2, betT1: undefined, betT2: undefined, team: undefined, yes: undefined, no: undefined, },
                { bet: 2.5, earning: 1.8, betT1: undefined, betT2: undefined, team: undefined, yes: undefined, no: undefined, },
                { bet: 2.5, earning: 1.8, betT1: undefined, betT2: undefined, team: undefined, yes: undefined, no: undefined, },
                { bet: 2.5, earning: undefined, betT1: undefined, betT2: undefined, team: undefined, yes: undefined, no: undefined, },
            ]
        },
        {
            main_heading: "Correct Score",
            team1: "United FC",
            team2: "Danilovic",
            map_items: [
                { betT1: value1, betT2: value2, earning: 2.43, bet: undefined, team: undefined, yes: undefined, no: undefined, },
            ]
        },
        {
            main_heading: "Wins at Least One Map",
            map_items: [
                { team: "Newcastle", yes: 2.33, no: 1.22, earning: undefined, bet: undefined, betT1: undefined, betT2: undefined },
                { team: "Danilovic", yes: 1.63, no: 3.29, earning: undefined, bet: undefined, betT1: undefined, betT2: undefined },
            ]
        },
        {
            main_heading: "Halftime/Fulltime",
            earning: 2.2,
            selectItem: ["livepool", "Draw", "totannamman"]
        },
        {
            main_heading: "Winning Margin",
            team1: "ENCE",
            team2: "YUO",
            team3: "GFDF",
            map_items: [
                { bet: 3.3, earning: 2.2, betT1: undefined, betT2: undefined, team: undefined, yes: undefined, no: undefined, },
                { bet: 2.5, earning: 1.8, betT1: undefined, betT2: undefined, team: undefined, yes: undefined, no: undefined, },
                { bet: 2.5, earning: 1.8, betT1: undefined, betT2: undefined, team: undefined, yes: undefined, no: undefined, },
                { bet: 2.5, earning: undefined, betT1: undefined, betT2: undefined, team: undefined, yes: undefined, no: undefined, },
            ]

        }
    ];
    const [selectedValues, setSelectedValues] = useState<{ [key: number]: string }>({});

    // Handler to update the selected value for a specific select tag
    const handleChange = (index: number, value: string) => {
        setSelectedValues((prev) => ({
            ...prev,
            [index]: value,
        }));
    };

    const [activeSlide, setActiveSlide] = useState<Record<number, boolean>>({});

    const toggleSlide = (id: number) => {
        // alert("III"+ id)
        setActiveSlide((prev) => ({
            ...prev,
            [id]: !prev[id] || false
        }));
    };
    // 


    interface SliderProps {
        min: number;
        max: number;
        value: number;
        label: string | any;
        onChange: (value: number) => void;
    }

    const Slider: React.FC<SliderProps> = ({ min, max, value, label, onChange }) => {
        const trackRef = useRef<HTMLDivElement>(null);
        const draggingRef = useRef(false);
        const [tempValue, setTempValue] = useState(value);
        const [animateValue, setAnimateValue] = useState(value);

        const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;

        const getClosestValue = (clientX: number) => {
            if (!trackRef.current) return value;
            const rect = trackRef.current.getBoundingClientRect();
            const rawValue = ((clientX - rect.left) / rect.width) * (max - min) + min;
            return Math.round(Math.max(min, Math.min(max, rawValue)));
        };

        const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
            draggingRef.current = true;
            let latestValue = getClosestValue(e.clientX);
            setTempValue(latestValue);
            setAnimateValue(latestValue);

            const handleMouseMove = (event: MouseEvent) => {
                if (!draggingRef.current) return;
                latestValue = getClosestValue(event.clientX);
                setTempValue(latestValue);
                setAnimateValue(latestValue);
            };

            const handleMouseUp = () => {
                draggingRef.current = false;
                onChange(latestValue); // Use the latest value instead of `tempValue`
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            };

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        };

        const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
            const newValue = getClosestValue(e.clientX);
            setTempValue(newValue);
            setAnimateValue(newValue);
            onChange(newValue);
        };

        return (
            <div className="flex flex-col items-center p-4 gap-y-1 rounded-lg w-72">
                <div className="mb-2">{label}</div>
                {/* Slider Track */}
                <div
                    ref={trackRef}
                    className="relative w-full h-2 bg-[#c8e5f9] rounded-lg cursor-pointer"
                    onClick={handleClick}
                >
                    {/* Filled Track */}
                    <div
                        className="absolute h-full bg-blue-500 rounded-lg transition-all duration-100 ease-out"
                        style={{ width: `${getPercentage(animateValue)}%` }}
                    />

                    {/* Draggable Thumb */}
                    <div
                        className={`absolute w-5 h-5 bg-blue-500 rounded-full border-2 border-white cursor-pointer active:cursor-pointer transition-transform duration-100 ease-out ${draggingRef.current ? "scale-100" : ""
                            }`}
                        style={{
                            left: `${getPercentage(animateValue)}%`,
                            transform: "translate(-50%, -50%)",
                            top: "50%",
                        }}
                        onMouseDown={handleMouseDown}
                    />
                </div>

                {/* Number Labels */}
                <div className="flex justify-between w-full mt-3">
                    {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((num) => (
                        <span
                            key={num}
                            className={`text-white cursor-pointer ${num === value ? "font-bold text-blue-400" : "text-gray-400"
                                }`}
                            onClick={() => onChange(num)}
                        >
                            {num}
                        </span>
                    ))}
                </div>
            </div>
        );
    };
    const [selectFormate, setSelectFormate] = useState(false)
    const [SliderFormate, setSliderFormate] = useState(false)

    // 
    return (
        <div className="flex flex-col text-[14px] font-bold mt-5 text-white items-center gap-y-3 w-full">
            <div className="flex items-center w-full max-w-full border border-gray-600 rounded-md bg-[#0f1c26] px-3 py-2 focus-within:border-gray-400">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent text-gray-300 placeholder-gray-500 outline-none w-full"
                />
            </div>
            {QNASlides.map((item, index) => (
                <div key={index} className="bg-[#263e48] rounded-md flex flex-col w-full py-3 shadow-lg hover:shadow-xl transition-shadow duration-300 shadow-black/20">
                    <div onClick={() => toggleSlide(index)} className="flex cursor-pointer flex-row items-center justify-between px-4">
                        {isLoading ? <Shimmer className="w-[400px] h-[20px]"></Shimmer> :
                            <div>{item.main_heading && item.main_heading} {item.main_headind2 && !(item.main_heading == "Map Handicap") && " - " + item.main_headind2}</div>}
                        {isLoading ? <Shimmer className="w-[20px] h-[20px]"></Shimmer> :
                            <div className="cursor-pointer flex space-x-2">
                                {item.main_heading == "Correct Score" &&
                                    <>
                                        <div onClick={() => { setSliderFormate(false), setActiveSlide((prev) => ({ ...prev, [index]: !prev[index] || false })) }} className={`flex ${SliderFormate ? "hover:opacity-100 opacity-50" : ""}`}>Slider</div>
                                        <div onClick={() => { setSliderFormate(true), setActiveSlide((prev) => ({ ...prev, [index]: !prev[index] || false })) }} className={`flex ${!SliderFormate ? "hover:opacity-100 opacity-50" : ""}`}>All</div></>}

                                {item.main_heading == "Halftime/Fulltime" &&
                                    <>
                                        <div onClick={() => { setSelectFormate(false), setActiveSlide((prev) => ({ ...prev, [index]: !prev[index] || false })) }} className={`flex ${selectFormate ? "hover:opacity-100 opacity-50 " : ""}`}>Select</div>
                                        <div onClick={() => { setSelectFormate(true), setActiveSlide((prev) => ({ ...prev, [index]: !prev[index] || false })) }} className={`flex ${!selectFormate ? "hover:opacity-100 opacity-50" : " "}`}>All</div></>}
                                {activeSlide[index] ? (
                                    <IoIosArrowDown size={20} />
                                ) : (
                                    <IoIosArrowBack size={20} />
                                )}
                            </div>}
                    </div>
                    {activeSlide[index] ?
                        (<>

                            <div className="w-full h-[2px] bg-[#d1d1d1] opacity-[50%] mt-3"></div>
                            {item.main_heading == "Match Winner" &&
                                <div className=" pt-3 text-blue-100 text-[14px] font-medium justify-between w-full items-center px-4">
                                    <div className="w-full mb-1 flex justify-between">
                                        <div className="w-[50%] text-center"> {item.team1}</div>
                                        <div className="w-[50%] text-center">{item.team2}</div>

                                    </div>
                                    <div className="text-[14px] grid grid-cols-2 gap-4 w-full font-semibold">

                                        {item.map_items?.map((item) => (
                                            <div className="bg-[#0f1c26] justify-between rounded-[5px] w-full flex px-3 py-2">

                                                <div className={`${item.earning ? "font-bold" : "text-gray-300 opacity-[50%]"}`}> {item.earning ? item.earning : "Suspended"}</div>
                                                <div className={`${item.bet ? "text-blue-500 font-bold" : "text-gray-300 opacity-[50%]"}`}> {item.bet ? item.bet : "Suspended"}</div>

                                            </div>))}
                                    </div>
                                </div>}
                            {item.main_heading == "Total Maps" &&
                                <div>
                                    <div className="flex flex-col pt-3 gap-x-4 items-center justify-between w-full px-4">
                                        <div className="text-blue-100 text-[14px] mb-1 font-medium items-center w-full flex justify-between"><div className=" w-[50%] text-center">{item.heading1}</div><div className="w-[50%] text-center">{item.heading2}</div></div>

                                        <div className="grid grid-cols-2 gap-4 w-full text-center">

                                            {item.map_items?.map((item) => (
                                                <div className="justify-center w-full space-y-2">
                                                    <div className="bg-[#0f1c26] justify-between rounded-[5px] flex px-3 py-2">
                                                        <div>{item.bet && item.bet}</div>
                                                        <div
                                                            className={`${item.earning ? "text-blue-500 font-bold" : "text-gray-300 opacity-[50%]"
                                                                }`}
                                                        >
                                                            {item.earning ? item.earning : "Suspended"}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                </div>
                            }

                            {item.main_heading == "Map Handicap" &&
                                <div>
                                    <div className="flex flex-col pt-3 gap-x-4 items-center justify-between w-full px-4">
                                        <div className="text-blue-100 text-[14px] mb-1 font-medium items-center w-full flex justify-between"><div className=" w-[50%] text-center">{item.team1}</div><div className="w-[50%] text-center">{item.team2}</div></div>

                                        <div className="grid grid-cols-2 gap-4 w-full text-center">

                                            {item.map_items?.map((item) => (
                                                <div className="justify-center w-full space-y-2">
                                                    <div className="bg-[#0f1c26] justify-between rounded-[5px] flex px-3 py-2">
                                                        <div>{item.bet && item.bet}</div>
                                                        <div
                                                            className={`${item.earning ? "text-blue-500 font-bold" : "text-gray-300 opacity-[50%]"
                                                                }`}
                                                        >
                                                            {item.earning ? item.earning : "Suspended"}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                </div>
                            }

                            {item.main_heading == "Correct Score" &&
                                <>
                                    {!SliderFormate ?
                                        <div className="flex justify-between px-4 items-center space-x-4">
                                            <div className="flex w-[70%]">
                                                <Slider min={0} max={4} value={value1} onChange={setValue1} label={item.team1} />
                                                <Slider min={0} max={4} value={value2} onChange={setValue2} label={item.team2} />
                                            </div>
                                            {item.map_items?.map((item) => (
                                                <div className="bg-[#0f1c26] h-fit justify-between rounded-[5px] w-full flex px-3 py-2">
                                                    <div> {item.betT1}:{item.betT2}</div>
                                                    <div className={`${item.earning ? "text-blue-500 font-bold" : "text-gray-300 opacity-[50%]"}`}> {item.earning ? item.earning : "Suspended"}</div>

                                                </div>))}
                                            {/*  */}

                                        </div> :
                                        <div className="gap-4 grid p-4 pb-0 grid-cols-3">
                                            {/* Correct Score "all"... */}
                                            {Array(10).fill(null).map((_, index) => (
                                                item.map_items?.map((item, i) => (
                                                    <div
                                                        key={`${index}-${i}`}
                                                        className="bg-[#0f1c26] h-fit justify-between rounded-[5px] w-full flex px-3 py-2"
                                                    >
                                                        <div>{item.betT1}:{item.betT2}</div>
                                                        <div className={`${item.earning ? "text-blue-500 font-bold" : "text-gray-300 opacity-[50%]"}`}>
                                                            {item.earning ? item.earning : "Suspended"}
                                                        </div>
                                                    </div>
                                                ))
                                            ))}
                                        </div>}
                                </>
                            }
                            {item.main_heading == "Wins at Least One Map" &&
                                <>
                                    {item.map_items?.map((item) => (

                                        <div className="justify-between space-y-3 px-4 w-full  flex items-center">
                                            <div className="w-[40%] gap-4 ">{item.team}</div>
                                            <div className="w-[60%] gap-2 flex">
                                                <div className="bg-[#0f1c26] px-3 w-full py-2 rounded-[5px] flex justify-between"><div>Yes</div> <div className="text-blue-500">{item.yes}</div></div>
                                                <div className="bg-[#0f1c26] px-3 w-full py-2 rounded-[5px] flex justify-between"><div>No</div> <div className="text-blue-500">{item.no}</div></div>
                                            </div>

                                        </div>

                                    ))}
                                </>
                            }
                            {item.main_heading == "Halftime/Fulltime" &&
                                <>
                                    {!selectFormate ?
                                        <div className="flex flex-row w-full gap-2 px-4 mt-2">
                                            {[1, 2].map((num) => (
                                                <div key={num} className=" rounded-[5px] w-full flex">
                                                    <select
                                                        onChange={(e) => handleChange(num, e.target.value)}
                                                        className="bg-[#0d1a22] rounded-md border-[#395972] border-[1px] px-2 py-2 w-full text-white"
                                                        value={selectedValues[num] || ""}
                                                    >
                                                        {item.selectItem?.map((option) => (
                                                            <option key={option} value={option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </select>

                                                </div>

                                            ))}
                                            <div className="bg-[#0f1c26] px-3 w-full py-2 rounded-[5px] flex justify-between"><div>{selectedValues[1] || "none"}/{selectedValues[2] || "none"}</div> <div className="text-blue-500">{item.earning}</div></div>
                                        </div> :
                                        <div>
                                            <div className="flex flex-col pt-3 gap-x-4 items-center justify-between w-full px-4">

                                                <div className="justify-center grid grid-cols-3 gap-4 w-full">
                                                    {(() => {
                                                        const pairs = [];
                                                        for (let i = 0; i < item.selectItem.length; i++) {
                                                            for (let j = 0; j < item.selectItem.length; j++) {
                                                                pairs.push(
                                                                    <div
                                                                        key={`${i}-${j}`}
                                                                        className="bg-[#0f1c26] justify-between rounded-[5px] w-full flex px-3 py-2"
                                                                    >
                                                                        <div className="flex">{item?.selectItem[i]} / {item.selectItem[j]}</div>
                                                                        <div className="text-blue-600">{item.earning}</div>
                                                                    </div>
                                                                );
                                                            }
                                                        }
                                                        return pairs;
                                                    })()}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </>
                            }
                            {item.main_heading == "Winning Margin" &&
                                <div>
                                    <div className="flex flex-col pt-3 gap-x-4 items-center justify-between w-full px-4">
                                        <div className="text-blue-100 text-[14px] mb-1 font-medium items-center w-full flex justify-between"><div className=" w-[50%] text-center">{item.team1}</div><div className="w-[50%] text-center">{item.team2}</div> <div className="w-[50%] text-center">{item.team3}</div></div>

                                        <div className="grid grid-cols-3 gap-4 w-full text-center">

                                            {item.map_items?.map((item) => (
                                                <div className="justify-center w-full space-y-2">
                                                    <div className="bg-[#0f1c26] justify-between rounded-[5px] flex px-3 py-2">
                                                        <div>{item.bet && item.bet}</div>
                                                        <div
                                                            className={`${item.earning ? "text-blue-500 font-bold" : "text-gray-300 opacity-[50%]"
                                                                }`}
                                                        >
                                                            {item.earning ? item.earning : "Suspended"}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                </div>
                            }

                            {/*  */}
                        </>)
                        : (<></>)
                    }
                </div>
            ))}
        </div>
    )
}
export default ScoreCardToggleMain;