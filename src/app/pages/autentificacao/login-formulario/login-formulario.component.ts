import { TipoUsuarioService } from './../../../services/tipo-usuario.service';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AutenticacaoService } from "../../../services/autenticacao.service";
import { LoginModel, LoginParam } from "../../../models/login";
import { MessageService } from 'primeng/api';
import { UsuarioModel } from 'src/app/models/usuario';
import { TipoUsuarioModel } from 'src/app/models/tipoUsuario';
import { TipoUsuarioEnum } from 'src/app/enum/tipoUsuario.enum';

@Component({
  selector: 'app-login-formulario',
  templateUrl: './login-formulario.component.html',
  styleUrls: ['./login-formulario.component.scss']
})
export class LoginFormularioComponent implements OnInit, OnDestroy {
  formulario!: FormGroup;
  hide: boolean = true;

  private subscriptions = new Subscription();

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private ngZone: NgZone,
    private autenticacaoService: AutenticacaoService,
    private usuarioService: UsuarioService,
    private TipoUsuarioService: TipoUsuarioService
  ) { }


  get email() {
    return this.formulario.get('email');
  }


  ngOnInit(): void {
    this.carregarVozesEFalar();
    this.iniciarFormulario();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    const synth = (window as any).speechSynthesis;
    synth.cancel();
  }


  iniciarFormulario(): void {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, this.emailValidator]],
      senha: ['', [Validators.required]]
    })
  }

   carregarVozesEFalar(): void {
    const synth = (window as any).speechSynthesis;

    // Força o carregamento das vozes
    const voices = synth.getVoices();

    if (voices.length > 0) {
      this.falarMensagem();
    } else {
      // Aguarda evento voiceschanged
      const onVoicesChanged = () => {
        synth.removeEventListener('voiceschanged', onVoicesChanged);
        this.falarMensagem();
      };
      synth.addEventListener('voiceschanged', onVoicesChanged);

      // Fallback: tenta novamente após 100ms
      setTimeout(() => {
        if (synth.getVoices().length > 0) {
          synth.removeEventListener('voiceschanged', onVoicesChanged);
          this.falarMensagem();
        }
      }, 100);
    }
  }

   falarMensagem(): void {
    const synth = (window as any).speechSynthesis;
    const voices = synth.getVoices();

    const vozMaria = voices.find((v: SpeechSynthesisVoice) =>
      v.name === "Microsoft Maria - Portuguese (Brazil)"
    );

    const mensagem = new SpeechSynthesisUtterance(
      "Para entrar no Caminho Seguro, informe seu e-mail e sua senha. Se esqueceu a senha, toque em esqueci a senha. Se não tiver uma conta, toque em criar conta."
    );
    mensagem.lang = "pt-BR";
    mensagem.rate = 1;
    mensagem.pitch = 1;

    if (vozMaria) {
      mensagem.voice = vozMaria;
    }

    synth.speak(mensagem);

    mensagem.onend = () => {
      this.ngZone.run(() => {
      })
    };
  }

  toggleHide(): void {
    this.hide = !this.hide;
  }

  redirecionarTelaCadastro() {
    this.router.navigate(['/auth/register']);
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { email: true };
  }

  entrar(): void {

    const param: LoginParam = {
      email: this.formulario.get('email')?.value,
      senha: this.formulario.get('senha')?.value,
    }

    this.subscriptions.add(
      this.autenticacaoService.login(param).subscribe({
        next: (result: LoginModel) => {
         sessionStorage.setItem('token', result.token || '');
          this.buscarTipoUsuarioERedirecionar();

        }, error: (err) => {
          const mensagem = err?.error?.message || 'Não foi possível alterar a senha. Tente novamente.';
          this.messageService.add({severity: 'error', summary:  `${mensagem}`,});
        },
        complete: () => {
          console.log('Login realizado com sucesso.');
        }
      })
    )
  }

  buscarTipoUsuarioERedirecionar(): void {

    const email = this.formulario.get('email')?.value;

    this.subscriptions.add(
      this.usuarioService.buscarUsuarioPeloEmail(email).subscribe({
        next: (usuario: UsuarioModel) => {
          this.TipoUsuarioService.buscarTiposUsuarios().subscribe({
            next: (tipoUsuario: TipoUsuarioModel[]) => {
              const tipoUsuarioResultado = tipoUsuario.find(t => t.id === usuario.idTipoUsuario);
              this.redirecionarDashboardTipoUsuario(tipoUsuarioResultado);
            },
            error: (err) => {
              const mensagem = err?.error?.message || 'Não foi possível buscar o tipo de usuário. Tente novamente.';
              this.messageService.add({severity: 'error', summary:  `${mensagem}`,});
            }
          })
        }
      })
    )
  }

  redirecionarDashboardTipoUsuario(tipoUsuario: TipoUsuarioModel | any): void {
    if (tipoUsuario.codTipoUsuario === TipoUsuarioEnum.RESPONSAVEL) {
        this.router.navigate(['/dashboard/responsavel']);
      return;
    }

  }


}
