import   {  useEffect, useState } from 'react';
import game from "../../../assets/images/slots/games.png"
import game1 from "../../../assets/images/slots/games (1).png";
import game2 from "../../../assets/images/slots/games (2).png";
import game3 from "../../../assets/images/slots/games (3).png"
import game4 from "../../../assets/images/slots/games (4).png";
import game5 from "../../../assets/images/slots/games (5).png";
import game6 from "../../../assets/images/slots/games (6).png";
import game7 from "../../../assets/images/slots/games (7).png";
import game8 from "../../../assets/images/slots/games (8).png";
import game9 from "../../../assets/images/slots/games (9).png";;
import game10 from "../../../assets/images/slots/games (10).png";
import game11 from "../../../assets/images/slots/games (11).png";
import game12 from "../../../assets/images/slots/games (12).png";
import game13 from "../../../assets/images/slots/games (13).png";
import game14 from "../../../assets/images/slots/games (14).png";
import game15 from "../../../assets/images/slots/games (15).png";
import game16 from "../../../assets/images/slots/games (16).png";
import game17 from "../../../assets/images/slots/games (17).png";
import { IconType } from 'react-icons';
import ViewAllButton from '../universalComponents/ViewAllButton';



  const games:GameProp[] = [
    {
      title: 'Game 1',
      description: 'Description for Game 1',
      img: game,
      category:"Avatar"
    },
    {
      title: 'Game 2',
      description: 'Description for Game 2',
      img: game1,
      category:"Backseat Gaming"
    },
    {
      title: 'Game 3',
      description: 'Description for Game 3',
      img: game2,
      category:"Belatra"
    },
    {
      title: 'Game 4',
      description: 'Description for Game 1',
      img:game3,
      category:'BGaming'
    },
    {
      title: 'Game 5',
      description: 'Description for Game 2',
      img: game4,
      category:'Devon Webb'
    },
    {
      title: 'Game 6',
      description: 'Description for Game 3',
      img: game5,
      category:'Devon Webb'
    },
    {
      title: 'Game 7',
      description: 'Description for Game 1',
      img: game6,
      category:'Devon Webb'
    },
    {
      title: 'Game 8',
      description: 'Description for Game 2',
      img: game7,
      category:'Devon Webb'
    },
    {
      title: 'Game 9',
      description: 'Description for Game 3',
      img:game8,
      category:'Devon Webb'
    },
    {
      title: 'Game 10',
      description: 'Description for Game 4',
      img: game9,
      category:'Devon Webb'
    },
    {
      title: 'Game 111',
      description: 'Description for Game 1',
      img: game10,
      category:'Devon Webb'
    },
    {
      title: 'Game 12',
      description: 'Description for Game 2',
      img: game11,
      category:'Devon Webb'
    },
    {
      title: 'Game 13',
      description: 'Description for Game 3',
      img:game12,
      category:'Devon Webb'
    },
    {
      title: 'Game 14',
      description: 'Description for Game 1',
      img: game13,
      category:'Devon Webb'
    },
    {
      title: 'Game 15',
      description: 'Description for Game 2',
      img:game14,
      category:'Devon Webb'
    },
    {
      title: 'Game 16',
      description: 'Description for Game 3',
      img:game15,
      category:'Devon Webb'
    },
    {
      title: 'Game 17',
      description: 'Description for Game 1',
      img: game16,
      category:'Devon Webb'
    },
    {
      title: 'Game 18',
      description: 'Description for Game 2',
      img: game17,
      category:'Devon Webb'
    }, 
    {
      title: 'Game 16',
      description: 'Description for Game 3',
      img:game15,
      category:'Devon Webb'
    },
    {
      title: 'Game 17',
      description: 'Description for Game 1',
      img: game16,
      category:'Devon Webb'
    },
    {
      title: 'Game 18',
      description: 'Description for Game 2',
      img: game17,
      category:'Devon Webb'
    }, 
  ];
  interface GameProp {
    title:string;
    description:string;
    img:string
    category:string
  }

// Example data for the games
interface GameProp {
    title:string;
    description:string;
    img:string;
    category:string;
}
interface Props {
  name:string;
  icon:IconType
  visibleCards:number
}

export default function SlotsGames(props:Props) {

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
   <div className='text-lg font-bold p-4 items-center flex gap-2'>{props.icon && <props.icon/>}{props.name}</div>
    <div className='grid   grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-8 '>
    
            { games.slice(0,props.visibleCards).map((game, index) => (
          <div key={index} className="p-2 ">
        
            
            <div className="bg-gray-800 w-full  rounded-lg hover:bg-gray-700 transition duration-300 hover:-translate-y-3 cursor-pointer">
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
          
       
 
  ))} 
   
     </div>

   <div className=' justify-center flex'> <ViewAllButton name=' Slots' total={total} link='slots'/></div> 
     
    </>
  );
}