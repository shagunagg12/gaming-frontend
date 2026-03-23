
export interface SportsCategory {
  _id: string;
  title: string;
  icon: string;
  status: string;
  ActiveEvent: string; 
  ActiveTeam: string;
  ActiveMatch: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SportsCategoryResponse {
  data: SportsCategory[];
  statusCode: number;
  success: boolean; 
  message: string;
}

export interface MatchStatus {
  main: string;
  period: string;
  clock: string;
  breakType: string | null;
  isLive: boolean;
}

export interface MatchCategory {
  _id: string;
  title: string;
  icon: string;
  status: string;
  [key: string]: any;
}

export interface MatchEvent {
  _id: string;
  title: string;
  category: string;
  [key: string]: any;
}

export interface MatchTeam {
  _id: string;
  title: string;
  category: string;
  [key: string]: any;
}

export interface MatchMedia {
  thumbnail?: string;
  highlightVideoUrl?: string;
  gallery?: string[];
}

export interface MatchVenue {
  name?: string;
  city?: string;
  country?: string;
}

export interface MatchScore {
  team1: string;
  team2: string;
}

export interface Official {
  role: string;
  name: string;
}

export interface MatchData {
  _id: string;
  title: string;
  team1: MatchTeam;
  team2: MatchTeam;
  category: MatchCategory;
  event: MatchEvent;
  start_date: string;
  end_date: string;
  is_locked: boolean;
  autoLockAt: string | null;
  status: MatchStatus;
  is_result_declared: boolean;
  watchLiveUrl: string;
  matchResultScore: MatchScore;
  winner: 'team1' | 'team2' | 'draw' | 'pending';
  matchResultDeclared: boolean;
  matchResultDeclaredDate: string | null;
  matchResultDeclaredBy: string | null;
  matchPopularity: 'Low' | 'Medium' | 'High';
  bettingOddsStatus: 'Active' | 'Inactive';
  format: 'Friendly' | 'League' | 'Knockout' | 'Final' | 'Qualifier';
  venue: MatchVenue;
  officials: Official[];
  sponsors: string[];
  broadcastPartners: string[];
  summary: string;
  tags: string[];
  media: MatchMedia;
  matchCreatedBy: string;
  matchUpdatedBy: string | null;
  betQuestions: BetQuestion[] | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface LiveMatchesResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: MatchData[];
}

export interface BetQuestion {
  _id: string;
  question: string;
  matchId: string;
  endTime?: string;
  selections?: Selection[]; 
  status?: string;
  isLive?: boolean;
  isMain?: boolean; 
  createdBy?: string;
}

export interface Selection {
  _id: string;
  name: string;
  currentOdds: number;
  initialOdds: number;
  isActive: boolean;
}

export interface BetSlip {
    betSlipId?: string;
    match: string; //id
    market: string;// bet question Id
    selection: string; // selected option Id
    BetTime: string;
    stake: string | number;// amount bet
    sport: string;
    betType?: string;// single , multi ,live or pre-match
    currency: string;  
    // Additional fields for frontend use..........
    isLiveFr?: boolean;
    isSettledFr?: boolean;
    TeamAFr?: string; 
    TeamBFr?: string; 
    questionFr?: string; // Question text
    selectedOptionFr?: string;      
    initialOddFr?: number; 
    currentOddFr?: number; 

  }

