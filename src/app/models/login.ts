export class LoginModel {
  token?: string;
  nome?: string;
  email?: string;
}

export class LoginParam {
  email?: string;
  senha?: string;
}

export class SolicitarParam {
  Email?: string;
}
export class ResetarSenhaParam {
  Token?: string;
  NovaSenha?: string;
}
