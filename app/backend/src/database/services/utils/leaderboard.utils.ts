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

const awayInclude = {
  model: MatchModel,
  as: 'matchAway',
  where: {
    inProgress: false,
  },
  attributes: ['homeTeamGoals', 'awayTeamGoals'],
};

const leaderboardUtils = {
  // cria um metodo para pegar todos os times incluindo as partidas em que o time jogou
  getAllTeams: async (): Promise<ITeam[]> => {
    const teams = await TeamModel.findAll({
      include: [homeInclude, awayInclude],
    });
    return teams as unknown as ITeam[];
  },

  // cria um método que retorna o total de pontos de um time a partir do resultado de getAllTeams
  getTotalPoints: (team: ITeam): number => {
    const matchHomePoints = team.matchHome.map((match) => {
      let subResult = 0;
      const homeWin = match.homeTeamGoals > match.awayTeamGoals;
      const empate = match.homeTeamGoals === match.awayTeamGoals;

      if (homeWin) subResult += 3; if (empate) subResult += 1; else subResult += 0;

      return subResult;
    });

    const matchAwayPoints = team.matchAway.map((match) => {
      let subResult = 0;
      const awayWin = match.homeTeamGoals < match.awayTeamGoals;
      const empate = match.homeTeamGoals === match.awayTeamGoals;
      // const awayLose = match.homeTeamGoals > match.awayTeamGoals;

      if (awayWin) subResult += 3; if (empate) subResult += 1; else subResult += 0;
      return subResult;
    });

    const totalPoints = matchHomePoints.reduce((acc, curr) => acc + curr, 0) + matchAwayPoints
      .reduce((acc, curr) => acc + curr, 0);

    return totalPoints;
  },

  // cria um método que retorna o total de jogos de um time a partir do resultado de getAllTeams
  getTotalGames: (team: ITeam): number => {
    const totalGames = team.matchHome.length + team.matchAway.length;
    return totalGames;
  },

  // cria um método que retorna o total de vitórias de um time a partir do resultado de getAllTeams
  getTotalVictories: (team: ITeam): number => {
    const matchHomeVictories = team.matchHome
      .filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
    const matchAwayVictories = team.matchAway
      .filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
    const totalVictories = matchHomeVictories + matchAwayVictories;
    return totalVictories;
  },

  // cria um método que retorna o total de empates de um time a partir do resultado de getAllTeams
  getTotalDraws: (team: ITeam): number => {
    const matchHomeDraws = team.matchHome
      .filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
    const matchAwayDraws = team.matchAway
      .filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
    const totalDraws = matchHomeDraws + matchAwayDraws;
    return totalDraws;
  },

  // cria um método que retorna o total de derrotas de um time a partir do resultado de getAllTeams
  getTotalLosses: (team: ITeam): number => {
    const matchHomeLosses = team.matchHome
      .filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
    const matchAwayLosses = team.matchAway
      .filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
    const totalLosses = matchHomeLosses + matchAwayLosses;
    return totalLosses;
  },

  // cria um método que retorna o total de gols a favor de um time a partir do resultado de getAllTeams
  getGoalsFavor: (team: ITeam): number => {
    const matchHomeGoalsFavor = team.matchHome
      .map((match) => match.homeTeamGoals).reduce((a, b) => a + b, 0);
    const matchAwayGoalsFavor = team.matchAway
      .map((match) => match.awayTeamGoals).reduce((a, b) => a + b, 0);
    const goalsFavor = matchHomeGoalsFavor + matchAwayGoalsFavor;
    return goalsFavor;
  },

  // cria um método que retorna o total de gols recebidos de um time a partir do resultado de getAllTeams
  getGoalsOwn: (team: ITeam): number => {
    const matchHomeGoalsOwn = team.matchHome
      .map((match) => match.awayTeamGoals).reduce((a, b) => a + b, 0);
    const matchAwayGoalsOwn = team.matchAway
      .map((match) => match.homeTeamGoals).reduce((a, b) => a + b, 0);
    const goalsOwn = matchHomeGoalsOwn + matchAwayGoalsOwn;
    return goalsOwn;
  },

  // cria um método que retorna o saldo de gols de um time a partir do resultado de getAllTeams
  getGoalsBalance: (team: ITeam): number => {
    const goalsFavor = leaderboardUtils.getGoalsFavor(team);
    const goalsOwn = leaderboardUtils.getGoalsOwn(team);
    const goalsBalance = goalsFavor - goalsOwn;
    return goalsBalance;
  },

  // cria um método que retorna o aproveitamento de um time a partir do resultado de getAllTeams
  getTeamPerformance: (team: ITeam): number => {
    const totalPoints = leaderboardUtils.getTotalPoints(team);
    const totalGames = leaderboardUtils.getTotalGames(team);
    const teamPerformance = (totalPoints / (totalGames * 3)) * 100;
    return teamPerformance;
  },

  // cria um método que recebe a leaderboard e retorna a mesma ordenada de acordo com os critérios de desempate
  getLeaderboardOrdered: (leaderboard: ILeaderboard[]): ILeaderboard[] => {
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

export default leaderboardUtils;
