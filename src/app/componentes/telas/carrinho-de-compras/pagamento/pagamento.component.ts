import { FormaPagamento, FormaPagamentoService } from './../../../../services/serviceFormaPagamento/forma-pagamento.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
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

    const formaPagamentoAtiva = sessionStorage.getItem('p');
    const numeroFormaPagamentoAtiva = formaPagamentoAtiva ? parseInt(formaPagamentoAtiva, 10) : -1;
    this.toggleFormaPagamentoAtiva(numeroFormaPagamentoAtiva);

    // Depois de ativar a forma de pagamento, encontre a forma de pagamento correspondente pelo ID
    const formaPagamentoSelecionada = this.formaPagamento.find((pagamento) => pagamento.idPagamento === numeroFormaPagamentoAtiva);

    // Defina a forma de pagamento selecionada para ativar o radiobutton correspondente
    this.formaPagamentoSelecionada = formaPagamentoSelecionada;



  }

  // Inside your component class
  toggleFormaPagamentoAtiva(index: number): void {
    this.formaPagamentoAtiva.fill(false);
    this.formaPagamentoAtiva[index] = true;
  }

  navigateConfirmacao(){
    const formaPagamento = this.formaPagamentoSelecionada.idPagamento
    sessionStorage.setItem('p', formaPagamento)
    this.router.navigate(['/confirmacao']);
  }

  navigateCarrinho(){
    sessionStorage.removeItem('p');
    this.router.navigate(['/carrinho-de-compra']);
  }

}
