import  { useEffect, useState } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import game from "../../../assets/images/originalGames/games.png";
import game1 from "../../../assets/images/originalGames/games (1).png";
import game2 from "../../../assets/images/originalGames/games (2).png";
import game3 from "../../../assets/images/originalGames/games (3).png"
import game4 from "../../../assets/images/originalGames/games (4).png";
import game5 from "../../../assets/images/originalGames/games (5).png";
import game6 from "../../../assets/images/originalGames/games (6).png";
import game7 from "../../../assets/images/originalGames/games (7).png";
import game8 from "../../../assets/images/originalGames/games (8).png";
import game9 from "../../../assets/images/originalGames/games (9).png";;
import game10 from "../../../assets/images/originalGames/games (10).png";
import game11 from "../../../assets/images/originalGames/games (11).png";
import game12 from "../../../assets/images/originalGames/games (12).png";
import game13 from "../../../assets/images/originalGames/games (13).png";
import game14 from "../../../assets/images/originalGames/games (14).png";
import game15 from "../../../assets/images/originalGames/games (15).png";
import game16 from "../../../assets/images/originalGames/games (16).png";
import game17 from "../../../assets/images/originalGames/games (17).png";

import ViewAllButton from '../universalComponents/ViewAllButton';
import { IconType } from 'react-icons';


// Example data for the games
// const games:GameProp[] = [
//   {
//     title: 'Game 1',
//     description: 'Description for Game 1',
//     img: game,
//   },
//   {
//     title: 'Game 2',
//     description: 'Description for Game 2',
//     img: game1,
//   },
//   {
//     title: 'Game 3',
//     description: 'Description for Game 3',
//     img: game2,
//   },
//   {
//     title: 'Game 4',
//     description: 'Description for Game 1',
//     img:game3,
//   },
//   {
//     title: 'Game 5',
//     description: 'Description for Game 2',
//     img: game4,
//   },
//   {
//     title: 'Game 6',
//     description: 'Description for Game 3',
//     img: game5,
//   },
//   {
//     title: 'Game 7',
//     description: 'Description for Game 1',
//     img: game6,
//   },
//   {
//     title: 'Game 8',
//     description: 'Description for Game 2',
//     img: game7,
//   },
//   {
//     title: 'Game 9',
//     description: 'Description for Game 3',
//     img:game8,
//   },
//   {
//     title: 'Game 10',
//     description: 'Description for Game 4',
//     img: game9,
//   },
//   {
//     title: 'Game 111',
//     description: 'Description for Game 1',
//     img: game10,
//   },
//   {
//     title: 'Game 12',
//     description: 'Description for Game 2',
//     img: game11,
//   },
//   {
//     title: 'Game 13',
//     description: 'Description for Game 3',
//     img:game12,
//   },
//   {
//     title: 'Game 14',
//     description: 'Description for Game 1',
//     img: game13,
//   },
//   {
//     title: 'Game 15',
//     description: 'Description for Game 2',
//     img:game14,
//   },
//   {
//     title: 'Game 16',
//     description: 'Description for Game 3',
//     img:game15,
//   },
//   {
//     title: 'Game 17',
//     description: 'Description for Game 1',
//     img: game16,
//   },
//   {
//     title: 'Game 18',
//     description: 'Description for Game 2',
//     img: game17,
//   },
//   {
//     title: 'Game 16',
//     description: 'Description for Game 3',
//     img:game15,
//   },
//   {
//     title: 'Game 17',
//     description: 'Description for Game 1',
//     img: game16,
//   },
//   {
//     title: 'Game 18',
//     description: 'Description for Game 2',
//     img: game17,
//   },
// ];

interface GameProp {
  title:string;
  description:string;
  img:string
  category:string
  link?:string
}
interface Props{
  visibleCards:number;
  games?:GameProp[];
  title:string
  icon:IconType
  link?:string
}

 
export default function GameCardForToogle(props:Props) {
  let cardsToShow:number
 
 
  

  const[total,setTotal]=useState<number>(15)
 
 
  useEffect(() => {
    if (props.games)
    setTotal(props.games.length);

  }, [props.games]); // Run the effect only when games change

  const [glow, setGlow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlow(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

 
  return (
    <>   
    <div className='text-lg font-bold p-4 items-center flex gap-2'><props.icon/>{props.title}</div>
    <div className='grid  grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-8 '>
    {props.games && props.games.slice(0,props.visibleCards).map((game, index) => (
          <div key={index} className="p-2 ">
          
            <div className="bg-gray-800    w-full rounded-lg hover:bg-gray-700 transition duration-300 hover:-translate-y-3 cursor-pointer">
              <img
                src={game.img}
                alt={game.title}
                className="rounded-lg   object-cover"
              />
           
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
    <div className={`w-2 h-2 rounded-full bg-[rgb(103,240,91)] ${glow ? 'glow' : ''}`} />

    <span className='text-[.7rem] px-1 font-bold'>2078 </span><span className='text-[.7rem] font-bold text-slate-400'>Playing</span>
      </div>

          </div>
          
       
 
  ))}    </div>
      <div className=' justify-center flex'> <ViewAllButton name=' Originals' total={total} link={`${props.link}`}/></div>
    </>
  );
}