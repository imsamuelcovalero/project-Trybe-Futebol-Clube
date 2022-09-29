import LoginService from '../../../../services/login.service';
import { ILogin } from '../../../../interfaces/login.interface';
import { IToken } from '../../../../interfaces/login.interface';

const loginMock = {
  email: 'teste@teste.com',
  password: '123456',
};

describe('Testes para login.service', () => {
  const loginService = new LoginService();
  const { request } = require('express');

  it('Deve retornar um token', async () => {
    const response = await request.post('/login').send({
      username: 'admin',
      password: 'admin',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('Deve retornar um erro de usuário não encontrado', async () => {
    const response = await request.post('/login').send({
      username: 'admin1',
      password: 'admin',
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('User not found');
  });

  it('Deve retornar um erro de senha inválida', async () => {
    const response = await request.post('/login').send({
      username: 'admin',
      password: 'admin1',
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid password');
  });

  it('Deve retornar um erro de usuário não informado', async () => {
    const response = await request.post('/login').send({
      password: 'admin',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('username is a required field');
  });

  it('Deve retornar um erro de senha não informada', async () => {
    const response = await request.post('/login').send({
      username: 'admin',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('password is a required field');
  });
});