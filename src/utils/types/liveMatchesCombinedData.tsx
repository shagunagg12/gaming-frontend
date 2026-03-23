
interface team_score{
    current: number;
    display: number;
    period_1?: number;
    period_2?: number;
    default_time?: number;
  }
  
  
  interface Coaches {
    away_coach_id: number;
    home_coach_id: number;
    away_coach_name: string;
    home_coach_name: string;
    away_coach_hash_image: string;
    home_coach_hash_image: string;
  }
  
  interface RoundInfo {
    id: number;
    name?: string;
    round: number;
    end_time: string;
    start_time: string;
  }
  
  interface Status {
    type: string;
    reason: string;
  }
  
  interface Times {
    extend_time_1?: number;
    extend_time_2?: number;
    specific_start_time: string;
  }
  
  interface MatchData {
    arena_hash_image?:string
    arena_id?:number
    arena_name?:string
    id:number
    class_hash_image: string;
    class_id: number;
    class_name: string;
    coaches?: Coaches;
    coaches_id?: number;
    duration: number;
    end_time: string;
    graphs_id: number;
    league_hash_image: string;
    league_id: number;
    league_name: string;
    lineups_id: number;
    name: string;
    referee_hash_image: string;
    referee_id: number;
    referee_name: string;
    round: RoundInfo;
    round_id: number;
    season_id: number;
    season_name: string;
    specific_start_time?: string;
    start_time: string;
    status: Status;
    status_type: string;
    times: Times;
    tournament_id: number;
    tournament_importance: number;
    tournament_name: string;
    home_team_hash_image: string;
    home_team_id: number;
    home_team_name: string;
    away_team_score:  team_score;
    away_team_hash_image: string;
    away_team_id: number;
    away_team_name: string;
    home_team_score: team_score;
  
  }
  interface SportData {
    sport: string;
    data: MatchData[]; // Replace `any` with a more specific type if you know what kind of data is contained in the arrays.
  }
  
  interface CombinedDataResponse {
    combinedData: SportData[];
    message: string; // A message indicating the status of the data fetching
  }





export interface MatchResultScore {
  team1: number;
  team2: number;
}

export interface Match {
  _id: string;
  title: string;
  team1: string; 
  team2: string; 
  tournament: string;
  category: string; 
  start_date: string;
  end_date: string; 
  status: "Upcoming" | "Live" | "Completed" | string;
  winner: string;
  matchResultDeclared: boolean;
  matchResultScore: MatchResultScore;
  matchPopularity: "Low" | "Medium" | "High" | string;
  format: string;
  bettingOddsStatus: "Active" | "Inactive" | string;
  is_result_declared: boolean;
  is_locked: boolean;
  broadcastPartners: string[];
  sponsors: string[];
  officials: string[];
  tags: string[];
  media: {
    gallery: string[];
  };
  watchLiveUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}






  export default CombinedDataResponse
  export type {MatchData,SportData}