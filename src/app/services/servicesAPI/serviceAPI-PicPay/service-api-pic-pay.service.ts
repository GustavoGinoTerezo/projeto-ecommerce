import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceAPIPicPayService {

  private picpayToken: string = '76f43389-429e-40de-8964-cf154f4e3024';
  private apiUrl: string = 'https://appws.picpay.com/ecommerce/public/payments';

  constructor(private http: HttpClient) {}

  requisicaoPagamentoPicPay(paymentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'x-picpay-token': '76f43389-429e-40de-8964-cf154f4e3024',
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, paymentData, { headers });
  }
}
