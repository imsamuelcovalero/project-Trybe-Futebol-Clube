import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  constructor(private matchesService = new MatchesService()) { }

  // cria um metodo para pegar todos os times
  getAllMatches = async (_req: Request, res: Response) => {
    console.log('getAllMatches');

    const matches = await this.matchesService.getAllMatches();

    res.status(200).json(matches);
  };
}

export default MatchesController;
