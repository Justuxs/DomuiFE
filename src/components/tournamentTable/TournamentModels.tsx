export interface Game {
  match: number;
  playerOneId: number;
  playerOne: string;
  playerOneScore: number;
  playerTwoId: number;
  playerTwo: string;
  playerTwoScore: number;
  playerWinner: string;
}

export interface Details {
  round: number;
  matchCount: number;
}

export interface Tournament {
  name: string;
  score: number;
  matchList: Game[];
}

export interface TournamentBE {
  id: number;
  name: string;
  score: number;
  matchList: Game[];
}
