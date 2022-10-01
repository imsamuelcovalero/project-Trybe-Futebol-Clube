import MatchModel from '../models/match.model';
import TeamModel from '../models/team.model';
import CustomError from '../../errors/CustomError';

export default class MatcheService {
  model: MatchModel;

  constructor() {
    this.model = new MatchModel();
  }

  getAllMatches = async (): Promise<MatchModel[]> => {
    const matches = await MatchModel.findAll({
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

  saveNewMatch = async (match: MatchModel): Promise<MatchModel> => {
    if (match.homeTeam === match.awayTeam) {
      throw new CustomError(401, 'It is not possible to create a match with two equal teams');
    }

    const homeTeam = await TeamModel.findByPk(match.homeTeam);
    const awayTeam = await TeamModel.findByPk(match.awayTeam);

    if (!homeTeam || !awayTeam) {
      throw new CustomError(404, 'There is no team with such id!');
    }

    const newMatch = await MatchModel.create(match);

    if (!newMatch) {
      throw new CustomError(400, 'Error creating match');
    }

    return newMatch;
  };

  finishMatch = async (id: string): Promise<MatchModel> => {
    const match = await MatchModel.findByPk(id);

    if (!match) {
      throw new CustomError(404, 'No match found');
    }

    match.inProgress = false;

    await match.save();

    return match;
  };

  updateMatch = async (id: string, match: MatchModel): Promise<MatchModel> => {
    const matchToUpdate = await MatchModel.findByPk(id);

    if (!matchToUpdate) {
      throw new CustomError(404, 'No match found');
    }

    matchToUpdate.homeTeamGoals = match.homeTeamGoals;
    matchToUpdate.awayTeamGoals = match.awayTeamGoals;

    await matchToUpdate.save();

    return matchToUpdate;
  };
}
