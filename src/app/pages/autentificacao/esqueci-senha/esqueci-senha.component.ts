import {Component, OnDestroy, OnInit} from '@angular/core';
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
    ) { }

  get email(){
    return this.formulario.get('email');
  }

  ngOnInit(): void {
    this.iniciarFormulario()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
          this.messageService.add({severity: 'success', summary: 'Email Enviado com sucesso :)', detail: 'Message Content'});
          this.router.navigate(['/auth/envio-codigo']);
        }
      })
    )
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
