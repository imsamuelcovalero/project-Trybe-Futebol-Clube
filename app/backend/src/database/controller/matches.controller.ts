import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  constructor(private matchesService = new MatchesService()) { }

  // cria um metodo para pegar todos os times
  getAllMatches = async (_req: Request, res: Response) => {
    const matches = await this.matchesService.getAllMatches();

    res.status(200).json(matches);
  };

  // crria uma função saveMatchProgress para salvar uma partida com o status de inProgress como true no banco de dados
  saveNewMatch = async (req: Request, res: Response) => {
    const match = { ...req.body, inProgress: true };
    const newMatch = await this.matchesService.saveNewMatch(match);

    res.status(201).json(newMatch);
  };

  // cria uma função finishMatch para alterar o status de inProgress para false no banco de dados
  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchesService.finishMatch(id);

    // Deve-se retornar, com um status 200, a seguinte mensagem:

    // { "message": "Finished" }

    res.status(200).json({ message: 'Finished' });
  };
}

export default MatchesController;
