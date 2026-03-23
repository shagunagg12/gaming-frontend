import React from 'react'
import bullsEye from '../../../assets/images//Promotions/promotions5.png';
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

interface PromoCardsProps {
  ExpiryTime: string;
  Title: string;
  Img: string;
}
const promoCardsData: PromoCardsProps[] = [
{ ExpiryTime: 'December 8, 2024', Title: "Stake's Weekly Raffle", Img: bullsEye },
]
function CardDetailsPage() {
  return (
    <div className=' justify-self-center justify-center flex py-5 p-2'>
            <div className='md:w-[700px] w-[550px] '>
        {promoCardsData.map((item, index) => (<>
          <div key={index} className='rounded-[] '>
            <div className=' bg-[#1d3947]  md:h-96 h-64 max-sm:h-52 overflow-hidden flex justify-center rounded-lg '>
              <div className='w-[70%] mt-8 overflow-hidden relative'>
                <img src={item.Img} alt={item.Title} className='h-[140%] rounded-[60px] w-[100%] absolute' />
              </div>
            </div>
            <div className='my-3 text-[12px] py-3 text-[#b1bad3] font-semibold'>{item.ExpiryTime}</div>
            <span className='text-[32px] font-semibold'>{item.Title}</span>
          
          </div>
          <div className='py-2 lg:text-[18px] text-[16px] grid grid-flow-row gap-5 text-[#a2bad3]'>
            <p>
            Try out the latest and greatest Casino games on Stake and you could win a share of $50,000!
            </p>  
            <p >Every week, Conquer the Casino will spotlight 10+ games from the newest additions to our suite and, no matter what type of player you are, we’ve got you covered with two major prizes available on each:</p>
           <span className='pl-5'> 
                    <li > The BIG WINS prize goes the largest payout on each selected game </li>
                   <li >  The BIG WINS prize goes the largest payout on each selected game </li>
            </span>
            <p>Find your new favourite game today and track your progress on the leaderboards under your slot game as you spin!</p>

            <h1 className='text-[28px] text-white'>Prizes Breakdown</h1>
            <div className='  gap-2 grid '>
              <span className='flex items-center gap-1'>$1,000.00 <RiMoneyDollarCircleFill/>  – Lucky Win Prize per game</span>
              <span className='flex items-center gap-1'>$3,200.00 <RiMoneyDollarCircleFill/>  –  Big Win Prize per game</span>
              <span className='flex items-center gap-1'>$3,000.00 <RiMoneyDollarCircleFill/>   – Lucky Win from Eddie's Choice game</span>
              <span className='flex items-center gap-1'>$3,000.00 <RiMoneyDollarCircleFill/>  – Big Win from Eddie's Choice game</span>


            </div>
            <h1 className='text-[28px] text-white'>Terms and Conditions</h1>
            <div className='text-sm gap-3 grid'>
            <li>If the top multiplier on the Lucky Win leaderboard is shared between multiple players, the Lucky Win prize will be awarded to the player whose bet amount was higher. If the bet amounts are still the same, then and only then will the prize be split.</li>
            <li>Furthermore, any streamers with ongoing affiliate benefits will not be eligible to receive Big Win prizes</li>
            <li>When browsing the site with the fiat currency view on. It reads all the crypto values on the screen, and converts it to the live fiat currency conversion rate. When a player places in the Big Win's section, their place is locked in with their payout crypto value at the time. Due to pricing fluctuations, this can result in a player's fiat currency displaying a higher amount than another due to the difference in the value of the bet when it was placed, versus the price of the crypto now.</li>
            <li>Minimum bet to be eligible for any prize in this promotion is 10c USD or currency equivalent</li>
            <li>The winner/s of the Eddie's Choice game will only be awarded the dedicated Eddie's Choice prizes for that week, not in conjunction with the standard Lucky & Big Win prize for the other nine games</li>
            <li>Prize pool advertised will be the maximum prize pool based on 10 games, however prize pool may vary given the amount of new games for that week.</li>
            <li>Available to Stake.com users only</li>
            </div>

            <h1 className='text-[28px] text-white'>Games</h1>        
            <table className="text-[13px] font-bold border border-gray-600 w-full">
  <tbody className="divide-y divide-gray-600">
    <tr>
      <td className="cursor-pointer hover:text-white  border-r border-gray-600">
        Donny Dough (Eddies Choice)
      </td>
      <td className="cursor-pointer hover:text-white ">
        Donny Dough (Eddies Choice)
      </td>
    </tr>
    <tr>
      <td className="cursor-pointer hover:text-white  border-r border-gray-600">
        Donny Dough (Eddies Choice)
      </td>
      <td className="cursor-pointer hover:text-white ">
        Donny Dough (Eddies Choice)
      </td>
    </tr>
    <tr>
      <td className="cursor-pointer hover:text-white border-r border-gray-600">
        Donny Dough (Eddies Choice)
      </td>
      <td className="cursor-pointer hover:text-white ">
        Donny Dough (Eddies Choice)
      </td>
    </tr>
    <tr>
      <td className="cursor-pointer hover:text-white  border-r border-gray-600">
        Donny Dough (Eddies Choice)
      </td>
      <td className="cursor-pointer hover:text-white ">
        Donny Dough (Eddies Choice)
      </td>
    </tr>
  </tbody>
</table>
</div>
<Link to={'/promotions/category/casino'}> <button className='rounded-full  bg-black text-white p-2 w-16 text-[11px] font-bold my-5'>Casino</button></Link>
<br />

</>
        ))}
<Link to={'/promotions/category/casino'} className='w-full flex justify-center'> <button className='rounded-sm  bg-blue-500 text-white p-3 px-5 shadow-lg  text-[13px] font-bold my-5'>Conquer the Casino!</button></Link>
        
      </div>

      
    </div>
  )
}

export default CardDetailsPage
