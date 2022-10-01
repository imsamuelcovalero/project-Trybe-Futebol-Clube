import MatchModel from '../../models/match.model';
import TeamModel from '../../models/team.model';
import { ILeaderboard, ITeam } from '../../../interfaces/leaderboard.interface';

const homeInclude = {
  model: MatchModel,
  as: 'matchHome',
  where: {
    inProgress: false,
  },
  attributes: ['homeTeamGoals', 'awayTeamGoals'],
};

const leaderboardHomeUtils = {

  // cria um metodo para pegar todos os times incluindo as partidas em que o time jogou em casa
  getHomeTeams: async (): Promise<ITeam[]> => {
    const teams = await TeamModel.findAll({
      include: [homeInclude],
    });
    return teams as unknown as ITeam[];
  },

  // cria um método que retorna o total de pontos em Casa de um time a partir do resultado de getAllTeams
  getTotalHomePoints: (team: ITeam): number => {
    const matchHomePoints = team.matchHome.map((match) => {
      let subHomeResult = 0;
      const homeWin = match.homeTeamGoals > match.awayTeamGoals;
      const empate = match.homeTeamGoals === match.awayTeamGoals;

      if (homeWin) subHomeResult += 3; if (empate) subHomeResult += 1; else subHomeResult += 0;

      return subHomeResult;
    });

    const totalPoints = matchHomePoints.reduce((acc, curr) => acc + curr, 0);

    return totalPoints;
  },

  // cria um método que retorna o total de jogos em casa de um time a partir do resultado de getAllTeams
  getTotalHomeGames: (team: ITeam): number => {
    const totalGames = team.matchHome.length;
    return totalGames;
  },

  // cria um método que retorna o total de vitórias em casa de um time a partir do resultado de getAllTeams
  getTotalHomeVictories: (team: ITeam): number => {
    const matchHomeVictories = team.matchHome
      .filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
    return matchHomeVictories;
  },

  // cria um método que retorna o total de empates em casa de um time a partir do resultado de getAllTeams
  getTotalHomeDraws: (team: ITeam): number => {
    const matchHomeDraws = team.matchHome
      .filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
    return matchHomeDraws;
  },

  // cria um método que retorna o total de derrotas em casa de um time a partir do resultado de getAllTeams
  getTotalHomeLosses: (team: ITeam): number => {
    const matchHomeLosses = team.matchHome
      .filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
    return matchHomeLosses;
  },

  // cria um método que retorna o total de gols a favor de um time em casa a partir do resultado de getAllTeams
  getHomeGoalsFavor: (team: ITeam): number => {
    const matchHomeGoalsFavor = team.matchHome
      .map((match) => match.homeTeamGoals).reduce((a, b) => a + b, 0);
    return matchHomeGoalsFavor;
  },

  // cria um método que retorna o total de gols contra de um time em casa a partir do resultado de getAllTeams
  getHomeGoalsOwn: (team: ITeam): number => {
    const matchHomeGoalsAgainst = team.matchHome
      .map((match) => match.awayTeamGoals).reduce((a, b) => a + b, 0);
    return matchHomeGoalsAgainst;
  },

  // cria um método que retorna o saldo de gols de um time em casa a partir do resultado de getAllTeams
  getHomeGoalsBalance: (team: ITeam): number => {
    const goalsFavor = leaderboardHomeUtils.getHomeGoalsFavor(team);
    const goalsOwn = leaderboardHomeUtils.getHomeGoalsOwn(team);
    const goalsBalance = goalsFavor - goalsOwn;
    return goalsBalance;
  },

  // cria um método que retorna o aproveitamento de um time a partir do resultado de getAllTeams
  getHomePerformance: (team: ITeam): number => {
    const totalPoints = leaderboardHomeUtils.getTotalHomePoints(team);
    const totalGames = leaderboardHomeUtils.getTotalHomeGames(team);
    const teamPerformance = (totalPoints / (totalGames * 3)) * 100;
    return teamPerformance;
  },

  // cria um método que recebe a leaderboard e retorna a mesma ordenada de acordo com os critérios
  getLeaderboardOrdered: (leaderboard: ILeaderboard[]): ILeaderboard[] => {
    // O resultado deverá ser ordenado sempre de forma decrescente, levando em consideração a quantidade de pontos que o time acumulou.
    const leaderboardOrdered = leaderboard.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      // Em caso de empate no Total de Pontos, você deve levar em consideração os seguintes critérios para desempate:
      // 1º Total de Vitórias
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      // 2º Saldo de gols
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      // 3º Gols a favor
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      // 4º Gols sofridos
      if (a.goalsOwn > b.goalsOwn) return 1;
      if (a.goalsOwn < b.goalsOwn) return -1;
      return 0;
    });
    return leaderboardOrdered;
  },
};

export default leaderboardHomeUtils;
