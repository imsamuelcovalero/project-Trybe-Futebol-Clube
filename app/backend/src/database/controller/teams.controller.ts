import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

class TeamsController {
  constructor(private teamsService = new TeamsService()) { }

  // cria um metodo para pegar todos os times
  getAllTeams = async (_req: Request, res: Response) => {
    const teams = await this.teamsService.getAllTeams();

    res.status(200).json(teams);
  };

  // cria uma rota para retornar o time pelo id
  getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const team = await this.teamsService.getTeamById(id);

    res.status(200).json(team);
  };
}

export default TeamsController;
