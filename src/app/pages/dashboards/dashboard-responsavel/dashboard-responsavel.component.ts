import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-responsavel',
  templateUrl: './dashboard-responsavel.component.html',
  styleUrls: ['./dashboard-responsavel.component.scss']
})
export class DashboardResponsavelComponent implements OnInit, OnDestroy {
idUsuario!: number;


private subscriptions = new Subscription();

  ngOnInit(): void {
    console.log(this.router.snapshot.params);
    this.idUsuario = this.router.snapshot.params['id'];
    console.log(this.idUsuario);
  }

  constructor(private readonly router: ActivatedRoute) {
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }



}
