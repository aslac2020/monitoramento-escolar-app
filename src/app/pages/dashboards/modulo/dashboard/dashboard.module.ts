import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from '../../routing/dashboard-routing.module';
import { DashboardResponsavelComponent } from '../../dashboard-responsavel/dashboard-responsavel.component';



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
