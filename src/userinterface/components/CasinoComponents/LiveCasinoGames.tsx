import  { useEffect, useState } from 'react';
import { SiKdenlive } from "react-icons/si";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import game from "../../../assets/images/liveCasino/games.png";
import game1 from "../../../assets/images/liveCasino/games (1).png";
import game2 from "../../../assets/images/liveCasino/games (2).png";
import game3 from "../../../assets/images/liveCasino/games (3).png"
import game4 from "../../../assets/images/liveCasino/games (4).png";
import game5 from "../../../assets/images/liveCasino/games (5).png";
import game6 from "../../../assets/images/liveCasino/games (6).png";
import game7 from "../../../assets/images/liveCasino/games (7).png";
import game8 from "../../../assets/images/liveCasino/games (8).png";
import game9 from "../../../assets/images/liveCasino/games (9).png";;
import game10 from "../../../assets/images/liveCasino/games (10).png";
import game11 from "../../../assets/images/liveCasino/games (11).png";
import game12 from "../../../assets/images/liveCasino/games (12).png";
import game13 from "../../../assets/images/liveCasino/games (13).png";
import game14 from "../../../assets/images/liveCasino/games (14).png";
import game15 from "../../../assets/images/liveCasino/games (15).png";
import game16 from "../../../assets/images/liveCasino/games (16).png";
import game17 from "../../../assets/images/liveCasino/games (17).png";
import SeeAll from "../../../assets/images/SeeAll.png"
import ViewAllButton from '../universalComponents/ViewAllButton';

// Example data for the games
const games:GameProp[] = [
  {
    title: 'Game 1',
    description: 'Description for Game 1',
    img: game,
    link:'live-casinoasd3',
  },
  {
    title: 'Game 2',
    description: 'Description for Game 2',
    img: game1,
    link:'live-casinoasd3',
  },
  {
    title: 'Game 3',
    description: 'Description for Game 3',
    img: game2,
    link:'live-casinoasd3',
  },
  {
    title: 'Game 4',
    description: 'Description for Game 1',
    img:game3,
    link:'live-casinoasd3',
  },
  {
    title: 'Game 5',
    description: 'Description for Game 2',
    img: game4,
    link:'live-casinoasd3',
  },
  {
    title: 'Game 6',
    description: 'Description for Game 3',
    img: game5,
    link:'live-casinoasd3',
  },
  {
    title: 'Game 7',
    description: 'Description for Game 1',
    img: game6,
    link:'live-casinoasd3',
  },
  {
    title: 'Game 8',
    description: 'Description for Game 2',
    img: game7,
    link:'live-casinoasd3',
  },
  {
    title: 'Game 9',
    description: 'Description for Game 3',
    img:game8,
    link:'live-casinoasd3',
  },
  {
    title: 'Game 10',
    description: 'Description for Game 4',
    img: game9,
    link:'live-casinoasd3',
  },
  {
    title: 'Game 111',
    description: 'Description for Game 1',
    img: game10,
    link:'live-casinoasd3',
  },
  {
    title: 'Game 12',
    description: 'Description for Game 2',
    img: game11,
    link:'live-casinoasd3',
  },
  {
    title: 'Game 13',
    description: 'Description for Game 3',
    img:game12,
    link:'live-casinoasd3',
  },
  {
    title: 'Game 14',
    description: 'Description for Game 1',
    img: game13,
    link:'live-casinoasd3',
  },
  {
    title: 'Game 15',
    description: 'Description for Game 2',
    img:game14,
    link:'live-casinoasd3',
  },
  {
    title: 'Game 16',
    description: 'Description for Game 3',
    img:game15,
    link:'live-casinoasd3',
  },
  {
    title: 'Game 17',
    description: 'Description for Game 1',
    img: game16,
    link:'live-casinoasd3',
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: game17,
    link:'live-casinoasd3',
  },
  

];

interface GameProp {
    title:string;
    description:string;
    img:string
    link:string
}
interface Props{
  visibleCards:number
}
export default function LiveCasinoGames(props:Props) {

  const [glow, setGlow] = useState(false);
  const[total,setTotal]=useState<number>(0)
  useEffect(() => {
    setTotal(games.length);
    console.log(games.length);
  }, [games]); // Run the effect only when games change

  useEffect(() => {
    const interval = setInterval(() => {
      setGlow(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);


  return (
    <>   
 
 <div className='text-lg font-bold p-4 items-center flex gap-2'>
        <SiKdenlive /> Live Casino
      </div>
      <div className='grid   grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-8'>
      { games.slice(0,props.visibleCards).map((game, index) => (
          <div key={index} className="p-2 ">
            <div className="bg-gray-800  w-full rounded-lg hover:bg-gray-700 transition duration-300 hover:-translate-y-3 cursor-pointer">
              <img
                src={game.img}
                alt={game.title}
                className="rounded-lg object-cover w-full"
              />
            </div>
            <div className={`flex justify-start items-center py-2 transition duration-300 ease-in-out`}>
              <style>
                {`
                  .glow {
                    @apply shadow-lg transition-shadow duration-500;
                    box-shadow: 0 0 10px rgba(103, 240, 91, 1);
                  }
                `}
              </style>
              <div className={`w-2 h-2 rounded-full bg-[rgb(103,240,91)] ${glow ? 'glow' : ''}`} />
              <span className='text-[.7rem] px-1 font-bold'>2078 </span>
              <span className='text-[.7rem] font-bold text-slate-400'>Playing</span>
            </div>
          </div>
        ))}
      </div>
      <div className=' justify-center flex'>   <ViewAllButton name=' Live Casino' total={total} link='live-casino'/></div>
    </>
  );
}