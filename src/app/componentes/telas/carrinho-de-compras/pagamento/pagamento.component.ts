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
      const decryptedFormaPagamento = AES.decrypt(formaPagamentoAtiva, d75bebc1471a279ab08da91a018b44d77bc0db35e56d700a3ffc7a47f455af0b);

      // Verifique se a descriptografia foi bem-sucedida
      if (decryptedFormaPagamento.sigBytes > 0) {
        // Converta o resultado descriptografado de volta em um número
        const numeroFormaPagamentoAtiva = parseInt(decryptedFormaPagamento.toString(CryptoJS.enc.Utf8), 10);

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
    const formaPagamento = this.formaPagamentoSelecionada.idPagamento;
    const d75bebc1471a279ab08da91a018b44d77bc0db35e56d700a3ffc7a47f455af0b = 'formaPagamento';

    // Criptografe o valor da forma de pagamento
    const encryptedFormaPagamento = AES.encrypt(formaPagamento.toString(), d75bebc1471a279ab08da91a018b44d77bc0db35e56d700a3ffc7a47f455af0b).toString();

    // Armazene o valor criptografado no sessionStorage
    sessionStorage.setItem('p', encryptedFormaPagamento);

    this.router.navigate(['/confirmacao']);
  }

  navigateCarrinho(){
    sessionStorage.removeItem('p');
    this.router.navigate(['/carrinho-de-compra']);
  }

}
