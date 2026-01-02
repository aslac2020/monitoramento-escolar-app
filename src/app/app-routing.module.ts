import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {SplashComponent} from "./pages/splash/splash.component";


const routes: Routes = [
  {
    path: '',
    component: SplashComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/autentificacao/modulo/core/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboards/modulo/dashboard/dashboard.module').then(m => m.DashboardModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
