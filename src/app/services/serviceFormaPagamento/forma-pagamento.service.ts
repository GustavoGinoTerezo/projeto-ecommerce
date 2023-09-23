import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface FormaPagamento{
  idPagamento?: number;
  tipoPagamento: string;
  descricaoFormaPagamento?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {

  formaPagamento: FormaPagamento[] = [
    {
      idPagamento: 0,
      tipoPagamento: 'PIX',
      descricaoFormaPagamento: 'Descrição breve da forma de pagamento',
    },
    {
      idPagamento: 1,
      tipoPagamento: 'Cartão de crédito',
      descricaoFormaPagamento: 'Descrição breve da forma de pagamento',
    },
    {
      idPagamento: 2,
      tipoPagamento: 'Boleto Bancário',
      descricaoFormaPagamento: 'Descrição breve da forma de pagamento',
    },
    {
      idPagamento: 3,
      tipoPagamento: 'PagSeguro',
      descricaoFormaPagamento: 'Descrição breve da forma de pagamento',
    },
    {
      idPagamento: 4,
      tipoPagamento: 'PayPal',
      descricaoFormaPagamento: 'Descrição breve da forma de pagamento',
    },
    {
      idPagamento: 5,
      tipoPagamento: 'Mercado Pago',
      descricaoFormaPagamento: 'Descrição breve da forma de pagamento',
    },
  ]

  constructor() { }

  getFormaPagamento(): Observable<FormaPagamento[]> {
    return of (this.formaPagamento);
  }
}
