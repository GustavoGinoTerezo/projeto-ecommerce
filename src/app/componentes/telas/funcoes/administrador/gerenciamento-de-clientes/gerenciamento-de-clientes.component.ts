import { Usuario } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';
import { Component } from '@angular/core';
import { ServiceUsuariosService } from 'src/app/services/serviceUsuarios/service-usuarios.service';
import { Subscription } from 'rxjs';

interface Estado {
  nome: string;
  uf: string;
}

@Component({
  selector: 'app-gerenciamento-de-clientes',
  templateUrl: './gerenciamento-de-clientes.component.html',
  styleUrls: ['./gerenciamento-de-clientes.component.css']
})
export class GerenciamentoDeClientesComponent {

  private usuariosSubscription!: Subscription;
  private telefonesSubscription!: Subscription;
  private emailsSubscription!: Subscription;
  private enderecosSubscription!: Subscription;

  usuarios: Usuario[] = [];
  telefones: any[] = [];
  emails: any[] = [];
  enderecos: any[] = [];

  telefonesFiltrados: any[] = [];
  emailsFiltrados: any[] = [];
  enderecosFiltradosEntrega: any[] = [];
  enderecosFiltradosCobranca: any[] = [];
  enderecoFiltradoSelecionado: any;
  emailsFiltradoSelecionado: any

  usuarioSelecionado!: any;
  usuariosFiltrados: Usuario[] = [];

  botaoDiv: boolean = false;
  botaoDisabled!: boolean;

  LoginId!: number;
  nome: string = '';
  email: string = '';
  cpfOuCnpj!: number | null;
  cep!: number | null;
  telefone!: number | null;
  cidade: string = '';
  bairro: string = '';
  rua: string = '';
  numeroResidencia!: number | null;
  emailAlternativo: string = '';
  telefoneAlternativo!: number | null;
  complemento!: string;

  identificacaoEndereco: string = '';
  cepEntrega!: number | null
  cidadeEntrega: string = '';
  bairroEntrega: string = '';
  ruaEntrega: string = '';
  numeroResidenciaEntrega!: number | null;
  complementoEntrega!: string;
  habilitarEmailAlternativo: boolean = false;
  habilitarTelefoneAlternativo: boolean = false;
  habilitarEnderecoEntrega: boolean = false;

  estado!: Estado[];
  estadoSelecionadoCobranca!: Estado;
  estadoSelecionadoEntrega!: Estado;

  emailValid: boolean = false;

  constructor(
    private usuariosService: ServiceUsuariosService,

  ){}

  ngOnInit(){

    this.estado = [
      { nome: 'Acre', uf: 'ac'},
      { nome: 'Alagoas', uf: 'al'},
      { nome: 'Amapá', uf: 'ap'},
      { nome: 'Amazonas', uf: 'am'},
      { nome: 'Bahia', uf: 'ba'},
      { nome: 'Ceará', uf: 'ce'},
      { nome: 'Distrito Federal', uf: 'df'},
      { nome: 'Espírito Santo', uf: 'es'},
      { nome: 'Goiás', uf: 'go'},
      { nome: 'Maranhão', uf: 'ma'},
      { nome: 'Mato Grosso', uf: 'mt'},
      { nome: 'Mato Grosso do Sul', uf: 'ms'},
      { nome: 'Minas Gerais', uf: 'mg'},
      { nome: 'Pará', uf: 'pa'},
      { nome: 'Paraíba', uf: 'pb'},
      { nome: 'Paraná', uf: 'pr'},
      { nome: 'Pernambuco', uf: 'pe'},
      { nome: 'Piauí', uf: 'pi'},
      { nome: 'Rio de Janeiro', uf: 'rj'},
      { nome: 'Rio Grande do Norte', uf: 'rn'},
      { nome: 'Rio Grande do Sul', uf: 'rs'},
      { nome: 'Rondônia', uf: 'ro'},
      { nome: 'Roraima', uf: 'rr'},
      { nome: 'Santa Catarina', uf: 'sc'},
      { nome: 'São Paulo', uf: 'sp'},
      { nome: 'Sergipe', uf: 'se'},
      { nome: 'Tocantins', uf: 'to'}
    ];

    // this.carregarUsuariosAPI()

    // this.usuariosService.getUsuarioTabela().then((data) => {
    //   this.usuarios = data;
    //   this.usuariosFiltrados = data;
    // });

  }

  ngOnDestroy(){

    if (this.usuariosSubscription) {
      this.usuariosSubscription.unsubscribe();
    }

    if (this.telefonesSubscription) {
      this.telefonesSubscription.unsubscribe();
    }

    if (this.emailsSubscription) {
      this.emailsSubscription.unsubscribe();
    }

    if (this.enderecosSubscription) {
      this.enderecosSubscription.unsubscribe();
    }

  }

  async carregarUsuariosAPI() {
    await this.usuariosService.buscarDadosDaAPI();
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.usuariosSubscription = this.usuariosService.getUsuarios().subscribe((usuariosAPI) => {
      this.usuarios = usuariosAPI;
      this.usuariosFiltrados = usuariosAPI;
    });
    this.telefonesSubscription = this.usuariosService.getTelefones().subscribe((telefonesAPI) => {
      this.telefones = telefonesAPI;
    });
    this.emailsSubscription = this.usuariosService.getEmail().subscribe((emailsAPI) => {
      this.emails = emailsAPI;
    });
    this.enderecosSubscription = this.usuariosService.getEnderecos().subscribe((enderecosAPI) => {
      this.enderecos = enderecosAPI;
    });
  }

  filterTable(event: any) {
    const filterValue = event.target.value.toLowerCase();
    if (!this.usuarios) {
      this.usuariosFiltrados = [];
    } else {
      this.usuariosFiltrados = this.usuarios.filter(usuario => {
        const cepString = usuario.cep?.toString() || ''
        const telefoneString = usuario.telefone?.toString() || ''
        return (
          usuario.nome?.toLowerCase().includes(filterValue) ||
          usuario.emailprinc?.toLowerCase().includes(filterValue) ||
          cepString.includes(filterValue) ||
          telefoneString.includes(filterValue)
        );
      });
    }
  }

  updateInputFieldsWithSelectedUser() {
    if (this.usuarioSelecionado) {
      this.nome = this.usuarioSelecionado.nome || '';
      this.cpfOuCnpj = this.usuarioSelecionado.cpf || null;
      this.email = this.usuarioSelecionado.emailprinc || '';

      this.LoginId = this.usuarioSelecionado.LoginId;

      if (this.LoginId) {
        // Filtrar os arrays com base no id do usuário selecionado
        this.emailsFiltrados = this.emails.filter(email => email.LoginId === this.LoginId);
        this.telefonesFiltrados = this.telefones.filter(telefone => telefone.LoginId === this.LoginId);
        this.enderecosFiltradosCobranca = this.enderecos.filter(endereco => endereco.LoginId === this.LoginId && endereco.tpcadastro === "1");
        this.enderecosFiltradosEntrega = this.enderecos.filter(endereco => endereco.LoginId === this.LoginId && endereco.tpcadastro === "2");

        if(this.enderecosFiltradosCobranca){
          this.cep = this.enderecosFiltradosCobranca[0].cep
          this.cidade = this.enderecosFiltradosCobranca[0].cidade

          this.bairro = this.enderecosFiltradosCobranca[0].bairro
          this.rua = this.enderecosFiltradosCobranca[0].endereco
          this.numeroResidencia = this.enderecosFiltradosCobranca[0].numeroresidencia
          this.complemento = this.enderecosFiltradosCobranca[0].complemento
        }

        console.log("Emails: ",this.emailsFiltrados)
        console.log("Telefones: ",this.telefonesFiltrados)
        console.log("Endereços Entrega: ",this.enderecosFiltradosEntrega)
        console.log("Endereço Cobrança: ",this.enderecosFiltradosCobranca)
      }


      this.validateEmail()

      this.botaoDisabled = true;
      this.botaoDiv = true;

    }
  }

  enderecoEntregaSelecionado(event: any) {
    this.identificacaoEndereco = event.value.identificacao;
    this.cepEntrega = event.value.cep;
    this.cidadeEntrega = event.value.cidade;
    this.bairroEntrega = event.value.bairro;
    this.ruaEntrega = event.value.endereco;
    this.numeroResidenciaEntrega = event.value.numeroresidencia;
    this.complementoEntrega = event.value.complemento
  }

  emailAlternativoSelecionado(event: any) {
    this.emailAlternativo = event.value.email
  }

  limparCampos() {
    this.nome = '';
    this.cpfOuCnpj = null;
    this.email = '';
    this.telefone = null;
    this.cep = null;
    this.cidade = '';
    this.bairro = '';
    this.rua = '';
    this.numeroResidencia = null;
    this.complemento = '';

    this.botaoDisabled = false;
    this.botaoDiv = false;

  }

  limparCamposEnderecoEntrega() {
    this.identificacaoEndereco = '';
    this.cepEntrega = null;
    this.cidadeEntrega = '';
    this.bairroEntrega = '';
    this.ruaEntrega = '';
    this.numeroResidenciaEntrega = null;

  }

  limparCamposEmailAlternativo() {
    this.emailAlternativo = '';
  }

  limparCamposTelefoneAlternativo() {
    this.telefoneAlternativo = null;
  }

  onKeyPressWord(event: KeyboardEvent): void {
    const allowedCharacters = /[A-Za-zÀ-ÿ'\- ]/; // Permitir letras, acentos, apóstrofos e espaços
    const inputChar = event.key;

    if (!allowedCharacters.test(inputChar)) {
      event.preventDefault();
    }
  }

  checkedRegex(email: string): boolean {
    const regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return regex.test(email);
  }

  onKeyPress(event: KeyboardEvent) {
    const allowedChars = /[0-9]/g; // Expressão regular para permitir apenas números

    const inputChar = event.key;

    if (!inputChar.match(allowedChars)) {
      event.preventDefault(); // Impede a entrada de caracteres não numéricos
    }
  }

  validateEmail() {
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    this.emailValid = emailPattern.test(this.email);
  }

}
