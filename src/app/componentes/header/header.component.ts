import { MegaMenuItem } from 'primeng/api';
import { Categorias, ServiceCategoriasService } from './../../services/serviceCategorias/service-categorias.service';
import { Component } from '@angular/core';

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

  constructor(
    private categoriasService: ServiceCategoriasService,
  ){

  }

  ngOnInit(){

    this.categoriasService.getCategorias().subscribe(
      (categorias: Categorias[]) => {
        this.categorias = categorias;
      }
    );
  }
}
