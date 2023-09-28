import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Anuncios, ServiceAnunciosService } from 'src/app/services/serviceAnuncios/service-anuncios.service';
import { Banner, ServiceBannerService } from 'src/app/services/serviceBanner/service-banner.service';
import { Categorias, ServiceCategoriasService, Produtos } from 'src/app/services/serviceCategorias/service-categorias.service';
import { Router } from '@angular/router';
import { ServiceCarrinhoDeComprasService } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { switchMap } from 'rxjs';
import { AES } from 'crypto-ts';
import * as CryptoJS from 'crypto-js';

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
          console.log("4")
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

    }, 2500);

  }

  getProdutos() {
    // Aqui você pode chamar os métodos que fazem as chamadas HTTP após a conclusão dos métodos no serviço.
    this.categoriasService.getProdutosDestaque().subscribe((produtosDestaqueAPI) => {
      this.produtosDestaque = produtosDestaqueAPI;
      console.log("8")
    });

    this.categoriasService.getProdutosMaisVendidos().subscribe((produtosMaisVendidosAPI) => {
      this.produtosMaisVendidos = produtosMaisVendidosAPI;
      console.log("9")
    });

    this.categoriasService.getProdutosEmPromocao().subscribe((produtosEmPromocaoAPI) => {
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
          // Em caso de erro na análise JSON, inicialize o carrinho como um array vazio
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
      this.showProdutoAdicionadoAoCarrinho();
    }
  }

  showProdutoAdicionadoAoCarrinho() {
    this.messageService.add({
      severity: 'success',
      icon: 'pi pi-shopping-cart',
      detail: 'Produto adicionado ao carrinho!' });
  }
}
