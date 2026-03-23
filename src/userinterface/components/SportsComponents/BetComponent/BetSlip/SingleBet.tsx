import { IoIosArrowDown } from "react-icons/io";
import SingleBetToken from "./SingleBetToken";
import { useEffect, useRef, useState } from "react";
import { LuTicketPercent } from "react-icons/lu";
import { useBet } from "../../../../../context/betContext";
interface BetPropsItem {
  onClickOutside: (value: boolean) => void;
}

interface Props {
  setCalculator: (value: boolean) => void;
  betProps: BetPropsItem | undefined;
}
const SingleBet: React.FC<Props> = ({ setCalculator, betProps }) => {
  const [isLoading, setIsLoading] = useState(true); // For shimmer effect
  const {betSlipRef} =useBet()


  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
    return () => clearTimeout(timer);
  }, []);
  const handleOutsideClick = () => {
    setOddDialog(false);
    if (betProps) {
      betProps.onClickOutside(false);
    }
  };

  const [OddDialog, setOddDialog] = useState(false);
  const [DialogText, setDialogText] = useState("No Odds Changes Accepted");
  const [DialogTextColor, setDialogTextColor] = useState(false);
  const [selectedDialogTextProps, setSelectedDialogTextProps] = useState(0);
  return (
    <div className="w-full  flex relative flex-col max-h-screen h-[63.5%] justify-between items-start ">
      <div className="w-full  h-full ">
        <div className="w-full h-[2px] z-10 bg-[#2e4250] my-2"></div>
        <div
          onClick={handleOutsideClick}
          onMouseLeave={() => setDialogTextColor(false)}
          onMouseEnter={() => setDialogTextColor(true)}
          className="w-full pb-2 relative px-2 z-10 justify-between flex flex-column"
        >
          <div
            onClick={(e) => {
              setOddDialog((prev) => !prev), e.stopPropagation();
            }}
            className={`text-[14px] flex secondaryTextColor cursor-pointer flex-column items-center text-[${
              !DialogTextColor ? "#afb6c1" : "white"
            }] font-medium`}
          >
            {DialogText}
            <IoIosArrowDown className="ml-2" />
          </div>
          <div className="text-[14px] text-white opacity-[90%] font-semibold">
            Clear All
          </div>
        </div>
        {OddDialog && (
          <div className="flex absolute cursor-pointer text-gray-800 text-[15px] left-1.5 rounded-md py-1 font-semibold bg-white leading-loose flex-col z-10">
            <div
              onMouseEnter={() => setSelectedDialogTextProps(1)}
              onClick={() => {
                setDialogText("Accept Any Odds"), setOddDialog(false);
              }}
              className={`px-3 py-0.5 ${
                selectedDialogTextProps == 1 && "bg-[#bfc6d3]"
              } ${DialogText == "Accept Any Odds" && "text-[#076dfb]"}`}
            >
              Accept Any Odds
            </div>
            <div
              onMouseEnter={() => setSelectedDialogTextProps(2)}
              onClick={() => {
                setDialogText("Accept Only Highers Odds"), setOddDialog(false);
              }}
              className={`px-3 py-0.5 ${
                selectedDialogTextProps == 2 && "bg-[#bfc6d3]"
              } ${
                DialogText == "Accept Only Highers Odds" && "text-[#076dfb]"
              } `}
            >
              Accept Only Highers Odds
            </div>
            <div
              onMouseEnter={() => setSelectedDialogTextProps(3)}
              onClick={() => {
                setDialogText("No Odds Changes Accepted"), setOddDialog(false);
              }}
              className={`py-0.5 ${
                selectedDialogTextProps == 3 && "bg-[#bfc6d3]"
              } ${
                DialogText == "No Odds Changes Accepted" && "text-[#076dfb]"
              } font-medium px-3`}
            >
              No Odds Changes Accepted
            </div>
          </div>
        )}
        <div
          onClick={() => setOddDialog(false)}
         
          className="h-auto max-h-full scrollbar-thin scrollbar-thumb-[#1d3947] scrollbar-track-[#192e38]  overflow-x-hidden select-none "
        >
          {isLoading ? (
            //  loading effect
            <div className="flex rounded-md bg-[#22313b]  m-2 pb-2 flex-col justify-center items-center relative ">
              <div
                className="absolute bottom-0 left-0 w-full h-[12px]"
                style={{
                  background: `
                      radial-gradient(circle at bottom, #0e1921 6px, transparent 6px)`,
                  backgroundSize: "12px 12px",
                  backgroundRepeat: "repeat-x",
                }}
              ></div>

              <div className="bg-[#2e4250] h-8 text-[15px] py-1.5 px-3 rounded-t-md font-medium w-[100%] flex items-center justify-between flex-row ">
              </div>
              <div className="flex flex-col w-full py-2 h-28 loading-container">

                <div className="flex flex-row space-x-2 items-center line"> <div className="ball"></div></div>

              </div>
            </div>
          ) : (
            <SingleBetToken setCalculator={setCalculator} />
          )}
        </div>
      </div>
    </div>
  );
};
export default SingleBet;
