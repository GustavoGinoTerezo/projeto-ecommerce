import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceAPIPicPayService {

  private picpayToken: string = 'sua_chave_de_integracao';
  private apiUrl: string = 'https://appws.picpay.com/ecommerce/public/payments';

  constructor(private http: HttpClient) {}

  requisicaoPagamentoPicPay(paymentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'x-picpay-token': this.picpayToken,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, paymentData, { headers });
  }
}
