import React, { useEffect, useState } from "react";
import { FaBitcoin } from "react-icons/fa";
import { useAuth } from "../../../../../context/authContext";
import { useBet } from "../../../../../context/betContext";
import { useDialog } from "../../../../../context/DialogContext";
import useApi from "../../../../../hooks/useApi";
import { BetSlip } from "../../../../../utils/types/sports";
import { useUserInfo } from "../../../../../context/UserInfoContext";
import { AlertTriangle } from "lucide-react";
import { useSportsData } from "../../../../../context/sportsContext";
interface Props {
    TotalText: string;
    EstText: string
    TotalNumber?: number | string;
    EstNumber?: number | string;
    Random: boolean;
    AmountBar: boolean;
    setCalculator: (value: boolean) => void;
}
const BottomBetSlip: React.FC<Props> = ({ TotalNumber, EstNumber, TotalText, AmountBar, setCalculator, EstText, Random }) => {
    const [isLoading, setIsLoading] = useState(true); // For shimmer effect
    
    const {isLoggedIn} = useAuth();
    const {openSignupDialog,openSigninDialog}  = useDialog();
    const {LiveMatchesSportWise} = useSportsData()
    const {betSlip} = useBet();
    const {usePostData} = useApi();
    const {userWalletBalance} = useUserInfo()
    

    const {mutate: placeBet} = usePostData('bets');
    


const betSlipOdds = betSlip.flatMap((b) => b);


const betSlipMatchIds = new Set(betSlipOdds.map(b => b.match));
const betSlipQuestionIds = new Set(betSlipOdds.map(b => b.market));
const betSlipSelectionIds = new Set(betSlipOdds.map(b => b.selection));


const liveOdds = LiveMatchesSportWise?.data
  .flatMap(match => 
    match.betQuestions?.filter(
      question => betSlipMatchIds.has(question.matchId) && 
                  betSlipQuestionIds.has(question._id)
    )
    // .flatMap(question =>
    //   question.selections?.filter(sel => betSlipSelectionIds.has(sel._id)) ?? []
    // ) ?? []
  ) ?? [];

console.log("Live Odds:", liveOdds);
console.log("BetSlip Odds:", betSlipOdds);
    
    

   const betTotal = betSlip.reduce((total, bet) => {
  const stake = parseFloat(String(bet.stake));
  return total + (isNaN(stake) ? 0 : stake);
}, 0);

    const betEstTotal = betSlip.reduce((total, bet) => {
        const stake = Number(bet.stake);
        const odd = bet?.currentOddFr !== undefined ? Number(bet.currentOddFr) : 0;
        return total + stake * odd;
    }, 0);

   const cleanedBets = betSlip.map(bet => ({
    match: bet.match, 
    market: bet.market || bet.questionFr,
    selection: bet.selection,
    odds: bet.currentOddFr,
    stake: bet.stake,
    sport: bet.sport,
  }));
    const handlePlaceBet = () => {
        if(!isLoggedIn){
            openSignupDialog();
        }else{
        placeBet({bets:cleanedBets},{
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (error) => {
                console.log(error);
            }
        });
        }
    }
    
        const Shimmer = ({ className }: { className: string }) => (
            <div className={`shimmer-effect rounded-md ${className}`}></div>
        );
    
        useEffect(() => {
            const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
            return () => clearTimeout(timer);
        }, []);
    return (
        <div className="bg-[#22313b] absolute w-full main-h-[164px]  text-[14px] bottom-0 flex z-10 flex-col p-4 ">

            
            {AmountBar &&
                <div className="bg-[#2e4250] flex flex-row mb-2 px-2 py-2 justify-between items-center">
                    <input onClick={()=>setCalculator(true)} className="w-64 text-white font-semibold bg-transparent border-none outline-none caret-white placeholder-gray-400" value={0} />
                    <FaBitcoin size={15} color="#ec8c08" className="ml-2" />

                </div>}

               {betSlip.length>0 &&  userWalletBalance<=0 && <div className="border-2 py-2 px-3 mb-4 text-[15px] border-dashed rounded secondaryTextColor bg-[#0f212e] flex justify-center items-center gap-2">
                   <AlertTriangle size={20}/> You cannot bet more than your balance.
                </div>}

   {betSlipOdds.some(bet => {
  // find the live question
  const liveQuestion = liveOdds.find(live => live?._id === bet.market);

  if (!liveQuestion) return false;

  // find the live selection
  const liveSelection = liveQuestion?.selections?.find(sel => sel._id === bet.selection);

  if (!liveSelection) return false;

  // check if odds changed
  return liveSelection.currentOdds !== bet.currentOddFr;
}) && (
  <div className="border-2 py-2 px-3 mb-4 text-[15px] border-dashed rounded secondaryTextColor bg-[#0f212e] flex items-start gap-2">
    <AlertTriangle width={35} />  
    <p>
      Odds have changed. To place a bet you need to review and approve changes first.
    </p>
  </div>
)}
            <div className="flex flex-row justify-between items-center">
                <div className="text-white opacity-[80%]">{TotalText}</div>
                {isLoading?<Shimmer className="w-20 h-3"></Shimmer>:
                <div className={`flex text-${!Random ? "white" : "[#0595ff]"} font-bold flex-row items-center`}>{betTotal} {!Random && <FaBitcoin color="#ec8c08" className="ml-2" />}</div>}
            </div>
            <div className="flex flex-row justify-between items-center">
                <div className="text-white opacity-[80%]">{EstText}</div>
                {isLoading?<Shimmer className="w-20 h-3"></Shimmer>:
                <div className="flex flex-row items-center font-bold text-white">{betEstTotal} <FaBitcoin color="#ec8c08" className="ml-2" /></div>}
            </div>
            <button disabled={userWalletBalance<=0} onClick={handlePlaceBet} type="button" className={`text-white mt-10  hover:bg-blue-800   me-1 rounded text-sm  px-5 py-3 focus:outline-none font-bold ${userWalletBalance<=0?'opacity-40 bg-blue-500':'bg-blue-700'}`}>{isLoggedIn?"Place Bet":"Register to Bet"}</button>
        </div>
    )
}
export default BottomBetSlip;