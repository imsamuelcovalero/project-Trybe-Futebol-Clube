import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

class TeamsController {
  constructor(private teamsService = new TeamsService()) { }

  getAllTeams = async (_req: Request, res: Response) => {
    const teams = await this.teamsService.getAllTeams();

    res.status(200).json(teams);
  };

  getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const team = await this.teamsService.getTeamById(id);

    res.status(200).json(team);
  };
}

export default TeamsController;
