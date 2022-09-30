import MatcheModel from '../models/match.model';
import MatcheService from './matches.service';
import TeamModel from '../models/team.model';
import leaderboardServiceUtils from './utils/LeaderboardService.utils';
import { /* ITeam,  */ILeaderboard } from '../../interfaces/leaderboard.interface';
// import CustomError from '../../errors/CustomError';

export default class LeaderboardService extends MatcheService {
  model: MatcheModel;

  constructor() {
    super();
    this.model = new MatcheModel();
  }

  // cria um metodo para pegar todos os times filtrando por inProgress = false
  getAllInProgessMatches = async (): Promise<MatcheModel[]> => {
    const matches = await MatcheModel.findAll({
      where: {
        inProgress: false,
      },
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });

    return matches;
  };

  // cria um metodo para pegar todos os times
  // getAllTeams = async (): Promise<TeamModel[]> => {
  //   const teams = leaderboardServiceUtils.getAllTeams();
  //   console.log('teams', teams);

  //   return teams;
  // };

  getHomeLeaderboard = async (): Promise<ILeaderboard[]> => {
    const teams = await leaderboardServiceUtils.getAllTeams();
    console.log('teams', teams);

    // cria uma variavel que recebe monta o array com os valores da tabela de classificação
    const leaderboard = (await teams).map((team) => ({
      name: team.teamName,
      totalPoints: leaderboardServiceUtils.getTotalPoints(team),
      totalGames: leaderboardServiceUtils.getTotalGames(team),
      totalVictories: leaderboardServiceUtils.getTotalVictories(team),
      totalDraws: leaderboardServiceUtils.getTotalDraws(team),
      totalLosses: leaderboardServiceUtils.getTotalLosses(team),
      goalsFavor: leaderboardServiceUtils.getGoalsFavor(team),
      goalsOwn: leaderboardServiceUtils.getGoalsOwn(team),
      goalsBalance: leaderboardServiceUtils.getGoalsBalance(team),
      efficiency: leaderboardServiceUtils.getTeamPerformance(team),
    }));

    // O resultado deverá ser ordenado sempre de forma decrescente, levando em consideração a quantidade de pontos que o time acumulou. Em caso de empate no Total de Pontos, você deve levar em consideração os seguintes critérios para desempate:
    //     Ordem para desempate
    // 1º Total de Vitórias; 2º Saldo de gols; 3º Gols a favor; 4º Gols sofridos.
    const sortedLeaderboard = leaderboardServiceUtils.getLeaderboardOrdered(leaderboard);

    // const matchs = await this.getAllMatches();

    // const matchsInProgress = matchs.filter((match) => match.inProgress === false);

    // const leaderboard = matchsInProgress.map((match) => {
    //   const name = match.teamHome;
    //   const totalPoints = match.homeTeamGoals > match.awayTeamGoals ? 3 : match.homeTeamGoals === match.awayTeamGoals ? 1 : 0;
    //   const totalGames = matchsInProgress.filter((match) => match.teamHome === name || match.teamAway === name).length;
    //   const totalVictories = matchsInProgress.filter((match) => match.teamHome === name && match.homeTeamGoals > match.awayTeamGoals).length;
    //   const totalDraws = matchsInProgress.filter((match) => match.teamHome === name && match.homeTeamGoals === match.awayTeamGoals).length;
    //   const totalLosses = matchsInProgress.filter((match) => match.teamHome === name && match.homeTeamGoals < match.awayTeamGoals).length;
    //   const goalsFavor = matchsInProgress.filter((match) => match.teamHome === name).reduce((acc, match) => acc + match.homeTeamGoals, 0);
    //   const goalsOwn = matchsInProgress.filter((match) => match.teamHome === name).reduce((acc, match) => acc + match.awayTeamGoals, 0);
    //   const goalsBalance = goalsFavor - goalsOwn;
    //   const efficiency = (totalPoints / (totalGames * 3)) * 100;

    //   return { name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn, goalsBalance, efficiency };
    // });

    // console.log('leaderboard', leaderboard);

    return sortedLeaderboard as unknown as ILeaderboard[];
  };
}
