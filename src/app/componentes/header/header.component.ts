import { MenuItem } from 'primeng/api';
import { Categorias, Produtos, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  private inicializacaoConcluidaSubscription!: Subscription;
  private categoriasSubscription!: Subscription;
  private produtosSubscription!: Subscription;

  search!: string;
  categorias: Categorias[] = []
  produtos:  Produtos[] = [];
  menuItems: MenuItem[] = [];
  responsiveOptions: any[] = [
    {
      breakpoint: '1199px',
      numVisible: 4,
      numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
  ]
  produtosFiltrados: any[] = [];
  mostrarLista = false;

  constructor(
    private categoriasService: ServiceCategoriasService,
    private router: Router
  ){}

  async ngOnInit(){

    const start = sessionStorage.getItem('start')

    if(start){
      this.carregarCategorias();
      this.carregarProdutos();
    } else {
      const inicializacaoConcluidaObservable = this.categoriasService.getInicializacaoConcluida();

      if (inicializacaoConcluidaObservable) {
        this.inicializacaoConcluidaSubscription = inicializacaoConcluidaObservable.subscribe(() => {
          this.carregarCategorias();
          this.carregarProdutos();
        });
      }
    }

    window.addEventListener('beforeunload', () => {
      sessionStorage.removeItem('start');
    });


  }

  ngOnDestroy() {
    if (this.inicializacaoConcluidaSubscription) {
      this.inicializacaoConcluidaSubscription.unsubscribe();
    }

    if (this.categoriasSubscription) {
      this.categoriasSubscription.unsubscribe();
    }

    if (this.produtosSubscription) {
      this.produtosSubscription.unsubscribe();
    }
  }

  async carregarCategorias() {
    this.categoriasSubscription = this.categoriasService.getCategorias().subscribe(async (categoriasAPI) => {
      this.categorias = categoriasAPI;

      await this.categoriasMap();
    });
  }

  async carregarProdutos() {

    this.produtosSubscription = this.categoriasService.getProdutos().subscribe(async (produtosAPI) => {
      this.produtos = produtosAPI;
    });

    console.log(this.produtos)
  }

  async categoriasMap() {
    this.menuItems = this.categorias.map((categoria: Categorias) => ({
      label: categoria.nome,
      command: () => this.navigateCategoria(categoria),
    }));
  }

  navigateCategoria(categoria: Categorias) {
    const nomeFormatado = categoria.nome?.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/categoria', nomeFormatado]);
  }

  navigateProduto(produto: Produtos) {
    const nomeFormatado = produto.nome?.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/detalhe-produto', nomeFormatado]);
    this.mostrarLista = false
    this.search = ''
  }

  pesquisar() {
    if (this.search) {
      this.produtosFiltrados = this.produtos.filter(produto =>
        produto.nome!.toLowerCase().includes(this.search.toLowerCase())
      );
      this.mostrarLista = true;
    } else {
      this.produtosFiltrados = [];
      this.mostrarLista = false;
    }
  }



}
