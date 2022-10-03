import MatchModel from '../../models/match.model';
import TeamModel from '../../models/team.model';
import { ILeaderboard, ITeam } from '../../../interfaces/leaderboard.interface';

const awayInclude = {
  model: MatchModel,
  as: 'matchAway',
  where: {
    inProgress: false,
  },
  attributes: ['homeTeamGoals', 'awayTeamGoals'],
};

const leaderboardAwayUtils = {
  // cria um metodo para pegar todos os times incluindo as partidas em que o time jogou fora de casa
  getAwayTeams: async (): Promise<ITeam[]> => {
    const teams = await TeamModel.findAll({
      include: [awayInclude],
    });
    return teams as unknown as ITeam[];
  },

  // cria um método que retorna o total de pontos Fora de casa de um time a partir do resultado de getAllTeams
  getTotalAwayPoints: (team: ITeam): number => {
    const matchAwayPoints = team.matchAway.map((match) => {
      let subAwayResult = 0;
      const awayWin = match.homeTeamGoals < match.awayTeamGoals;
      const empate = match.homeTeamGoals === match.awayTeamGoals;

      if (awayWin) subAwayResult += 3; if (empate) subAwayResult += 1; else subAwayResult += 0;
      return subAwayResult;
    });

    const totalPoints = matchAwayPoints.reduce((acc, curr) => acc + curr, 0);

    return totalPoints;
  },

  // cria um método que retorna o total de jogos fora de casa de um time a partir do resultado de getAllTeams
  getTotalAwayGames: (team: ITeam): number => {
    const totalGames = team.matchAway.length;
    return totalGames;
  },

  // cria um método que retorna o total de vitórias fora de casa de um time a partir do resultado de getAllTeams
  getTotalAwayVictories: (team: ITeam): number => {
    const matchAwayVictories = team.matchAway
      .filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
    return matchAwayVictories;
  },

  // cria um método que retorna o total de empates de um time fora de casa de um time a partir do resultado de getAllTeams
  getTotalAwayDraws: (team: ITeam): number => {
    const matchAwayDraws = team.matchAway
      .filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
    return matchAwayDraws;
  },

  // cria um método que retorna o total de derrotas fora de casa de um time a partir do resultado de getAllTeams
  getTotalAwayLosses: (team: ITeam): number => {
    const matchAwayDefeats = team.matchAway
      .filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
    return matchAwayDefeats;
  },

  // cria um método que retorna o total de gols a favor de um time fora de casa a partir do resultado de getAllTeams
  getAwayGoalsFavor: (team: ITeam): number => {
    const matchAwayGoalsFavor = team.matchAway
      .map((match) => match.awayTeamGoals).reduce((a, b) => a + b, 0);
    return matchAwayGoalsFavor;
  },

  // cria um método que retorna o total de gols recebidos de um time fora de casa a partir do resultado de getAllTeams
  getAwayGoalsOwn: (team: ITeam): number => {
    const matchAwayGoalsOwn = team.matchAway
      .map((match) => match.homeTeamGoals).reduce((a, b) => a + b, 0);
    return matchAwayGoalsOwn;
  },

  // cria um método que retorna o saldo de gols de um time fora de casa a partir do resultado de getAllTeams
  getAwayGoalsBalance: (team: ITeam): number => {
    const goalsFavor = leaderboardAwayUtils.getAwayGoalsFavor(team);
    const goalsOwn = leaderboardAwayUtils.getAwayGoalsOwn(team);
    const goalsBalance = goalsFavor - goalsOwn;
    return goalsBalance;
  },

  // cria um método que retorna o aproveitamento de um time fora de casa a partir do resultado de getAllTeams
  getAwayPerformance: (team: ITeam): number => {
    const totalPoints = leaderboardAwayUtils.getTotalAwayPoints(team);
    const totalGames = leaderboardAwayUtils.getTotalAwayGames(team);
    const teamPerformance = (totalPoints / (totalGames * 3)) * 100;
    const teamPerformanceRounded = Math.round((teamPerformance + Number.EPSILON) * 100) / 100;
    return teamPerformanceRounded;
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

export default leaderboardAwayUtils;
