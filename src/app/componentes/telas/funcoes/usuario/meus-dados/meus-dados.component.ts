import { Component } from '@angular/core';
import { EnderecoEntrega, ServiceUsuarioLogadoService, Usuario } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.css']
})
export class MeusDadosComponent {

  usuario: Usuario[] = [];
  first: number = 0;
  rows: number = 3;
  dialogVisible: boolean = false;
  dialogVisibleSalvar: boolean = false;
  dialogType: 'email' | 'senha' = 'email';
  newEmail: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  divEnderecos: boolean = true;
  divNovoEndereco: boolean = false
  identificacao!: string;
  cep!: number | null
  cidade!: string;
  bairro!: string;
  logradouro!: string;
  numero!: number | null;
  complemento!: string;
  disableAddressFields!: boolean;

  novoEndereco: EnderecoEntrega = {
    identificacao: '',
    cep: 0,
    cidade: '',
    bairro: '',
    rua: '',
    numeroResidencia: 0
  };

  constructor(
    private usuarioService: ServiceUsuarioLogadoService
  ) {}

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    this.checkIfAddressFieldsShouldBeDisabled();
  }
  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  calculateTotalRecords(): number {
    let total = 0;
    for (const usuario of this.usuario) {
      total += usuario.enderecoEntrega?.length || 0;
    }
    return total;
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

    console.log(this.usuario[0].enderecoEntrega)
  }

  showDialogEnderecos(){
    this.divNovoEndereco = false;
    this.divEnderecos = true;
  }

  salvarEndereco() {
    const novoEndereco: EnderecoEntrega = {
      identificacao: this.identificacao,
      cep: this.cep!,
      cidade: this.cidade,
      bairro: this.bairro,
      rua: this.logradouro,
      numeroResidencia: this.numero!
    };

    const usuarioIndex = 0; // Supondo que você esteja trabalhando com o primeiro usuário
    this.usuarioService.adicionarEndereco(usuarioIndex, novoEndereco);

    console.log(this.usuario[0].enderecoEntrega)

    this.resetAddressFields();
    this.showDialogEnderecos();
  }

  editAddress(address: any) {
    this.divNovoEndereco = true;
    this.divEnderecos = false
    this.identificacao = address.identificacao;
    this.cep = address.cep;
    this.cidade = address.cidade;
    this.bairro = address.bairro;
    this.logradouro = address.rua;
    this.numero = address.numeroResidencia;
    this.complemento = address.complemento;
  }



  onCepInput() {
    this.checkIfAddressFieldsShouldBeDisabled();
  }

  resetAddressFields() {
    this.identificacao = '';
    this.cep = null;
    this.cidade = '';
    this.bairro = '';
    this.logradouro = '';
    this.numero = null;
    this.complemento = '';
    this.checkIfAddressFieldsShouldBeDisabled();
  }

  checkIfAddressFieldsShouldBeDisabled() {
    const hasAddress = this.usuario?.[0]?.enderecoEntrega?.[0]?.cep || this.cep;
    this.disableAddressFields = !!hasAddress;
  }


}
