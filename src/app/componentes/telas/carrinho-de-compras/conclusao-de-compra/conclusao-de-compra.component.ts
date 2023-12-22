import { Component } from '@angular/core';
import { ServiceAPIPicPayService } from 'src/app/services/servicesAPI/serviceAPI-PicPay/service-api-pic-pay.service';

@Component({
  selector: 'app-conclusao-de-compra',
  templateUrl: './conclusao-de-compra.component.html',
  styleUrls: ['./conclusao-de-compra.component.css']
})
export class ConclusaoDeCompraComponent {

  // Variáveis

  qrCode: any;

  // ==================================================
  
  constructor(private picPayService: ServiceAPIPicPayService) {}

  ngOnInit() {
    

  }

  

  pagBank(){
    
  }
  

  teste(){
    console.log("Pagamento aprovado")
  }

 
}
