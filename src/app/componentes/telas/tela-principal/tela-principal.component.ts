import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Anuncios, ServiceAnunciosService } from 'src/app/services/serviceAnuncios/service-anuncios.service';
import { Banner, ServiceBannerService } from 'src/app/services/serviceBanner/service-banner.service';
import { Categorias, ServiceCategoriasService, Produtos } from 'src/app/services/serviceCategorias/service-categorias.service';
import { Router } from '@angular/router';

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

    this.categoriasService.getCategorias().subscribe(
      (categorias) => {
        this.categorias = categorias;
    });

    //PRODUTOS EM DESTAQUE
    this.serviceProdutosDestaque.getProdutosDestaque().subscribe(
      (produtosDestaque: Produtos[]) => {
        this.produtosDestaque = produtosDestaque;
      },
    );

    //PRODUTOS MAIS VENDIDOS
    this.serviceProdutosDestaque.getProdutosMaisVendidos().subscribe(
      (produtosMaisVendidos: Produtos[]) => {
        this.produtosMaisVendidos = produtosMaisVendidos;
      },
    );

    //PRODUTOS EM PROMOCAO
    this.serviceProdutosDestaque.getProdutosEmPromocao().subscribe(
      (produtosEmPromocao: Produtos[]) => {
        this.produtosEmPromocao = produtosEmPromocao;
      },
    );
  }

  navigateProduto(produto: Produtos) {
    const nomeFormatado = produto.nome?.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/detalhe-produto', nomeFormatado]);
  }

  navigateCategoria(categoria: Categorias) {
    const nomeFormatado = categoria.nome?.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/categoria', nomeFormatado]);
  }
}
