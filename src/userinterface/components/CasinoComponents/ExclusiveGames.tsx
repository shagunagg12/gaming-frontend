import  { useEffect, useState } from 'react';
import { BsFillBookmarkStarFill } from "react-icons/bs";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import gameExclusives from "../../../assets/images/exclusiveGames/games.png";
import gameExclusives1 from "../../../assets/images/exclusiveGames/games (1).png";
import gameExclusives2 from "../../../assets/images/exclusiveGames/games (2).png";
import gameExclusives3 from "../../../assets/images/exclusiveGames/games (3).png"
import gameExclusives4 from "../../../assets/images/exclusiveGames/games (4).png";
import gameExclusives5 from "../../../assets/images/exclusiveGames/games (5).png";
import gameExclusives6 from "../../../assets/images/exclusiveGames/games (6).png";
import gameExclusives7 from "../../../assets/images/exclusiveGames/games (7).png";
import gameExclusives8 from "../../../assets/images/exclusiveGames/games (8).png";
import gameExclusives9 from "../../../assets/images/exclusiveGames/games (9).png";;
import gameExclusives10 from "../../../assets/images/exclusiveGames/games (10).png";
import gameExclusives11 from "../../../assets/images/exclusiveGames/games (11).png";
import gameExclusives12 from "../../../assets/images/exclusiveGames/games (12).png";
import gameExclusives13 from "../../../assets/images/exclusiveGames/games (13).png";
import gameExclusives14 from "../../../assets/images/exclusiveGames/games (14).png";
import gameExclusives15 from "../../../assets/images/exclusiveGames/games (15).png";
import gameExclusives16 from "../../../assets/images/exclusiveGames/games (16).png";
import gameExclusives17 from "../../../assets/images/exclusiveGames/games (17).png";
import ViewAllButton from '../universalComponents/ViewAllButton';


// Example data for the games
const gamesExclusives:GameProp[] = [
  {
    title: 'Game 1',
    description: 'Description for Game 1',
    img: gameExclusives,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 2',
    description: 'Description for Game 2',
    img: gameExclusives1,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 3',
    description: 'Description for Game 3',
    img: gameExclusives2,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 4',
    description: 'Description for Game 1',
    img:gameExclusives3,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 5',
    description: 'Description for Game 2',
    img: gameExclusives4,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 6',
    description: 'Description for Game 3',
    img: gameExclusives5,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 7',
    description: 'Description for Game 1',
    img: gameExclusives6,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 8',
    description: 'Description for Game 2',
    img: gameExclusives7,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 9',
    description: 'Description for Game 3',
    img:gameExclusives8,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 10',
    description: 'Description for Game 4',
    img: gameExclusives9,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 111',
    description: 'Description for Game 1',
    img: gameExclusives10,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 12',
    description: 'Description for Game 2',
    img: gameExclusives11,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 13',
    description: 'Description for Game 3',
    img:gameExclusives12,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 14',
    description: 'Description for Game 1',
    img: gameExclusives13,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 15',
    description: 'Description for Game 2',
    img:gameExclusives14,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 16',
    description: 'Description for Game 3',
    img:gameExclusives15,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 17',
    description: 'Description for Game 1',
    img: gameExclusives16,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: gameExclusives17,
    category:"red-sky-gaming"
  },
];

interface GameProp {
    title:string;
    description:string;
    img:string;
    category:string
}
interface Props{
  visibleCards:number
}
export default function ExclusivesGames(props:Props) {

  const [glow, setGlow] = useState(false);
  const[total,setTotal]=useState<number>(0)
  useEffect(() => {
    setTotal(gamesExclusives.length);

  }, [gamesExclusives]); // Run the effect only when games change

  useEffect(() => {
    const interval = setInterval(() => {
      setGlow(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);


  return (
    <>
   <div className='text-lg font-bold p-4 items-center flex gap-2'><BsFillBookmarkStarFill/>Game Shows</div>
    <div className='grid  grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-8 '>
    { gamesExclusives.slice(0,props.visibleCards).map((game, index) => (
          <div key={index} className="p-2 ">
            
            <div className="bg-gray-800 w-full rounded-lg hover:bg-gray-700 transition duration-300 hover:-translate-y-3 cursor-pointer">
              <img
                src={game.img}
                alt={game.title}
                className="rounded-lg  w-full object-cover"
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
      <div className=' justify-center flex'>   <ViewAllButton name=' Exclusive Games' total={total} link='exclusive'/></div>
     
    </>
  );
}