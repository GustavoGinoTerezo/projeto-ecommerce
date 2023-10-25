import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Estado, ServiceEstadosService } from 'src/app/services/serviceEstados/service-estados.service';
import { EnderecoEntrega, ServiceUsuarioLogadoService, Usuario } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';
import { ServiceApiRegistrarService } from 'src/app/services/servicesAPI/serviceAPI-Registrar/service-api-registrar.service';
import { AES } from 'crypto-ts';
import * as CryptoJS from 'crypto-js';

interface EstadoLocal {
  nome: string;
  uf: string;
}

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.css']
})
export class MeusDadosComponent {

  private usuarioSubscription!: Subscription;
  private enderecosSubscription!: Subscription;
  private inicializacaoUserConcluidaSubject!: Subscription;
  private inicializacaoEnderecoConcluidaSubject!: Subscription;
  private estadosSubscription!: Subscription;

  enderecosEntrega: any[] = []

  usuario: any[] = [];
  first: number = 0;
  rows: number = 3;
  dialogVisible: boolean = false;
  dialogVisibleSalvar: boolean = false;
  dialogType: 'email' | 'senha' = 'email';
  newEmail: string = '';
  newEmailConfirm: string = '';
  newPassword: string = '';
  newPasswordConfirm: string = '';
  divEnderecos: boolean = true;
  divNovoEndereco: boolean = false
  id!: number;
  identificacao!: string;
  cep!: number | null
  cidade!: string;
  bairro!: string;
  endereco!: string;
  numero!: number | null;
  complemento!: string;
  disableAddressFields!: boolean;
  enderecoEditando: EnderecoEntrega | null = null;
  buttonSalvarEnderecoNovoEndereco: boolean = false;
  buttonSalvarEnderecoEditar: boolean = false;
  tokenEmail!: string;
  tokenSenha!: string;
  
  estado!: EstadoLocal[];
  estadoSelecionado: EstadoLocal | null = null;
  estadosAPI: Estado[] = []

  isEditAddress = false;

  constructor(
    private usuarioService: ServiceUsuarioLogadoService,
    private registrar: ServiceApiRegistrarService,
    private serviceEstado: ServiceEstadosService,
  ) {}

  ngOnInit() {

    const startEnderecos = sessionStorage.getItem('startEnderecos')
    const startUser = sessionStorage.getItem('startUser')

    if(startEnderecos){
      this.carregarEnderecos();
    } else {
      const inicializacaoConcluidaEnderecosObservable = this.usuarioService.getEnderecosCarregadosObservable();

      if (inicializacaoConcluidaEnderecosObservable) {
        this.inicializacaoEnderecoConcluidaSubject = inicializacaoConcluidaEnderecosObservable.subscribe(() => {
          this.carregarEnderecos();
        });
      }
    }

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

    window.addEventListener('beforeunload', () => {
      sessionStorage.removeItem('startUser');
      sessionStorage.removeItem('startEnderecos');
    });

    this.estado = [
      { nome: 'Acre', uf: 'AC'},
      { nome: 'Alagoas', uf: 'AL'},
      { nome: 'Amapá', uf: 'AP'},
      { nome: 'Amazonas', uf: 'AM'},
      { nome: 'Bahia', uf: 'BA'},
      { nome: 'Ceará', uf: 'CE'},
      { nome: 'Distrito Federal', uf: 'DF'},
      { nome: 'Espírito Santo', uf: 'ES'},
      { nome: 'Goiás', uf: 'GO'},
      { nome: 'Maranhão', uf: 'MA'},
      { nome: 'Mato Grosso', uf: 'MT'},
      { nome: 'Mato Grosso do Sul', uf: 'MS'},
      { nome: 'Minas Gerais', uf: 'MG'},
      { nome: 'Pará', uf: 'PA'},
      { nome: 'Paraíba', uf: 'PB'},
      { nome: 'Paraná', uf: 'PR'},
      { nome: 'Pernambuco', uf: 'PE'},
      { nome: 'Piauí', uf: 'PI'},
      { nome: 'Rio de Janeiro', uf: 'RJ'},
      { nome: 'Rio Grande do Norte', uf: 'RN'},
      { nome: 'Rio Grande do Sul', uf: 'RS'},
      { nome: 'Rondônia', uf: 'RO'},
      { nome: 'Roraima', uf: 'RR'},
      { nome: 'Santa Catarina', uf: 'SC'},
      { nome: 'São Paulo', uf: 'SP'},
      { nome: 'Sergipe', uf: 'SE'},
      { nome: 'Tocantins', uf: 'TO'}
    ];

    // this.carregarEstadosAPI()

  }

  ngOnDestroy() {

    if (this.inicializacaoUserConcluidaSubject) {
      this.inicializacaoUserConcluidaSubject.unsubscribe();
    }

    if (this.inicializacaoEnderecoConcluidaSubject) {
      this.inicializacaoEnderecoConcluidaSubject.unsubscribe();
    }

    if (this.usuarioSubscription) {
      this.usuarioSubscription.unsubscribe();
    }

    if (this.enderecosSubscription) {
      this.enderecosSubscription.unsubscribe();
    }

    if (this.estadosSubscription) {
      this.estadosSubscription.unsubscribe();
    }

  }

  carregarUsuario() {
    this.usuarioSubscription = this.usuarioService.getUsuario().subscribe((usuarioAPI) => {
      this.usuario = [usuarioAPI];
      console.log("1")
    });
  }

  carregarEnderecos() {
    this.enderecosSubscription = this.usuarioService.getEnderecoEntregaUsuarioLogado().subscribe((enderecosEntregaAPI) => {
      this.enderecosEntrega = enderecosEntregaAPI;
      console.log("2")
    });
  }

  async carregarEstadosAPI() {
    await this.serviceEstado.atualizarEstadosDaAPI();
    this.carregarEstados();
  }

  carregarEstados() {
    this.estadosSubscription = this.serviceEstado.getEstados().subscribe((estadosAPI) => {
      this.estadosAPI = estadosAPI;

      console.log(this.estadosAPI)
    });
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  showDialog(type: 'email' | 'senha') {
    this.dialogType = type;
    this.dialogVisible = true;
    this.dialogVisibleSalvar = false;
  }

  showDialogSalvar() {
    this.dialogVisible = false;
    this.dialogVisibleSalvar = true;
  }

  alterarDados() {
    // Implemente a lógica para alterar o email ou a senha aqui
    // Use this.dialogType para distinguir entre email e senha
    // Feche o diálogo quando a alteração for concluída
    this.dialogVisible = false;
  }

  abrirDialogNewAddress() {
    this.divNovoEndereco = true;
    this.divEnderecos = false;
    this.buttonSalvarEnderecoNovoEndereco = true;

    this.isEditAddress = false;
  }

  showDialogEnderecos(){
    this.divNovoEndereco = false;
    this.divEnderecos = true;
    this.buttonSalvarEnderecoNovoEndereco = false;
    this.buttonSalvarEnderecoEditar = false;

    this.resetAddressFields()
  }

  editAddress(address: any) {
    this.buttonSalvarEnderecoEditar = true;
    this.divNovoEndereco = true;
    this.divEnderecos = false;
    this.isEditAddress = true;

    this.identificacao = address.identificacao
    this.cep = address.cep
    this.bairro = address.bairro
    this.cidade = address.cidade
    this.endereco = address.endereco
    this.numero = address.numeroresidencia
    this.complemento = address.complemento
  }

  salvarEdicao() {
    
  }

  adicionarEndereco() {
    
    if (this.estadoSelecionado) {
      const estadoEncontrado = this.estadosAPI.find(
        (estado) => estado.UfId === this.estadoSelecionado!.uf
      );

      if (estadoEncontrado) {

        const e3ab87bbcb7de65067ed3f1fa313aa98b10ee3e1b3f6d6240170508e2ff9df01 = sessionStorage.getItem('u')
        const ef88b713413e01ff4fc0a3ccb4037c9e5e0f864915876375ef66eef5801e1bee = '3a5fcd67e16707188a6dd213303761fd530fed07434b8641044460fd9fdde581'
        
        if(e3ab87bbcb7de65067ed3f1fa313aa98b10ee3e1b3f6d6240170508e2ff9df01){

          const userIDStorage = CryptoJS.AES.decrypt(e3ab87bbcb7de65067ed3f1fa313aa98b10ee3e1b3f6d6240170508e2ff9df01, ef88b713413e01ff4fc0a3ccb4037c9e5e0f864915876375ef66eef5801e1bee);

          if (userIDStorage.sigBytes > 0) {
            const LoginId = JSON.parse(userIDStorage.toString(CryptoJS.enc.Utf8)); 
    
            const dataEnderecoEntrega = {
              LoginId: LoginId,
              tpcadastro: "2",
              cep: this.cep,
              bairro: this.bairro,
              cidade: this.cidade,
              UfId: this.estadoSelecionado.uf,
              endereco: this.endereco,
              complemento: this.complemento,
              numeroresidencia: this.numero,
              identificacao: this.identificacao,
            }
        
            this.registrar.registrarEndereco(dataEnderecoEntrega).subscribe(response => {
              console.log("Endereço de entrega adicionado com sucesso", response)

              // Redefina os campos do endereço
              this.resetAddressFields();

              // Alternar de volta para a visualização de endereços
              this.divNovoEndereco = false;
              this.divEnderecos = true;
              this.buttonSalvarEnderecoEditar = false;
              this.buttonSalvarEnderecoNovoEndereco = false;
            },
            (error) => {
              console.log("Erro ao cadastrar novo endereço de entrega", error)
            });
          }
        }
      } else {
        console.log('Estado selecionado não está na lista de estados válidos.');
      }
    }
  }

  resetAddressFields() {
    this.identificacao = '';
    this.cep = null;
    this.cidade = '';
    this.bairro = '';
    this.endereco = '';
    this.numero = null;
    this.complemento = '';
    this.estadoSelecionado = null
  }

  onKeyPressWord(event: KeyboardEvent): void {
    const allowedCharacters = /[A-Za-zÀ-ÿ'\- ]/; // Permitir letras, acentos, apóstrofos e espaços
    const inputChar = event.key;

    if (!allowedCharacters.test(inputChar)) {
      event.preventDefault();
    }
  }

  isPasswordValid(): boolean {
    const regexPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regexPattern.test(this.newPassword);
  }

  isEmailValid(): boolean {
    const regexPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return regexPattern.test(this.newEmail);
  }

  isButtonDisabledSenha(): boolean {
    return (
      !this.newPassword ||
      !this.newPasswordConfirm ||
      !this.tokenSenha ||
      (this.newPassword !== this.newPasswordConfirm) ||
      !this.isPasswordValid()
    );
  }

  isButtonDisabled(): boolean {
    return (
      !this.newEmail ||
      !this.newEmailConfirm ||
      !this.tokenEmail ||
      (this.newEmail !== this.newEmailConfirm) ||
      !this.isEmailValid()
    );
  }

  get totalRecords(): number {
    return this.enderecosEntrega?.length || 0;
  }

  ativarBotaoAdicionarEndereco(): boolean {

    if(
      !this.identificacao ||
      !this.cep ||
      !this.cidade ||
      !this.bairro ||
      !this.endereco ||
      !this.estadoSelecionado ||
      !this.numero ||
      !this.complemento
    ){
      return true
    }

    return false
  }
}
