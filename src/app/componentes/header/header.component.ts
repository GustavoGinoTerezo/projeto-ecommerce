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
  responsiveOptions!: any[];

  constructor(
    private categoriasService: ServiceCategoriasService,
  ){

  }

  ngOnInit(){

    this.responsiveOptions = [
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

    this.categoriasService.getCategorias().subscribe(
      (categorias: Categorias[]) => {
        this.categorias = categorias;
        // Ordenar o array de usuários com base no status (do menor para o maior)
      },
      (error: any) => {
        console.log('Erro ao obter os dados dos usuários:', error);
      }
    );
  }
}
