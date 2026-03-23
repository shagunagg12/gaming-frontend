import React, { useEffect, useRef } from 'react'
import GroupScreenBanner from '../../components/universalComponents/GroupScreenBanner'
import defaultImg from '../../../assets/images//group-banner-default.png'
import PromotionCategory from '../../components/universalComponents/PromotionCategory'
import proDice from '../../../assets/images/Promotions/proDice.jpg'
import proSoccer from '../../../assets/images/Promotions/proSoccer.png'
import PromotionsCards from '../../components/universalComponents/PromotionsCards'
import ScrollToTop from '../../components/universalComponents/ScrollToTop'


function PromotionsHome() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // Optional: adds a smooth scroll effect
    });
  }, []); 

  const ContainerRef =useRef<HTMLDivElement>(null)
  
  return (
    <>

      <GroupScreenBanner name='Promotions' img={defaultImg}/>
      <div className='flex justify-center'>
      <div ref={ContainerRef} className='md:w-[90%] w-[95%] lg:w-[80%] max-sm:w-[95%] '>
        <div className='grid sm:grid-cols-2 gap-8 mt-8'>
        <PromotionCategory link={'casino'} Text='Casino' Img={proDice}/>
        <PromotionCategory link={'sports'} Text='Sports' Img={proSoccer} />
        </div>
     
        <div className=''>
          <PromotionsCards Heading='Latest Promotion' />
        </div>
      </div>
      </div>
     
    </>
  )
}

export default PromotionsHome
