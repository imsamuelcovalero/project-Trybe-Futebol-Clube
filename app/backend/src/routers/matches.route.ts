import { Router } from 'express';
import MatchesController from '../database/controller/matches.controller';
// import validators from '../middlewares/validators';
import tokenValidator from '../middlewares/tokenFunctions';

const routers = Router();

const matchesController = new MatchesController();

routers.patch('/:id/finish', /* tokenValidator.decode,  */matchesController.finishMatch);
routers.patch('/:id', /* tokenValidator.decode,  */matchesController.updateMatch);
routers.get('/', matchesController.getAllMatches);
routers.post('/', tokenValidator.decode, matchesController.saveNewMatch);

export default routers;
