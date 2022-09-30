// Cria um arquivos para conter as funções de suporte para o LeaderboardService
import MatchModel from '../../models/match.model';
import TeamModel from '../../models/team.model';
import { ILeaderboard, ITeam } from '../../../interfaces/leaderboard.interface';

const firstInclude = {
  model: MatchModel,
  as: 'matchHome',
  where: {
    inProgress: false,
  },
  attributes: ['homeTeamGoals', 'awayTeamGoals'],
};

const secondInclude = {
  model: MatchModel,
  as: 'matchAway',
  where: {
    inProgress: false,
  },
  attributes: ['homeTeamGoals', 'awayTeamGoals'],
};

// cria uma classe com os métodos de suporte para o LeaderboardService
const leaderboardServiceUtils = {
  // cria um metodo para pegar todos os times incluindo as partidas em que o time jogou
  getAllTeams: async (): Promise<ITeam[]> => {
    const teams = await TeamModel.findAll({
      include: [firstInclude, secondInclude],
    });
    return teams as unknown as ITeam[];
  },

  getHomeTeams: async (): Promise<ITeam[]> => {
    const teams = await TeamModel.findAll({
      include: [firstInclude],
    });
    return teams as unknown as ITeam[];
  },

  // cria um metodo para que recebe o resultado de getAllTeams e filtra para retornar só os times que jogaram em casa
  // getHomeTeams: (): ITeam[] => {
  //   const teams = leaderboardServiceUtils.getAllTeams();
  //   const homeTeams = teams.filter((team) => team.matchHome.length > 0);
  //   return homeTeams;
  // },

  getHomeTotalPoints: (team: ITeam): number => {
    // para cada partida do array matchHome e do array matchAway, faz um forEach calculando a pontuação e retorna o total
    const matchHomePoints = team.matchHome.map((match) => {
      let subResult = 0;
      const homeWin = match.homeTeamGoals > match.awayTeamGoals;
      const empate = match.homeTeamGoals === match.awayTeamGoals;
      // const homeLose = match.homeTeamGoals < match.awayTeamGoals;

      if (homeWin) subResult += 3; if (empate) subResult += 1; else subResult += 0;

      return subResult;
    });

    const totalPoints = matchHomePoints.reduce((acc, curr) => acc + curr, 0);

    return totalPoints;
  },

  // cria um método que retorna o total de pontos de um time a partir do resultado de getAllTeams
  // getTotalPoints: (team: ITeam): number => {
  //   // para cada partida do array matchHome e do array matchAway, faz um forEach calculando a pontuação e retorna o total
  //   const matchHomePoints = team.matchHome.map((match) => {
  //     let subResult = 0;
  //     const homeWin = match.homeTeamGoals > match.awayTeamGoals;
  //     const empate = match.homeTeamGoals === match.awayTeamGoals;
  //     // const homeLose = match.homeTeamGoals < match.awayTeamGoals;

  //     if (homeWin) subResult += 3; if (empate) subResult += 1; else subResult += 0;

  //     return subResult;
  //   });

  //   const matchAwayPoints = team.matchAway.map((match) => {
  //     let subResult = 0;
  //     const awayWin = match.homeTeamGoals < match.awayTeamGoals;
  //     const empate = match.homeTeamGoals === match.awayTeamGoals;
  //     // const awayLose = match.homeTeamGoals > match.awayTeamGoals;

  //     if (awayWin) subResult += 3; if (empate) subResult += 1; else subResult += 0;
  //     return subResult;
  //   });

  //   const totalPoints = matchHomePoints.reduce((acc, curr) => acc + curr, 0) + matchAwayPoints
  //     .reduce((acc, curr) => acc + curr, 0);

  //   return totalPoints;
  // },

  getTotalHomeGames: (team: ITeam): number => {
    const totalGames = team.matchHome.length;
    return totalGames;
  },

  // cria um método que retorna o total de jogos de um time a partir do resultado de getAllTeams
  // getTotalGames: (team: ITeam): number => {
  //   const totalGames = team.matchHome.length + team.matchAway.length;
  //   return totalGames;
  // },

  // cria um método que retorna o total de vitórias de um time a partir do resultado de getAllTeams
  getTotalVictories: (team: ITeam): number => {
    const matchHomeVictories = team.matchHome
      .filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
    // const matchAwayVictories = team.matchAway
    //   .filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
    // const totalVictories = matchHomeVictories + matchAwayVictories;
    return matchHomeVictories;
  },

  // cria um método que retorna o total de empates de um time a partir do resultado de getAllTeams
  getTotalDraws: (team: ITeam): number => {
    const matchHomeDraws = team.matchHome
      .filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
    // const matchAwayDraws = team.matchAway
    //   .filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
    // const totalDraws = matchHomeDraws + matchAwayDraws;
    return matchHomeDraws;
  },

  // cria um método que retorna o total de derrotas de um time a partir do resultado de getAllTeams
  getTotalLosses: (team: ITeam): number => {
    const matchHomeLosses = team.matchHome
      .filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
    // const matchAwayLosses = team.matchAway
    //   .filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
    // const totalLosses = matchHomeLosses + matchAwayLosses;
    return matchHomeLosses;
  },

  // cria um método que retorna o total de gols a favor de um time a partir do resultado de getAllTeams
  getGoalsFavor: (team: ITeam): number => {
    const matchHomeGoalsFavor = team.matchHome
      .map((match) => match.homeTeamGoals).reduce((a, b) => a + b, 0);
    // const matchAwayGoalsFavor = team.matchAway
    //   .map((match) => match.awayTeamGoals).reduce((a, b) => a + b, 0);
    // const goalsFavor = matchHomeGoalsFavor + matchAwayGoalsFavor;
    return matchHomeGoalsFavor;
  },

  // cria um método que retorna o total de gols recebidos de um time a partir do resultado de getAllTeams
  getGoalsOwn: (team: ITeam): number => {
    const matchHomeGoalsOwn = team.matchHome
      .map((match) => match.awayTeamGoals).reduce((a, b) => a + b, 0);
    // const matchAwayGoalsOwn = team.matchAway
    //   .map((match) => match.homeTeamGoals).reduce((a, b) => a + b, 0);
    // const goalsOwn = matchHomeGoalsOwn + matchAwayGoalsOwn;
    return matchHomeGoalsOwn;
  },

  // cria um método que retorna o saldo de gols de um time a partir do resultado de getAllTeams
  getGoalsBalance: (team: ITeam): number => {
    const goalsFavor = leaderboardServiceUtils.getGoalsFavor(team);
    const goalsOwn = leaderboardServiceUtils.getGoalsOwn(team);
    const goalsBalance = goalsFavor - goalsOwn;
    return goalsBalance;
  },

  // cria um método que retorna o aproveitamento de um time a partir do resultado de getAllTeams
  getTeamPerformance: (team: ITeam): number => {
    const totalPoints = leaderboardServiceUtils.getHomeTotalPoints(team);
    const totalGames = leaderboardServiceUtils.getTotalHomeGames(team);
    const teamPerformance = (totalPoints / (totalGames * 3)) * 100;
    return teamPerformance;
  },

  // cria um método que recebe a leaderboard e retorna a mesma ordenada de acordo com os critérios
  // O resultado deverá ser ordenado sempre de forma decrescente, levando em consideração a quantidade de pontos que o time acumulou. Em caso de empate no Total de Pontos, você deve levar em consideração os seguintes critérios para desempate:
  //     Ordem para desempate
  // 1º Total de Vitórias; 2º Saldo de gols; 3º Gols a favor; 4º Gols sofridos.
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

export default leaderboardServiceUtils;

//   export const getHomeLeaderboard = async (): Promise<MatcheModel[]> => {
//     const teams = await TeamModel.findAll();
//     console.log('teams', teams);

//     const matchs = await MatcheModel.findAll({
//       include: [
//         {
//           model: TeamModel,
//           as: 'teamHome',
//           attributes: ['teamName'],
//         },
//         {
//           model: TeamModel,
//           as: 'teamAway',
//           attributes: ['teamName'],
//         },
//       ],
//     });

//     const matchsInProgress = matchs.filter((match) => match.inProgress === false);

//     const leaderboard = matchsInProgress.map((match) => {
//       const name = match.teamHome;
//       const totalPoints = match.homeTeamGoals > match.awayTeamGoals ? 3 : match.homeTeamGoals === match.awayTeamGoals ? 1 : 0;
//       const totalGames = matchsInProgress.filter((match) => match.teamHome === name || match.teamAway === name).length;
//       const totalVictories = matchsInProgress.filter((match) => match.teamHome === name && match.homeTeamGoals > match.awayTeamGoals).length;
//       const totalDraws = matchsInProgress.filter((match) => match.teamHome === name && match.homeTeamGoals === match.awayTeamGoals).length;
//       const totalLosses = matchsInProgress.filter((match) => match.teamHome === name && match.homeTeamGoals < match.awayTeamGoals).length;
//       const goalsFavor = matchsInProgress.filter((match) => match.teamHome === name).reduce((acc, match) => acc + match.homeTeamGoals, 0);
//       const goalsAgainst = matchsInProgress.filter((match) => match.teamHome === name).reduce((acc, match) => acc + match.awayTeamGoals, 0);
//       const goalDifference = goalsFavor - goalsAgainst;

//       return {
//         name,
//         totalPoints,
//         totalGames,
//         totalVictories,
//         totalDraws,
//         totalLosses,
//         goalsFavor,
//         goalsAgainst,
//         goalDifference,
//       };
//     });

//     return leaderboard;
//   };
// }
