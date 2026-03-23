import { IoTicket } from "react-icons/io5";
import { HiColorSwatch } from "react-icons/hi";
import ToggleComponent from "../../../universalComponents/ToggleComponent";
import { IconType } from "react-icons";
import { IoPrint } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown, IoIosCheckmarkCircle, IoIosTimer } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../../../context/authContext";

interface BetPropsItem {
  onClickOutside: (value: boolean) => void;
}

interface Props {
  betProps: BetPropsItem | undefined;
}

const BetSlip: React.FC<Props> = ({ betProps }) => {
  const [OddDialog, setOddDialog] = useState(false);
  const [selectedDialogTextProps, setSelectedDialogTextProps] = useState(0);
  const [betHeading, setBetHeading] = useState("Bet Slip");
  const [iconColor, setIconColor] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown container
  const { isBetSlipOpen, setIsBetSlipOpen } = useAuth();

  interface toggleOption {
    title: string;
    key: string;
    icon: IconType;
  }

  const toggleOption1: toggleOption[] = [
    { title: "Single", key: "betSlipSingle", icon: IoTicket },
    { title: "Multi", key: "betSlipMulti", icon: HiColorSwatch },
  ];

  const toggleOption2: toggleOption[] = [
    { title: "Active", key: "mybetActive", icon: IoIosTimer },
    { title: "Settled", key: "mybetSettled", icon: IoIosCheckmarkCircle },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOddDialog(false);
      }
    };

    if (OddDialog) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [OddDialog]);

  return (
    <div className=" w-[310px] 1170px:w-[370px] relative   h-screen max-h-screen overflow-y-hidden bg-[#0f212e]">
      <div className="flex flex-row w-full items-center  z-50 shadow-black shadow-md bg-[#0f212e]  h-[72px] justify-between px-4 mb-2 py-1">
        {/* DropDown */}
        <div
          onClick={(e) => {
            setOddDialog((prev) => !prev);
            e.stopPropagation();
          }}
          onMouseEnter={() => setIconColor(true)}
          onMouseLeave={() => setIconColor(false)}
          className="flex relative cursor-pointer flex-row items-center justify-center space-x-2 font-semibold text-[15px]"
        >
          <IoPrint size={17} color={`${iconColor === true ? "white" : "#c9c9c9"} `} />
          <div>{betHeading}</div>
          <div className="text-black text-[13px] mt-0.5 items-center bg-blue-500 px-2.5 rounded-xl">3</div>
          <IoIosArrowDown color={`${iconColor === true ? "white" : "#c9c9c9"} `} className="ml-2" />
        </div>
        {OddDialog && (
          <div
            ref={dropdownRef} // Attach ref to dropdown container
            className="flex absolute cursor-pointer text-gray-800 top-12 text-[15px] left-10 rounded-md py-1 font-semibold bg-white leading-loose flex-col z-10"
          >
            <div
              onMouseEnter={() => setSelectedDialogTextProps(1)}
              onClick={() => {
                setOddDialog(false);
                setBetHeading("Bet Slip");
              }}
              className={`px-3 items-center py-0.5 flex flex-row gap-2 ${
                selectedDialogTextProps === 1 && "bg-[#bfc6d3]"
              }`}
            >
              Bet Slip{" "}
              <div className="rounded-full px-2 flex items-center h-6 bg-[#076dfb]">6</div>
            </div>
            <div
              onMouseEnter={() => setSelectedDialogTextProps(2)}
              onClick={() => {
                setOddDialog(false);
                setBetHeading("My Bets");
              }}
              className={`px-3 py-0.5 ${selectedDialogTextProps === 2 && "bg-[#bfc6d3]"}`}
            >
              My Bets
            </div>
          </div>
        )}
        {/* End Drop down */}
        <button
          type="button"
          className="text-white bg-[#0e1921] hover:bg-black focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-4"
        >
          <ImCross onClick={()=>setIsBetSlipOpen(false)} size={10} color="#c9c9c9" />
        </button>
      </div>

      {betHeading === "Bet Slip" && (
        <ToggleComponent
          betProps={betProps}
          defaultToggleOption="betSlipSingle"
          toggleOptions={toggleOption1}
        />
      )}
      {betHeading === "My Bets" && (
        <ToggleComponent
          betProps={betProps}
          defaultToggleOption="mybetSettled"
          toggleOptions={toggleOption2}
        />
      )}
 
    </div>
  );
};

export default BetSlip;
