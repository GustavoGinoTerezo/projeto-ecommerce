import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CarrinhoDeCompra, ServiceCarrinhoDeComprasService } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { ServiceUsuarioLogadoService, Usuario } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.css']
})
export class ConfirmacaoComponent implements OnInit{

  items: MenuItem[] = [];
  carrinho: CarrinhoDeCompra[] = [];
  usuario: Usuario[] = [];

  constructor(
    private carrinhoService: ServiceCarrinhoDeComprasService,
    private usuarioService: ServiceUsuarioLogadoService,
  ){}

  ngOnInit() {

    this.carrinho = this.carrinhoService.getCarrinhoDeCompra();

    this.usuario = this.usuarioService.getUsuario();

    this.items = [
        {
            label: 'Carrinho',
            routerLink: '/carrinho-de-compra'
        },
        {
            label: 'Pagamento',
            routerLink: '/pagamento'
        },
        {
            label: 'Confirmação',
            routerLink: '/confirmacao'
        },
        {
            label: 'Conclusão',
            routerLink: '/conclusao'
        }
    ];

  }

}
