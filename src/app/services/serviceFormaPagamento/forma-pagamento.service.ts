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
      tipoPagamento: 'PicPay',
      descricaoFormaPagamento: 'Descrição breve da forma de pagamento',
    },
    {
      idPagamento: 1,
      tipoPagamento: 'MercadoPago',
      descricaoFormaPagamento: 'Descrição breve da forma de pagamento',
    },
    {
      idPagamento: 2,
      tipoPagamento: 'PagBank',
      descricaoFormaPagamento: 'Descrição breve da forma de pagamento',
    },
  ]

  constructor() { }

  getFormaPagamento(): Observable<FormaPagamento[]> {
    return of (this.formaPagamento);
  }
}
