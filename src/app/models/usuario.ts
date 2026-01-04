
export class UsuarioModel {
  nome?: string;
  email!: string;
  senha!: string;
  ativo?: boolean = true;
  idTipoUsuario!: number;
}
