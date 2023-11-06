import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { MessageService } from 'primeng/api';
import { Anuncios, ServiceAnunciosService } from 'src/app/services/serviceAnuncios/service-anuncios.service';
import { Banner, ServiceBannerService } from 'src/app/services/serviceBanner/service-banner.service';
import { Categorias, ServiceCategoriasService, Produtos } from 'src/app/services/serviceCategorias/service-categorias.service';
import { Router } from '@angular/router';
import { ServiceCarrinhoDeComprasService } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Subscription, switchMap } from 'rxjs';
import { AES } from 'crypto-ts';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  styleUrls: ['./tela-principal.component.css']
})
export class TelaPrincipalComponent implements OnInit, OnDestroy {

  private inicializacaoConcluidaSubscription!: Subscription;
  private anunciosMaioresSubscription!: Subscription;
  private anunciosMenoresSubscription!: Subscription;
  private bannerImagesSubscription!: Subscription;
  private categoriasSubscription!: Subscription;
  private produtosDestaqueSubscription!: Subscription;
  private produtosMaisVendidosSubscription!: Subscription;
  private produtosEmPromocaoSubscription!: Subscription;

  //Relacionado aos produtos
  produtosDestaque: Produtos[] = [];
  produtosMaisVendidos: Produtos[] = [];
  produtosEmPromocao: Produtos[] = [];
  categorias: Categorias[] = [];

  //Relacionado as Imagens
  images: Banner[] = [];
  anunciosMaiores: Anuncios[] = [];
  anunciosMenores: Anuncios[] = [];

  responsiveOptions: any[] = [
    {
      breakpoint: '1860px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1430px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '1000px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  responsiveOptionsBanner: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
  ];

  responsiveOptionsAnunciosMenores: any[] = [
    {
        breakpoint: '800px',
        numVisible: 1,
        numScroll: 1
    },
  ];

  responsiveOptionsEmPromocao: any[] = [
    {
      breakpoint: '1780px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '1250px',
      numVisible: 1,
      numScroll: 1
    },


  ];

  responsiveOptionsCategorias: any[] = [
    {
      breakpoint: '1400px',
      numVisible: 8,
      numScroll: 1
    },
    {
      breakpoint: '1200px',
      numVisible: 7,
      numScroll: 1
    },
    {
      breakpoint: '1000px',
      numVisible: 6,
      numScroll: 1
    },
    {
      breakpoint: '860px',
      numVisible: 5,
      numScroll: 1
    },
    {
      breakpoint: '730px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '600px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '480px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '350px',
      numVisible: 1,
      numScroll: 1
    },

  ];

  constructor(
    private serviceProdutosDestaque: ServiceCategoriasService,
    private bannerService: ServiceBannerService,
    private categoriasService: ServiceCategoriasService,
    private anuncioService: ServiceAnunciosService,
    private carrinhoService: ServiceCarrinhoDeComprasService,
    private appToast: AppComponent,
    private router: Router
  ){}

  async ngOnInit(){

    const start = sessionStorage.getItem('start')

    if(start){
      this.carregarCategorias();
    } else {
      const inicializacaoConcluidaObservable = this.categoriasService.getInicializacaoConcluida();

      if (inicializacaoConcluidaObservable) {
        this.inicializacaoConcluidaSubscription = inicializacaoConcluidaObservable.subscribe(() => {
          this.carregarCategorias();
        });
      }
    }

    window.addEventListener('beforeunload', () => {
      sessionStorage.removeItem('start');
    });



    //================================================================================================================================//
    //RELACIONADO COM OS ANUNCIOS
    this.anunciosMaioresSubscription = this.anuncioService.getAnunciosMaiores().subscribe(
      (anunciosMaiores) => {
        this.anunciosMaiores = anunciosMaiores;
      });

    this.anunciosMenoresSubscription = this.anuncioService.getAnunciosMenores().subscribe(
      (anunciosMenores) => {
        this.anunciosMenores = anunciosMenores;
      });

    this.bannerImagesSubscription = this.bannerService.getImages().subscribe((images) => {
      this.images = images;
    });
  }

  ngOnDestroy() {

    if (this.inicializacaoConcluidaSubscription) {
      this.inicializacaoConcluidaSubscription.unsubscribe();
    }

    if (this.categoriasSubscription) {
      this.categoriasSubscription.unsubscribe();
    }

    if (this.anunciosMaioresSubscription) {
      this.anunciosMaioresSubscription.unsubscribe();
    }

    if (this.anunciosMenoresSubscription) {
      this.anunciosMenoresSubscription.unsubscribe();
    }

    if (this.bannerImagesSubscription) {
      this.bannerImagesSubscription.unsubscribe();
    }

    if (this.produtosDestaqueSubscription) {
      this.produtosDestaqueSubscription.unsubscribe();
    }

    if (this.produtosMaisVendidosSubscription) {
      this.produtosMaisVendidosSubscription.unsubscribe();
    }

    if (this.produtosEmPromocaoSubscription) {
      this.produtosEmPromocaoSubscription.unsubscribe();
    }
  }

  carregarCategorias() {
    this.categoriasSubscription = this.categoriasService.getCategorias().subscribe((categoriasAPI) => {
      this.categorias = categoriasAPI;
      console.log("7");
      this.getProdutos();
    });
  }

  //================================================================================================================================//
  //RELACIONADO COM OS PRODUTOS

  getProdutos() {
    // Aqui você pode chamar os métodos que fazem as chamadas HTTP após a conclusão dos métodos no serviço.
    this.produtosDestaqueSubscription = this.categoriasService.getProdutosDestaque().subscribe((produtosDestaqueAPI) => {
      this.produtosDestaque = produtosDestaqueAPI;
      console.log("8")
      console.log(this.produtosDestaque)
    });

    this.produtosMaisVendidosSubscription = this.categoriasService.getProdutosMaisVendidos().subscribe((produtosMaisVendidosAPI) => {
      this.produtosMaisVendidos = produtosMaisVendidosAPI;
      console.log("9")
    });

    this.produtosEmPromocaoSubscription = this.categoriasService.getProdutosEmPromocao().subscribe((produtosEmPromocaoAPI) => {
      this.produtosEmPromocao = produtosEmPromocaoAPI;
      console.log("10")
    });
  }

  navigateProduto(produto: Produtos) {
    const nomeFormatado = produto.nome?.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/detalhe-produto', nomeFormatado]);
  }

  navigateCategoria(categoria: Categorias) {
    const nomeFormatado = categoria.nome?.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/categoria', nomeFormatado]);
  }

  formatarNomeProduto(produtos: string): string {
    return this.categoriasService.formatarNomeProduto(produtos);
  }

  adicionarAoCarrinho(produto: Produtos): void {

    const saldo = produto.qtdEntrada - produto.qtdSaida

    if(saldo > 0) {
      
      // Recupere o carrinho criptografado do sessionStorage
    const a197524e8eab13c5ef3ce02dd4f4b8cf6972d7b9154604e3f55b3cdcd0e4c2d5 = sessionStorage.getItem('c');
    const a1ccefeb85a70e1b7d5c9a481670ce830808a393e93472c6265a397022997bcb = 'a3961c51c8a8dca7ae4cd0a4e66a99259ca12dc3144b550efb34ebc8dfb6ecbc';

    let carrinho: number[] = [];

    if (a197524e8eab13c5ef3ce02dd4f4b8cf6972d7b9154604e3f55b3cdcd0e4c2d5) {
      // Descriptografe o carrinho se ele existir
      const a3a61a64a53903b8b315bb3a98a680213b415430c83844e6872d1b332ad2a27a = AES.decrypt(a197524e8eab13c5ef3ce02dd4f4b8cf6972d7b9154604e3f55b3cdcd0e4c2d5, a1ccefeb85a70e1b7d5c9a481670ce830808a393e93472c6265a397022997bcb);

      // Verifique se a descriptografia foi bem-sucedida
      if (a3a61a64a53903b8b315bb3a98a680213b415430c83844e6872d1b332ad2a27a.sigBytes > 0) {
        try {
          // Converta o resultado descriptografado de volta em um array
          carrinho = JSON.parse(a3a61a64a53903b8b315bb3a98a680213b415430c83844e6872d1b332ad2a27a.toString(CryptoJS.enc.Utf8));
        } catch (error) {
          
          const tipo = 'error'
          const titulo = ''
          const mensagem = 'Erro ao adicionar o produto ao carrinho. Tente novamente mais tarde.'
          const icon = 'fa-solid fa-face-frown'

          this.appToast.toast(tipo, titulo, mensagem, icon);

          carrinho = [];
        }
      }
    }

    // Verifique se o produto possui um ID válido antes de adicioná-lo ao carrinho
    if (produto.prodId !== undefined) {
      // Adicione o ID do produto ao carrinho
      carrinho.push(produto.prodId);

      // Criptografe o carrinho atualizado e converta para string antes de salvar no sessionStorage
      const b031d16372c388ed5c4462fe1e968adaaa821c5ab62e3b20497569ffe802b0cb = AES.encrypt(JSON.stringify(carrinho), a1ccefeb85a70e1b7d5c9a481670ce830808a393e93472c6265a397022997bcb).toString();

      // Salve o carrinho criptografado no sessionStorage
      sessionStorage.setItem('c', b031d16372c388ed5c4462fe1e968adaaa821c5ab62e3b20497569ffe802b0cb);

      // Exiba uma mensagem ou realize outras ações necessárias

      const tipo = 'success'
      const titulo = ''
      const mensagem = 'Produto adicionado ao carrinho'
      const icon = 'fa-solid fa-cart-shopping'

      this.appToast.toast(tipo, titulo, mensagem, icon);
    }

    } else {

      const tipo = 'error';
      const titulo = '';
      const mensagem = 'Produto sem estoque.';
      const icon = 'fa-solid fa-face-frown';

      this.appToast.toast(tipo, titulo, mensagem, icon);

    }

    
  }

}
