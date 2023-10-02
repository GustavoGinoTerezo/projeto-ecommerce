import { FormaPagamento, FormaPagamentoService } from './../../../../services/serviceFormaPagamento/forma-pagamento.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AES } from 'crypto-ts';
import * as CryptoJS from 'crypto-js';

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
    const d75bebc1471a279ab08da91a018b44d77bc0db35e56d700a3ffc7a47f455af0b = '8bdc349582ed93b3bab86341c35b5a1c7187b7b9219d6a2c2808cbb9823a3c82'; // Use a mesma chave usada para criptografar

    if (formaPagamentoAtiva) {
      // Descriptografe o valor da forma de pagamento
      const bd534ef1857d551a2450df6490121d3a4498e21dffd23873e593a9d40a4b161f = AES.decrypt(formaPagamentoAtiva, d75bebc1471a279ab08da91a018b44d77bc0db35e56d700a3ffc7a47f455af0b);

      // Verifique se a descriptografia foi bem-sucedida
      if (bd534ef1857d551a2450df6490121d3a4498e21dffd23873e593a9d40a4b161f.sigBytes > 0) {
        // Converta o resultado descriptografado de volta em um número
        const numeroFormaPagamentoAtiva = parseInt(bd534ef1857d551a2450df6490121d3a4498e21dffd23873e593a9d40a4b161f.toString(CryptoJS.enc.Utf8), 10);

        // Ative a forma de pagamento correspondente pelo ID
        this.toggleFormaPagamentoAtiva(numeroFormaPagamentoAtiva);

        // Encontre a forma de pagamento selecionada pelo ID
        const formaPagamentoSelecionada = this.formaPagamento.find((pagamento) => pagamento.idPagamento === numeroFormaPagamentoAtiva);

        // Defina a forma de pagamento selecionada para ativar o radiobutton correspondente
        this.formaPagamentoSelecionada = formaPagamentoSelecionada;
      }
    }
  }

  // Inside your component class
  toggleFormaPagamentoAtiva(index: number): void {
    this.formaPagamentoAtiva.fill(false);
    this.formaPagamentoAtiva[index] = true;
  }

  navigateConfirmacao() {
    const a7ccc9f43fc28a6ce00af20b9ca3e8985739eed74c57b4e4e7a88cd4d3682a5e = this.formaPagamentoSelecionada.idPagamento;
    const d75bebc1471a279ab08da91a018b44d77bc0db35e56d700a3ffc7a47f455af0b = '8bdc349582ed93b3bab86341c35b5a1c7187b7b9219d6a2c2808cbb9823a3c82';

    // Criptografe o valor da forma de pagamento
    const bd58f3bf237bf24fdc98434e8f8c354ec37336d507fed4e3272c8a38da4818e9 = AES.encrypt(a7ccc9f43fc28a6ce00af20b9ca3e8985739eed74c57b4e4e7a88cd4d3682a5e.toString(), d75bebc1471a279ab08da91a018b44d77bc0db35e56d700a3ffc7a47f455af0b).toString();

    // Armazene o valor criptografado no sessionStorage
    sessionStorage.setItem('p', bd58f3bf237bf24fdc98434e8f8c354ec37336d507fed4e3272c8a38da4818e9);

    this.router.navigate(['/confirmacao']);
  }

  navigateCarrinho(){
    sessionStorage.removeItem('p');
    this.router.navigate(['/carrinho-de-compra']);
  }

}
