
import React, { createContext, useContext,  useEffect,  useMemo,  useState } from "react";
import api from "../utils/api/api";
import useApi from "../hooks/useApi";
import Cookies from "js-cookie";
import { LiveMatchesResponse, SportsCategory, SportsCategoryResponse } from "../utils/types/sports";


// import { useSportSocket } from "../hooks/useSportSocket";

// Create the context

interface SportsContextType {
  AllSportsData: SportsCategoryResponse | undefined;
  isLoadingSportsData: boolean;
  refetchAllSports: () => void;
  setSelectedSport: (sport: string | null) => void;
  selectedSport: string | null;
  LiveMatchesSportWise: LiveMatchesResponse | undefined;
  LiveMatchesSportWiseError: Error | null;
  LiveMatchesSportWiseLoading: boolean;
  LiveMatchesSportWiseRefetch: () => void;
}
export const SportsContext = createContext<SportsContextType | undefined>(undefined);


interface props {
  children: React.ReactNode;
}
// Dialog context provider
export const SportsProvider: React.FC<props> = ({ children }) => {

  // const {joinSportsRoom} = useSocket()
  // console.log(joinSportsRoom);
  

  const [LiveMatchesSportWise,setLiveMatchesSportWise] = useState<LiveMatchesResponse|undefined>()

  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const {useFetchData, useFetchWithoutBaseUrl} = useApi();
  const {data: AllSportsData , error, isPending:isLoadingSportsData, refetch:refetchAllSports} = useFetchData<SportsCategoryResponse|undefined>(`sports/get_sports`)
  const {data: LiveMatchesSportWiseData , error:LiveMatchesSportWiseError, isPending:LiveMatchesSportWiseLoading, refetch:LiveMatchesSportWiseRefetch} = useFetchData<LiveMatchesResponse|undefined>(`sports/get_live_matches_by_sport/${selectedSport}`, !!selectedSport);
  
  useEffect(()=>{
    setLiveMatchesSportWise(LiveMatchesSportWiseData)
  },[LiveMatchesSportWiseData])
  

  const getUserInfo = () => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      return JSON.parse(userInfo);
    }
  };

  
 const contextValue = useMemo(() => ({
  AllSportsData,
  isLoadingSportsData,
  refetchAllSports,
  setSelectedSport,
  selectedSport,
  LiveMatchesSportWise,
  LiveMatchesSportWiseError,
  LiveMatchesSportWiseLoading,
  LiveMatchesSportWiseRefetch
  }), [AllSportsData, isLoadingSportsData, refetchAllSports, setSelectedSport, selectedSport, LiveMatchesSportWise, LiveMatchesSportWiseError, LiveMatchesSportWiseLoading, LiveMatchesSportWiseRefetch]);

  

  return (
    <SportsContext.Provider value={contextValue}>   
      {children}
    </SportsContext.Provider>
  );
 
};







export const useSportsData = () => {
  const context = useContext(SportsContext);
  if (!context) {
    throw new Error("useSportsData must be used within a SportsProvider");
  }
  return context;
};

