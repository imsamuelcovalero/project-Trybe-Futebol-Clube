import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import UserModel from '../database/models/user.model';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const loginMock = {
  email: 'teste@teste.com',
  password: '123456',
};

const adminLoginMock = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

const userLoginMock = {
  email: 'user@user.com',
  password: 'secret_user',
};

const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc';

describe('Testes para login.service', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

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
      .resolves(true)

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

  // it('Deve retornar o role do usuário ao logar pela rota /login/validate', async () => {
  //   // simula com sinon.stub receber um token válido e retornar o role do usuário

  //   sinon
  //     .stub(jwt, 'verify')
  //     .resolves({
  //       role: 'admin'
  //     } as jwt.JwtPayload);


  //   chaiHttpResponse = await chai
  //     .request(app).get('/login/validate').set('Authorization', `Bearer ${tokenMock}`)
  //     .end((err, res) => {
  //       expect(res.status).to.be.equal(200);
  //       expect(res.body).to.deep.equal({ role: 'admin' });

  //       if (err) {
  //         throw err;
  //       }
  //     });

  //   expect(chaiHttpResponse.status).to.be.equal(200);
  //   expect(chaiHttpResponse.body).to.deep.equal({
  //     role: 'admin'
  //   });

  //   sinon.stub(jwt, 'verify').throws();

  //   chaiHttpResponse = await chai
  //     .request(app).get('/login/validate').set('Authorization', `Bearer ${tokenMock}`)
  //     .end((err, res) => {
  //       expect(res.status).to.be.equal(401);
  //       expect(res.body).to.deep.equal({ message: 'Unauthorized' });

  //       if (err) {
  //         throw err;
  //       }
  //     });

  //   expect(chaiHttpResponse.status).to.be.equal(401);
  //   expect(chaiHttpResponse.body).to.deep.equal({
  //     message: 'Unauthorized'
  //   });
  // });


  // chaiHttpResponse = await chai
  //   .request(app).get('/login/validate').set({ "authorization": `Bearer ${tokenMock}` })
  //   .send();

  // console.log('xablau', chaiHttpResponse.body);


  // expect(chaiHttpResponse.status).to.be.equal(200);
  // expect(chaiHttpResponse.body).to.deep.equal({
  //   role: 'admin'
  // });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});

