import React, { useMemo, useState } from "react";
import watch from "../../../assets/images/watch.jpg"

import games from "../../../assets/images/promos/games.jpg"
import games1 from "../../../assets/images/promos/games (1).jpg"
import games2 from "../../../assets/images/promos/games (2).jpg"
import games3 from "../../../assets/images/promos/games (3).jpg"
import games4 from "../../../assets/images/promos/games (4).jpg"
import games5 from "../../../assets/images/promos/games (5).jpg"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LeftArrowForPromo, RightArrowForPromo } from "./CustomArrowsForSliders";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
// var item = props.item

interface DataProp {
  promo: string;
  heading: string;
  subHeading: string;
  buttonHeading: string;
  img: string;
  link: string

}

interface Props {
  isOpen: boolean;
}

const data: DataProp[] = [{
  promo: 'Promo',
  heading: 'Daily Races',
  subHeading: 'Play in our $100,000 Daily Race Read More',
  buttonHeading: 'Race Now',
  link: 'Promo2',
  img: watch,
},
{
  promo: 'Promo',
  heading: 'Multiplier Race',
  subHeading: 'Win $200,000 in Race',
  buttonHeading: 'Race Now',
  img: games,
  link: 'multiplier-race'

},

{
  promo: 'Promo',
  heading: 'Daily Races',
  subHeading: 'Play in our $100,000 Daily Race Read More',
  buttonHeading: 'Race Now',
  img: games1,
  link: 'promo1'
  ,
},

{
  promo: 'Promo',
  heading: 'Daily Races',
  subHeading: 'Play in our $100,000 Daily Race Read More',
  buttonHeading: 'Race Now',
  img: games2,
  link: 'promo1'
  ,
},

{
  promo: 'Promo',
  heading: 'Daily Races',
  subHeading: 'Play in our $100,000 Daily Race Read More',
  buttonHeading: 'Race Now',
  img: games3,
  link: 'promo1'
  ,
},

{
  promo: 'Promo',
  heading: 'Conquer the World',
  subHeading: 'Win a share in $50,000 every week Read More',
  buttonHeading: 'Race Now',
  img: games4,
  link: 'conquer-the-casino'
  ,
}]




export default function PromoCardSlider({ isOpen }: Props): React.JSX.Element {
  const [isHover, setIsHovered] = useState(false)








     const { isBetSlipOpen,isSidebarOpen } = useAuth();
  const defaultResponsiveSettings = [
    { breakpoint: 1450, settings: { slidesToShow: 3 } },
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 530, settings: { slidesToShow: 1 } },
 
  ];
  
  const betSlipResponsiveSettings = [
    { breakpoint: 1564, settings: { slidesToShow: 3 } },
    { breakpoint: 1470, settings: { slidesToShow: 2 } },
   
    { breakpoint: 950, settings: { slidesToShow: 1 } },

  ];
  
  const betSlipAndSideBarResponsive = [
    { breakpoint: 1700, settings: { slidesToShow: 3 } },
    { breakpoint: 1520, settings: { slidesToShow: 2 } },
    { breakpoint: 1200, settings: { slidesToShow: 1 } },
   
  ];
  

 const responsiveSettings = useMemo(() => {
  if (isSidebarOpen && isBetSlipOpen) return betSlipAndSideBarResponsive;
  if (isBetSlipOpen) return betSlipResponsiveSettings;
  return defaultResponsiveSettings;
}, [isBetSlipOpen, isSidebarOpen]);
  
 
  

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <LeftArrowForPromo isVisible={isHover} />,
    nextArrow: <RightArrowForPromo isVisible={isHover} />,
   responsive: responsiveSettings ?? []
  };


  return (

  <div className="w-full py-4 px-2" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
  <Slider key={`${isSidebarOpen}-${isBetSlipOpen}`} {...settings}>
    {data.map((item) => (
      <div key={item.heading} className="px-2">
        <div className="bg-[#1d3947] rounded-lg shadow-lg h-[180px] sm:h-[220px] grid grid-cols-2">
          {/* Left content */}
          <div className="p-3 flex flex-col justify-between">
            <div className="text-[0.75rem] bg-slate-200 px-2 py-1 rounded text-slate-700 font-bold w-fit">{item.promo}</div>
            <div className="font-bold">{item.heading}</div>
            <div className="text-sm">{item.subHeading}</div>
            <Link to={`/casino/group/${item.link}`}>
              <button className="border px-3 py-1 rounded text-sm">{item.buttonHeading}</button>
            </Link>
          </div>

          {/* Right image */}
          <div className="flex justify-end items-center pr-3">
            <img className="h-[150px] sm:h-[190px] w-auto rounded" src={item.img} alt="" />
          </div>
        </div>
      </div>
    ))}
  </Slider>
</div>


  )
}