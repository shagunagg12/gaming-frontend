import  { useEffect, useState } from 'react';
import { BsFillGiftFill } from "react-icons/bs";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import gameshows from "../../../assets/images/gameShow/games.png";
import gameshows1 from "../../../assets/images/gameShow/games (1).png";
import gameshows2 from "../../../assets/images/gameShow/games (2).png";
import gameshows3 from "../../../assets/images/gameShow/games (3).png"
import gameshows4 from "../../../assets/images/gameShow/games (4).png";
import gameshows5 from "../../../assets/images/gameShow/games (5).png";
import gameshows6 from "../../../assets/images/gameShow/games (6).png";
import gameshows7 from "../../../assets/images/gameShow/games (7).png";
import gameshows8 from "../../../assets/images/gameShow/games (8).png";
import gameshows9 from "../../../assets/images/gameShow/games (9).png";;
import gameshows10 from "../../../assets/images/gameShow/games (10).png";
import gameshows11 from "../../../assets/images/gameShow/games (11).png";
import gameshows12 from "../../../assets/images/gameShow/games (12).png";
import gameshows13 from "../../../assets/images/gameShow/games (13).png";
import gameshows14 from "../../../assets/images/gameShow/games (14).png";
import gameshows15 from "../../../assets/images/gameShow/games (15).png";
import gameshows16 from "../../../assets/images/gameShow/games (16).png";
import gameshows17 from "../../../assets/images/gameShow/games (17).png";
import ViewAllButton from '../universalComponents/ViewAllButton';


// Example data for the games
const games:GameProp[] = [
  {
    title: 'Game 1',
    description: 'Description for Game 1',
    img: gameshows,
    category:"avatar"
  },
  {
    title: 'Game 2',
    description: 'Description for Game 2',
    img: gameshows1,
    category:"avatar"
  },
  {
    title: 'Game 3',
    description: 'Description for Game 3',
    img: gameshows2,
    category:"avatar"
  },
  {
    title: 'Game 4',
    description: 'Description for Game 1',
    img:gameshows3,
    category:"avatar"
  },
  {
    title: 'Game 5',
    description: 'Description for Game 2',
    img: gameshows4,
    category:"avatar"
  },
  {
    title: 'Game 6',
    description: 'Description for Game 3',
    img: gameshows5,
    category:"avatar"
  },
  {
    title: 'Game 7',
    description: 'Description for Game 1',
    category:"avatar",
    img: gameshows6,
  },
  {
    title: 'Game 8',
    description: 'Description for Game 2',
    img: gameshows7,
    category:"avatar"
  },
  {
    title: 'Game 9',
    description: 'Description for Game 3',
    img:gameshows8,
    category:"avatar"
  },
  {
    title: 'Game 10',
    description: 'Description for Game 4',
    img: gameshows9,
    category:"avatar"
  },
  {
    title: 'Game 111',
    description: 'Description for Game 1',
    img: gameshows10,
    category:"avatar"
  },
  {
    title: 'Game 12',
    description: 'Description for Game 2',
    img: gameshows11,
    category:"avatar"
  },
  {
    title: 'Game 13',
    description: 'Description for Game 3',
    img:gameshows12,
    category:"avatar"
  },
  {
    title: 'Game 14',
    description: 'Description for Game 1',
    img: gameshows13,
    category:"avatar"
  },
  {
    title: 'Game 15',
    description: 'Description for Game 2',
    img:gameshows14,
    category:"avatar"
  },
  {
    title: 'Game 16',
    description: 'Description for Game 3',
    img:gameshows15,
    category:"avatar"
  },
  {
    title: 'Game 17',
    description: 'Description for Game 1',
    img: gameshows16,
    category:"avatar"
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: gameshows17,
    category:"avatar"
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
export default function GameShows(props:Props) {

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
   <div className='text-lg font-bold p-4 items-center flex gap-2'><BsFillGiftFill/>Game Shows</div>
    <div className='grid   grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-8 '>
    { games.slice(0,props.visibleCards).map((game, index) => (
          <div key={index} className="p-2 ">
            
            <div className="bg-gray-800  w-full  rounded-lg hover:bg-gray-700 transition duration-300 hover:-translate-y-3 cursor-pointer">
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
      <div className=' justify-center flex'><ViewAllButton name=' Game Shows' total={total} link='game-show'/></div>
     
    </>
  );
}