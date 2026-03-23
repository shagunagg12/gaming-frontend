
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { IconType } from 'react-icons';
import '../../../ArrowHide.css'
import  { LeftArrow, RightArrow } from '../universalComponents/CustomArrowsForSliders';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';

interface GameProp {
  title:string;
  description:string;
  img:string;
  link?:string;
  category:string;
}
interface Props{
  icon:IconType;
  name:string;
  games?:GameProp[];
  link?:string;
  disableLink?:boolean 
}

export default function   GameCardSliderComponent(props:Props) {
    const [isMD, setIsMD] = useState(false);
  useEffect(() => {
    const updateScreenSize = () => {
        setIsMD(window.innerWidth <= 1080)
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
}, []);
  const [isLoading, setIsLoading] = useState(true); // For shimmer effect
          const Shimmer = ({ className }: { className: string }) => (
              <div className={`shimmer-effect rounded-lg ${className}`}></div>
          );
      
          useEffect(() => {
              const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
              return () => clearTimeout(timer);
          }, []);
  // const [currentSlide, setCurrentSlide] = useState(0);
  // const [totalSlides, setTotalSlides] = useState(0);

   const { isBetSlipOpen,isSidebarOpen } = useAuth();
const defaultResponsiveSettings = [
  { breakpoint: 1280, settings: { slidesToShow: 6 } },
  { breakpoint: 1024, settings: { slidesToShow: 5 } },
  { breakpoint: 668, settings: { slidesToShow: 4 } },
  { breakpoint: 568, settings: { slidesToShow: 3 } },
  { breakpoint: 480, settings: { slidesToShow: 3 } },
  { breakpoint: 320, settings: { slidesToShow: 3 } },
];

const betSlipResponsiveSettings = [
  { breakpoint: 1564, settings: { slidesToShow: 7 } },
  { breakpoint: 1430, settings: { slidesToShow: 6 } },
  { breakpoint: 1280, settings: { slidesToShow: 5 } },
  { breakpoint: 1130, settings: { slidesToShow: 4 } },
  { breakpoint: 880, settings: { slidesToShow: 3 } },
  { breakpoint: 480, settings: { slidesToShow: 3 } },
  { breakpoint: 320, settings: { slidesToShow: 3 } },
];

const betSlipAndSideBarResponsive = [
  { breakpoint: 1620, settings: { slidesToShow: 7 } },
  { breakpoint: 1564, settings: { slidesToShow: 6 } },
  { breakpoint: 1430, settings: { slidesToShow: 5 } },
  { breakpoint: 1280, settings: { slidesToShow: 5 } },
  { breakpoint: 1130, settings: { slidesToShow: 4 } },
  { breakpoint: 880, settings: { slidesToShow: 3 } },
  { breakpoint: 480, settings: { slidesToShow: 3 } },
  { breakpoint: 320, settings: { slidesToShow: 3 } },
];


const responsiveSettings = useMemo(() => {
  if (isSidebarOpen && isBetSlipOpen) {
    return betSlipAndSideBarResponsive;
  }

  if (isBetSlipOpen) {
    return betSlipResponsiveSettings;
  }

  return defaultResponsiveSettings;
}, [isBetSlipOpen, isSidebarOpen]);



   const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 2,
  prevArrow: <LeftArrow />,
  nextArrow: <RightArrow />,
  responsive: responsiveSettings ?? []
};
      const [glow, setGlow] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      setGlow(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);
      return (
        <>
  
        {!props.disableLink?<Link to={`/casino/group/${props.link}`} className='sm:text-lg text-sm relative w-fit font-bold my-4 ml-2 items-center flex gap-2 cursor-pointer '> {props.icon && <props.icon/>} {props.name}</Link> :
          <div  className='sm:text-lg text-sm relative w-fit font-bold my-4 ml-2 items-center flex gap-2 '> {props.icon && <props.icon/>} {props.name}</div> }   

     <Slider key={isBetSlipOpen ? 'betslip' : 'default'} {...settings}>

     
            {props.games && props.games.map((game, index) => (
              <div key={index} className="p-2">
                
                <div className="bg-gray-800 cursor-pointer  rounded-lg hover:bg-gray-700 transition duration-300 hover:-translate-y-2">
                 <Link to={`/casino/games/${game.link}`} className='relative'> 
                {isLoading?<Shimmer className={`${isMD && "w-[80px] h-[140px]"} sm:w-[100px] sm:h-[170px] md:w-[120px] md:h-[180px]`}></Shimmer>:
                  <img
                    src={game.img}
                    alt={game.title}
                    className="object-cover rounded-lg"
                    
                  />}
                  {/* {(<></>): */}
                 {(props.name ===  'Top Sports' 
                  || props.name ===  'Trending Sports' 
                  || props.name ===  'Trending Games') && !isLoading? 
                  <div className='absolute top-9 px-2 font-extrabold bg-[#313431] text-center text-[14px] rounded-r-[5px] h-8 items-center flex'>{index+1}</div>:<></>}
                  </Link>
                    
                  
                
                </div>
                <div className={`flex justify-start items-center py-2 transition duration-300 ease-in-out`}>
        <style>
        {`
          .glow {
            @apply shadow-lg transition-shadow duration-500;
            box-shadow: 0 0 5px rgba(103, 240, 91, 100 );
          }
        `}
      </style>
      {isLoading?<Shimmer className='md:w-20 w-10 h-[5px]'></Shimmer>:
      <>
    <div className={`w-2 h-2 rounded-full bg-[rgb(103,240,91)] ${glow ? 'glow' : ''}`} />
    <span className='text-[.7rem] px-1 font-bold'>2078 </span><span className='text-[.7rem] font-bold text-gray-400'>playing</span></>}
      </div>
              </div>
            ))}
          </Slider>
        </>
      );
    }