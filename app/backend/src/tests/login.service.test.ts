import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

// function before(arg0: () => Promise<void>) {
//   throw new Error('Function not implemented.');
// }

// function after(arg0: () => void) {
//   throw new Error('Function not implemented.');
// }

import { app } from '../app';
import UserModel from '../database/models/user.model';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import { Response } from 'superagent';
import { compareSync } from 'bcryptjs';

chai.use(chaiHttp);

const { expect } = chai;

const loginMock = {
  email: 'teste@teste.com',
  password: '123456',
};

const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc';

describe('Testes para login.service', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  // const loginService = new LoginService();

  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(UserModel, "findOne")
  //     .resolves({
  //       ...loginMock
  //     } as UserModel);
  // });

  // after(() => {
  //   (UserModel.findOne as sinon.SinonStub).restore();
  // })

  beforeEach(async () => {
    sinon.restore();
  });

  it('Deve logar um usuário com sucesso', async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(loginMock as UserModel);

    sinon
      .stub(jwt, 'sign')
      .resolves(tokenMock)

    sinon
      .stub(bcrypt, 'compareSync')
      .resolves(false)

    chaiHttpResponse = await chai
      .request(app).post('/login').send(loginMock);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal({ token: tokenMock });
  });

  it('Deve retornar erro ao logar um usuário sem email', async () => {
    chaiHttpResponse = await chai
      .request(app).post('/login').send({
        ...loginMock,
        email: ''
      });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({
      message: 'All fields must be filled'
    });
  });

  it('Deve retornar erro ao logar um usuário sem senha', async () => {
    chaiHttpResponse = await chai
      .request(app).post('/login').send({
        ...loginMock,
        password: ''
      });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({
      message: 'All fields must be filled'
    });
  });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});

