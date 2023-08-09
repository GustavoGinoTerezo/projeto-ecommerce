import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login-e-criar-conta/login/login.component';
import { CriarContaComponent } from './componentes/login-e-criar-conta/criar-conta/criar-conta.component';
import { TelaPrincipalComponent } from './componentes/tela-principal/tela-principal.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tela-principal',
    pathMatch: 'full',
  },
  {
    path: 'tela-principal',
    component: TelaPrincipalComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'criar-conta',
    component: CriarContaComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

