import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceAPIPicPayService {

  private picpayToken: string = '76f43389-429e-40de-8964-cf154f4e3024';
  private apiUrl: string = 'https://appws.picpay.com/ecommerce/public/payments';

  // BehaviorSubject para armazenar o referenceId
  private referenceIdSubject: BehaviorSubject<string> = new BehaviorSubject<any>(null);
  private qrCodeSubject = new BehaviorSubject<any>(null);

  // Observable para ser consumido por outras partes do aplicativo
  referenceId$: Observable<string> = this.referenceIdSubject.asObservable();
  
  constructor(private http: HttpClient) {}

  // Método para atualizar o BehaviorSubject com o novo referenceId
  private updateReferenceId(referenceId: string): void {
    this.referenceIdSubject.next(referenceId);
  }

  requisicaoPagamentoPicPay(paymentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'x-picpay-token': '76f43389-429e-40de-8964-cf154f4e3024',
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, paymentData, { headers }).pipe(
      // Utilize o operador tap para atualizar o BehaviorSubject com o novo referenceId
      tap((response: any) => {
        if (response && response.referenceId) {
          this.updateReferenceId(response.referenceId);
        }
      })
    );
  }
  
  checarStatusPagamento(referenceId: any){

    const headers = new HttpHeaders({
      'x-picpay-token': '76f43389-429e-40de-8964-cf154f4e3024',
      'Content-Type': 'application/json'
    });

    const urlStatus = `https://appws.picpay.com/ecommerce/public/payments/${referenceId}/status`;

    return this.http.get(urlStatus, { headers })
  }

  setQrCode(qrCode: string): void {
    this.qrCodeSubject.next(qrCode);
  }

  getQrCode(): Observable<string> {
    return this.qrCodeSubject.asObservable();
  }
}
