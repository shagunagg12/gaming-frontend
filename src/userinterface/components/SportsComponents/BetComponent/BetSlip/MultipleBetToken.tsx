import { ImCross } from "react-icons/im";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
const MultipleBetToken:React.FC=()=>{

    const data = [
        {
            PlayersName: "Michal hasi",
            EstPayout: "0.00000000",
            BetAmount: "0.00000000",
            isLive: true,
            isSettled: false,
            StockRate: "increase",
            Bet: 1.77
        },
        {
            PlayersName: "David Jack",
            EstPayout: "2.33333333",
            BetAmount: "2.33333333",
            isLive: false,
            isSettled: false,
            StockRate: "decrease",
            Bet: 2.55
        },
        {
            PlayersName: "Ruii Koiii",
            EstPayout: "1.00099999",
            BetAmount: "1.00099999",
            isLive: true,
            isSettled: true,
            StockRate: "increase",
            Bet: 2.55
        },
        {
            PlayersName: "Ruii Koiii",
            EstPayout: "1.00099999",
            BetAmount: "1.00099999",
            isLive: true,
            isSettled: true,
            StockRate: "increase",
            Bet: 2.55
        },
    ];

    return (
        <>
            {data.map((item, index) => (

                <div
                    key={index}
                    className="flex rounded-md bg-[#22313b] w-[92%] mx-2 pb-2 flex-col justify-between relative"
                >
                    <div
                        className="absolute bottom-0 left-0 w-full h-[12px]"
                        style={{
                            background: `
                              radial-gradient(circle at bottom, #0e1921 6px, transparent 2px)`,
                            backgroundSize: '15px 15px',
                            backgroundRepeat: 'repeat-x',
                        }}
                    ></div>
                    {!(index === 0) ? 
                    <div
                        className="absolute top-0 left-0 w-full h-[12px]"
                        style={{
                            background: `
                              radial-gradient(circle at top, #0e1921 6px, transparent 6px)`,
                            backgroundSize: '15px 15px',
                            backgroundRepeat: 'repeat-x',
                        }}
                    ></div>:
                    <></>}

                    <div className="bg-[#2e4250] text-[15px] py-1.5 px-3 rounded-t-md font-medium w-[100%] flex items-center justify-between flex-row">
                        <div className="flex flex-row space-x-2 pt-1 items-center">
                            {item.isLive && (
                                <div className="text-[12px] bg-[#d30d01] px-1 rounded-sm">Live</div>
                            )}
                            <div>{item?.PlayersName}</div>
                        </div>
                        <ImCross color="#c9c9c9" size={10} />
                    </div>
                    <div className="flex flex-col w-full py-2">
                        <div className="justify-between px-3 text-[15px] text-white opacity-[70%]">
                            1 x 2
                        </div>
                        <div className="justify-between flex items-end flex-row px-3 text-[15px] text-white">
                            <div className="text-white font-bold">Michal Clark</div>
                            {item.isSettled == false ?
                                <div className="text-[#0595ff] items-center flex flex-row font-bold">
                                    {item.StockRate === "increase" && (
                                        <IoMdArrowDropdown size={17} color="red" />
                                    )}
                                    {item.StockRate === "decrease" && (
                                        <IoMdArrowDropup size={17} color="#88ff00" />
                                    )}
                                    <div>{item.Bet}</div>
                                </div> : <div className="text-red-500">Settled</div>}
                        </div>
                    </div>

                </div>
            ))}
        </>
    );
}
export default MultipleBetToken;