interface SportEvent {
    id: string;
    tournament_round: {
      type: string;
      number: number;
    };
    season: {
      id: string;
      name: string;
      start_date: string;
      end_date: string;
      year: string;
    };
    scheduled: string;
    start_time_tbd: boolean;
    tournament: {
      id: string;
      name: string;
      type: string;
      gender: string;
      sport: {
        id: string;
        name: string;
      };
      category: {
        id: string;
        name: string;
        country_code: string;
      };
    };
    status: string;
    competitors: Competitor[];
    sport_event_conditions: {
      day_night: string;
    };
  }
  
  interface Competitor {
    id: string;
    name: string;
    country: string;
    country_code: string;
    abbreviation: string;
    qualifier: string;
    gender: string;
  }
  
  interface CricketData {
    sport: string;
    data: {
      generated_at: string;
      sport_events: SportEvent[];
    }; 
  }

  export type {CricketData}