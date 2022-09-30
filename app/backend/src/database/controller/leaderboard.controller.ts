// Será avaliado que ao fazer a requisição ao endpoint /leaderboard/home serão retornados os campos e valores corretos, considerando os dados iniciais do banco de dados;

import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) { }

  // cria um metodo para pegar todos os times
  getHomeLeaderboard = async (_req: Request, res: Response) => {
    const leaderboard = await this.leaderboardService.getHomeLeaderboard();

    res.status(200).json(leaderboard);
  };
}

export default LeaderboardController;
