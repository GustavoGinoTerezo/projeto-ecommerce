import { MenuItem } from 'primeng/api';
import { Categorias, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';
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

  search!: string;
  categorias: Categorias[] = []
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

  constructor(
    private categoriasService: ServiceCategoriasService,
    private router: Router
  ){

  }

  async ngOnInit(){

    const inicializacaoConcluidaObservable = this.categoriasService.getInicializacaoConcluida();

    if (inicializacaoConcluidaObservable) {
      this.inicializacaoConcluidaSubscription = inicializacaoConcluidaObservable.subscribe(() => {
        this.carregarCategorias();
      });
    }

    const start = sessionStorage.getItem('start')

    if(start){
      this.carregarCategorias();
    }

    window.addEventListener('beforeunload', () => {
      sessionStorage.removeItem('start');
    });

  }

  ngOnDestroy() {
    // Certifique-se de cancelar as subscrições no ngOnDestroy
    if (this.inicializacaoConcluidaSubscription) {
      this.inicializacaoConcluidaSubscription.unsubscribe();
    }

    if (this.categoriasSubscription) {
      this.categoriasSubscription.unsubscribe();
    }
  }

  async carregarCategorias() {
    this.categoriasSubscription = this.categoriasService.getCategorias().subscribe(async (categoriasAPI) => {
      this.categorias = categoriasAPI;

      await this.categoriasMap();
    });
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


}
