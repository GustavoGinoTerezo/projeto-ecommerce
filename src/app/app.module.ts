import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//componentes
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { MegaMenuModule } from 'primeng/megamenu';
import { CarouselModule } from 'primeng/carousel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { GalleriaModule } from 'primeng/galleria';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { PaginatorModule } from 'primeng/paginator';
import { InputNumberModule } from 'primeng/inputnumber';
import { StepsModule } from 'primeng/steps';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';

//telas
import { LoginComponent } from './componentes/telas/login-e-criar-conta/login/login.component';
import { HeaderComponent } from './componentes/header/header.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { CriarContaComponent } from './componentes/telas/login-e-criar-conta/criar-conta/criar-conta.component';
import { TelaPrincipalComponent } from './componentes/telas/tela-principal/tela-principal.component';
import { MessageService } from 'primeng/api';
import { DetalheProdutoComponent } from './componentes/telas/detalhe-produto/detalhe-produto.component';
import { CategoriaComponent } from './componentes/telas/categoria/categoria.component';
import { CarrinhoDeComprasComponent } from './componentes/telas/carrinho-de-compras/carrinho/carrinho-de-compras.component';
import { PagamentoComponent } from './componentes/telas/carrinho-de-compras/pagamento/pagamento.component';
import { ConfirmacaoComponent } from './componentes/telas/carrinho-de-compras/confirmacao/confirmacao.component';
import { ConclusaoDeCompraComponent } from './componentes/telas/carrinho-de-compras/conclusao-de-compra/conclusao-de-compra.component';
import { FuncoesUsuarioComponent } from './componentes/telas/funcoes/usuario/funcoes-usuario/funcoes-usuario.component';
import { FuncoesAdministradorComponent } from './componentes/telas/funcoes/administrador/funcoes-administrador/funcoes-administrador.component';
import { MinhaContaComponent } from './componentes/telas/funcoes/usuario/minha-conta/minha-conta.component';
import { MeusDadosComponent } from './componentes/telas/funcoes/usuario/meus-dados/meus-dados.component';
import { MeusPedidosComponent } from './componentes/telas/funcoes/usuario/meus-pedidos/meus-pedidos.component';
import { GerenciamentoDeClientesComponent } from './componentes/telas/funcoes/administrador/gerenciamento-de-clientes/gerenciamento-de-clientes.component';
import { RelatoriosDeVendasComponent } from './componentes/telas/funcoes/administrador/relatorios-de-vendas/relatorios-de-vendas.component';
import { ControleDePedidosComponent } from './componentes/telas/funcoes/administrador/controle-de-pedidos/controle-de-pedidos.component';
import { AdicionarCategoriasEProdutosComponent } from './componentes/telas/funcoes/administrador/adicionar-categorias-e-produtos/adicionar-categorias-e-produtos.component';
import { EntradaDeEstoqueComponent } from './componentes/telas/funcoes/administrador/entrada-de-estoque/entrada-de-estoque.component';
import { EntradaDeNotasFiscaisComponent } from './componentes/telas/funcoes/administrador/entrada-de-notas-fiscais/entrada-de-notas-fiscais.component';
import { PersonalizacaoComponent } from './componentes/telas/funcoes/administrador/personalizacao/personalizacao.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RodapeComponent,
    CriarContaComponent,
    DetalheProdutoComponent,
    TelaPrincipalComponent,
    CategoriaComponent,
    CarrinhoDeComprasComponent,
    PagamentoComponent,
    ConfirmacaoComponent,
    ConclusaoDeCompraComponent,
    FuncoesUsuarioComponent,
    FuncoesAdministradorComponent,
    MinhaContaComponent,
    MeusDadosComponent,
    MeusPedidosComponent,
    GerenciamentoDeClientesComponent,
    RelatoriosDeVendasComponent,
    ControleDePedidosComponent,
    AdicionarCategoriasEProdutosComponent,
    EntradaDeEstoqueComponent,
    EntradaDeNotasFiscaisComponent,
    PersonalizacaoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    CheckboxModule,
    InputMaskModule,
    MegaMenuModule,
    CarouselModule,
    SplitButtonModule,
    ToastModule,
    GalleriaModule,
    AvatarModule,
    AvatarGroupModule,
    PaginatorModule,
    InputNumberModule,
    StepsModule,
    RadioButtonModule,
    SidebarModule,
    DialogModule,
    AccordionModule,
    TimelineModule,
    CardModule,
    TableModule,
    DropdownModule,
    InputTextareaModule,
    InputSwitchModule,
    FileUploadModule,
    HttpClientModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
