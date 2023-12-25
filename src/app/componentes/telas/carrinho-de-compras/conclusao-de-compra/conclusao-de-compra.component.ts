import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormaPagamento, FormaPagamentoService } from 'src/app/services/serviceFormaPagamento/forma-pagamento.service';
import { ServiceAPIPicPayService } from 'src/app/services/servicesAPI/serviceAPI-PicPay/service-api-pic-pay.service';
import { AES } from 'crypto-ts';
import * as CryptoJS from 'crypto-js';
import { ServiceApiCarrinhoService } from 'src/app/services/servicesAPI/serviceAPI-Carrinho/service-api-carrinho.service';
import { EnderecoEntrega, ServiceUsuarioLogadoService } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';

@Component({
  selector: 'app-conclusao-de-compra',
  templateUrl: './conclusao-de-compra.component.html',
  styleUrls: ['./conclusao-de-compra.component.css']
})
export class ConclusaoDeCompraComponent {

  // ====================================================================================================
  // Subscriptions
  private formaPagamentoSubscription!: Subscription;
  private usuarioSubscription!: Subscription;
  private inicializacaoUserConcluidaSubject!: Subscription;
  private enderecoCarregadoSubscription!: Subscription;
  private enderecosEntregaSubscription!: Subscription;
  private enderecosCobrancaSubscription!: Subscription;

  // ====================================================================================================
  // Variáveis

  qrCode: any;
  responses: any[] = [];
  formaPagamentoId!: number;
  formaPagamento: FormaPagamento[] = [];
  formaPagamentoSelecionada: FormaPagamento[] = [];
  usuario: any[] = [];
  LoginId!: number;
  enderecosEntrega: EnderecoEntrega[] = [];
  enderecoEntregaSelecionado: any[] = [];
  enderecoCobranca: any[] = [];
  enderecoEntregaSelecionadoId!: number;

  // ====================================================================================================
  
  constructor(
    private picPayService: ServiceAPIPicPayService,
    private formaPagamentoService: FormaPagamentoService,
    private carrinhoAPIService: ServiceApiCarrinhoService,
    private usuarioService: ServiceUsuarioLogadoService,
    ) {}

  ngOnInit(): void {
    
    const startUser = sessionStorage.getItem('startUser')
    const startEnderecos = sessionStorage.getItem('startEnderecos')

    if(startUser){
      this.carregarUsuario();
    } else {
      const inicializacaoConcluidaObservable = this.usuarioService.getInicializacaoConcluida();

      if (inicializacaoConcluidaObservable) {
        this.inicializacaoUserConcluidaSubject = inicializacaoConcluidaObservable.subscribe(() => {
          this.carregarUsuario();
        });
      }
    }

    if(startEnderecos){
      this.carregarEnderecos();
    } else {
      const enderecoCarregadoObservable = this.usuarioService.getEnderecosCarregadosObservable();

      if (enderecoCarregadoObservable) {
        this.enderecoCarregadoSubscription = enderecoCarregadoObservable.subscribe(() => {
          this.carregarEnderecos();
        });
      }
    }

    window.addEventListener('beforeunload', () => {
      sessionStorage.removeItem('startUser');
      sessionStorage.removeItem('startEnderecos');
    });

    this.carregarFormaPagamento();
    
  }

  ngOnDestroy() {

    if (this.formaPagamentoSubscription) {
      this.formaPagamentoSubscription.unsubscribe();
    }

    if (this.inicializacaoUserConcluidaSubject) {
      this.inicializacaoUserConcluidaSubject.unsubscribe();
    }

    if (this.usuarioSubscription) {
      this.usuarioSubscription.unsubscribe();
    }

    if (this.enderecoCarregadoSubscription) {
      this.enderecoCarregadoSubscription.unsubscribe();
    }

    if (this.enderecosEntregaSubscription) {
      this.enderecosEntregaSubscription.unsubscribe();
    }

    if (this.enderecosCobrancaSubscription) {
      this.enderecosCobrancaSubscription.unsubscribe();
    }

  }
 
  async carregarUsuario() {
    this.usuarioSubscription = this.usuarioService.getUsuario().subscribe((usuarioAPI) => {
      this.usuario = [usuarioAPI];

      this.LoginId = this.usuario[0].LoginId

      console.log(this.LoginId)

    });
  }

  async carregarFormaPagamento() {
    try {
      this.formaPagamentoSubscription = this.formaPagamentoService.getFormaPagamento().subscribe(async (formaPagamento) => {
        this.formaPagamento = formaPagamento;

        console.log("Fim carregarFormaPagamento")
        // Após carregar os endereços, chame o método para preencher o endereço selecionado
        await this.preencherFormaPagamento();
      });
    } catch (error) {
    }
  }

  async preencherFormaPagamento() {

    console.log("Inicio preencherFormaPagamento")

    const a7ccc9f43fc28a6ce00af20b9ca3e8985739eed74c57b4e4e7a88cd4d3682a5e = sessionStorage.getItem('p');

    const d75bebc1471a279ab08da91a018b44d77bc0db35e56d700a3ffc7a47f455af0b = '8bdc349582ed93b3bab86341c35b5a1c7187b7b9219d6a2c2808cbb9823a3c82';

    if (a7ccc9f43fc28a6ce00af20b9ca3e8985739eed74c57b4e4e7a88cd4d3682a5e) {
      const bd534ef1857d551a2450df6490121d3a4498e21dffd23873e593a9d40a4b161f = AES.decrypt(a7ccc9f43fc28a6ce00af20b9ca3e8985739eed74c57b4e4e7a88cd4d3682a5e, d75bebc1471a279ab08da91a018b44d77bc0db35e56d700a3ffc7a47f455af0b);
      if (bd534ef1857d551a2450df6490121d3a4498e21dffd23873e593a9d40a4b161f.sigBytes > 0) {
        this.formaPagamentoId = JSON.parse(bd534ef1857d551a2450df6490121d3a4498e21dffd23873e593a9d40a4b161f.toString(CryptoJS.enc.Utf8));

        if (this.formaPagamentoId !== undefined) {
          // Encontre o endereço correspondente com base no ID
          const formaPagamento = this.formaPagamento.find(formaPagamento => formaPagamento.idPagamento === this.formaPagamentoId);

          // Verifique se o endereço foi encontrado
          if (formaPagamento) {
            // Preencha o array enderecoEntregaSelecionado com o endereço encontrado
            this.formaPagamentoSelecionada = [formaPagamento];

            if(this.formaPagamentoSelecionada[0].tipoPagamento === 'PicPay'){
              this.picPay();
            }

          }
          console.log("Forma Pagamento selecionada: ",this.formaPagamentoSelecionada[0].tipoPagamento)
        }
      }
      console.log("formaPagamentoId: ", this.formaPagamentoId)
    }

  }

  async carregarEnderecos() {
    try {
      this.enderecosEntregaSubscription = this.usuarioService.getEnderecoEntregaUsuarioLogado().subscribe(async (enderecosEntregaAPI) => {
        this.enderecosEntrega = enderecosEntregaAPI;
        console.log("Aqui é dentro do método carregarEnderecos", this.enderecosEntrega);

        console.log("Fim do método carregarEnderecos")
        // Após carregar os endereços, chame o método para preencher o endereço selecionado
        await this.preencherEnderecoSelecionado();
      });
      this.enderecosCobrancaSubscription = this.usuarioService.getEnderecoCobrancaUsuarioLogado().subscribe(async (enderecoCobrancaAPI) => {
        this.enderecoCobranca = enderecoCobrancaAPI;
        console.log("Aqui é dentro do método getEnderecoCobrancaUsuarioLogado", this.enderecoCobranca[0].endId);

        console.log("Fim do método getEnderecoCobrancaUsuarioLogado")
        // Após carregar os endereços, chame o método para preencher o endereço selecionado
      });
    } catch (error) {
      console.error("Erro ao carregar endereços", error);
    }
  }

  async preencherEnderecoSelecionado() {

    console.log("Iniciando preencherEnderecoSelecionado")

    const a8b12ace84b6e44cf9290c7a8d584d0f44a4ff2079add964f67e6e999e0045d6 = sessionStorage.getItem('es');

    const d880c83d159fd83056bf415dc345fdcbd5c642e26ca51703af13bc9db17838d2 = '9776a1b50191cae98292336600e0a7bd4263bf18b3d87c7dbb5cb3dd7f54438f';

    if (a8b12ace84b6e44cf9290c7a8d584d0f44a4ff2079add964f67e6e999e0045d6) {
      const bb5bcc69117fd472d769d1f7133fcea3a2bd6711dc388041c059f2ae78a15d8b = AES.decrypt(a8b12ace84b6e44cf9290c7a8d584d0f44a4ff2079add964f67e6e999e0045d6, d880c83d159fd83056bf415dc345fdcbd5c642e26ca51703af13bc9db17838d2);
      if (bb5bcc69117fd472d769d1f7133fcea3a2bd6711dc388041c059f2ae78a15d8b.sigBytes > 0) {
        this.enderecoEntregaSelecionadoId = JSON.parse(bb5bcc69117fd472d769d1f7133fcea3a2bd6711dc388041c059f2ae78a15d8b.toString(CryptoJS.enc.Utf8));

        if (this.enderecoEntregaSelecionadoId !== undefined) {
          // Encontre o endereço correspondente com base no ID
          const enderecoSelecionado = this.enderecosEntrega.find(endereco => endereco.endId === this.enderecoEntregaSelecionadoId);

          // Verifique se o endereço foi encontrado
          if (enderecoSelecionado) {

            console.log("Aqui achou", enderecoSelecionado)
            // Preencha o array enderecoEntregaSelecionado com o endereço encontrado
            this.enderecoEntregaSelecionado = [enderecoSelecionado];
          } else {
            console.log("Não achou")
          }
          console.log("Endereço selecionado: ",this.enderecoEntregaSelecionado)
        }
      }
      console.log("enderecoIdSelecionado", this.enderecoEntregaSelecionadoId)

    }

  }

  picPay(){
    this.picPayService.referenceId$.subscribe((referenceId: string) => {
      // Faça o que precisar com o referenceId na outra tela
      console.log('Reference ID atualizado na outra tela:', referenceId);
      
      this.picPayService.checarStatusPagamento(referenceId).subscribe((response)=> {

        this.responses.push(response); // Armazena a resposta no array

        if(this.responses[0].status === 'paid'){
          console.log("Pagamento realizado com sucesso.")

            // const carrinhoCabecaData = {
            //   LoginId: this.LoginId,
            //   endIdEnt: 
            //   endIdCob: 
            // }

            // this.carrinhoAPIService.cadastrarCarrinhoCabeca(carrinhoCabecaData)

        } else {
          console.log("Pagamento ainda não realizado.")
        }

      }, (error) => {
        console.log(error);
      });
    });
  }

}
