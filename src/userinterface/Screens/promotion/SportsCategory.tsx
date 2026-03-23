import React from 'react'
import GroupScreenBanner from '../../components/universalComponents/GroupScreenBanner'
import defaultImg from '../../../assets/images//group-banner-default.png'

import PromotionsCards from '../../components/universalComponents/PromotionsCards'
import PromotionsCardsCasino from '../../components/universalComponents/PromotionCardCategory'



function SportsCategory() {
  return (
    <>
      <GroupScreenBanner name='Sports' img={defaultImg}/>
      {window.scrollTo(0,0)}
      <div className='flex justify-center'>
      <div className='md:w-[90%] w-[95%] lg:w-[80%] max-sm:w-[95%] '>
     
        <div className=''>
          <PromotionsCardsCasino  />
        </div>
      </div>
      </div>
    </>
  )
}

export default SportsCategory
