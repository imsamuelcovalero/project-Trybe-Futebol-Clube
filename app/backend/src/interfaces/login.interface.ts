//password não é obrigatório em Ilogin

export interface ILogin {
  id?: number;
  email: string;
  password: string;
}

export interface IToken {
  token: string;
}

export interface LoginController {
  login(): Promise<ILogin>;
}