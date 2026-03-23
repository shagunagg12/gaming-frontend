import React from 'react'

function InformationComponent ():React.JSX.Element {
  return (
    <div className='bg-slate-900 md:grid-cols-2 grid grid-cols-1 rounded-md p-5 gap-12 select-none'>
     <div>
     <h1 className='font-bold text-2xl' >GambleGrid - Best Online Casino & Sports Betting Platform</h1>
     <div className='text-[16px] text-slate-400'><p >GambleGrid.com is a leader in online gambling, offering the best casino and sports betting platforms for playing casino games and placing wagers on the biggest sporting events worldwide.</p>
    <p>
    Leading the online casino industry since 2017, GambleGrid presents a trusted gambling platform that promotes an incredible casino experience for betting online and is available globally in 15 languages .

    </p></div>
     </div>
     <div className='text-[16px] text-slate-400 '>
      <li>
      Tron (TRX) : Tron was another altcoin added to GambleGrid's list of supported cryptocurrencies and provided further options for players to bet with on our platform.
       </li>
       <li ><a href="" className='hover:text-white'>EOS (EOS) </a>: EOS was added in 2020 and was the eighth cryptocurrency official supported by the GambleGrid crypto casino and sports betting platform. EOS with it's low (or free) transaction cost made it very appealing and was the final cryptocurrency supported by GambleGrid through 2020 and 2021.
       </li>
     </div>
  
    </div>

  )
}

export default InformationComponent
