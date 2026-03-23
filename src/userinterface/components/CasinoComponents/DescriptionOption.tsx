import { FaChartLine } from "react-icons/fa";
import img from '../../../assets/images/originalGames/games (11).png'

const Tags = [
  {name:'Mines'},
  {name:'Stake Originals',},
  {name:'Volatility Switch',}
]

const Descriptions = [
  {about:`Join in on the Mines fever with one of our most popular and beloved games! Inspired by the classic Minesweeper, Mines will simply reveal the gems and avoid the bombs to increase your payout multiplier.
  Mines is a grid-based gambling game of chance developed by Stake where players navigate the grid to reveal gems while avoiding bombs! This Mines betting game is played on a 5x5 grid in which players can flip the tiles over to show either a gem or bomb.
  Revealing gems increases payout multipliers and allows players to continue playing - choosing to pick additional tiles, a random tile or cash out. Revealing a bomb ends the round with the wager lost.
  With the freedom to adjust the number of mines, autobet and cash out at any point of the game, the gambling experience offered by Mines is second to none at any online casino !`},

  {Heading:`Mines Gameplay`,
   HeadingPara:`Players set their bet amount to play with during a round of Mines as well as the number of mines that exists in the field of play, ranging between 1-24. There are 25 tiles where gems and mines can be distributed.
                The gameplay resembles the beloved Minesweeper game, with the placement of mines and gems being random and betting mechanics included for any fiat, Bitcoin and other cryptocurrencies.`},
  {SubHeading:`Modifying the Number of Mines`,
   SubHeadingPara:`The number of mines set affects to multiplier paid out to players and controls the volatility of the gameplay. More mines in play lead to more opportunities for a round to end, but also leads to exciting gameplay and higher payouts.
                   The choice of setting the mines amount reflects the player's appetite for risk and the level of risk they are willing to burden in pursuit of profit and big payouts.
                   Once the bet amount and number of mines have been set, players can click any number of tiles during the betting round to reveal their contents. Hitting a mine will end the round. However, if a player continues to collect gems they can continue to play.`},
  {SubHeading2:`Cashout or Keep Mining`,
    SubHeadingPara2:`During the phase where players have collected gems and have not tripped any mines yet, the betting interface is modified and they are informed of the Profit on Next Tile and Total Profit in the current betting round.
    This helps players evaluate risk and best decide what is the best course of action - cash out winnings or keep going!`
  },
                  ]
function DescriptionOption() {
  return (<>

  
    {/* tags */}
    <div className=" w-full ">
   <img className="align-sub h-48 rounded-xl mr-4  float-start" src={img} alt="" />
   <span className="w-fit  bg-slate-700  secondaryTextColor rounded-full px-[8px] font-semibold  text-[12px] h-full">Edge:<span className="text-[11px] tracking-wider text-white">{"1.00%"}</span></span>
<br />
<div className="flex gap-2 mt-4 mb-6  ">
    {Tags.map((item)=>( <><button className=" bg-slate-700  secondaryTextColor rounded-full px-[8px] font-bold hover:text-white tracking-wider text-[12px] h-full"><span className="">{item.name}</span></button>
      </>))}</div>
           
      {Descriptions.map((item)=>(<div className="secondaryTextColor"><p className="secondaryTextColor  h-fit lg:text-lg text-base">{item.about}</p>
      <h2 className="text-xl text-white font-bold mb-5">{item.Heading}</h2>
      
      <p >{item.HeadingPara} </p>
  
      <h3 className="text-lg text-white font-bold mb-5">{item.SubHeading}  </h3>
     
      <p>{item.SubHeadingPara}  </p> 
    
      <h3 className="text-lg text-white font-bold mb-5">{item.SubHeading2}  </h3>
       
      <p>{item.SubHeadingPara2}  </p> 

      <h3 className="text-lg text-white mb-5 font-bold">{item.SubHeading}  </h3>
    
      <p>{item.SubHeadingPara}  </p> 

      </div>))}
 
    
    </div>

    </>
  )
}

export default DescriptionOption

