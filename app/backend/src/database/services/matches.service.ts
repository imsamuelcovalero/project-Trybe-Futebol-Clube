import MatcheModel from '../models/matche.model';
import TeamModel from '../models/team.model';
import CustomError from '../../errors/CustomError';

export default class TeamsService {
  model: MatcheModel;

  constructor() {
    this.model = new MatcheModel();
  }

  getAllMatches = async (): Promise<MatcheModel[]> => {
    // exemplo de retorno
    // [
    //   {
    //     "id": 1,
    //     "homeTeam": 16,
    //     "homeTeamGoals": 1,
    //     "awayTeam": 8,
    //     "awayTeamGoals": 1,
    //     "inProgress": false,
    //     "teamHome": {
    //       "teamName": "São Paulo"
    //     },
    //     "teamAway": {
    //       "teamName": "Grêmio"
    //     }
    //   },
    //   ...
    //   {
    //     "id": 41,
    //     "homeTeam": 16,
    //     "homeTeamGoals": 2,
    //     "awayTeam": 9,
    //     "awayTeamGoals": 0,
    //     "inProgress": true,
    //     "teamHome": {
    //       "teamName": "São Paulo"
    //     },
    //     "teamAway": {
    //       "teamName": "Internacional"
    //     }
    //   }
    // ]
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
}
