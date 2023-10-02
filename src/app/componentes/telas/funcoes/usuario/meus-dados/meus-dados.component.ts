import { Component } from '@angular/core';
import { EnderecoEntrega, ServiceUsuarioLogadoService, Usuario } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.css']
})
export class MeusDadosComponent {

  enderecosEntrega: EnderecoEntrega[] = []

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
  id!: number;
  identificacao!: string;
  cep!: number | null
  cidade!: string;
  bairro!: string;
  logradouro!: string;
  numero!: number | null;
  complemento!: string;
  disableAddressFields!: boolean;
  enderecoEditando: EnderecoEntrega | null = null;
  buttonSalvarEnderecoNovoEndereco: boolean = false;
  buttonSalvarEnderecoEditar: boolean = false;

  novoEndereco: EnderecoEntrega = {
    identificacao: '',
    cep: 0,
    cidade: '',
    bairro: '',
    endereco: '',
    numeroResidencia: 0
  };

  constructor(
    private usuarioService: ServiceUsuarioLogadoService
  ) {}

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    this.checkIfAddressFieldsShouldBeDisabled();

    this.usuarioService.getEnderecoEntregaUsuarioLogado().subscribe(
      (enderecosEntregaAPI) => {
        this.enderecosEntrega = enderecosEntregaAPI;
        console.log(this.enderecosEntrega)


        
      }
    );

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
    this.buttonSalvarEnderecoNovoEndereco = true;
  }

  showDialogEnderecos(){
    this.divNovoEndereco = false;
    this.divEnderecos = true;
    this.buttonSalvarEnderecoNovoEndereco = false;
    this.buttonSalvarEnderecoEditar = false;
  }

  editAddress(address: any) {
    this.buttonSalvarEnderecoEditar = true;
    this.divNovoEndereco = true;
    this.divEnderecos = false;

    // if (this.usuario[0]?.enderecoEntrega) {
    //   const enderecoEditIndex = this.usuario[0].enderecoEntrega.findIndex(
    //     (endereco) => endereco.identificacao === address.identificacao
    //   );

    //   if (enderecoEditIndex !== -1) {
    //     this.enderecoEditando = this.usuario[0].enderecoEntrega[enderecoEditIndex];

    //     // Preencha os campos do formulário com os valores editados
    //     this.identificacao = this.enderecoEditando.identificacao || '';
    //     this.cep = this.enderecoEditando.cep || null;
    //     this.cidade = this.enderecoEditando.cidade || '';
    //     this.bairro = this.enderecoEditando.bairro || '';
    //     this.logradouro = this.enderecoEditando.endereco || '';
    //     this.numero = this.enderecoEditando.numeroResidencia || null;

    //     // Alternar para a visualização de edição de endereço

    //   }
    // }
  }

  salvarEdicao() {
    if (this.usuario[0]?.enderecoEntrega) {
      const enderecoEditIndex = this.usuario[0].enderecoEntrega.findIndex(
        (endereco) => endereco === this.enderecoEditando
      );

      if (enderecoEditIndex !== -1) {
        const enderecoEditado = this.usuario[0].enderecoEntrega[enderecoEditIndex];

        // Atualize os campos do endereço editado
        enderecoEditado.identificacao = this.identificacao;
        enderecoEditado.cep = this.cep!;
        enderecoEditado.cidade = this.cidade;
        enderecoEditado.bairro = this.bairro;
        enderecoEditado.endereco = this.logradouro;
        enderecoEditado.numeroResidencia = this.numero!;

        // Redefina os campos do endereço após a edição
        this.resetAddressFields();

        // Alternar de volta para a visualização de endereços
        this.divNovoEndereco = false;
        this.divEnderecos = true;
        this.buttonSalvarEnderecoEditar = false;
      }
    }
  }

  salvarEndereco() {
    const endereco: EnderecoEntrega = {
      identificacao: this.identificacao,
      cep: this.cep!,
      cidade: this.cidade,
      bairro: this.bairro,
      endereco: this.logradouro,
      numeroResidencia: this.numero!
    };

    this.usuarioService.adicionarEndereco(0, endereco);

    // Redefina os campos do endereço
    this.resetAddressFields();

    // Alternar de volta para a visualização de endereços
    this.divNovoEndereco = false;
    this.divEnderecos = true;
    this.buttonSalvarEnderecoEditar = false;
    this.buttonSalvarEnderecoNovoEndereco = false;
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
