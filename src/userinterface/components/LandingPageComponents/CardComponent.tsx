
import { GiCardAceHearts } from "react-icons/gi";
import { MdSportsBasketball } from "react-icons/md"
import CasinoCard from "../../../assets/images/CasinoCard.jpg"
import sportsBanner from "../../../assets/images/sportsBanner.jpg"


export default function CardComponent (){
    return(
        
        <div className="md:grid-cols-2 grid gap-5 select-none">
       <div>
        <a href="" className="sm:w-100 pb-5 flex justify-start text-gray-400 text-lg font-bold items-center hover:text-white " > <GiCardAceHearts  /><span className="text-white">Casino</span></a>
        <a href="" >
        <img src={CasinoCard}  alt="" className="rounded-lg opacity-50 pb-1 hover:-translate-y-1  h-fit "/>
            <div className="text-white font-bold text-base  py-3" >Leading Online Casino  </div>
            <p className="text-sm  text-slate-400 pb-5 font-medium">Browse our giant range of casino games as Stake offers a fair and fun online gambling experience. Play Slots, Live Casino, Blackjack, Baccarat, Roulette, and thousands of classic casino games right from your browser, including your favourite Stake Originals.</p>
            <button className="bg-[#04d0018c] hover:bg-[#059213b2] text-sm text-white font-bold text-center px-4  h-10 rounded-sm w-full">
                                       Go to Casino
            </button>
        </a>
        </div>
            <div>
        <a href="" className="sm:w-100 pb-5 flex justify-start text-gray-400 text-lg font-bold items-center hover:text-white " > <MdSportsBasketball  /><span className="text-white py">Sports</span></a>
        <a href="">
            <img src={sportsBanner}  alt="" className="sm:rounded-lg opacity-65 pb-1 hover:-translate-y-1  h-fit  "/>
            <div className="text-white font-bold text-base  py-3" >Best Sports Betting Online</div>
              
            <p className="text-sm font-normal text-slate-400 pb-5 ">Browse our giant range of casino games as Stake offers a fair and fun online gambling experience. Play Slots, Live Casino, Blackjack, Baccarat, Roulette, and thousands of classic casino games right from your browser, including your favourite Stake Originals.</p>
            <button className="bg-[#04d0018c] hover:bg-[#059213b2] text-sm text-white font-bold text-center px-4  h-10 rounded-sm w-full">
                                        Go to Sports
            </button>
        </a>
        </div>
       
        </div>
    )
}


