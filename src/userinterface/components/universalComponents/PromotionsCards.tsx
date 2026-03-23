import React, { useEffect, useRef, useState } from 'react';
import proSoccer from '../../../assets/images/Promotions/proSoccer.png';
import rocket from '../../../assets/images/Promotions/rocket.png';
import rocket1 from '../../../assets/images/Promotions/New Project.png';
import tickets from '../../../assets/images/Promotions/promotions.jpg';
import rocket2 from '../../../assets/images/Promotions/games.png';
import giftBox from '../../../assets/images/Promotions/promotions1.png';
import Crown from '../../../assets/images//Promotions/promotions3.png';
import game from '../../../assets/images//Promotions/promotions4.png';
import bullsEye from '../../../assets/images//Promotions/promotions5.png';
import ScrollToTop from './ScrollToTop';
import { Link } from 'react-router-dom';


interface Props {
  Heading?: string;
  SubHeading?:string
}

interface PromoCardsProps {
  ExpiryTime: string;
  Title: string;
  Img: string;
  link?:string
}

const promoCardsData: PromoCardsProps[] = [
  { ExpiryTime: '12/12/21', Title: "Stake's Daily Races", Img: bullsEye ,link:'weekly-giveaway'},
  { ExpiryTime: '12/12/21', Title: 'Casino Challenges', Img: giftBox },
  { ExpiryTime: '12/12/21', Title: 'The Return of the King $7,000 - VIP Forum Challenge', Img: rocket2 },
  { ExpiryTime: '12/12/21', Title: 'Pragmatic Drops & Wins Slots', Img: Crown },
  { ExpiryTime: '12/12/21', Title: 'Chaos Collector', Img: game },
  { ExpiryTime: '12/12/21', Title: 'The Return of the King $7,000 - VIP Forum Challenge', Img: rocket2 },
  { ExpiryTime: '12/12/21', Title: 'Pragmatic Drops & Wins Slots', Img: Crown },
  { ExpiryTime: '12/12/21', Title: 'Chaos Collector', Img: tickets },
    { ExpiryTime: '12/12/21', Title: "Stake's Daily Races", Img: bullsEye },
  { ExpiryTime: '12/12/21', Title: 'Casino Challenges', Img: giftBox },
  { ExpiryTime: '12/12/21', Title: 'The Return of the King $7,000 - VIP Forum Challenge', Img: rocket2 },
  { ExpiryTime: '12/12/21', Title: 'Pragmatic Drops & Wins Slots', Img: Crown },
  { ExpiryTime: '12/12/21', Title: 'Chaos Collector', Img: game },
  { ExpiryTime: '12/12/21', Title: 'The Return of the King $7,000 - VIP Forum Challenge', Img: rocket2 },
  { ExpiryTime: '12/12/21', Title: 'Pragmatic Drops & Wins Slots', Img: Crown },
  { ExpiryTime: '12/12/21', Title: 'Chaos Collector', Img: tickets },


  { ExpiryTime: '12/12/21', Title: "Stake's Daily Races", Img: bullsEye },
  { ExpiryTime: '12/12/21', Title: 'Casino Challenges', Img: giftBox },
  { ExpiryTime: '12/12/21', Title: 'The Return of the King $7,000 - VIP Forum Challenge', Img: rocket2 },
  { ExpiryTime: '12/12/21', Title: 'Pragmatic Drops & Wins Slots', Img: Crown },
  { ExpiryTime: '12/12/21', Title: 'Chaos Collector', Img: game },
  { ExpiryTime: '12/12/21', Title: 'The Return of the King $7,000 - VIP Forum Challenge', Img: rocket2 },
  { ExpiryTime: '12/12/21', Title: 'Pragmatic Drops & Wins Slots', Img: Crown },
  { ExpiryTime: '12/12/21', Title: 'Chaos Collector', Img: tickets },  { ExpiryTime: '12/12/21', Title: "Stake's Daily Races", Img: bullsEye },
  { ExpiryTime: '12/12/21', Title: 'Casino Challenges', Img: giftBox },
  { ExpiryTime: '12/12/21', Title: 'The Return of the King $7,000 - VIP Forum Challenge', Img: rocket2 },
  { ExpiryTime: '12/12/21', Title: 'Pragmatic Drops & Wins Slots', Img: Crown },
  { ExpiryTime: '12/12/21', Title: 'Chaos Collector', Img: game },
  { ExpiryTime: '12/12/21', Title: 'The Return of the King $7,000 - VIP Forum Challenge', Img: rocket2 },
  { ExpiryTime: '12/12/21', Title: 'Pragmatic Drops & Wins Slots', Img: Crown },
  { ExpiryTime: '12/12/21', Title: 'Chaos Collector', Img: tickets },
  { ExpiryTime: '12/12/21', Title: "Stake's Daily Races", Img: bullsEye },
  { ExpiryTime: '12/12/21', Title: 'Casino Challenges', Img: giftBox },
  { ExpiryTime: '12/12/21', Title: 'The Return of the King $7,000 - VIP Forum Challenge', Img: rocket2 },
  { ExpiryTime: '12/12/21', Title: 'Pragmatic Drops & Wins Slots', Img: Crown },
  { ExpiryTime: '12/12/21', Title: 'Chaos Collector', Img: game },
  { ExpiryTime: '12/12/21', Title: 'The Return of the King $7,000 - VIP Forum Challenge', Img: rocket2 },
  { ExpiryTime: '12/12/21', Title: 'Pragmatic Drops & Wins Slots', Img: Crown },
  { ExpiryTime: '12/12/21', Title: 'Chaos Collector', Img: tickets },
];

const itemsPerPage = 12;

function PromotionsCards({ Heading,SubHeading }: Props) {
  const [pageNo, setPageNo] = useState<number>(1);
  const [disabled,setDisabled]=useState<boolean>(false)

  const totalPages=Math.ceil(promoCardsData.length / itemsPerPage)
    console.log(totalPages)

  const handleNext = () => {
    setPageNo((prevPage) => Math.min(prevPage + 1, Math.ceil(promoCardsData.length / itemsPerPage)));
    window.scrollTo(0, 0)
  };

  const handlePrev = () => {
    setPageNo((prevPage) => Math.max(prevPage - 1, 1));
    if (ContainerRef.current) {
      ContainerRef.current.scrollTo(0, 0);
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // Optional for smooth scrolling
    });
  };

  const startIdx = (pageNo - 1) * itemsPerPage;
  const currentItems = promoCardsData.slice(startIdx, startIdx + itemsPerPage);
    

  const ContainerRef =useRef<HTMLDivElement>(null)
  return (
    <>
    <div  >   
      
      <div ref={ContainerRef} className='font-[500] text-[24px] py-5 h-[200%] '>{Heading}</div>
      <ScrollToTop containerRef={ContainerRef}>
      <div className='grid grid-flow-row sm:grid-cols-2 lg:grid-cols-3 gap-8 '>
        {currentItems.map((item, index) => (
          <Link to={`promotion/${item.link}`} key={index} className='rounded h-full  cursor-pointer '>
            <div className='  bg-[#1d3947] h-[16em] overflow-hidden flex justify-center rounded hover:-translate-y-3 ease-in-out duration-300'>
              <div className='w-[70%] mt-8 overflow-hidden relative'>
                <img src={item.Img} alt={item.Title} className='h-[140%] rounded-[60px] w-[100%] absolute' />
              </div>
            </div>
            <div className='my-3 text-[11px] text-[#b1bad3] font-semibold'>End at {item.ExpiryTime}</div>
            <div className='text-[20px] font-semibold'>{item.Title}</div>
          

          </Link>
        ))}
      </div>
      <div className='flex justify-center py-5 gap-4 items-center'>
        <button disabled={pageNo===1}  onClick={handlePrev} className={`${pageNo===1?'text-zinc-400 cursor-default':''}  font-bold text-[12px]  `}>Previous</button>

        <button disabled={pageNo===totalPages} onClick={handleNext} className={`${pageNo===totalPages?'text-zinc-400 cursor-default':''}  font-bold text-[12px] text-white  `}>Next</button>
      </div>
      </ScrollToTop>
    </div></>
  );
}

export default PromotionsCards;
