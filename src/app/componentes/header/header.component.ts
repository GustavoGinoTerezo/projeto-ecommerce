import { MegaMenuItem, MenuItem } from 'primeng/api';
import { Categorias, ServiceCategoriasService } from './../../services/serviceCategorias/service-categorias.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

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

  ngOnInit(){

    // Aguarde um curto período de tempo antes de acessar as categorias
    // ou utilize observables para lidar com a conclusão da chamada da API
    setTimeout(() => {
      this.categoriasService.getCategorias().subscribe(
        (categoriasAPI) => {
          this.categorias = categoriasAPI;
        }
      );

      this.menuItems = this.categorias.map((categoria: Categorias) => ({
        label: categoria.nome,
        command: () => this.navigateCategoria(categoria),
      }));
    }, 2000); // Aguarda 1 segundo (ajuste conforme necessário)


  }

  navigateCategoria(categoria: Categorias) {
    const nomeFormatado = categoria.nome?.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/categoria', nomeFormatado]);
  }

}
