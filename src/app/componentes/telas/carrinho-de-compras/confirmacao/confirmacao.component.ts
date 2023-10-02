import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CarrinhoDeCompra, ServiceCarrinhoDeComprasService } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Produtos, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';
import { FormaPagamento, FormaPagamentoService } from 'src/app/services/serviceFormaPagamento/forma-pagamento.service';
import { EnderecoEntrega, ServiceUsuarioLogadoService, Usuario } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';
import { AES } from 'crypto-ts';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.css']
})
export class ConfirmacaoComponent implements OnInit{

  items: MenuItem[] = [];
  carrinho: CarrinhoDeCompra[] = [];
  enderecosEntrega: EnderecoEntrega[] = []
  enderecoEntregaSelecionado: EnderecoEntrega[] = []
  usuario: Usuario[] = [];
  valorTotal: number = 0;
  first: number = 0; // Primeiro item da página
  rows: number = 5; // Número de itens por página
  produtos: Produtos[] = []
  formaPagamento: FormaPagamento[] = []
  formaPagamentoSelecionada: FormaPagamento[] = [];

  constructor(
    private carrinhoService: ServiceCarrinhoDeComprasService,
    private categoriasService: ServiceCategoriasService,
    private usuarioService: ServiceUsuarioLogadoService,
    private formaPagamentoService: FormaPagamentoService,
  ){}

  ngOnInit() {

    const a197524e8eab13c5ef3ce02dd4f4b8cf6972d7b9154604e3f55b3cdcd0e4c2d5 = sessionStorage.getItem('c');

    const a8b12ace84b6e44cf9290c7a8d584d0f44a4ff2079add964f67e6e999e0045d6 = sessionStorage.getItem('es');

    const a7ccc9f43fc28a6ce00af20b9ca3e8985739eed74c57b4e4e7a88cd4d3682a5e = sessionStorage.getItem('p');

    setTimeout(() => {

      this.categoriasService.getProdutos().subscribe(
        (produtosAPI) => {
          this.produtos = produtosAPI;

          console.log(this.produtos)

          const a1ccefeb85a70e1b7d5c9a481670ce830808a393e93472c6265a397022997bcb = 'a3961c51c8a8dca7ae4cd0a4e66a99259ca12dc3144b550efb34ebc8dfb6ecbc';

          let carrinhoIds: number[] = [];

          if (a197524e8eab13c5ef3ce02dd4f4b8cf6972d7b9154604e3f55b3cdcd0e4c2d5) {
            // Descriptografe o carrinho se ele existir
            const a3a61a64a53903b8b315bb3a98a680213b415430c83844e6872d1b332ad2a27a = AES.decrypt(a197524e8eab13c5ef3ce02dd4f4b8cf6972d7b9154604e3f55b3cdcd0e4c2d5, a1ccefeb85a70e1b7d5c9a481670ce830808a393e93472c6265a397022997bcb);

            // Verifique se a descriptografia foi bem-sucedida
            if (a3a61a64a53903b8b315bb3a98a680213b415430c83844e6872d1b332ad2a27a.sigBytes > 0) {
              // Converta o resultado descriptografado de volta em um array de IDs
              carrinhoIds = JSON.parse(a3a61a64a53903b8b315bb3a98a680213b415430c83844e6872d1b332ad2a27a.toString(CryptoJS.enc.Utf8));
            }

            console.log("carrinhoIDS", carrinhoIds)
          }

          if (carrinhoIds.length > 0) {
            // Itere pelos IDs em carrinhoIds
            for (const carrinhoId of carrinhoIds) {
              // Verifique se o produto já existe no carrinho
              const produtoNoCarrinho = this.carrinho.find(item => item.prodId === carrinhoId);

              if (produtoNoCarrinho) {
                // Se o produto já existe no carrinho, aumente a quantidade
                produtoNoCarrinho.quantidade!++;
              } else {
                // Se o produto não existe no carrinho, encontre o produto correspondente com base no ID
                const produtoEncontrado = this.produtos.find(produto => produto.prodId === carrinhoId);

                // Se um produto correspondente for encontrado, adicione-o ao carrinho com quantidade 1
                if (produtoEncontrado) {
                  this.carrinho.push({
                    prodId: produtoEncontrado.prodId,
                    nomeProduto: produtoEncontrado.nome,
                    preco: produtoEncontrado.preco,
                    quantidade: 1,
                  });
                }
              }
            }
          }
        }
      );

      this.usuarioService.getEnderecoEntregaUsuarioLogado().subscribe(
        (enderecosEntregaAPI) => {
          this.enderecosEntrega = enderecosEntregaAPI;
          console.log(this.enderecosEntrega)

          const d880c83d159fd83056bf415dc345fdcbd5c642e26ca51703af13bc9db17838d2 = '9776a1b50191cae98292336600e0a7bd4263bf18b3d87c7dbb5cb3dd7f54438f';

          let enderecoEntregaSelecionadoId!: number;

          if (a8b12ace84b6e44cf9290c7a8d584d0f44a4ff2079add964f67e6e999e0045d6) {
            const bb5bcc69117fd472d769d1f7133fcea3a2bd6711dc388041c059f2ae78a15d8b = AES.decrypt(a8b12ace84b6e44cf9290c7a8d584d0f44a4ff2079add964f67e6e999e0045d6, d880c83d159fd83056bf415dc345fdcbd5c642e26ca51703af13bc9db17838d2);
            if (bb5bcc69117fd472d769d1f7133fcea3a2bd6711dc388041c059f2ae78a15d8b.sigBytes > 0) {
              enderecoEntregaSelecionadoId = JSON.parse(bb5bcc69117fd472d769d1f7133fcea3a2bd6711dc388041c059f2ae78a15d8b.toString(CryptoJS.enc.Utf8));
            }
            console.log("enderecoIdSelecionado", enderecoEntregaSelecionadoId)
            if (enderecoEntregaSelecionadoId !== undefined) {
              // Encontre o endereço correspondente com base no ID
              const enderecoSelecionado = this.enderecosEntrega.find(endereco => endereco.endId === enderecoEntregaSelecionadoId);

              // Verifique se o endereço foi encontrado
              if (enderecoSelecionado) {
                // Preencha o array enderecoEntregaSelecionado com o endereço encontrado
                this.enderecoEntregaSelecionado = [enderecoSelecionado];


              }
              console.log("Endereço selecionado: ",this.enderecoEntregaSelecionado)
            }
          }


        }
      );

      this.formaPagamentoService.getFormaPagamento().subscribe(
        (formaPagamento) => {
          this.formaPagamento = formaPagamento;
          console.log(this.formaPagamento)

          const d75bebc1471a279ab08da91a018b44d77bc0db35e56d700a3ffc7a47f455af0b = '8bdc349582ed93b3bab86341c35b5a1c7187b7b9219d6a2c2808cbb9823a3c82';

          let formaPagamentoId!: number;

          if (a7ccc9f43fc28a6ce00af20b9ca3e8985739eed74c57b4e4e7a88cd4d3682a5e) {
            const bd534ef1857d551a2450df6490121d3a4498e21dffd23873e593a9d40a4b161f = AES.decrypt(a7ccc9f43fc28a6ce00af20b9ca3e8985739eed74c57b4e4e7a88cd4d3682a5e, d75bebc1471a279ab08da91a018b44d77bc0db35e56d700a3ffc7a47f455af0b);
            if (bd534ef1857d551a2450df6490121d3a4498e21dffd23873e593a9d40a4b161f.sigBytes > 0) {
              formaPagamentoId = JSON.parse(bd534ef1857d551a2450df6490121d3a4498e21dffd23873e593a9d40a4b161f.toString(CryptoJS.enc.Utf8));
            }
            console.log("formaPagamentoId: ", formaPagamentoId)

            if (formaPagamentoId !== undefined) {
              // Encontre o endereço correspondente com base no ID
              const formaPagamento = this.formaPagamento.find(formaPagamento => formaPagamento.idPagamento === formaPagamentoId);

              // Verifique se o endereço foi encontrado
              if (formaPagamento) {
                // Preencha o array enderecoEntregaSelecionado com o endereço encontrado
                this.formaPagamentoSelecionada = [formaPagamento];


              }
              console.log("Forma Pagamento selecionada: ",this.formaPagamentoSelecionada)
            }
          }
      });

      this.calcularValorTotal();
    }, 1500);

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

  calcularValorTotal(): void {
    this.valorTotal = this.carrinho.reduce((total, produto) => {
      return total + (produto.preco || 0) * (produto.quantidade || 0);
    }, 0);
  }

  calcularValorItem(item: CarrinhoDeCompra): number {
    return (item.quantidade || 0) * (item.preco || 0);
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  get totalRecords(): number {
    return this.carrinho?.length || 0;
  }
}
