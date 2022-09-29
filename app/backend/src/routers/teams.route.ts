import { Router } from 'express';
import TeamsController from '../database/controller/teams.controller';
// import validators from '../middlewares/validators';
// import tokenValidator from '../middlewares/tokenFunctions';

const routers = Router();

const teamsController = new TeamsController();

routers.get('/', teamsController.getAllTeams);
routers.get('/:id', teamsController.getTeamById);

export default routers;
