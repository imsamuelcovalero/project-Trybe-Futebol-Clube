import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import MatchModel from '../database/models/match.model';
// import { matches } from './expected_results/trybe_football_club';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const matches = [
  {
    id: 1,
    home_team: 16,
    home_team_goals: 1,
    away_team: 8,
    away_team_goals: 1,
    in_progress: 0,
  },
  {
    id: 2,
    home_team: 9,
    home_team_goals: 1,
    away_team: 14,
    away_team_goals: 1,
    in_progress: 0,
  },
];


describe('Testes para rota matches', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.restore();
  });

  it('Deve retornar todos os jogos com sucesso', async () => {
    sinon
      .stub(MatchModel, "findAll")
      .resolves(matches as unknown as MatchModel[]);

    sinon.stub(console, 'log').resolves();

    chaiHttpResponse = await chai
      .request(app).get('/matches');

    console.log('xablau', chaiHttpResponse.body);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.all.keys(['id', 'home_team', 'home_team_goals', 'away_team', 'away_team_goals', 'in_progress']);
  });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});

