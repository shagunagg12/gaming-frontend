import React, { useEffect, useState, ReactNode, useMemo } from "react";
import UserContext from './UserContext';
import axios from "axios";
import CombinedDataResponse, { MatchData } from "../utils/types/liveMatchesCombinedData";
import  gameDataInnings from "../utils/types/matchInningsTypes"; // Assuming this is correctly imported
import { useParams } from "react-router-dom";
import ClassResponse, { Country } from "../utils/types/Types";

// Define the props type for the provider
interface UserContextProviderProps {
  children: ReactNode;
}


const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {



  const [gameInningsData, setGameInningsData] = useState<gameDataInnings | undefined>(undefined);
    
    // fetxh upcoming events
    const [allUpcomingSportsFetched, setAllUpcomingSportsFetched] = useState<boolean>(false); // Tracks whether data has been fetched
    const [isUpcomingLoading, setIsUpcomingLoading] = useState<boolean>(false); // Loading state  
    const [upcomingGameData, setUpcomingGameData] = useState<CombinedDataResponse | undefined>(undefined);

    const fetchAllUpcomingSports = async () => {
      if (!allUpcomingSportsFetched) { // Only fetch if data hasn't been fetched yet
        try {
          setIsUpcomingLoading(true); // Start loading
          const response = await axios.get('http://localhost:3000/sports/home/upcoming');
          setUpcomingGameData(response.data); // Update state with the data      
          setAllUpcomingSportsFetched(true); // Set flag to true once data is fetched
          setIsUpcomingLoading(false); // Stop loading
        } catch (error) {
          console.error('Error fetching sports data:', error);
          setIsUpcomingLoading(false); // Stop loading on error
        }
      }
    };
    console.log("upcoming All",upcomingGameData);
    useEffect(() => {
      // Optional: Automatically fetch data on mount if needed
      if(!allUpcomingSportsFetched) {
        fetchAllUpcomingSports();
      }
    }, []);  
  

    // fetch all classes(countries)
    const [allClasses, setAllClasses] = useState<Country | undefined>(undefined);
    const [allClassesFetched, setAllClassesFetched] = useState<boolean>(false); // Tracks whether data has been fetched
    const [classesLoading, setClassesLoading] = useState<boolean>(false); 
    // const [classId, setClassId] = useState<number | undefined>(undefined);
    const fetchClassData = async () => {
      if(!allClassesFetched){
      try {
        setClassesLoading(true); 
        const response = await axios.post('http://localhost:000/sports/home');
        setAllClasses(response.data); // Update state with the data
        setAllClassesFetched(true); 
        console.log("new data",gameData);
        setClassesLoading(false);
      } catch (error) {
        console.error('Error fetching sports data:', error); // Log any error
        setClassesLoading(false);
      }
      }
    };
    useEffect(()=>{
      fetchClassData() 
    },[])
  

        // fetch matches by tournamentId 
        const [matchesByTournamentData, setMatchesByTournamentData] = useState<MatchData | undefined>(undefined);
        const [matchesByTournamentFetched, setMatchesByTournamentFetched] = useState<boolean>(false); // Tracks whether data has been fetched
        const [matchesByTournamentLoading, setMatchesByTournamentLoading] = useState<boolean>(false); 
        // const [classId, setClassId] = useState<number | undefined>(undefined);
        const fetchMatchesByTournamentData = async () => {
          if(!allClassesFetched){
          try {
            setMatchesByTournamentLoading(true); 
            const response = await axios.post('http://localhost:000/sports/home');
            setMatchesByTournamentData(response.data); // Update state with the data
            setMatchesByTournamentFetched(true); 
            console.log("new data",gameData);
            setMatchesByTournamentLoading(false);
          } catch (error) {
            console.error('Error fetching sports data:', error); // Log any error
            setMatchesByTournamentLoading(false);
          }
          }
        };
        useEffect(()=>{
          fetchMatchesByTournamentData() 
        },[])
      
  
  // fetch Tournament by  classId
  const [gameTounament, setGameTournaments] = useState<ClassResponse | undefined>(undefined);
  const [tournamentsLoading, setTournamentsLoading] = useState<boolean>(false); 
  const [classId, setClassId] = useState<number | undefined>(undefined);
  console.log('classid',classId);
  
  const TournamentByClassId = async () => {
    if (!classId) return; // Ensure classId is available before fetching
    try {
      setTournamentsLoading(true);
      const response = await axios.post('http://localhost:000/sports/tournament', { classId });
      setGameTournaments(response.data);
    } catch (error) {
      console.error('Error fetching tournament data:', error);
      // Optionally, handle the error (e.g., show a notification or set an error state)
    } finally {
      setTournamentsLoading(false); // Ensure loading state is reset
    }
  };
  useEffect(()=>{
    TournamentByClassId() 
  },[classId])


    // Fetch function for sports data
    const [gameData, setGameData] = useState<CombinedDataResponse | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false); 
  
    const fetchSportsData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/sports/home');
        setGameData(response.data); // Update state with the data
        // console.log("new data",gameData);
        
      } catch (error) {
        console.error('Error fetching sports data:', error); // Log any error
      }
    };
  // Fetch function for innings data
  const fetchSportsInningsData = async () => {
    try {
      const response = await axios.post('http://localhost:000/sports/home/innings');
      setGameInningsData(response.data); // Update state with the data
    } catch (error) {
      console.error('Error fetching innings data:', error); // Log any error
    }
  };
  // Fetch both datasets in parallel and handle loading state once
  const fetchAllData = async () => {
    setLoading(true); // Start loading
    await Promise.all([fetchSportsData(), fetchSportsInningsData()]);
    setLoading(false); // Stop loading when both requests are complete
  };

  useEffect(() => {
    fetchAllData(); // Fetch all data when component mounts
  }, []);

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({
    gameData,
    gameInningsData,
    loading,
    upcomingGameData,
    isUpcomingLoading,
    setClassId,
    classId,
    gameTounament,
    tournamentsLoading,
    allClasses,
    classesLoading,
    matchesByTournamentData,
    matchesByTournamentLoading,
  }), [gameData, gameInningsData, loading,upcomingGameData,isUpcomingLoading,setClassId,classId,gameTounament,tournamentsLoading,allClasses,classesLoading,matchesByTournamentData,matchesByTournamentLoading,]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
