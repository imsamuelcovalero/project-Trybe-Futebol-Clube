import { Router } from 'express';
import TeamsController from '../database/controller/teams.controller';

const routers = Router();

const teamsController = new TeamsController();

routers.get('/', teamsController.getAllTeams);
routers.get('/:id', teamsController.getTeamById);

export default routers;
