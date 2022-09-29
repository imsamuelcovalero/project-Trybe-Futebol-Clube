import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamModel from '../database/models/team.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


describe('Testes para rota teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.restore();
  });

  it('Deve retornar todos os times com sucesso', async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves([{ id: 1, teamName: 'teste' }] as TeamModel[]);

    sinon.stub(console, 'log').resolves();

    chaiHttpResponse = await chai
      .request(app).get('/teams');

    console.log('xablau', chaiHttpResponse.body);


    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.all.keys(['id', 'teamName']);
    // expect(chaiHttpResponse.body[0]).to.have.property('id');
    // expect(chaiHttpResponse.body[0]).to.have.property('teamName');
  });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});

