import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import MatchModel from '../database/models/match.model';
// import { matches } from './expected_results/trybe_football_club';
import decode from '../middlewares/tokenFunctions';
// import tokenFunctions from '../middlewares/tokenFunctions';

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

const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc';

const decoded = {
  'id': 1,
  'username': 'admin@admin.com',
  'role': 'admin',
  'iat': 1664480147,
  'exp': 1665084947,
};


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

    // sinon.stub(console, 'log').resolves();

    chaiHttpResponse = await chai
      .request(app).get('/matches');

    // console.log('xablau', chaiHttpResponse.body);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.all.keys(['id', 'home_team', 'home_team_goals', 'away_team', 'away_team_goals', 'in_progress']);
  });

  it('Deve retornar a mensagem No matches found caso não encontre jogos', async () => {
    sinon
      .stub(MatchModel, "findAll")
      .resolves(undefined as unknown as MatchModel[]);

    chaiHttpResponse = await chai
      .request(app).get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('No matches found');
  });

  // it('Verifica se o token do usuário é valido pela função tokenValidator.decode', async () => {
  //   const token = tokenFunctions.decode(tokenMock);
  //   expect(token).to.be.an('object');
  //   expect(token).to.have.all.keys(['id', 'role', 'iat']);
  // });

  // it('Deve salvar um jogo jogo com sucesso', async () => {
  //   //cria um sinon.stub para passar na validação do token
  //   sinon.stub(decode, 'decode').resolves(decoded);

  //   sinon
  //     .stub(MatchModel, "create")
  //     .resolves(matches[0] as unknown as MatchModel);

  //   sinon.stub(console, 'log').resolves();

  //   chaiHttpResponse = await chai
  //     .request(app).post('/matches').send(matches[0]);

  //   console.log('xablau2', chaiHttpResponse.body);

  //   expect(chaiHttpResponse.status).to.be.equal(201);
  //   expect(chaiHttpResponse.body).to.be.an('object');
  //   expect(chaiHttpResponse.body).to.have.all.keys(['id', 'home_team', 'home_team_goals', 'away_team', 'away_team_goals', 'in_progress']);
  // });

  it('Deve ser possível finalizar uma partida, alterando com sucesso o status inProgress para false', async () => {
    //cria um sinon.stub para passar na validação do token
    sinon.stub(decode, 'decode').resolves(decoded);

    sinon
      .stub(MatchModel, "update")
      .resolves([1] as unknown as [number, MatchModel[]]);

    sinon.stub(console, 'log').resolves();

    // a rota para o requisito é /matches/:id/finish
    chaiHttpResponse = await chai
      .request(app).patch('/matches/1/finish');

    console.log('xablau2', chaiHttpResponse.body);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.have.all.keys(['message']);
    expect(chaiHttpResponse.body.message).to.be.equal('Finished');
  });

  it('Deve retornar a mensagem No match found caso não encontre o jogo', async () => {
    sinon
      .stub(MatchModel, "update")
      .resolves(undefined as unknown as [number, MatchModel[]]);

    sinon.stub(console, 'log').resolves();

    // a rota para o requisito é /matches/:id/finish
    chaiHttpResponse = await chai
      .request(app).patch('/matches/1/finish');

    console.log('xablau2', chaiHttpResponse.body);

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.have.all.keys(['message']);
    expect(chaiHttpResponse.body.message).to.be.equal('No match found');
  });

  it('Deve ser possível atualizar uma partida em andamento com sucesso', async () => {
    sinon
      .stub(MatchModel, "update")
      .resolves([1] as unknown as [number, MatchModel[]]);

    sinon.stub(console, 'log').resolves();

    // a rota para o requisito é /matches/:id
    chaiHttpResponse = await chai
      .request(app).patch('/matches/1').send({
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      });

    console.log('xablau2', chaiHttpResponse.body);

    //Será avaliado que é o endpoint responde à requisição com um status 200 e qualquer corpo.
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Deve retornar a mensagem No match found caso não encontre o jogo', async () => {
    sinon
      .stub(MatchModel, "update")
      .resolves(false as unknown as [number, MatchModel[]]);

    sinon.stub(console, 'log').resolves();

    // a rota para o requisito é /matches/:id
    chaiHttpResponse = await chai
      .request(app).patch('/matches/1').send({
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      });

    console.log('xablau2', chaiHttpResponse.body);

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.have.all.keys(['message']);
    expect(chaiHttpResponse.body.message).to.be.equal('No match found');
  });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});

