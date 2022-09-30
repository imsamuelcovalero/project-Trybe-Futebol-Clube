import * as express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/error.middleware';
import loginRoute from './routers/login.route';
import teamsRoute from './routers/teams.route';
import matchesRoute from './routers/matches.route';
import leaderboardRoute from './routers/leaderboard.route';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.use('/login', loginRoute);
    this.app.use('/teams', teamsRoute);
    this.app.use('/matches', matchesRoute);
    this.app.use('/leaderboard', leaderboardRoute);
    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.use(errorMiddleware);
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
