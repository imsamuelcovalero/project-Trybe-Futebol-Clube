import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamModel from '../database/models/team.model';
import MatchModel from '../database/models/match.model';
import { ILeaderboard, ITeam } from '../interfaces/leaderboard.interface';
import leaderboardHomeUtils from '../database/services/utils/leaderboardHome.utils';
import leaderboardAwayUtils from '../database/services/utils/leaderboardAway.utils';
import leaderboardUtils from '../database/services/utils/leaderboard.utils';
import leaderboard from '../database/services/leaderboard.service';
import getHomeLeaderboard from '../database/services/leaderboard.service';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const homeResult = [
  {
    name: 'Santos',
    totalPoints: '9',
    totalGames: '3',
    totalVictories: '3',
    totalDraws: '0',
    totalLosses: '0',
    goalsFavor: '9',
    goalsOwn: '3',
    goalsBalance: '6',
    efficiency: '100'
  },
  {
    name: 'Palmeiras',
    totalPoints: '7',
    totalGames: '3',
    totalVictories: '2',
    totalDraws: '1',
    totalLosses: '0',
    goalsFavor: '10',
    goalsOwn: '5',
    goalsBalance: '5',
    efficiency: '77.78'
  },
];

const awayResult = [
  {
    name: 'Santos',
    totalPoints: '9',
    totalGames: '3',
    totalVictories: '3',
    totalDraws: '0',
    totalLosses: '0',
    goalsFavor: '9',
    goalsOwn: '3',
    goalsBalance: '6',
    efficiency: '100'
  },
  {
    name: 'Palmeiras',
    totalPoints: '7',
    totalGames: '3',
    totalVictories: '2',
    totalDraws: '1',
    totalLosses: '0',
    goalsFavor: '10',
    goalsOwn: '5',
    goalsBalance: '5',
    efficiency: '77.78'
  },
];

const homeTeams = [
  {
    "id": 16,
    "teamName": "São Paulo",
    "matchHome": [
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 0
      }
    ]
  },
  {
    "id": 9,
    "teamName": "Internacional",
    "matchHome": [
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 4
      },
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      }
    ]
  },
];

const awayTeams = [
  {
    "id": 8,
    "teamName": "Grêmio",
    "matchAway": [
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 3
      },
      {
        "homeTeamGoals": 4,
        "awayTeamGoals": 1
      }
    ]
  },
  {
    "id": 14,
    "teamName": "Santos",
    "matchAway": [
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      }
    ]
  },
];

const allTeams = [
  {
    "id": 16,
    "teamName": "São Paulo",
    "matchHome": [
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 0
      }
    ],
    "matchAway": [
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 3
      },
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 1
      }
    ]
  },
  {
    "id": 9,
    "teamName": "Internacional",
    "matchHome": [
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 4
      },
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      }
    ],
    "matchAway": [
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 2
      },
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 1
      }
    ]
  },
];


describe('Testes para rota leaderboard', () => {
  let chaiHttpResponse: Response;
  // const leaderboard = new leaderboard();

  beforeEach(async () => {
    sinon.restore();
  });

  it('Deve retornar com sucesso a tabela dos times da casa', async () => {
    sinon
      .stub(leaderboardHomeUtils, "getHomeTeams")
      .resolves(homeTeams as ITeam[]);

    // sinon
    //   .stub(leaderboardHomeUtils, "getHomeResult")
    //   .resolves(homeResult as ILeaderboard[]);

    sinon.stub(console, 'log').resolves();

    chaiHttpResponse = await chai
      .request(app).get('/leaderboard/home');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.all.keys(['name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws', 'totalLosses', 'goalsFavor', 'goalsOwn', 'goalsBalance', 'efficiency']);
  });

  it('Deve retornar com sucesso a tabela dos times fora de casa', async () => {
    sinon
      .stub(leaderboardAwayUtils, "getAwayTeams")
      .resolves(awayTeams as ITeam[]);

    // sinon
    //   .stub(leaderboardHomeUtils, "getHomeResult")
    //   .resolves(homeResult as ILeaderboard[]);

    sinon.stub(console, 'log').resolves();
    chaiHttpResponse = await chai
      .request(app).get('/leaderboard/away');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.all.keys(['name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws', 'totalLosses', 'goalsFavor', 'goalsOwn', 'goalsBalance', 'efficiency']);
  });

  it('Deve retornar com sucesso a tabela de todos os times', async () => {
    sinon
      .stub(leaderboardUtils, "getAllTeams")
      .resolves(allTeams as ITeam[]);

    // sinon
    //   .stub(leaderboardHomeUtils, "getHomeResult")
    //   .resolves(homeResult as ILeaderboard[]);

    sinon.stub(console, 'log').resolves();
    chaiHttpResponse = await chai
      .request(app).get('/leaderboard');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.all.keys(['name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws', 'totalLosses', 'goalsFavor', 'goalsOwn', 'goalsBalance', 'efficiency']);
  });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});

