import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardResponsavelComponent } from '../dashboard-responsavel/dashboard-responsavel.component';


const routes: Routes = [
  {
    path: 'responsavel/:id',
    component: DashboardResponsavelComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {

 }
