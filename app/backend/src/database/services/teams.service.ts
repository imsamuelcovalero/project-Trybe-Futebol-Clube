import TeamModel from '../models/team.model';
import CustomError from '../../errors/CustomError';

export default class TeamsService {
  model: TeamModel;

  constructor() {
    this.model = new TeamModel();
  }

  getAllTeams = async (): Promise<TeamModel[]> => {
    const teams = await TeamModel.findAll();

    if (!teams) {
      throw new CustomError(404, 'No teams found');
    }

    return teams;
  };

  getTeamById = async (id: string): Promise<TeamModel> => {
    const team = await TeamModel.findByPk(id);

    if (!team) {
      throw new CustomError(404, 'No team found');
    }

    return team;
  };
}
