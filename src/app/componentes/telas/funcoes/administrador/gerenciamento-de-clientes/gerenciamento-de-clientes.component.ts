import { Usuario } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';
import { Component } from '@angular/core';
import { ServiceUsuariosService } from 'src/app/services/serviceUsuarios/service-usuarios.service';



@Component({
  selector: 'app-gerenciamento-de-clientes',
  templateUrl: './gerenciamento-de-clientes.component.html',
  styleUrls: ['./gerenciamento-de-clientes.component.css']
})
export class GerenciamentoDeClientesComponent {

  usuarios: Usuario[] = []
  usuarioSelecionado!: Usuario;
  usuariosFiltrados: Usuario[] = []

  botaoDivAlternativo: boolean = false;
  botaoDisabled!: boolean;

  nome: string = '';
  email: string = '';
  cpfOuCnpj!: number | null
  cep!: number | null
  telefone!: number | null
  cidade: string = '';
  bairro: string = '';
  rua: string = '';
  numeroResidencia!: number | null
  emailAlternativo: string = '';
  telefoneAlternativo!: number | null;

  identificacaoEndereco: string = '';
  cepEntrega!: number | null
  cidadeEntrega: string = '';
  bairroEntrega: string = '';
  ruaEntrega: string = '';
  numeroResidenciaEntrega!: number | null

  habilitarEmailAlternativo: boolean = false;
  habilitarTelefoneAlternativo: boolean = false;

  constructor(
    private usuariosService: ServiceUsuariosService,
  ){}

  ngOnInit(){


    this.usuariosService.getUsuarioTabela().then((data) => {
      this.usuarios = data;
      this.usuariosFiltrados = data;
    });

  }

  filterTable(event: any) {
    const filterValue = event.target.value.toLowerCase();
    if (!this.usuarios) {
      this.usuariosFiltrados = [];
    } else {
      this.usuariosFiltrados = this.usuarios.filter(usuario => {
        const cepString = usuario.cep?.toString() || ''
        const cpfOuCnpjString = usuario.cpfOuCnpj?.toString() || ''
        const telefoneString = usuario.telefone?.toString() || ''
        return (
          usuario.nome?.toLowerCase().includes(filterValue) ||
          usuario.email?.toLowerCase().includes(filterValue) ||
          cepString.includes(filterValue) ||
          cpfOuCnpjString.includes(filterValue) ||
          telefoneString.includes(filterValue)
        );
      });
    }
  }

  updateInputFieldsWithSelectedUser() {
    if (this.usuarioSelecionado) {
      this.nome = this.usuarioSelecionado.nome || '';
      this.email = this.usuarioSelecionado.email || '';
      this.cpfOuCnpj = this.usuarioSelecionado.cep || null;
      this.cep = this.usuarioSelecionado.cep || null;
      this.telefone = this.usuarioSelecionado.telefone || null;
      this.numeroResidencia = this.usuarioSelecionado.numeroResidencia || null;
      this.bairro = this.usuarioSelecionado.bairro || '';
      this.rua = this.usuarioSelecionado.rua || '';
      this.cidade = this.usuarioSelecionado.cidade || '';

      this.botaoDisabled = true;
      this.botaoDivAlternativo = true;

    }
  }

  limparCampos() {
    this.nome = '';
    this.email = '';
    this.cpfOuCnpj = null;
    this.telefone = null;
    this.cep = null;
    this.cidade = '';
    this.bairro = '';
    this.rua = '';
    this.numeroResidencia = null;

    this.botaoDisabled = false;
    this.botaoDivAlternativo = false;

  }

  limparCamposEmailAlternativo() {
    this.emailAlternativo = '';
  }

  limparCamposTelefoneAlternativo() {
    this.telefoneAlternativo = null;
  }

}
