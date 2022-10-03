import { Router } from 'express';
import LeaderboardController from '../database/controller/leaderboard.controller';

const routers = Router();

const leaderboardController = new LeaderboardController();

routers.get('/home', leaderboardController.getHomeLeaderboard);
routers.get('/away', leaderboardController.getAwayLeaderboard);
routers.get('/', leaderboardController.getLeaderboard);

export default routers;
