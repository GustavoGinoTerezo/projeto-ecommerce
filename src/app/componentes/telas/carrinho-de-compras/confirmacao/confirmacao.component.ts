import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CarrinhoDeCompra, ServiceCarrinhoDeComprasService } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Produtos, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';
import { FormaPagamento, FormaPagamentoService } from 'src/app/services/serviceFormaPagamento/forma-pagamento.service';
import { EnderecoEntrega, ServiceUsuarioLogadoService, Usuario } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';
import { AES } from 'crypto-ts';
import * as CryptoJS from 'crypto-js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.css']
})
export class ConfirmacaoComponent implements OnInit{

  private produtosSubscription!: Subscription;
  private inicializacaoConcluidaSubscription!: Subscription;
  private enderecoCarregadoSubscription!: Subscription;
  private enderecosEntregaSubscription!: Subscription;
  private enderecosCobrancaSubscription!: Subscription;
  private formaPagamentoSubscription!: Subscription;
  private usuarioSubscription!: Subscription;
  private inicializacaoUserConcluidaSubject!: Subscription;

  items: MenuItem[] = [];
  carrinho: CarrinhoDeCompra[] = [];
  enderecosEntrega: EnderecoEntrega[] = []
  enderecoEntregaSelecionado: any[] = []
  enderecoCobranca: any[] = []
  usuario: any[] = [];
  valorTotal: number = 0;
  first: number = 0; // Primeiro item da página
  rows: number = 5; // Número de itens por página
  produtos: Produtos[] = []
  formaPagamento: FormaPagamento[] = []
  formaPagamentoSelecionada: FormaPagamento[] = [];
  carrinhoIds: number[] = []
  enderecoEntregaSelecionadoId!: number
  formaPagamentoId!: number;

  constructor(
    private carrinhoService: ServiceCarrinhoDeComprasService,
    private categoriasService: ServiceCategoriasService,
    private usuarioService: ServiceUsuarioLogadoService,
    private formaPagamentoService: FormaPagamentoService,
  ){}

  ngOnInit() {

    const start = sessionStorage.getItem('start')
    const startEnderecos = sessionStorage.getItem('startEnderecos')
    const startUser = sessionStorage.getItem('startUser')

    if(start){
      this.carregarProdutos();
    } else {
      const inicializacaoConcluidaObservable = this.categoriasService.getInicializacaoConcluida();

      if (inicializacaoConcluidaObservable) {
        this.inicializacaoConcluidaSubscription = inicializacaoConcluidaObservable.subscribe(() => {
          this.carregarProdutos();
        });
      }
    }

    if(startEnderecos){
      this.carregarEnderecos();
    } else {
      const enderecoCarregadoObservable = this.usuarioService.getEnderecosCarregadosObservable();

      if (enderecoCarregadoObservable) {
        this.enderecoCarregadoSubscription = enderecoCarregadoObservable.subscribe(() => {
          this.carregarEnderecos();
        });
      }
    }

    if(startUser){
      this.carregarUsuario();
    } else {
      const inicializacaoConcluidaObservable = this.usuarioService.getInicializacaoConcluida();

      if (inicializacaoConcluidaObservable) {
        this.inicializacaoUserConcluidaSubject = inicializacaoConcluidaObservable.subscribe(() => {
          this.carregarUsuario();
        });
      }
    }

    this.carregarFormaPagamento();


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

    window.addEventListener('beforeunload', () => {
      sessionStorage.removeItem('start');
      sessionStorage.removeItem('startEnderecos');
      sessionStorage.removeItem('startUser');
    });

  }

  ngOnDestroy() {

    if (this.inicializacaoConcluidaSubscription) {
      this.inicializacaoConcluidaSubscription.unsubscribe();
    }

    if (this.produtosSubscription) {
      this.produtosSubscription.unsubscribe();
    }

    if (this.enderecoCarregadoSubscription) {
      this.enderecoCarregadoSubscription.unsubscribe();
    }

    if (this.enderecosEntregaSubscription) {
      this.enderecosEntregaSubscription.unsubscribe();
    }

    if (this.enderecosCobrancaSubscription) {
      this.enderecosCobrancaSubscription.unsubscribe();
    }

    if (this.formaPagamentoSubscription) {
      this.formaPagamentoSubscription.unsubscribe();
    }

    if (this.usuarioSubscription) {
      this.usuarioSubscription.unsubscribe();
    }

  }

  async carregarProdutos() {

    const a197524e8eab13c5ef3ce02dd4f4b8cf6972d7b9154604e3f55b3cdcd0e4c2d5 = sessionStorage.getItem('c');

    const a1ccefeb85a70e1b7d5c9a481670ce830808a393e93472c6265a397022997bcb = 'a3961c51c8a8dca7ae4cd0a4e66a99259ca12dc3144b550efb34ebc8dfb6ecbc';

    if (a197524e8eab13c5ef3ce02dd4f4b8cf6972d7b9154604e3f55b3cdcd0e4c2d5) {
      // Descriptografe o carrinho se ele existir
      const a3a61a64a53903b8b315bb3a98a680213b415430c83844e6872d1b332ad2a27a = AES.decrypt(a197524e8eab13c5ef3ce02dd4f4b8cf6972d7b9154604e3f55b3cdcd0e4c2d5, a1ccefeb85a70e1b7d5c9a481670ce830808a393e93472c6265a397022997bcb);

      // Verifique se a descriptografia foi bem-sucedida
      if (a3a61a64a53903b8b315bb3a98a680213b415430c83844e6872d1b332ad2a27a.sigBytes > 0) {
        // Converta o resultado descriptografado de volta em um array de IDs
        this.carrinhoIds = JSON.parse(a3a61a64a53903b8b315bb3a98a680213b415430c83844e6872d1b332ad2a27a.toString(CryptoJS.enc.Utf8));
        console.log("CarrinhoIds", this.carrinhoIds)
      }
    }

    this.produtosSubscription = this.categoriasService.getProdutos().subscribe(async (produtosAPI) => {
      this.produtos = produtosAPI;

      console.log("Produtos", this.produtos)

      const carrinhoMap: { [id: number]: CarrinhoDeCompra } = {};

        this.carrinhoIds.forEach((produtoId: any) => {
          const produtoEncontrado = this.produtos.find((produto) => produto.prodId === produtoId);
          if (produtoEncontrado) {
            // Se o produto já existe no carrinho, aumente a quantidade
            if (carrinhoMap[produtoId]) {
              carrinhoMap[produtoId].quantidade!++;
            } else {
              // Caso contrário, crie um novo item no carrinho
              carrinhoMap[produtoId] = {
                prodId: produtoEncontrado.prodId,
                nomeProduto: produtoEncontrado.nome,
                preco: produtoEncontrado.preco,
                quantidade: 1, // Defina a quantidade inicial como 1
              };
            }
          }
        });

        // Converta o objeto de carrinho de volta para um array de itens do carrinho
        this.carrinho = Object.values(carrinhoMap);

        console.log("Carrinho: ", this.carrinho)

        this.calcularValorTotal();
    });

  }

  async carregarEnderecos() {
    try {
      this.enderecosEntregaSubscription = this.usuarioService.getEnderecoEntregaUsuarioLogado().subscribe(async (enderecosEntregaAPI) => {
        this.enderecosEntrega = enderecosEntregaAPI;
        console.log("Aqui é dentro do método carregarEnderecos", this.enderecosEntrega);

        console.log("Fim do método carregarEnderecos")
        // Após carregar os endereços, chame o método para preencher o endereço selecionado
        await this.preencherEnderecoSelecionado();
      });
      this.enderecosCobrancaSubscription = this.usuarioService.getEnderecoCobrancaUsuarioLogado().subscribe(async (enderecoCobrancaAPI) => {
        this.enderecoCobranca = enderecoCobrancaAPI;
        console.log("Aqui é dentro do método getEnderecoCobrancaUsuarioLogado", this.enderecoCobranca);

        console.log("Fim do método getEnderecoCobrancaUsuarioLogado")
        // Após carregar os endereços, chame o método para preencher o endereço selecionado
      });
    } catch (error) {
      console.error("Erro ao carregar endereços", error);
    }
  }

  carregarUsuario() {
    this.usuarioSubscription = this.usuarioService.getUsuario().subscribe((usuarioAPI) => {
      this.usuario = [usuarioAPI];
    });
  }

  async preencherEnderecoSelecionado() {

    console.log("Iniciando preencherEnderecoSelecionado")

    const a8b12ace84b6e44cf9290c7a8d584d0f44a4ff2079add964f67e6e999e0045d6 = sessionStorage.getItem('es');

    const d880c83d159fd83056bf415dc345fdcbd5c642e26ca51703af13bc9db17838d2 = '9776a1b50191cae98292336600e0a7bd4263bf18b3d87c7dbb5cb3dd7f54438f';

    if (a8b12ace84b6e44cf9290c7a8d584d0f44a4ff2079add964f67e6e999e0045d6) {
      const bb5bcc69117fd472d769d1f7133fcea3a2bd6711dc388041c059f2ae78a15d8b = AES.decrypt(a8b12ace84b6e44cf9290c7a8d584d0f44a4ff2079add964f67e6e999e0045d6, d880c83d159fd83056bf415dc345fdcbd5c642e26ca51703af13bc9db17838d2);
      if (bb5bcc69117fd472d769d1f7133fcea3a2bd6711dc388041c059f2ae78a15d8b.sigBytes > 0) {
        this.enderecoEntregaSelecionadoId = JSON.parse(bb5bcc69117fd472d769d1f7133fcea3a2bd6711dc388041c059f2ae78a15d8b.toString(CryptoJS.enc.Utf8));

        if (this.enderecoEntregaSelecionadoId !== undefined) {
          // Encontre o endereço correspondente com base no ID
          const enderecoSelecionado = this.enderecosEntrega.find(endereco => endereco.endId === this.enderecoEntregaSelecionadoId);

          // Verifique se o endereço foi encontrado
          if (enderecoSelecionado) {

            console.log("Aqui achou", enderecoSelecionado)
            // Preencha o array enderecoEntregaSelecionado com o endereço encontrado
            this.enderecoEntregaSelecionado = [enderecoSelecionado];
          } else {
            console.log("Não achou")
          }
          console.log("Endereço selecionado: ",this.enderecoEntregaSelecionado)
        }
      }
      console.log("enderecoIdSelecionado", this.enderecoEntregaSelecionadoId)

    }

  }

  async carregarFormaPagamento() {
    try {
      this.formaPagamentoSubscription = this.formaPagamentoService.getFormaPagamento().subscribe(async (formaPagamento) => {
        this.formaPagamento = formaPagamento;

        console.log("Fim carregarFormaPagamento")
        // Após carregar os endereços, chame o método para preencher o endereço selecionado
        await this.preencherFormaPagamento();
      });
    } catch (error) {
    }
  }

  async preencherFormaPagamento() {

    console.log("Inicio preencherFormaPagamento")

    const a7ccc9f43fc28a6ce00af20b9ca3e8985739eed74c57b4e4e7a88cd4d3682a5e = sessionStorage.getItem('p');

    const d75bebc1471a279ab08da91a018b44d77bc0db35e56d700a3ffc7a47f455af0b = '8bdc349582ed93b3bab86341c35b5a1c7187b7b9219d6a2c2808cbb9823a3c82';

    if (a7ccc9f43fc28a6ce00af20b9ca3e8985739eed74c57b4e4e7a88cd4d3682a5e) {
      const bd534ef1857d551a2450df6490121d3a4498e21dffd23873e593a9d40a4b161f = AES.decrypt(a7ccc9f43fc28a6ce00af20b9ca3e8985739eed74c57b4e4e7a88cd4d3682a5e, d75bebc1471a279ab08da91a018b44d77bc0db35e56d700a3ffc7a47f455af0b);
      if (bd534ef1857d551a2450df6490121d3a4498e21dffd23873e593a9d40a4b161f.sigBytes > 0) {
        this.formaPagamentoId = JSON.parse(bd534ef1857d551a2450df6490121d3a4498e21dffd23873e593a9d40a4b161f.toString(CryptoJS.enc.Utf8));

        if (this.formaPagamentoId !== undefined) {
          // Encontre o endereço correspondente com base no ID
          const formaPagamento = this.formaPagamento.find(formaPagamento => formaPagamento.idPagamento === this.formaPagamentoId);

          // Verifique se o endereço foi encontrado
          if (formaPagamento) {
            // Preencha o array enderecoEntregaSelecionado com o endereço encontrado
            this.formaPagamentoSelecionada = [formaPagamento];


          }
          console.log("Forma Pagamento selecionada: ",this.formaPagamentoSelecionada)
        }
      }
      console.log("formaPagamentoId: ", this.formaPagamentoId)
    }

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
