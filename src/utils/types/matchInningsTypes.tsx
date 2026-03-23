
interface BattingLine {
    balls: number;
    fow_over: number; // Fall of wicket over
    fow_score: number; // Score at the fall of wicket
    player_hash_image: string;
    player_id: number;
    player_name: string;
    s4: number; // Number of fours hit by the player
    s6: number; // Number of sixes hit by the player
    score: number; // Runs scored by the player
    wicket_bowler_hash_image: string;
    wicket_bowler_id: number;
    wicket_bowler_name: string;
    wicket_type_id: number; // ID representing the type of wicket
    wicket_type_name: string;
  }
  
  interface BowlingLine {
    maiden: number; // Number of maiden overs
    noball: number; // Number of no-balls
    over: number; // Number of overs bowled
    player_hash_image: string;
    player_id: number;
    player_name: string;
    run: number; // Runs conceded by the bowler
    wicket: number; // Wickets taken by the bowler
    wide: number; // Number of wides
  }
  interface Partnership {
    balls: number; // Number of balls faced in the partnership
    player1_hash_image: string; // Hash image URL for player 1
    player1_id: number; // ID for player 1
    player1_name: string; // Name of player 1
    player2_hash_image: string; // Hash image URL for player 2
    player2_id: number; // ID for player 2
    player2_name: string; // Name of player 2
    score: number; // Runs scored in the partnership
  }
  
  interface MatchInnings {
    batting_lines: BattingLine[];
    batting_team_hash_image: string;
    batting_team_id: number;
    batting_team_name: string;
    bowling_lines: BowlingLine[];
    bowling_team_hash_image: string;
    bowling_team_id: number;
    bowling_team_name: string;
    bye: number;
    extra: number;
    leg_bye: number;
    no_ball: number;
    number: number; // This could represent the innings number
    overs: number;
    partnerships: Partnership[];
    penalty: number;
    score: number;
    wickets: number;
    wide: number;
  }
  interface InningsData{
    match_id:number;
    innings:MatchInnings[]
  }
  
  interface gameDataInnings {
  data:InningsData[]
  message:string
  }


  export default gameDataInnings