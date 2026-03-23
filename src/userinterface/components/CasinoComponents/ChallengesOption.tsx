import { FaChartLine } from "react-icons/fa";

function ChallengesOption() {
  return (<>
    <div className=" flex justify-center   ">
      <FaChartLine size={'80px'}  color="#3a4a61"/>
      <div className="w-3 h-3 bg-green-700 rounded-full"/>
    </div>
    <span className="flex justify-center text-[14px] text-[#a3b3ca]">Dice has no active challenges</span>
    </>
  )
}

export default ChallengesOption

