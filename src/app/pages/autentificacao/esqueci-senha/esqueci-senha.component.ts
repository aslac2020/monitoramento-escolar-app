import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SolicitarParam} from "../../../models/login";
import {AutenticacaoService} from "../../../services/autenticacao.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.scss']
})
export class EsqueciSenhaComponent implements OnInit, OnDestroy {
  formulario!: FormGroup;
  private readonly STORAGE_KEY_TEMP = 'emailTempForm';

  private subscriptions = new Subscription();

  constructor(private formBuilder: FormBuilder,
    private  router: Router,
    private authService: AutenticacaoService,
    private messageService: MessageService,
    private ngZone: NgZone
    ) { }

  get email(){
    return this.formulario.get('email');
  }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.falarMensagem();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    const synth = (window as any).speechSynthesis;
    synth.cancel();
  }

  iniciarFormulario(): void {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, this.emailValidator]],
    })
  }


  enviarEmail(){
    const email = this.formulario.get('email')?.value;

    const param : SolicitarParam = {
      Email: email
    }

    this.subscriptions.add(
      this.authService.solicitarNovaSenha(param).subscribe({
        next: (senha: any) => {
          console.log('Email enviado com sucesso:', senha);
        },
        error: (err) => {
          console.error('Erro ao buscar tipos de usuário:', err);
        },
        complete: () => {
          sessionStorage.setItem(this.STORAGE_KEY_TEMP, email);
          this.messageService.add({severity: 'success', summary: 'Email Enviado com sucesso :)'});
          this.router.navigate(['/auth/envio-codigo']);
        }
      })
    )
  }

  falarMensagem(): void {
    const synth = (window as any).speechSynthesis;
    const voices = synth.getVoices();

    const vozMaria = voices.find((v: SpeechSynthesisVoice) =>
      v.name === "Microsoft Maria - Portuguese (Brazil)"
    );

    const mensagem = new SpeechSynthesisUtterance(
      "Você está na tela de recuperação de senha. Informe o seu e-mail cadastrado e enviaremos as instruções para criar uma nova senha."
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

  voltarLogin(){
  this.router.navigate(['/auth/login']);
  }


  emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { email: true };
  }

}
