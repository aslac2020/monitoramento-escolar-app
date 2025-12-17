import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AutenticacaoService} from "../../services/autenticacao.service";
import {LoginParam} from "../../models/login";

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
              private  router: Router,
              private  autenticacaoService: AutenticacaoService) { }


  get email(){
    return this.formulario.get('email');
  }


  ngOnInit(): void {
    this.iniciarFormulario();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  iniciarFormulario(): void {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, this.emailValidator]],
      senha: ['', [Validators.required]]
    })
  }

 toggleHide(): void{
   this.hide = !this.hide;
}

  redirecionarTelaCadastro(){
    this.router.navigate(['/register']);
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
      this.autenticacaoService.login(param).subscribe( {
        next: (result) => {
          console.log(result);
        }, error: (err) => {
          console.error('Erro ao fazer login:', err);
        },
        complete: () => {
          console.log('Login realizado com sucesso.');
        }
      })
    )
  }


}
