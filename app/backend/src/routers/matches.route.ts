import { Router } from 'express';
import MatchesController from '../database/controller/matches.controller';
// import validators from '../middlewares/validators';
import tokenValidator from '../middlewares/tokenFunctions';

const routers = Router();

const matchesController = new MatchesController();

// 24 - Desenvolva o endpoint /matches/:id/finish de modo que seja possível alterar o status inProgress de uma partida para false no banco de dados
routers.patch('/:id/finish', /* tokenValidator.decode,  */matchesController.finishMatch);
// Desenvolva o endpoint /matches/:id de forma que seja possível atualizar partidas em andamento
routers.patch('/:id', /* tokenValidator.decode,  */matchesController.updateMatch);
routers.get('/', matchesController.getAllMatches);
routers.post('/', tokenValidator.decode, matchesController.saveNewMatch);

export default routers;
