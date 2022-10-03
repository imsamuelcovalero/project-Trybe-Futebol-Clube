import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  constructor(private matchesService = new MatchesService()) { }

  getAllMatches = async (_req: Request, res: Response) => {
    const matches = await this.matchesService.getAllMatches();

    res.status(200).json(matches);
  };

  saveNewMatch = async (req: Request, res: Response) => {
    const match = { ...req.body, inProgress: true };

    const newMatch = await this.matchesService.saveNewMatch(match);

    res.status(201).json(newMatch);
  };

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchesService.finishMatch(id);

    res.status(200).json({ message: 'Finished' });
  };

  updateMatch = async (req: Request, res: Response) => {
    console.log('req.body', req.body);

    const { id } = req.params;
    const match = req.body;

    const updatedMatch = await this.matchesService.updateMatch(id, match);

    res.status(200).json(updatedMatch);
  };
}

export default MatchesController;
