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
      descricaoFormaPagamento: 'TESTE 1',
    },
    {
      tipoPagamento: 'Cartão de crédito',
      descricaoFormaPagamento: 'TESTE 2',
    },
    {
      tipoPagamento: 'Boleto Bancário',
      descricaoFormaPagamento: 'TESTE 3',
    },
    {
      tipoPagamento: 'PagSeguro',
      descricaoFormaPagamento: 'TESTE 4',
    },
    {
      tipoPagamento: 'PayPal',
      descricaoFormaPagamento: 'TESTE 5',
    },
    {
      tipoPagamento: 'Mercado Pago',
      descricaoFormaPagamento: 'TESTE 6',
    },
  ]

  constructor() { }

  getFormaPagamento(): Observable<FormaPagamento[]> {
    return of (this.formaPagamento);
  }
}
