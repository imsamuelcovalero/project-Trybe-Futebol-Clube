import { Router } from 'express';
import MatchesController from '../database/controller/matches.controller';
// import validators from '../middlewares/validators';
import tokenValidator from '../middlewares/tokenFunctions';

const routers = Router();

const matchesController = new MatchesController();

routers.get('/', matchesController.getAllMatches);
routers.post('/', tokenValidator.decode, matchesController.saveNewMatch);
// 24 - Desenvolva o endpoint /matches/:id/finish de modo que seja possível alterar o status inProgress de uma partida para false no banco de dados
routers.patch('/:id/finish', /* tokenValidator.decode,  */matchesController.finishMatch);

export default routers;
