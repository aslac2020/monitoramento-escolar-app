export class LoginModel {
  Token?: string;
  Nome?: string;
  Email?: string;
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
