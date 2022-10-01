import { Router } from 'express';
import LeaderboardController from '../database/controller/leaderboard.controller';

const routers = Router();

const leaderboardController = new LeaderboardController();

// Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados
routers.get('/home', leaderboardController.getHomeLeaderboard);
routers.get('/away', leaderboardController.getAwayLeaderboard);
routers.get('/', leaderboardController.getLeaderboard);

export default routers;
