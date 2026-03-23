import React from 'react'
import { BiRightArrow } from 'react-icons/bi';
import { Link } from 'react-router-dom';

interface Props{
    Img:string;
    Text:string;
    link:string;
}
function PromotionCategory({Img,Text,link}:Props) {
  return (
    <Link to={`/promotions/category/${link}`} className='w-full rounded group cursor-pointer delay-75 ease-in-out transition-colors duration-500 bg-[#1d3947] hover:bg-[#274c5f] h-24 flex justify-between pr-10  items-center'>
      <span className='text-2xl font-medium flex items-center gap-5 '>
      <img src={Img} alt="img" className='w-24 h-24 rounded'/>
       {Text}
     </span>
      <BiRightArrow className='ease-in-out duration-300 delay-200 group-hover:translate-x-2'/>
    </Link>
  )
}

export default PromotionCategory
