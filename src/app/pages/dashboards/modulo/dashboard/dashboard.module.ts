import { DashboardResponsavelComponent } from './../../dashboard-responsavel/dashboard-responsavel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from '../../routing/dashboard-routing.module';



@NgModule({
  declarations: [
    DashboardResponsavelComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
