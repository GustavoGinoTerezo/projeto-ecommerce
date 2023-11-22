import { Component } from '@angular/core';
import { ServiceAPIPicPayService } from 'src/app/services/servicesAPI/serviceAPI-PicPay/service-api-pic-pay.service';

@Component({
  selector: 'app-conclusao-de-compra',
  templateUrl: './conclusao-de-compra.component.html',
  styleUrls: ['./conclusao-de-compra.component.css']
})
export class ConclusaoDeCompraComponent {

  constructor(private picPayService: ServiceAPIPicPayService) {}

  ngOnInit() {

    const paymentData = {
      referenceId: '102039',
      callbackUrl: 'http://localhost/mockVtexPostCallback/?httpStatus=200',
      expiresAt: '2020-12-12T15:53:00+05:00',
      returnUrl: 'http://www.picpay.com/#transacaoConcluida',
      value: 10,
      additionalInfo: [null],
      buyer: {
        firstName: 'João',
        lastName: 'dos Testes',
        document: '010.091.001-91'
      }
    };

    // Fazendo a chamada para o serviço PicPay
    this.picPayService.requisicaoPagamentoPicPay(paymentData)
      .subscribe(
        (response) => {

          console.log(response);
        },
        (error) => {

          console.error(error);
        }
      );
  }

}
