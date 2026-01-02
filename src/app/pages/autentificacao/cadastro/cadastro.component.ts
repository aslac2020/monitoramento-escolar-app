import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {TipoUsuarioService} from "../../../services/tipo-usuario.service";
import {error} from "@angular/compiler/src/util";
import {TipoUsuarioModel} from "../../../models/tipoUsuario";
import {UsuarioService} from "../../../services/usuario.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit, OnDestroy {
  formulario!: FormGroup;
  hide: boolean = true;
  listaTipoUsuarios: TipoUsuarioModel[] | any;
  idTipoUsuario?: number;

  private subscriptions = new Subscription();

  constructor(private formBuilder: FormBuilder,
              private ngZone: NgZone,
              private router: Router,
              private tipoUsuarioService: TipoUsuarioService,
              private usuarioService: UsuarioService,
              private messageService: MessageService
            ){
    this.iniciarMensagemFalada();
  }

  get email(){
    return this.formulario.get('email');
  }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.buscarTipoUsuario();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    const synth = (window as any).speechSynthesis;
    synth.cancel();
  }

  iniciarMensagemFalada(): void {
    const synth = (window as any).speechSynthesis;
    const voices = synth.getVoices();

    const vozMaria = voices.find((v: SpeechSynthesisVoice) =>
      v.name === "Microsoft Maria - Portuguese (Brazil)"
    );

    const mensagem = new SpeechSynthesisUtterance(
      "Você está na tela de cadastro do Caminho Seguro. Preencha seus dados para criar uma conta como gestor, motorista ou responsável. Depois, toque em “Cadastrar” para prosseguir."
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
    }
  }

  iniciarFormulario(): void {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, this.emailValidator]],
      senha: ['', [Validators.required]],
      telefone: [''],
      idtipoUsuario: ['', Validators.required],
    })

   this.formulario.get('tipoUsuario')?.valueChanges.subscribe((idTipoUsuario) => {
     this.idTipoUsuario = idTipoUsuario;
     console.log(this.idTipoUsuario);
   })
  }

  buscarTipoUsuario(): void {
    this.subscriptions.add(
      this.tipoUsuarioService.buscarTiposUsuarios().subscribe({
        next: (tipos: TipoUsuarioModel[] | any) => {
          this.listaTipoUsuarios = [];
          this.listaTipoUsuarios = tipos;
          console.log(this.listaTipoUsuarios);
        },
        error: (err) => {
          console.error('Erro ao buscar tipos de usuário:', err);
        },
        complete: () => {
          console.log('Busca de tipos de usuário finalizada.');
        }
      })
    );
  }

  cadastrar(){
    const param = this.formulario.getRawValue();
    this.subscriptions.add(
      this.usuarioService.cadastrarUsuario(param).subscribe({
        next: (usuario: any) => {
        },
        error: (err) => {
          console.error('Erro ao buscar tipos de usuário:', err);
        },
        complete: () => {
          this.messageService.add({severity: 'success', summary: 'Usuario cadastrado com sucesso :)', detail: 'Message Content'});
          this.router.navigate(['/login']);
        }
      })
    )

  }


  emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { email: true };
  }

  toggleHide(): void{
    this.hide = !this.hide;
  }

}
