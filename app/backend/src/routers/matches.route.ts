import { Router } from 'express';
import MatchesController from '../database/controller/matches.controller';
// import validators from '../middlewares/validators';
// import tokenValidator from '../middlewares/tokenFunctions';

const routers = Router();

const matchesController = new MatchesController();

routers.get('/', matchesController.getAllMatches);

export default routers;
