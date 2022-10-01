import { Router } from 'express';
import MatchesController from '../database/controller/matches.controller';
import tokenValidator from '../middlewares/tokenFunctions';

const routers = Router();

const matchesController = new MatchesController();

routers.patch('/:id/finish', matchesController.finishMatch);
routers.patch('/:id', matchesController.updateMatch);
routers.get('/', matchesController.getAllMatches);
routers.post('/', tokenValidator.decode, matchesController.saveNewMatch);

export default routers;
