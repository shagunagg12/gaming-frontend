import ToggleTableComponent from '../../userinterface/components/LandingPageComponents/ToggleTableComponent'
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { useUserInfo } from '../../context/UserInfoContext';
import ManualBetOption from '../../userinterface/components/CasinoComponents/ManualBetOption';
import ManualBetOptionHilo from './ManualBetOptionHilo';
import { BiSolidUpArrow, BiUpArrow } from 'react-icons/bi';
import { FaAngleDoubleRight, FaChevronDown, FaChevronRight, FaChevronUp } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

interface Props{
  Bet:() =>void
  error:string
  setOption: (value: React.SetStateAction<"lo" | "hi">) => void
  randomRank:()=>number
  addCard: (rank: number) => void
  setWin: React.Dispatch<React.SetStateAction<boolean | null>>
  isCashingOut:boolean
  winningStreak:number
  cashout:()=>void
  setBetPlaced: React.Dispatch<React.SetStateAction<boolean>>
  setHoveredOption: React.Dispatch<React.SetStateAction<"lo" | "hi" | undefined>>
  firstRound:boolean
  handleSelectHigher:()=>void
  handleSelectLower:()=>void
}
function BetCalculatorHilo({
    Bet,
    error,
    setOption,
    randomRank,
    addCard,
    setWin,
    isCashingOut,
    winningStreak,
    cashout,
    setBetPlaced,
    setHoveredOption,
    handleSelectHigher,
    handleSelectLower,
    firstRound
    }:Props) {

    
    const toggleOption:toggleOptionProp[] = [
        { title: "Manual", key: 'manual' },
        { title: "Auto", key: 'auto'},
    
      ];
      interface toggleOptionProp {
        title:string;
        key:string;
      }

      const {betAmt} = useUserInfo()


     const handleHigherClick = () => {
          handleSelectHigher()    
          setBetPlaced(true)
          Bet();
      }

      const handleLowerClick = () => {
        handleSelectLower()
        setBetPlaced(true)
        Bet();
    }

    const handleSkip = () => {
        addCard(randomRank());
        setWin(null)
    }

    const handleHoverHigh =()=>{
        setHoveredOption('hi')
        // setOption('hi');
    }
        
    const handleHoverLow = ()=>{
        setHoveredOption('lo')
        // setOption('lo');
    }

const handleFirstBetOrCashout = () => {
  if (firstRound) {
    Bet();
  } else if (winningStreak > 0 && !isCashingOut) {
    cashout();
  }
}
  return (
    <div className='bg-[#213743] h-full p-3'>
        {/* <ToggleTableComponent defaultTable='manual'  ClassName='h-9 w-full' containerWidth='w-full' toggleOption={toggleOption}/> */}
        <ManualBetOptionHilo/>
        {/* <div>
      
      <p className='primaryTextColor font-bold text-[13px] mt-5'>Profit on win</p>
      <div  
      id='profit-on-win' 
      className="shadow-lg flex items-center justify-between w-full rounded px-3   text-white font-extrabold bg-[#355161]   data-[focus]:-outline-offset-2  focus:outline-none  h-11 border-[2px]  group-hover:border-[#54798f] transition-all duration-150  ease-in-out focus:border-slate-500 border-[#355161]" 
      >
        {betAmt * 3} <FaIndianRupeeSign/>
  </div>
    </div> */}
     <button disabled={firstRound} onMouseEnter={handleHoverHigh}  onClick={handleHigherClick} className={`mt-3 ${firstRound ? 'opacity-50' : ''} bg-[#2f4553] shadow-md text-white hover:bg-[#354e5e] text-sm  font-bold text-center px-4  h-12 rounded w-full flex justify-center items-center gap-2`}>
              Higher or Same  <FaChevronUp color='yellow'/>
        </button>
        <button disabled={firstRound  }  onMouseEnter={handleHoverLow} onClick={handleLowerClick} className={`mt-3 ${firstRound ? 'opacity-50' : ''} text-white bg-[#2f4553] shadow-md hover:bg-[#354e5e] text-sm  font-bold text-center px-4  h-12 rounded w-full flex justify-center items-center gap-2`} >
              Lower or Same  <FaChevronDown size={16} color='purple'/>
        </button>
        <button  onClick={handleSkip} className="mt-3 text-white bg-[#2f4553] shadow-md hover:bg-[#354e5e] text-sm  font-bold text-center px-4  h-12 rounded w-full flex justify-center items-center gap-2" >
            Skip Card <FaAngleDoubleRight size={16}   color='white'/>
        </button>

        <button  onClick={handleFirstBetOrCashout} className="mt-6 text-black bg-[#04d001] hover:bg-[#059213] shadow-md text-sm  font-bold text-center px-4  h-14 rounded w-full">
             {!firstRound || winningStreak >= 1 ? 'Cashout' : 'Bet'}
        </button>

        
        {winningStreak >= 1 && !isCashingOut && (
              <button className="cashout-button" onClick={cashout}>
                Cashout
              </button>
            )}

            {/* Optionally, you can display the winning streak */}
            {winningStreak > 0 && !isCashingOut && (
              <div className="streak-info">
                <strong>Winning Streak: {winningStreak}x</strong>
              </div>
            )}


        <p className='secondaryTextColor font-bold text-[16px] mt-5 flex justify-center'>{error}</p>

    </div>
  )
}

export default BetCalculatorHilo
