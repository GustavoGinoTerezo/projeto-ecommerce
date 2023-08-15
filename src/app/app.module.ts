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

//telas
import { LoginComponent } from './componentes/telas/login-e-criar-conta/login/login.component';
import { HeaderComponent } from './componentes/header/header.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { CriarContaComponent } from './componentes/telas/login-e-criar-conta/criar-conta/criar-conta.component';
import { TelaPrincipalComponent } from './componentes/telas/tela-principal/tela-principal.component';
import { MessageService } from 'primeng/api';
import { DetalheProdutoComponent } from './componentes/telas/detalhe-produto/detalhe-produto.component';
import { CategoriaComponent } from './componentes/telas/categoria/categoria.component';
import { CarrinhoDeComprasComponent } from './componentes/telas/carrinho-de-compras/carrinho-de-compras.component';

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
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
