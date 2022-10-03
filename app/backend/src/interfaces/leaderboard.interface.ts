import { IMatch } from './match.interface';

// Cria uma interface para a leaderboard
export interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

// Cria uma interface para os times
export interface ITeam {
  id: number;
  teamName: string;
  matchHome: IMatch[];
  matchAway: IMatch[];
}
