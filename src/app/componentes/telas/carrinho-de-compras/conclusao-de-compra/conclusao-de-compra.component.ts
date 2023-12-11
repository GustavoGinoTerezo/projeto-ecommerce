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

    
  }

  picPay(){
  
    const paymentData = {
      referenceId: "6316369864",
      callbackUrl: "https://standclass.com.br/meus-pedidos/callback",
      returnUrl: "https://standclass.com.br/meus-pedidos",
      value: 0.01,
      expiresAt: "2024-05-01T16:00:00-03:00",
      buyer: {
          firstName: "João",
          lastName: "Da Silva",
          document: "0",
          email: "teste@picpay.com",
          phone: "+55 27 12345-6789"
      }
    };

    // Fazendo a chamada para o serviço PicPay
    this.picPayService.requisicaoPagamentoPicPay(paymentData)
      .subscribe(
        (response) => {

          console.log(response.returnUrl);
        },
        (error) => {

          console.error(error);
        }
      );

  }

  teste(){
    console.log("Pagamento aprovado")
  }

  pagBank(){
    
  }

}
