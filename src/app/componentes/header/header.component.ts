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
    this.categoriasService.getCategorias().subscribe(
      (categorias: Categorias[]) => {
        this.categorias = categorias;
      }
    );

    this.menuItems = this.categorias.map((categoria: Categorias) => ({
      label: categoria.nome,
      icon: categoria.icon
    }));
  }

  navigateCategoria(categoria: Categorias) {
    const nomeFormatado = categoria.nome?.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/categoria', nomeFormatado]);
  }

}
