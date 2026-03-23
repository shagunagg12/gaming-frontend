import  { useEffect, useState } from 'react';
import { IoRocketSharp } from "react-icons/io5";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import gameNewRelease from "../../../assets/images/newRelease/games.png";
import gameNewRelease1 from "../../../assets/images/newRelease/games (1).png";
import gameNewRelease2 from "../../../assets/images/newRelease/games (2).png";
import gameNewRelease3 from "../../../assets/images/newRelease/games (3).png"
import gameNewRelease4 from "../../../assets/images/newRelease/games (4).png";
import gameNewRelease5 from "../../../assets/images/newRelease/games (5).png";
import gameNewRelease6 from "../../../assets/images/newRelease/games (6).png";
import gameNewRelease7 from "../../../assets/images/newRelease/games (7).png";
import gameNewRelease8 from "../../../assets/images/newRelease/games (8).png";
import gameNewRelease9 from "../../../assets/images/newRelease/games (9).png";;
import gameNewRelease10 from "../../../assets/images/newRelease/games (10).png";
import gameNewRelease11 from "../../../assets/images/newRelease/games (11).png";
import gameNewRelease12 from "../../../assets/images/newRelease/games (12).png";
import gameNewRelease13 from "../../../assets/images/newRelease/games (13).png";
import gameNewRelease14 from "../../../assets/images/newRelease/games (14).png";
import gameNewRelease15 from "../../../assets/images/newRelease/games (15).png";
import gameNewRelease16 from "../../../assets/images/newRelease/games (16).png";
import gameNewRelease17 from "../../../assets/images/newRelease/games (17).png";
import ViewAllButton from '../universalComponents/ViewAllButton';


// Example data for the New Realease Games
const games:GameProp[] = [
  {
    title: 'Game 1',
    description: 'Description for Game 1',
    img: gameNewRelease,
    category:'blue sky games'  
},
  {
    title: 'Game 2',
    description: 'Description for Game 2',
    img: gameNewRelease1,
    category:'blue sky games'
  },
  {
    title: 'Game 3',
    description: 'Description for Game 3',
    img: gameNewRelease2,
    category:'blue sky games'
  },
  {
    title: 'Game 4',
    description: 'Description for Game 1',
    img:gameNewRelease3,
    category:'blue sky games'
  },
  {
    title: 'Game 5',
    description: 'Description for Game 2',
    img: gameNewRelease4,
    category:'blue sky games'
  },
  {
    title: 'Game 6',
    description: 'Description for Game 3',
    img: gameNewRelease5,
    category:'blue sky games'
  },
  {
    title: 'Game 7',
    description: 'Description for Game 1',
    img: gameNewRelease6,
    category:'blue sky games'
  },
  {
    title: 'Game 8',
    description: 'Description for Game 2',
    img: gameNewRelease7,
    category:'blue sky games'
  },
  {
    title: 'Game 9',
    description: 'Description for Game 3',
    img:gameNewRelease8,
    category:'blue sky games'
  },
  {
    title: 'Game 10',
    description: 'Description for Game 4',
    img: gameNewRelease9,
    category:'blue sky games'
  },
  {
    title: 'Game 111',
    description: 'Description for Game 1',
    img: gameNewRelease10,
    category:'blue sky games',
  },
  {
    title: 'Game 12',
    description: 'Description for Game 2',
    img: gameNewRelease11,
    category:'blue sky games',
  },
  {
    title: 'Game 13',
    description: 'Description for Game 3',
    img:gameNewRelease12,
    category:'blue sky games',
  },
  {
    title: 'Game 14',
    description: 'Description for Game 1',
    img: gameNewRelease13,
    category:'blue sky games',
  },
  {
    title: 'Game 15',
    description: 'Description for Game 2',
    img:gameNewRelease14,
    category:'blue sky games',
  },
  {
    title: 'Game 16',
    description: 'Description for Game 3',
    img:gameNewRelease15,
    category:'blue sky games',
  },
  {
    title: 'Game 17',
    description: 'Description for Game 1',
    img: gameNewRelease16,
    category:'blue sky games',
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: gameNewRelease17,
    category:'blue sky games',
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
export default function NewRelease(props:Props) {

  const [glow, setGlow] = useState(false);
  const[total,setTotal]=useState<number>(0)
  useEffect(() => {
    setTotal(games.length);

  }, [games]); // Run the effect only when games change

  useEffect(() => {
    const interval = setInterval(() => {
      setGlow(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);


  return (
    <>   
 <div className='text-lg font-bold p-4 items-center flex gap-2'><IoRocketSharp/>New Release</div>
    <div className='grid  grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-8'>
    { games.slice(0,props.visibleCards).map((game, index) => (
          <div key={index} className="p-2 ">
            
            <div className="bg-gray-800  w-full  rounded-lg hover:bg-gray-700 transition duration-300 hover:-translate-y-3 cursor-pointer">
              <img
                src={game.img}
                alt={game.title}
                className="rounded-lg w-full  object-cover"
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
      <div className=' justify-center flex'>   <ViewAllButton name=' New Release' total={total} link='new-release'/></div>
     
    </>
  );
}