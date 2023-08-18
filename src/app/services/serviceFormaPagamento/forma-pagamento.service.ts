import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface FormaPagamento{
  tipoPagamento: string;
  descricaoFormaPagamento: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {

  formaPagamento: FormaPagamento[] = [
    {
      tipoPagamento: 'PIX',
      descricaoFormaPagamento: 'Descrição breve da forma de pagamento',
    },
    {
      tipoPagamento: 'Cartão de crédito',
      descricaoFormaPagamento: 'Descrição breve da forma de pagamento',
    },
    {
      tipoPagamento: 'Boleto Bancário',
      descricaoFormaPagamento: 'Descrição breve da forma de pagamento',
    },
    {
      tipoPagamento: 'PagSeguro',
      descricaoFormaPagamento: 'Descrição breve da forma de pagamento',
    },
    {
      tipoPagamento: 'PayPal',
      descricaoFormaPagamento: 'Descrição breve da forma de pagamento',
    },
    {
      tipoPagamento: 'Mercado Pago',
      descricaoFormaPagamento: 'Descrição breve da forma de pagamento',
    },
  ]

  constructor() { }

  getFormaPagamento(): Observable<FormaPagamento[]> {
    return of (this.formaPagamento);
  }
}
