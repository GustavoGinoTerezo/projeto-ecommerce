import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Anuncios, ServiceAnunciosService } from 'src/app/services/serviceAnuncios/service-anuncios.service';
import { Banner, ServiceBannerService } from 'src/app/services/serviceBanner/service-banner.service';
import { Categorias, ServiceCategoriasService, Produtos } from 'src/app/services/serviceCategorias/service-categorias.service';
import { Router } from '@angular/router';
import { ServiceCarrinhoDeComprasService } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  styleUrls: ['./tela-principal.component.css']
})
export class TelaPrincipalComponent {

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
      breakpoint: '1199px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
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
      breakpoint: '4000px',
      numVisible: 6,
      numScroll: 1
    },
    {
      breakpoint: '3500px',
      numVisible: 5,
      numScroll: 1
    },
    {
      breakpoint: '3100px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '2300px',
      numVisible: 3,
      numScroll: 1
    },
    {
        breakpoint: '1800px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1230px',
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
    private messageService: MessageService,
    private serviceProdutosDestaque: ServiceCategoriasService,
    private bannerService: ServiceBannerService,
    private categoriasService: ServiceCategoriasService,
    private anuncioService: ServiceAnunciosService,
    private carrinhoService: ServiceCarrinhoDeComprasService,
    private router: Router
  ){
  }

  ngOnInit(){
    //================================================================================================================================//
    //RELACIONADO COM AS IMAGENS
    this.anuncioService.getAnunciosMaiores().subscribe(
      (anunciosMaiores) => {
        this.anunciosMaiores = anunciosMaiores;
    });

    this.anuncioService.getAnunciosMenores().subscribe(
      (anunciosMenores) => {
        this.anunciosMenores = anunciosMenores;
    });

    this.bannerService.getImages().subscribe((images) => {
      this.images = images;
    });


    //================================================================================================================================//
    //RELACIONADO COM OS PRODUTOS

    setTimeout(() => {
      this.categoriasService.getCategorias().subscribe(
        (categoriasAPI) => {
          this.categorias = categoriasAPI;
        }
      );

      this.categoriasService.atualizarProdutosDestaque()
      .pipe(
        switchMap(() => this.categoriasService.atualizarProdutosMaisVendidos()),
        switchMap(() => this.categoriasService.atualizarProdutosEmPromocao())
      )
      .subscribe(() => {
        // Agora, os métodos em seu serviço foram concluídos e você pode chamar
        // os métodos que fazem as chamadas HTTP para obter os dados desejados.
        this.getProdutos();
      });

    }, 1500);

  }

  getProdutos() {
    // Aqui você pode chamar os métodos que fazem as chamadas HTTP após a conclusão dos métodos no serviço.
    this.categoriasService.getProdutosDestaque().subscribe((produtosDestaqueAPI) => {
      this.produtosDestaque = produtosDestaqueAPI;
    });

    this.categoriasService.getProdutosMaisVendidos().subscribe((produtosMaisVendidosAPI) => {
      this.produtosMaisVendidos = produtosMaisVendidosAPI;
    });

    this.categoriasService.getProdutosEmPromocao().subscribe((produtosEmPromocaoAPI) => {
      this.produtosEmPromocao = produtosEmPromocaoAPI;
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

    // this.carrinhoService.adicionarAoCarrinho(produto);

    // Recupere a lista de IDs do carrinho do sessionStorage ou crie uma lista vazia se ainda não existir
    const carrinho = JSON.parse(sessionStorage.getItem('c') || '[]');
    // Adicione o ID do produto ao carrinho
    carrinho.push(produto.prodId);
    // Salve a lista atualizada de IDs de carrinho de volta no sessionStorage
    sessionStorage.setItem('c', JSON.stringify(carrinho));
    // Exiba uma mensagem ou realize outras ações necessárias
    this.showProdutoAdicionadoAoCarrinho();
  }

  showProdutoAdicionadoAoCarrinho() {
    this.messageService.add({
      severity: 'success',
      icon: 'pi pi-shopping-cart',
      detail: 'Produto adicionado ao carrinho!' });
  }
}
