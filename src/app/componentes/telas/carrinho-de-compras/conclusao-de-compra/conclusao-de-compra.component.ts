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
  responses: any[] = [];

  // ====================================================================================================
  
  constructor(private picPayService: ServiceAPIPicPayService) {}

  ngOnInit(): void {
    // Assina o observable referenceId$ para obter atualizações
    this.picPayService.referenceId$.subscribe((referenceId: string) => {
      // Faça o que precisar com o referenceId na outra tela
      console.log('Reference ID atualizado na outra tela:', referenceId);
      
      this.picPayService.checarStatusPagamento(referenceId).subscribe((response)=> {

        this.responses.push(response); // Armazena a resposta no array

        if(this.responses[0].status === 'paid'){
          console.log("Pagamento realizado com sucesso.")


        } else {
          console.log("Pagamento ainda não realizado.")
        }

      }, (error) => {
        console.log(error);
      });
    });
  }

 
}
