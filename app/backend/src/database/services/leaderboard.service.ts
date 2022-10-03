import MatcheModel from '../models/match.model';
import MatcheService from './matches.service';
import leaderboardHome from './utils/leaderboardHome.utils';
import leaderboardAway from './utils/leaderboardAway.utils';
import leaderboard from './utils/leaderboard.utils';
import { ILeaderboard } from '../../interfaces/leaderboard.interface';

export default class LeaderboardService extends MatcheService {
  model: MatcheModel;

  constructor() {
    super();
    this.model = new MatcheModel();
  }

  getHomeLeaderboard = async (): Promise<ILeaderboard[]> => {
    const teams = await leaderboardHome.getHomeTeams();

    // cria uma constante que recebe monta o array com os valores da tabela de classificação em casa
    const homeLeaderboard = teams.map((team) => ({
      name: team.teamName,
      totalPoints: leaderboardHome.getTotalHomePoints(team),
      totalGames: leaderboardHome.getTotalHomeGames(team),
      totalVictories: leaderboardHome.getTotalHomeVictories(team),
      totalDraws: leaderboardHome.getTotalHomeDraws(team),
      totalLosses: leaderboardHome.getTotalHomeLosses(team),
      goalsFavor: leaderboardHome.getHomeGoalsFavor(team),
      goalsOwn: leaderboardHome.getHomeGoalsOwn(team),
      goalsBalance: leaderboardHome.getHomeGoalsBalance(team),
      efficiency: leaderboardHome.getHomePerformance(team),
    }));

    const sortedLeaderboard = leaderboardHome.getLeaderboardOrdered(homeLeaderboard);

    return sortedLeaderboard as unknown as ILeaderboard[];
  };

  getAwayLeaderboard = async (): Promise<ILeaderboard[]> => {
    const teams = await leaderboardAway.getAwayTeams();

    const awayLeaderboard = teams.map((team) => ({
      name: team.teamName,
      totalPoints: leaderboardAway.getTotalAwayPoints(team),
      totalGames: leaderboardAway.getTotalAwayGames(team),
      totalVictories: leaderboardAway.getTotalAwayVictories(team),
      totalDraws: leaderboardAway.getTotalAwayDraws(team),
      totalLosses: leaderboardAway.getTotalAwayLosses(team),
      goalsFavor: leaderboardAway.getAwayGoalsFavor(team),
      goalsOwn: leaderboardAway.getAwayGoalsOwn(team),
      goalsBalance: leaderboardAway.getAwayGoalsBalance(team),
      efficiency: leaderboardAway.getAwayPerformance(team),
    }));

    const sortedLeaderboard = leaderboardAway.getLeaderboardOrdered(awayLeaderboard);

    return sortedLeaderboard as unknown as ILeaderboard[];
  };

  getLeaderboard = async (): Promise<ILeaderboard[]> => {
    const teams = await leaderboard.getAllTeams();

    const fullLeaderboard = teams.map((team) => ({
      name: team.teamName,
      totalPoints: leaderboard.getTotalPoints(team),
      totalGames: leaderboard.getTotalGames(team),
      totalVictories: leaderboard.getTotalVictories(team),
      totalDraws: leaderboard.getTotalDraws(team),
      totalLosses: leaderboard.getTotalLosses(team),
      goalsFavor: leaderboard.getGoalsFavor(team),
      goalsOwn: leaderboard.getGoalsOwn(team),
      goalsBalance: leaderboard.getGoalsBalance(team),
      efficiency: leaderboard.getTeamPerformance(team),
    }));

    const sortedLeaderboard = leaderboard.getLeaderboardOrdered(fullLeaderboard);

    return sortedLeaderboard as unknown as ILeaderboard[];
  };
}
