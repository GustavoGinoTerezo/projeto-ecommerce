import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { MessageService } from 'primeng/api';
import { ServiceBannerService } from 'src/app/services/serviceBanner/service-banner.service';
import { Categorias, ServiceCategoriasService, Produtos } from 'src/app/services/serviceCategorias/service-categorias.service';
import { Router } from '@angular/router';
import { ServiceCarrinhoDeComprasService } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { AES } from 'crypto-ts';
import * as CryptoJS from 'crypto-js';
import { ServiceUrlGlobalService } from 'src/app/services/servicesAPI/serviceUrlGlobal/service-url-global.service';

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
  private fotosProdutosSubscription!: Subscription;

  private destroy$ = new Subject<void>();

  //Relacionado aos produtos
  produtosDestaque: Produtos[] = [];
  produtosMaisVendidos: Produtos[] = [];
  produtosEmPromocao: Produtos[] = [];
  categorias: Categorias[] = [];

  //Relacionado as Imagens
  imagens: any[] = [];
  imagensTipo0: any[] = [];
  imagensTipo1: any[] = [];
  imagensTipo2: any[] = [];

  fotosProdutos: any[] = [];
  tipo1Fotos: any[] = [];

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
    private bannerService: ServiceBannerService,
    private categoriasService: ServiceCategoriasService,
    private urlGlobal: ServiceUrlGlobalService,
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

    this.bannerService.inicializacaoConcluida$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.carregarBanners();
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

    if (this.fotosProdutosSubscription) {
      this.fotosProdutosSubscription.unsubscribe();
    }

    this.destroy$.next();
    this.destroy$.complete();

  }

  carregarBanners() {
    this.bannerService.getBanners().subscribe(banners => {
      this.imagens = banners
      
      // Filtrar imagens com tpbanner igual a 0
      this.imagensTipo0 = this.imagens.filter(imagem => imagem.tpbanner === '0');
  
      // Filtrar imagens com tpbanner igual a 1
      this.imagensTipo1 = this.imagens.filter(imagem => imagem.tpbanner === '1');
  
      // Filtrar imagens com tpbanner igual a 2
      this.imagensTipo2 = this.imagens.filter(imagem => imagem.tpbanner === '2');
  
    });
  }

  carregarCategorias() {
    this.categoriasSubscription = this.categoriasService.getCategorias().subscribe((categoriasAPI) => {
      this.categorias = categoriasAPI;
      console.log("8");
      this.getProdutos();
    });
  }

  //================================================================================================================================//
  //RELACIONADO COM OS PRODUTOS

  getProdutos() {

    this.produtosDestaqueSubscription = this.categoriasService.getProdutosDestaque().subscribe((produtosDestaqueAPI) => {
      // Verificar se produtosDestaqueAPI é definido antes de filtrar
      if (produtosDestaqueAPI) {
        // Filtrar os produtos com status igual a 1 e 2
        this.produtosDestaque = produtosDestaqueAPI.filter(produto => typeof produto.status === 'string' && (produto.status === '1' || produto.status === '2'));
        console.log("9");
      }
    });

    this.produtosMaisVendidosSubscription = this.categoriasService.getProdutosMaisVendidos().subscribe((produtosMaisVendidosAPI) => {
      // Verificar se produtosMaisVendidosAPI é definido antes de filtrar
      if (produtosMaisVendidosAPI) {
        // Filtrar os produtos com status igual a 1 e 2
        this.produtosMaisVendidos = produtosMaisVendidosAPI.filter(produto => typeof produto.status === 'string' && (produto.status === '1' || produto.status === '2'));
        console.log("10");
      }
    });

    this.produtosEmPromocaoSubscription = this.categoriasService.getProdutosEmPromocao().subscribe((produtosEmPromocaoAPI) => {
      // Verificar se produtosEmPromocaoAPI é definido antes de filtrar
      if (produtosEmPromocaoAPI) {
        // Filtrar os produtos com status igual a 1 e 2
        this.produtosEmPromocao = produtosEmPromocaoAPI.filter(produto => typeof produto.status === 'string' && (produto.status === '1' || produto.status === '2'));
        console.log("11");
      }
    });

    this.bannerImagesSubscription = this.bannerService.getBanners().subscribe((imagens) => {
      this.imagens = imagens;
    });

    this.fotosProdutosSubscription = this.categoriasService.getFotosProdutos().subscribe(async (fotosProdutosAPI) => {
      this.fotosProdutos = fotosProdutosAPI;

      this.tipo1Fotos = [];

      this.fotosProdutos.forEach((foto) => {
        if (foto.prodFotoTp === '1') {
          this.tipo1Fotos.push(foto);
        }
      });
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

  getImagensProduto(produto: Produtos): any[] {
    const idProduto = produto.prodId;
    return this.tipo1Fotos.filter((foto) => foto.prodId === idProduto);
  }

  getImagemURL(imagem: any): string {
    const url = this.urlGlobal.url;
    const endpoint = 'fotos/';
    return `${url}${endpoint}${imagem.imgfomulacao}`;
  }

  getImagemBanner(imagem: any): string {
    const url = this.urlGlobal.url;
    const endpoint = 'fotos/';
    return `${url}${endpoint}${imagem.nomefoto}`;
  }

}
