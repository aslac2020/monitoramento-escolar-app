import {Component, ElementRef, NgZone, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, interval, Subscription} from "rxjs";
import {map, takeWhile} from "rxjs/operators";
import {ArmazenamentoGlobalService} from "../../../core/armazenamento-global.service";
import {AutenticacaoService} from "../../../services/autenticacao.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-codigo-email',
  templateUrl: './codigo-email.component.html',
  styleUrls: ['./codigo-email.component.scss']
})
export class CodigoEmailComponent implements OnInit, OnDestroy {
  formulario!: FormGroup;
  public tokenErro: string | null = null;
  public tokenExpirado = false;
  private countdownSegundos = 900; // 15 minutos
  private restante = this.countdownSegundos;
  private restanteSubject = new BehaviorSubject<string>('15:00');
  public tempoRestante$ = this.restanteSubject.asObservable();
  public tokenControls: string[] = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6'];
  private readonly STORAGE_KEY_TEMP = 'emailTempForm';
  private readonly STORAGE_KEY_TEMP_TOKEN = 'tokenTemp';

 private subscriptions = new Subscription();

 @ViewChildren('tokenBox') tokenBoxes!: QueryList<ElementRef<HTMLInputElement>>;

  constructor(
    private formBuilder: FormBuilder,
    private storage: ArmazenamentoGlobalService,
    private authService: AutenticacaoService,
    private ngZone: NgZone,
    private router: Router) { }


  ngOnInit(): void {
    this.iniciarCampos();
    this.iniciarFormulario();
    this.falarMensagem();
    this.iniciarContagem();

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    const synth = (window as any).speechSynthesis;
    synth.cancel();
  }

  iniciarCampos(){
    const group: any = {};

    this.tokenControls.forEach((c) => {
      group[c] = ['', [Validators.required, Validators.pattern(/^[0-9]$/)]];
    });

    return group;
  }

  iniciarFormulario() {
    const group = this.iniciarCampos();
    this.formulario = this.formBuilder.group(group);
  }

  private iniciarContagem(): void {
    this.restante = this.countdownSegundos;
    this.restanteSubject.next(this.formatar(this.restante));
    const s = interval(1000)
      .pipe(
        takeWhile(() => this.restante > 0),
        map(() => {
          this.restante--;
          if (this.restante <= 0) {
            this.tokenExpirado = true;

          }
          return this.formatar(this.restante);
        })
      )
      .subscribe((v) => this.restanteSubject.next(v));
    this.subscriptions.add(s);
  }

  private formatar(total: number): string {
    const m = Math.floor(total / 60)
      .toString()
      .padStart(2, '0');
    const s = (total % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  public aoInputToken(ev: Event, index: number): void {
    const input = ev.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 1);
    const ctrl = this.obterControleDigito(index);
    ctrl?.setValue(input.value, { emitEvent: false });
    this.tokenErro = null;
    if (input.value && index < this.tokenControls.length - 1) {
      this.focarIndice(index + 1);
    }
  }

  public aoKeyDownToken(ev: KeyboardEvent, index: number): void {
    const input = ev.target as HTMLInputElement;
    if (ev.key === 'Backspace' && !input.value && index > 0) {
      this.focarIndice(index - 1);
    }
    if (ev.key === 'ArrowLeft' && index > 0) {
      this.focarIndice(index - 1);
      ev.preventDefault();
    }
    if (ev.key === 'ArrowRight' && index < this.tokenControls.length - 1) {
      this.focarIndice(index + 1);
      ev.preventDefault();
    }
  }

  public aoColarToken(ev: ClipboardEvent): void {
    ev.preventDefault();
    const data = ev.clipboardData?.getData('text') ?? '';
    const digits = data.replace(/\D/g, '').slice(0, this.tokenControls.length).split('');
    digits.forEach((d, i) => {
      const ctrl = this.obterControleDigito(i);
      ctrl.setValue(d);
    });
    const lastIndex = digits.length - 1;
    if (lastIndex >= 0) this.focarIndice(Math.min(lastIndex, this.tokenControls.length - 1));
  }

  private focarIndice(i: number): void {
    const arr = this.tokenBoxes?.toArray();
    arr?.[i]?.nativeElement.focus();
    arr?.[i]?.nativeElement.select();
  }

  private obterControleDigito(i: number): AbstractControl {
    return this.formulario.get(this.tokenControls[i])!;
  }

  private obterToken(): string {
    return this.tokenControls.map((c) => this.formulario.get(c)?.value || '').join('');
  }

  public reenviarCodigo(): void {
    const emailSessao = sessionStorage.getItem(this.STORAGE_KEY_TEMP);
    const token = this.obterToken();

    const param = {
      Email: emailSessao,
      Token: token,
    }


    // this.subscriptions.add(
    //   this.authService.solicitarNovaSenha(param).subscribe({
    //     next: (data: any) => {
    //       this.iniciarContagem();
    //       this.formulario.reset();
    //       setTimeout(() => this.focarIndice(0), 0);
    //     },
    //     error: (err: any) => {
    //       const mensagem =
    //         err?.error?.objeto || 'Não foi possível concluir a solicitação. Tente novamente.';
    //     },
    //   })
    // );
  }

  public validarCodigo(): void {
    const token = this.obterToken();
    sessionStorage.setItem(this.STORAGE_KEY_TEMP_TOKEN, token);
    this.router.navigate(['/auth/nova-senha']);

    //   this.authService.resetarSenha(param).subscribe({
    //     next: (data: any) => {
    //       if(data){
    //         // Navegar para a tela de nova senha
    //         this.router.navigate(['/auth/nova-senha']);
    //       }

    //     },
    //     error: (err: any) => {
    //       const mensagem =
    //         err?.error?.objeto || 'Não foi possível concluir a solicitação. Tente novamente.';
    //     },
    //   })
    // );
  }

  falarMensagem(): void {
    const synth = (window as any).speechSynthesis;
    const voices = synth.getVoices();

    const vozMaria = voices.find((v: SpeechSynthesisVoice) =>
      v.name === "Microsoft Maria - Portuguese (Brazil)"
    );

    const mensagem = new SpeechSynthesisUtterance(
     "Você está na tela de verificação de código. Enviamos um código de seis dígitos para o seu e-mail. Digite o código para continuar."
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


