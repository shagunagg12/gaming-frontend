import  { useEffect, useState } from 'react';
import { BsFillGiftFill } from "react-icons/bs";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import '../../../ArrowHide.css'

import { IconType } from 'react-icons';
import game from "../../../assets/images/Providers/games.png";
import game2 from "../../../assets/images/Providers/games (2).png";
import game1 from "../../../assets/images/Providers/games (1).png";
import game3 from "../../../assets/images/Providers/games (3).png"
import game4 from "../../../assets/images/Providers/games (4).png";
import game5 from "../../../assets/images/Providers/games (5).png";
import game6 from "../../../assets/images/Providers/games (6).png";
import game7 from "../../../assets/images/Providers/games (7).png";
import game8 from "../../../assets/images/Providers/games (8).png";
import game9 from "../../../assets/images/Providers/games (9).png";;
import game10 from "../../../assets/images/Providers/games (10).png";
import game11 from "../../../assets/images/Providers/games (11).png";
import game12 from "../../../assets/images/Providers/games (12).png";
import game13 from "../../../assets/images/Providers/games (13).png";
import {RightArrow,LeftArrow} from './CustomArrowsForSliders';




// Example data for the games
const games:GameProp[] = [
    { id: 1, name: 'Avatar',count:36 ,img:game},
    { id: 2, name: 'Backseat Gaming',count:14 ,img:game2},
    { id: 3, name: 'Belatra',count:83 ,img:game2},
    { id: 4, name: 'BGaming',count:69 ,img:game3},
    { id: 5, name: 'Devon Webb',count:31 ,img:game4},
    { id: 6, name: 'Avatar',count:36 ,img:game5},
    { id: 7, name: 'Backseat Gaming',count:14 ,img:game6},
    { id: 8, name: 'Belatra',count:83 ,img:game7},
    { id: 9, name: 'BGaming',count:69 ,img:game8},
    { id: 10, name: 'Devon Webb',count:31 ,img:game9},
    { id: 11, name: 'Avatar',count:36 ,img:game10},
    { id: 12, name: 'Backseat Gaming',count:14 ,img:game11},
    { id: 13, name: 'Belatra',count:83 ,img:game12},
    { id: 14, name: 'BGaming',count:69 ,img:game13},
    { id: 15, name: 'Devon Webb',count:31 ,img:game1},
    { id: 16, name: 'Avatar',count:36 ,img:game2},
    { id: 17, name: 'Backseat Gaming',count:14 ,img:game3},
    { id: 18, name: 'Belatra',count:83 ,img:game4},
    { id: 19, name: 'BGaming',count:69 ,img:game5},
    { id: 20, name: 'Devon Webb',count:31 ,img:game6},
    { id: 17, name: 'Backseat Gaming',count:14 ,img:game7},
    { id: 18, name: 'Belatra',count:83 ,img:game8},
    { id: 19, name: 'BGaming',count:69 ,img:game9},
    { id: 20, name: 'Devon Webb',count:31 ,img:game1},
    { id: 17, name: 'Backseat Gaming',count:14 ,img:game3},
    { id: 18, name: 'Belatra',count:83 ,img:game4},
    { id: 19, name: 'BGaming',count:69 ,img:game6},
    { id: 20, name: 'Devon Webb',count:31 ,img:game7},
];

interface GameProp {
    img?:string;
    id:number;
    name:string;
    count:number
}

interface Props{
  icon?:IconType;
  name?:string
}

export default function AllProvider(props:Props) {


      return (
        <>
        <div className='text-lg font-bold p-4 items-center flex gap-2'>{props.icon && <props.icon/>}{props.name}</div>
         <div className='grid  grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-8 '>
         
                 { games.map((game, index) => (
               <div key={index} className="p-2 ">
             
                 
                 <div className="bg-gray-800 sm:w-full   rounded-lg hover:bg-gray-700 transition duration-300 hover:-translate-y-3 cursor-pointer">
                   <img
                     src={game.img}
                   
                     className="rounded-lg w-full  object-cover"
                   />
                
                 </div>   
           <div className={`flex justify-start items-center py-2 transition duration-300 ease-in-out`}>
           
        
               </div>
     
               </div>
               
            
      
       ))}    </div>
          
         </>
      );
    }