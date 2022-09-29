import MatcheModel from '../models/matche.model';
import TeamModel from '../models/team.model';
import CustomError from '../../errors/CustomError';

export default class TeamsService {
  model: MatcheModel;

  constructor() {
    this.model = new MatcheModel();
  }

  getAllMatches = async (): Promise<MatcheModel[]> => {
    const matches = await MatcheModel.findAll({
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

    if (!matches) {
      throw new CustomError(404, 'No matches found');
    }

    return matches;
  };

  //     Caso a partida seja inserida com sucesso, deve-se retornar os dados da partida, com status 201:
  // {
  //   "id": 1,
  //   "homeTeam": 16,
  //   "homeTeamGoals": 2,
  //   "awayTeam": 8,
  //   "awayTeamGoals": 2,
  //   "inProgress": true,
  // }

  // req.body será da seguinte forma:
  // {
  //   "homeTeam": 16, // O valor deve ser o id do time
  //   "awayTeam": 8, // O valor deve ser o id do time
  //   "homeTeamGoals": 2,
  //   "awayTeamGoals": 2
  // }

  saveNewMatch = async (match: MatcheModel): Promise<MatcheModel> => {
    if (match.homeTeam === match.awayTeam) {
      throw new CustomError(401, 'It is not possible to create a match with two equal teams');
    }

    const homeTeam = await TeamModel.findByPk(match.homeTeam);
    const awayTeam = await TeamModel.findByPk(match.awayTeam);

    if (!homeTeam || !awayTeam) {
      throw new CustomError(404, 'There is no team with such id!');
    }

    const newMatch = await MatcheModel.create(match);

    if (!newMatch) {
      throw new CustomError(400, 'Error creating match');
    }

    return newMatch;
  };

  finishMatch = async (id: string): Promise<MatcheModel> => {
    const match = await MatcheModel.findByPk(id);

    if (!match) {
      throw new CustomError(404, 'No match found');
    }

    match.inProgress = false;

    await match.save();

    return match;
  };

  updateMatch = async (id: string, match: MatcheModel): Promise<MatcheModel> => {
    const matchToUpdate = await MatcheModel.findByPk(id);

    if (!matchToUpdate) {
      throw new CustomError(404, 'No match found');
    }

    if (match.homeTeam === match.awayTeam) {
      throw new CustomError(401, 'It is not possible to create a match with two equal teams');
    }

    const homeTeam = await TeamModel.findByPk(match.homeTeam);
    const awayTeam = await TeamModel.findByPk(match.awayTeam);

    if (!homeTeam || !awayTeam) {
      throw new CustomError(404, 'There is no team with such id!');
    }

    matchToUpdate.homeTeam = match.homeTeam;
    matchToUpdate.homeTeamGoals = match.homeTeamGoals;
    matchToUpdate.awayTeam = match.awayTeam;
    matchToUpdate.awayTeamGoals = match.awayTeamGoals;

    await matchToUpdate.save();

    return matchToUpdate;
  };
}
