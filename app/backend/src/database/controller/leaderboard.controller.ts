import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) { }

  getHomeLeaderboard = async (_req: Request, res: Response) => {
    const leaderboard = await this.leaderboardService.getHomeLeaderboard();

    res.status(200).json(leaderboard);
  };

  getAwayLeaderboard = async (_req: Request, res: Response) => {
    const leaderboard = await this.leaderboardService.getAwayLeaderboard();

    res.status(200).json(leaderboard);
  };

  getLeaderboard = async (_req: Request, res: Response) => {
    const leaderboard = await this.leaderboardService.getLeaderboard();

    res.status(200).json(leaderboard);
  };
}

export default LeaderboardController;
