import { Usuario } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';
import { Component } from '@angular/core';
import { ServiceUsuariosService } from 'src/app/services/serviceUsuarios/service-usuarios.service';
import { Subscription } from 'rxjs';

interface Estado {
  nome: string;
  uf: string;
  icms: number;
}

@Component({
  selector: 'app-gerenciamento-de-clientes',
  templateUrl: './gerenciamento-de-clientes.component.html',
  styleUrls: ['./gerenciamento-de-clientes.component.css']
})
export class GerenciamentoDeClientesComponent {

  private usuariosSubscription!: Subscription;

  usuarios: Usuario[] = []
  usuarioSelecionado!: any;
  usuariosFiltrados: Usuario[] = []

  botaoDiv: boolean = false;
  botaoDisabled!: boolean;

  nome: string = '';
  email: string = '';
  cpfOuCnpj!: number | null;
  cep!: number | null
  telefone!: number | null
  cidade: string = '';
  bairro: string = '';
  rua: string = '';
  numeroResidencia!: number | null
  emailAlternativo: string = '';
  telefoneAlternativo!: number | null;
  complemento!: string;
  identificacaoEndereco: string = '';
  cepEntrega!: number | null
  cidadeEntrega: string = '';
  bairroEntrega: string = '';
  ruaEntrega: string = '';
  numeroResidenciaEntrega!: number | null
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
      { nome: 'Acre', uf: 'ac', icms: 0 },
      { nome: 'Alagoas', uf: 'al', icms: 0 },
      { nome: 'Amapá', uf: 'ap', icms: 0 },
      { nome: 'Amazonas', uf: 'am', icms: 0 },
      { nome: 'Bahia', uf: 'ba', icms: 0 },
      { nome: 'Ceará', uf: 'ce', icms: 0 },
      { nome: 'Distrito Federal', uf: 'df', icms: 0 },
      { nome: 'Espírito Santo', uf: 'es', icms: 0 },
      { nome: 'Goiás', uf: 'go', icms: 0 },
      { nome: 'Maranhão', uf: 'ma', icms: 0 },
      { nome: 'Mato Grosso', uf: 'mt', icms: 0 },
      { nome: 'Mato Grosso do Sul', uf: 'ms', icms: 0 },
      { nome: 'Minas Gerais', uf: 'mg', icms: 0 },
      { nome: 'Pará', uf: 'pa', icms: 0 },
      { nome: 'Paraíba', uf: 'pb', icms: 0 },
      { nome: 'Paraná', uf: 'pr', icms: 0 },
      { nome: 'Pernambuco', uf: 'pe', icms: 0 },
      { nome: 'Piauí', uf: 'pi', icms: 0 },
      { nome: 'Rio de Janeiro', uf: 'rj', icms: 0 },
      { nome: 'Rio Grande do Norte', uf: 'rn', icms: 0 },
      { nome: 'Rio Grande do Sul', uf: 'rs', icms: 0 },
      { nome: 'Rondônia', uf: 'ro', icms: 0 },
      { nome: 'Roraima', uf: 'rr', icms: 0 },
      { nome: 'Santa Catarina', uf: 'sc', icms: 0 },
      { nome: 'São Paulo', uf: 'sp', icms: 0 },
      { nome: 'Sergipe', uf: 'se', icms: 0 },
      { nome: 'Tocantins', uf: 'to', icms: 0}
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

  }

  async carregarUsuariosAPI() {
    await this.usuariosService.buscarUsuariosDaAPI();
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.usuariosSubscription = this.usuariosService.getUsuarios().subscribe((usuariosAPI) => {
      this.usuarios = usuariosAPI;
      this.usuariosFiltrados = usuariosAPI;
      console.log("Dentro da tela", this.usuarios)
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
      this.cep = this.usuarioSelecionado.cep || null;
      this.telefone = this.usuarioSelecionado.telefone || null;
      this.numeroResidencia = this.usuarioSelecionado.numeroResidencia || null;
      this.bairro = this.usuarioSelecionado.bairro || '';
      this.rua = this.usuarioSelecionado.rua || '';
      this.cidade = this.usuarioSelecionado.cidade || '';

      this.validateEmail()

      this.botaoDisabled = true;
      this.botaoDiv = true;

    }
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
