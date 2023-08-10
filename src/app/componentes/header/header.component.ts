import { MegaMenuItem } from 'primeng/api';
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
  showCategoria: boolean = true;

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
  }

  navigateCategoria(categoria: Categorias) {
    const nomeFormatado = categoria.nome?.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/categoria', nomeFormatado]);
    this.showCategoria = false; //controlando a div da categoria por enquanto
  }

  showCategorias(){
    this.showCategoria = true; //controlando a div da categoria por enquanto
  }
}
