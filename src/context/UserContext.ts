import React, { createContext } from 'react';
import gameDataInnings from '../utils/types/matchInningsTypes'
import CombinedDataResponse from '../utils/types/liveMatchesCombinedData'
import ClassResponse, { Country } from '../utils/types/Types';



interface UserContextType {
    gameData:CombinedDataResponse|undefined
    loading:boolean
    gameInningsData:gameDataInnings|undefined
    upcomingGameData:CombinedDataResponse|undefined
    isUpcomingLoading:boolean,
    setClassId: React.Dispatch<React.SetStateAction<number|undefined>>;
    classId:number| undefined;
    gameTounament:ClassResponse|undefined;
    tournamentsLoading:boolean|undefined,
    allClasses:Country | undefined
    classesLoading:boolean|undefined,
   
}
//   const gameName = API_LIVE_DATA_TEST.data.map((item)=>(item.group.groups.map((item)=>(item.englishName))))

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
