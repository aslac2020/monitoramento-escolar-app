import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ResetarSenhaParam, SolicitarParam} from "../../../models/login";
import {AutenticacaoService} from "../../../services/autenticacao.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.scss']
})
export class NovaSenhaComponent implements OnInit, OnDestroy {
  formulario!: FormGroup;
  hide: boolean = true;
  private readonly STORAGE_KEY_TEMP = 'emailTempForm';
  private readonly STORAGE_KEY_TEMP_TOKEN = 'tokenTemp';


  private subscriptions = new Subscription();

  constructor(private formBuilder: FormBuilder,
    private  router: Router,
    private authService: AutenticacaoService,
    private messageService: MessageService,
     private ngZone: NgZone
    ) { }

  get senha(){
    return this.formulario.get('senha');
  }

  get confirmarSenha(){
    return this.formulario.get('confirmarSenha');
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
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(6)]],
    }, { validators: this.senhasIguaisValidator });
  }

  senhasIguaisValidator(group: AbstractControl): ValidationErrors | null {
    const senha = group.get('senha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;
    return senha === confirmarSenha ? null : { senhasDiferentes: true };
  }

  confirmarNovaSenha(){
    const senha = this.formulario.get('senha')?.value;
    const token = sessionStorage.getItem(this.STORAGE_KEY_TEMP_TOKEN)

    const param : ResetarSenhaParam = {
      NovaSenha: senha,
      Token: token ? token : ''
    }

    this.subscriptions.add(
      this.authService.resetarSenha(param).subscribe({
        next: (senha: any) => {
        },
        error: (err) => {
          const mensagem = err?.error?.message || 'Não foi possível alterar a senha. Tente novamente.';
          this.messageService.add({severity: 'error', summary:  `${mensagem}`,});
        },
        complete: () => {
          this.messageService.add({severity: 'success', summary: 'Senha alterada com sucesso :)'});
          sessionStorage.removeItem(this.STORAGE_KEY_TEMP_TOKEN);
          sessionStorage.removeItem(this.STORAGE_KEY_TEMP);
          this.router.navigate(['/auth/login']);
        }
      })
    )
  }

  voltarLogin(){
  sessionStorage.removeItem(this.STORAGE_KEY_TEMP_TOKEN);
  sessionStorage.removeItem(this.STORAGE_KEY_TEMP);
  this.router.navigate(['/auth/login']);
  }

   toggleHide(): void{
    this.hide = !this.hide;
  }


  emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { email: true };
  }

  falarMensagem(): void {
    const synth = (window as any).speechSynthesis;
    const voices = synth.getVoices();

    const vozMaria = voices.find((v: SpeechSynthesisVoice) =>
      v.name === "Microsoft Maria - Portuguese (Brazil)"
    );

    const mensagem = new SpeechSynthesisUtterance(
      "Agora você pode criar uma nova senha. Digite a nova senha e repita no campo de confirmação para continuar."
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


}
