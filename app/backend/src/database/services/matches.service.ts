import MatcheModel from '../models/match.model';
import TeamModel from '../models/team.model';
import CustomError from '../../errors/CustomError';

export default class MatcheService {
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
    console.log('matchToUpdate', matchToUpdate);

    if (!matchToUpdate) {
      throw new CustomError(404, 'No match found');
    }

    matchToUpdate.homeTeamGoals = match.homeTeamGoals;
    matchToUpdate.awayTeamGoals = match.awayTeamGoals;

    await matchToUpdate.save();

    return matchToUpdate;
  };
}
