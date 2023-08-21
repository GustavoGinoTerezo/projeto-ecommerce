import { PagamentoComponent } from './componentes/telas/carrinho-de-compras/pagamento/pagamento.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/telas/login-e-criar-conta/login/login.component';
import { CriarContaComponent } from './componentes/telas/login-e-criar-conta/criar-conta/criar-conta.component';
import { TelaPrincipalComponent } from './componentes/telas/tela-principal/tela-principal.component';
import { DetalheProdutoComponent } from './componentes/telas/detalhe-produto/detalhe-produto.component';
import { CategoriaComponent } from './componentes/telas/categoria/categoria.component';
import { CarrinhoDeComprasComponent } from './componentes/telas/carrinho-de-compras/carrinho/carrinho-de-compras.component';
import { ConfirmacaoComponent } from './componentes/telas/carrinho-de-compras/confirmacao/confirmacao.component';
import { MinhaContaComponent } from './componentes/telas/funcoes/usuario/minha-conta/minha-conta.component';
import { MeusDadosComponent } from './componentes/telas/funcoes/usuario/meus-dados/meus-dados.component';
import { MeusPedidosComponent } from './componentes/telas/funcoes/usuario/meus-pedidos/meus-pedidos.component';

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
    path: 'detalhe-produto/:nome',
    component: DetalheProdutoComponent
  },
  {
    path: 'categoria/:nome',
    component: CategoriaComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'criar-conta',
    component: CriarContaComponent,
  },
  {
    path: 'carrinho-de-compra',
    component: CarrinhoDeComprasComponent,
  },
  {
    path: 'pagamento',
    component: PagamentoComponent,
  },
  {
    path: 'confirmacao',
    component: ConfirmacaoComponent,
  },
  {
    path: 'minha-conta',
    component: MinhaContaComponent,
    pathMatch: 'full',
  },
  {
    path: 'meus-dados',
    component: MeusDadosComponent,
  },
  {
    path: 'meus-pedidos',
    component: MeusPedidosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

