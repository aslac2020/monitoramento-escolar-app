import { DashboardResponsavelComponent } from './../../dashboard-responsavel/dashboard-responsavel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from '../../routing/dashboard-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';



@NgModule({
  declarations: [
    DashboardResponsavelComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
