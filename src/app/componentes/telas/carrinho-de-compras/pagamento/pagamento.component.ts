import { FormaPagamento, FormaPagamentoService } from './../../../../services/serviceFormaPagamento/forma-pagamento.service';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent {

  items: MenuItem[] = [];
  formaPagamento: FormaPagamento[] = []
  formaPagamentoSelecionada: any = null;
  formaPagamentoAtiva: boolean[] = new Array(this.formaPagamento.length).fill(false);

  constructor(
    private formaPagamentoService: FormaPagamentoService,
  ){}

  ngOnInit() {

    this.items = [
        {
            label: 'Carrinho',
            routerLink: '/carrinho-de-compra'
        },
        {
            label: 'Pagamento',
            routerLink: '/pagamento'
        },
        {
            label: 'Confirmação',
            routerLink: '/confimacao'
        },
        {
            label: 'Conclusão',
            routerLink: '/conclusao'
        }
    ];

    this.formaPagamentoService.getFormaPagamento().subscribe(
      (formaPagamento) => {
        this.formaPagamento = formaPagamento;
    });
  }

  // Inside your component class
  toggleFormaPagamentoAtiva(index: number): void {
    this.formaPagamentoAtiva.fill(false); // Close all other descriptions
    this.formaPagamentoAtiva[index] = true; // Open the clicked description
  }


}
