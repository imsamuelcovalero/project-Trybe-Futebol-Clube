import { Router } from 'express';
import LeaderboardController from '../database/controller/leaderboard.controller';
// import validators from '../middlewares/validators';
// import tokenValidator from '../middlewares/tokenFunctions';

const routers = Router();

const leaderboardController = new LeaderboardController();

// Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados
routers.get('/home', /* tokenValidator.decode,  */leaderboardController.getHomeLeaderboard);
// routers.get('/', /* tokenValidator.decode,  */leaderboardController.);

export default routers;
