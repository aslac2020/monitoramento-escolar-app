import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-dashboard-responsavel',
  templateUrl: './dashboard-responsavel.component.html',
  styleUrls: ['./dashboard-responsavel.component.scss']
})
export class DashboardResponsavelComponent implements OnInit, OnDestroy {
  idUsuario!: number;
  nomeUsuario!: string;

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.idUsuario = this.router.snapshot.params['id'];
    this.consultarUsuario();
  }

  constructor(
    private readonly router: ActivatedRoute,
    private usuarioService: UsuarioService) {
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  consultarUsuario(){
    this.subscriptions.add(
      this.usuarioService.buscarUsuarioPeloId(this.idUsuario).subscribe(
        (usuario) => {
          this.nomeUsuario = usuario.nome;
        },
        (error) => {
          console.error('Erro ao buscar usuário:', error);
        }
      )
    );
  }



}
