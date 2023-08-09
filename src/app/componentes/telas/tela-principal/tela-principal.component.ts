import { ServiceProdutosService } from 'src/app/services/serviceProdutos/service-produtos.service';
import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Anuncios, ServiceAnunciosService } from 'src/app/services/serviceAnuncios/service-anuncios.service';
import { Banner, ServiceBannerService } from 'src/app/services/serviceBanner/service-banner.service';
import { Categorias, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';
import { Produtos } from 'src/app/services/serviceProdutos/service-produtos.service';

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  styleUrls: ['./tela-principal.component.css']
})
export class TelaPrincipalComponent {


  produtosDestaque: Produtos[] = [];
  items: MenuItem[];
  images: Banner[] = [];
  categorias: Categorias[] = [];
  anunciosMaiores: Anuncios[] = [];
  anunciosMenores: Anuncios[] = [];
  responsiveOptions: any[] = [
    {
    breakpoint: '1199px',
    numVisible: 1,
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
  responsiveOptionsGaleria: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];

  constructor(
    private messageService: MessageService,
    private serviceProdutosDestaque: ServiceProdutosService,
    private bannerService: ServiceBannerService,
    private categoriasService: ServiceCategoriasService,
    private anuncioService: ServiceAnunciosService,
  ){

    this.items = [];
  }

  ngOnInit(){

    this.anuncioService.getAnunciosMaiores().subscribe(
      (anunciosMaiores) => {
        this.anunciosMaiores = anunciosMaiores;
    });

    this.anuncioService.getAnunciosMenores().subscribe(
      (anunciosMenores) => {
        this.anunciosMenores = anunciosMenores;
    });


    this.categoriasService.getCategorias().subscribe(
      (categorias) => {
        this.categorias = categorias;
    });

    this.bannerService.getImages().subscribe((images) => {
      this.images = images;
    });

    this.serviceProdutosDestaque.getProdutosDestaque().subscribe(
      (categorias: Produtos[]) => {
        this.produtosDestaque = categorias;
        // Ordenar o array de usuários com base no status (do menor para o maior)
      },
      (error: any) => {
        console.log('Erro ao obter os dados dos usuários:', error);
      }
    );

  }


}
