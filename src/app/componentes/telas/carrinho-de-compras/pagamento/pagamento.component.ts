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
    const secretKeyPagamento = 'formaPagamento'; // Use a mesma chave usada para criptografar

    if (formaPagamentoAtiva) {
      // Descriptografe o valor da forma de pagamento
      const decryptedFormaPagamento = AES.decrypt(formaPagamentoAtiva, secretKeyPagamento);

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
    const secretKeyPagamento = 'formaPagamento';

    // Criptografe o valor da forma de pagamento
    const encryptedFormaPagamento = AES.encrypt(formaPagamento.toString(), secretKeyPagamento).toString();

    // Armazene o valor criptografado no sessionStorage
    sessionStorage.setItem('p', encryptedFormaPagamento);

    this.router.navigate(['/confirmacao']);
  }

  navigateCarrinho(){
    sessionStorage.removeItem('p');
    this.router.navigate(['/carrinho-de-compra']);
  }

}
