import   { ElementType,  useEffect, useState } from 'react';


// Example data for the games
interface GameProp {
    title:string;
    description:string;
    img:string;
    category:string;
    link?:string
}
interface Props{
name?:string
icon?:ElementType
visibleCards?:number
games:GameProp[]
}

export default function GameCardsForGroupScreen(props:Props) {

  const [glow, setGlow] = useState(false);



  useEffect(() => {
    const interval = setInterval(() => {
      setGlow(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

   
  return (
    <>
   <div className='text-lg font-bold p-4 items-center flex gap-2'>{props.icon && <props.icon/>}{props.name}</div>
    <div className='grid  grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-8 '>
    
            { props.games.slice(0,props.visibleCards).map((game, index) => (
          <div key={index} className="p-2 ">
        
            
            <div className=" sm:w-full   rounded-lg transition duration-300 hover:-translate-y-3 cursor-pointer">
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
     
    </>
  );
}