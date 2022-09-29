import LoginService from '../../../../database/services/login.service';
import UserModel from '../../../../database/models/user.model';
import { ILogin, IToken } from '../../../../interfaces/login.interface';

const loginMock = {
  email: 'teste@teste.com',
  password: '123456',
};

const tokenMock = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc',
};

describe('Testes para login.service', () => {
  const loginService = new LoginService();

  it('Deve logar um usuário com sucesso', async () => {
    const token = await loginService.login(loginMock as ILogin);
    expect(token).toBeInstanceOf(String);
  });
});