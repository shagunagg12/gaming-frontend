import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GameLayout from '../../components/CasinoComponents/GameLayout'
import GamrInformationDropdown from '../../components/CasinoComponents/GamrInformationDropdown'
import TableComponent from '../../components/LandingPageComponents/TableComponent'
import ToggleTableComponent from '../../components/LandingPageComponents/ToggleTableComponent'


const toggleOption:toggleOptionProp[] = [
  { title: "My Bets", key: 'my-bets' },
  { title: "All Bets", key: 'all-bets'},
  { title: "High Rollers", key: 'high-rollers'},
  { title: "Race Leaderboard", key: 'race-leaderboard' },
];


interface toggleOptionProp {
  title:string;
  key:string;
}

 function PlayGamePage() {

  const [data, setData] = useState(null);

  const API_TOKEN = 'Mr84zJVGFK3FOyLW5dzrO8Fp0vLLojhoLmGK8sHaK4XkjnWQobkCMBJTzJjN'
 
  
  //   const fetchData = async () => {
  //   const url = 'https://sportapi7.p.rapidapi.com/api/v1/sport/football/scheduled-events/2022-02-11';
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       'x-rapidapi-key': 'f1c8987af2msh593ff3153d5d16ap1488aejsn8c57b9fb364f',
  //       'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
  //     }
  //   };
    
  //   try{
  //     const response = await fetch(url, options);
  //     const result = await response.text();
  //     console.log(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  //   useEffect(() => {
  //     fetchData(); // Call the async function
  //   }, []);

return (<>



      {/* <GameLayout/> */}
    <div className='flex justify-center gap-10  px-4'>
   
   <div className='lg:w-[1200px]  w-full  overflow-hidden rounded-md my-10'>
   
   {/* <GamrInformationDropdown/> */}
   <div className='md:grid hidden'>
      <ToggleTableComponent toggleOption={toggleOption}/>
    </div>
   </div>
   </div>
   </>
  )
}

export default PlayGamePage
