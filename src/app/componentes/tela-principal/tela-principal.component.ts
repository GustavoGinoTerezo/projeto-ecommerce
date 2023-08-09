import { ServiceProdutosService } from './../../services/serviceProdutos/service-produtos.service';
import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Produtos } from 'src/app/services/serviceProdutos/service-produtos.service';

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  styleUrls: ['./tela-principal.component.css']
})
export class TelaPrincipalComponent {

  responsiveOptions!: any[];
  produtosDestaque: Produtos[] = []
  items: MenuItem[];

  constructor(
    private messageService: MessageService,
    private serviceProdutosDestaque: ServiceProdutosService,
  ){

    this.items = [];
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

  save(severity: string) {
    this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
  }


}
