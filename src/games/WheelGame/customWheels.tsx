import { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette'

const data = [
  { option: '0', style: { backgroundColor: 'green', textColor: 'red' } },
  { option: '1', style: { backgroundColor: 'blue', } },
  { option: '2', style: { backgroundColor: 'green', } },
  { option: '3', style: { backgroundColor: 'red', } },
  { option: '4', style: { backgroundColor: 'gray', } },
  { option: '5', style: { backgroundColor: 'white', } },
]
export const CustomWheel = () => {

const [spinning, setSpinning] = useState(false);
const [click, setClick] = useState(Number(0));

const handleSpinClick = () => {
      setSpinning(true);
        setClick(click + 1);
        setPrizeNumber(Math.floor(Math.random() * data.length));
       
        
    setHistory((prev)=>{
        return [...prev, prizeNumber]
    })
    console.log(history);

    //   setSpinning(false);
    };
const [history, setHistory] = useState<number[]>([]);
const [prizeNumber, setPrizeNumber] = useState<number>(0);



  return  (
  <>
    <Wheel
      mustStartSpinning={spinning}
      innerBorderWidth={200}
      prizeNumber={prizeNumber}
      data={data}
    //   backgroundColors={['#3e3e3e', '#df3428']}
      textColors={['yellow']}  
      radiusLineWidth={0}
     onStopSpinning={() => setSpinning(false)}
     spinDuration={.1}
     startingOptionIndex={0}
    outerBorderWidth={0}
    outerBorderColor="#3e3e3e"
   
    />

    <button disabled={spinning} onClick={handleSpinClick}>click{click}</button>

    <div className='flex flex-row gap-2'>
        {history.map((item, index)  => (
            <div key={index} className='bg-gray-800 p-2 rounded-md'>
                {item}
            </div>
        ))}
    </div>

    <p>{prizeNumber}</p>

  </>
)}
