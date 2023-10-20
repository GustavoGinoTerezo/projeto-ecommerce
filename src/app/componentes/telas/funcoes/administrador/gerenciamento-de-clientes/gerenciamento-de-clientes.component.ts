import { Usuario } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';
import { Component } from '@angular/core';
import { ServiceUsuariosService } from 'src/app/services/serviceUsuarios/service-usuarios.service';
import { Subscription } from 'rxjs';
import { ServiceApiRegistrarService } from 'src/app/services/servicesAPI/serviceAPI-Registrar/service-api-registrar.service';
import { ServiceApiUsuariosService } from 'src/app/services/servicesAPI/serviceAPI-Usuarios/service-api-usuarios.service';
import { ServiceApiEnderecosService } from 'src/app/services/servicesAPI/serviceAPI-Enderecos/service-api-enderecos.service';
import { ServiceApiEmailsService } from 'src/app/services/servicesAPI/serviceAPI-Emails/service-api-emails.service';
import { ServiceApiTelefonesService } from 'src/app/services/servicesAPI/serviceAPI-Telefones/service-api-telefones.service';
import { Estado, ServiceEstadosService } from 'src/app/services/serviceEstados/service-estados.service';

interface EstadoLocal {
  nome: string;
  uf: string;
}

interface TipoUsuario {
  nome: string;
  tipo: string;
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
  private estadosSubscription!: Subscription;

  usuarios: Usuario[] = [];
  telefones: any[] = [];
  emails: any[] = [];
  enderecos: any[] = [];

  passwordCadastro!: string;
  passwordCadastroRepetir!: string;

  telefonesFiltrados: any[] = [];
  emailsFiltrados: any[] = [];
  enderecosFiltradosEntrega: any[] = [];
  enderecosFiltradosCobranca: any[] = [];
  enderecoFiltradoSelecionado: any | null = null;
  emailsFiltradoSelecionado: any | null = null;

  usuarioSelecionado!: any;
  usuariosFiltrados: Usuario[] = [];

  botaoDiv: boolean = false;
  botaoDisabled: boolean = false;
  botaoDisabledEntrega: boolean = false;

  LoginId!: number;
  endIdCobranca!: number;
  endIdEntrega!: number;

  nome: string = '';
  email: string = '';
  cpfOuCnpj!: string;
  cep!: number | null;
  telefone!:  string;
  cidade: string = '';
  bairro: string = '';
  rua: string = '';
  numeroResidencia!: number | null;
  emailAlternativo: string = '';
  telefoneAlternativo!: string;
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
  habilitarDropdownEnderecosEntrega: boolean =  true;
  habilitarPassword: boolean = false
  habilitarBotaoEmailAlternativo = false
  habilitarBotaoTelefoneAlternativo = false

  tipoUsuario!: TipoUsuario[];
  tipoUsuarioSelecionado: TipoUsuario | null = null;
  dadoTipoUsuarioSelecionado!: string

  estado!: EstadoLocal[];
  estadoSelecionadoCobranca: EstadoLocal | null = null;
  estadoSelecionadoEntrega: EstadoLocal | null = null;

  estadosAPI: Estado[] = []

  emailValid: boolean = false;

  constructor(
    private usuariosService: ServiceUsuariosService,
    private registrar: ServiceApiRegistrarService,
    private usuarioAPIService: ServiceApiUsuariosService,
    private enderecosAPIService: ServiceApiEnderecosService,
    private emailAPIService: ServiceApiEmailsService,
    private telefoneAPIService: ServiceApiTelefonesService,
    private serviceEstado: ServiceEstadosService,
  ){}

  ngOnInit(){

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
    

    this.tipoUsuario = [
      { nome: 'Cliente', tipo: '0'},
      { nome: 'Administrador', tipo: '1' }
    ]

    // this.carregarUsuariosAPI()

    // this.carregarEstadosAPI()

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

    
    if (this.estadosSubscription) {
      this.estadosSubscription.unsubscribe();
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
      this.tipoUsuarioSelecionado = this.usuarioSelecionado.tpusuario === "1"
      ? { nome: "Administrador", tipo: "1" }
      : { nome: "Cliente", tipo: "0" };

      this.LoginId = this.usuarioSelecionado.LoginId;

      if (this.LoginId) {
        // Filtrar os arrays com base no id do usuário selecionado
        this.emailsFiltrados = this.emails.filter(email => email.LoginId === this.LoginId);
        this.telefonesFiltrados = this.telefones.filter(telefone => telefone.LoginId === this.LoginId);
        this.enderecosFiltradosCobranca = this.enderecos.filter(endereco => endereco.LoginId === this.LoginId && endereco.tpcadastro === "1");
        this.enderecosFiltradosEntrega = this.enderecos.filter(endereco => endereco.LoginId === this.LoginId && endereco.tpcadastro === "2");

        if(this.enderecosFiltradosCobranca){
          this.endIdCobranca = this.enderecosFiltradosCobranca[0].endId
          
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

      this.habilitarDropdownEnderecosEntrega = false
      this.habilitarPassword = true

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

    this.botaoDisabledEntrega = true;
  }

  emailAlternativoSelecionado(event: any) {
    this.emailAlternativo = event.value.email
    this.habilitarBotaoEmailAlternativo = true
  }

  emailAlternativoValid(): boolean {
    
    if (this.habilitarBotaoEmailAlternativo || !this.checkedRegex(this.emailAlternativo)) {
      return false;
    }
    
    return true;

  }

  emailAlternativoAtualizarValid(): boolean {
    if (!this.emailAlternativo) {
      return true; // Se o emailAlternativo não está preenchido, retorne true
    } else if (!this.checkedRegex(this.emailAlternativo)) {
      return true; // Se o emailAlternativo não cumpre o regex, retorne true
    }
    return false; // Se o emailAlternativo está preenchido e cumpre o regex, retorne false
  }

  limparCampos() {
    this.nome = '';
    this.cpfOuCnpj = '';
    this.tipoUsuarioSelecionado = null
    this.email = '';
    this.telefone = '';
    this.passwordCadastro = ''
    this.passwordCadastroRepetir = ''
    this.emailAlternativo = ''
    this.telefoneAlternativo = ''
    this.cep = null;
    this.cidade = '';
    this.estadoSelecionadoCobranca = null
    this.bairro = '';
    this.rua = '';
    this.numeroResidencia = null;
    this.complemento = '';

    this.identificacaoEndereco = '';
    this.enderecoFiltradoSelecionado = null;
    this.cepEntrega = null;
    this.cidadeEntrega = '';
    this.estadoSelecionadoEntrega = null;
    this.bairroEntrega = '';
    this.ruaEntrega = '';
    this.numeroResidenciaEntrega = null;
    this.complementoEntrega = ''


    this.habilitarPassword = false

    this.habilitarDropdownEnderecosEntrega = true
    this.botaoDisabled = false;
    this.botaoDiv = false;

  }

  limparCamposEnderecoEntrega() {
    this.identificacaoEndereco = '';
    this.enderecoFiltradoSelecionado = null;
    this.cepEntrega = null;
    this.cidadeEntrega = '';
    this.estadoSelecionadoEntrega = null;
    this.bairroEntrega = '';
    this.ruaEntrega = '';
    this.numeroResidenciaEntrega = null;
    this.complementoEntrega = ''

    this.botaoDisabledEntrega = false
  }

  limparCamposEmailAlternativo() {
    this.emailAlternativo = '';
    this.habilitarBotaoEmailAlternativo = false;
    this.emailsFiltradoSelecionado = null;
  }

  limparCamposTelefoneAlternativo() {
    this.telefoneAlternativo = '';
  }

  onKeyPressWord(event: KeyboardEvent): void {
    const allowedCharacters = /[A-Za-zÀ-ÿ'\- ]/; // Permitir letras, acentos, apóstrofos e espaços
    const inputChar = event.key;

    if (!allowedCharacters.test(inputChar)) {
      event.preventDefault();
    }
  }

  checkedRegex(email: string): boolean {
    const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.emailValid = emailPattern.test(this.email);
  }

  removeFormatoTelefone(telefone: string): string {
    return telefone.replace(/\D/g, '');
  }

  tipoUsuarioSelecionadoDropdown(event: any){
    this.tipoUsuarioSelecionado = event.value
    this.dadoTipoUsuarioSelecionado = event.value.tipo
  }

  isValid(): boolean {
    // Lógica para verificar todas as condições
    if (
      !this.nome ||
      !this.cpfOuCnpj ||
      !this.dadoTipoUsuarioSelecionado ||
      !this.emailValid ||
      !this.telefone ||
      !this.passwordCadastro ||
      !this.passwordCadastroRepetir ||
      (this.passwordCadastro !== this.passwordCadastroRepetir) ||
      !this.cep ||
      !this.cidade ||
      !this.estadoSelecionadoCobranca ||
      !this.bairro ||
      !this.rua ||
      !this.numeroResidencia ||
      !this.complemento
    ) {
      return false;
    }


    if (this.habilitarEmailAlternativo === true && !this.emailAlternativo) {
      if (!this.checkedRegex(this.emailAlternativo)) {
        return false;
      }
    }

    if(this.habilitarTelefoneAlternativo === true &&
      !this.telefoneAlternativo) {
        return false;
    }

    if(this.habilitarEnderecoEntrega === true && 
      !this.identificacaoEndereco ||
      !this.cepEntrega ||
      !this.cidadeEntrega ||
      !this.estadoSelecionadoEntrega ||
      !this.bairroEntrega ||
      !this.ruaEntrega ||
      !this.numeroResidenciaEntrega ||
      !this.complementoEntrega){
        return false;
      }

    return true;
  }

  private async atualizarPagina() {
    //RECARREGAR PÁGINA PARA ATUALIZAR VALORES DO ARRAY
    setTimeout(() => {
      location.reload();
    }, 2000);
  }

  // ========================================================= //
  // API

  // USER
  cadastrarUsuario(){

    if (this.estadoSelecionadoCobranca) {
      const estadoEncontrado = this.estadosAPI.find(
        (estado) => estado.UfId === this.estadoSelecionadoCobranca!.uf
      );

      if (estadoEncontrado) {

        const dataLogin = {
          nome: this.nome,
          senha: this.passwordCadastro,
          tpusuario: this.dadoTipoUsuarioSelecionado,
          emailprinc: this.email,
          cpf: this.cpfOuCnpj,
        }
    
        this.registrar.registrar(dataLogin).subscribe(response => {
    
          console.log("Usuário cadastrado com sucesso")
    
          const LoginId = response.LoginId;
    
          const telefonePrincipal = this.removeFormatoTelefone(this.telefone);
    
          const dataTelefone = {
            LoginId: LoginId,
            telefone: telefonePrincipal,
          }
    
          this.registrar.registrarTelefone(dataTelefone).subscribe(response => {
              console.log("Telefone adicionado com sucesso", response)
            },
            (error) => {
              console.log("Erro ao cadastrar telefone principal", error)
            }
          );
    
          if (this.habilitarEmailAlternativo === true && this.emailAlternativo) {
    
            const dataEmailAlternativo = {
              LoginId: LoginId,
              email: this.emailAlternativo
            };
    
            this.registrar.registrarEmails(dataEmailAlternativo).subscribe(
              (response) => {
                console.log("Email alternativo cadastrado com sucesso", response);
              },
              (error) => {
                console.log("Erro ao cadastrar email alternativo", error);
              }
            );
          } else {
            console.log("O campo emailCadastroSecundario está vazio, email alternativo não cadastrado.");
          }
    
          if (this.habilitarTelefoneAlternativo === true &&
            this.telefoneAlternativo) {
    
            const telefoneAlternativo = this.removeFormatoTelefone(this.telefoneAlternativo);
    
            const dataTelefoneAlternativo = {
              LoginId: LoginId,
              telefone: telefoneAlternativo,
            }
    
            this.registrar.registrarTelefone(dataTelefoneAlternativo).subscribe(
              (response) => {
                console.log("Telefone alternativo cadastrado com sucesso", response);
              },
              (error) => {
                console.log("Erro ao cadastrar telefone alternativo");
              }
            );
          } else {
            console.log("O campo telefoneSecundario está vazio, telefone alternativo não cadastrado.");
          }
    
          const dataEnderecoCobranca = {
            LoginId: LoginId,
            tpcadastro: "1",
            cep: this.cep,
            bairro: this.bairro,
            cidade: this.cidade,
            UfId: this.estadoSelecionadoCobranca!.uf,
            endereco: this.rua,
            complemento: this.complemento,
            numeroresidencia: this.numeroResidencia,
            identificacao: "Endereço de Cobrança"
          }
    
          this.registrar.registrarEndereco(dataEnderecoCobranca).subscribe(response => {
            console.log("Endereço de cobrança adicionado com sucesso", response)
          });
    
          if(this.habilitarEnderecoEntrega === true &&
            this.identificacaoEndereco &&
            this.cepEntrega &&
            this.cidadeEntrega &&
            this.bairroEntrega &&
            this.ruaEntrega &&
            this.numeroResidenciaEntrega &&
            this.complementoEntrega){
    
            const dataEnderecoEntrega = {
              LoginId: LoginId,
              tpcadastro: "2",
              cep: this.cepEntrega,
              bairro: this.bairroEntrega,
              cidade: this.cidadeEntrega,
              UfId: this.estadoSelecionadoEntrega!.uf,
              endereco: this.ruaEntrega,
              complemento: this.complementoEntrega,
              numeroresidencia: this.numeroResidenciaEntrega,
              identificacao: this.identificacaoEndereco
            }
    
            this.registrar.registrarEndereco(dataEnderecoEntrega).subscribe(response => {
              console.log("Endereço de entrega adicionado com sucesso", response)
            },
            (error) => {
              console.log("Erro ao cadastrar endereço de entrega", error)
            });
          }
        }, (error) => {
          console.log("Erro ao cadastrar usuário", error)
        });
    
        this.habilitarDropdownEnderecosEntrega = false
        this.atualizarPagina();


      } else {
        console.log('Estado selecionado não está na lista de estados válidos.');
      }
    }
    
  }

  atualizarUsuario(){

    if (this.estadoSelecionadoCobranca) {
      const estadoEncontrado = this.estadosAPI.find(
        (estado) => estado.UfId === this.estadoSelecionadoCobranca!.uf
      );

      if (estadoEncontrado) {
        
        const LoginId = this.LoginId
        const endIdCobranca = this.endIdCobranca

        const novoDataLogin = {
          nome: this.nome,
          tpusuario: this.dadoTipoUsuarioSelecionado,
          emailprinc: this.email,
          cpf: this.cpfOuCnpj,
        }

        this.usuarioAPIService.atualizarUsuario(LoginId, novoDataLogin).subscribe((response) => {
          console.log("Usuário atualizado com sucesso", response)

          const novoDataEndCobranca = {
            tpcadastro: "1",
            cep: this.cep,
            cidade: this.cidade,
            bairro: this.bairro,
            UfId: this.estadoSelecionadoCobranca!.uf,
            endereco: this.rua,
            numeroresidencia: this.numeroResidencia,
            complemento: this.complemento,
          }

          this.enderecosAPIService.atualizarEnderecos(endIdCobranca, novoDataEndCobranca).subscribe((response) => {
            console.log("Endereço de cobrança atualizado com sucesso", response)
            this.atualizarPagina();
          },
          (error) => {
            console.log("Erro ao atualizar endereço de cobrança", error)
          })
        },
        (error) => {
          console.log("Erro ao atualizar Usuário", error)
        })

      } else {
        console.log('Estado selecionado não está na lista de estados válidos.');
      }
    }

  }

  async excluirLogin() {
    console.log("4")
    try {
        const LoginId = this.LoginId;
        const response = await this.usuarioAPIService.excluirUsuario(LoginId).toPromise();
        console.log("Usuário excluído com sucesso", response);
    } catch (error) {
        console.log("Erro ao excluir o usuário", error);
        // Trate o erro ou rejeite a Promise, se necessário
    }
  }

  async excluirUsuario() {
    try {
        await this.excluirTodosEmailsAlternativo();
        await this.excluirTodosEnderecos();
        await this.excluirTodosTelefonesAlternativo();
        await this.excluirLogin();
        await this.atualizarPagina();
        console.log('Usuário excluído com sucesso');
    } catch (error) {
        console.error('Erro ao excluir o usuário:', error);
    }
  }

  // ========================================================= //
  // EMAIL
  cadastrarEmailAlternativo(){

    const LoginId = this.LoginId

    const dataEmailAlternativo = {
      LoginId: LoginId,
      email: this.emailAlternativo
    };

    this.registrar.registrarEmails(dataEmailAlternativo).subscribe(
      (response) => {
        console.log("Email alternativo cadastrado com sucesso", response);
        this.atualizarPagina();
      },
      (error) => {
        console.log("Erro ao cadastrar email alternativo", error);
      }
    );

    
  }

  atualizarEmailAlternativo(){

    const emailId = this.emailsFiltradoSelecionado.emailId

    const dataNovoEmailAlternativo = {
      email: this.emailAlternativo
    }

    this.emailAPIService.atualizarEmails(emailId, dataNovoEmailAlternativo).subscribe((response) => {
      console.log("Email alternativo atualizado com sucesso", response)
      this.atualizarPagina();
    },
    (error) => {
      console.log("Erro ao atualizar email alternativo", error)
    })

    
  }

  async excluirTodosEmailsAlternativo() {
    console.log("1");
    for (let i = 0; i < this.emailsFiltrados.length; i++) {
        console.log(this.emailsFiltrados[i].emailId);
        try {
            await this.emailAPIService.excluirEmails(this.emailsFiltrados[i].emailId).toPromise();
            console.log("Email alternativo excluído com sucesso");
        } catch (error) {
            console.log("Erro ao excluir o email alternativo", error);
            // Trate o erro ou rejeite a Promise, se necessário
        }
    }
  }

  excluirUnicoEmailAlternativo(){

    const emailId = this.emailsFiltradoSelecionado.emailId

    this.emailAPIService.excluirEmails(emailId).subscribe((response) => {
      console.log("Email alternativo excluído com sucesso.", response)
      this.atualizarPagina();
    },
    (error) => {
      console.log("Erro ao excluir endereço alternativo", error)
    })

  }

  // ========================================================= //
  // TELEFONE
  cadastrarTelefoneAlternativo(){

    const LoginId = this.LoginId

    const dataTelefoneAlternativo = {
      LoginId: LoginId,
      telefone: this.telefoneAlternativo
    };

    this.registrar.registrarTelefone(dataTelefoneAlternativo).subscribe(
      (response) => {
        console.log("Telefone alternativo cadastrado com sucesso", response);
        this.atualizarPagina();
      },
      (error) => {
        console.log("Erro ao cadastrar Telefone alternativo", error);
      }
    );
  }

  // atualizarTelefoneAlternativo(){

  //   const emailId = this.emailsFiltradoSelecionado.emailId

  //   const dataNovoEmailAlternativo = {
  //     email: this.emailAlternativo
  //   }

  //   this.emailAPIService.atualizarEmails(emailId, dataNovoEmailAlternativo).subscribe((response) => {
  //     console.log("Email alternativo atualizado com sucesso", response)
  //   },
  //   (error) => {
  //     console.log("Erro ao atualizar email alternativo", error)
  //   })

  //   this.atualizarPagina();
  // }

  async excluirTodosTelefonesAlternativo() {
    console.log("3");
    for (let i = 0; i < this.telefonesFiltrados.length; i++) {
        console.log(this.telefonesFiltrados[i].contId);
        try {
            await this.telefoneAPIService.excluirTelefones(this.telefonesFiltrados[i].contId).toPromise();
            console.log("Telefone alternativo excluído com sucesso");
        } catch (error) {
            console.log("Erro ao excluir o telefone alternativo", error);
            // Trate o erro ou rejeite a Promise, se necessário
        }
    }
  }

  // excluirUnicoTelefoneAlternativo(){}

  // ========================================================= //
  // ENDEREÇO
  
  cadastrarEnderecoEntrega(){

    if (this.estadoSelecionadoEntrega) {
      const estadoEncontrado = this.estadosAPI.find(
        (estado) => estado.UfId === this.estadoSelecionadoEntrega!.uf
      );
      if (estadoEncontrado) {
        
        const LoginId = this.LoginId

        const dataEnderecoEntrega = {
          LoginId: LoginId,
          tpcadastro: "2",
          identificacao: this.identificacaoEndereco,
          cep: this.cepEntrega,
          cidade: this.cidadeEntrega,
          UfId: this.estadoSelecionadoEntrega!.uf,
          bairro: this.bairroEntrega,
          endereco: this.ruaEntrega,
          numeroresidencia: this.numeroResidenciaEntrega,
          complemento: this.complementoEntrega
        }
    
        this.registrar.registrarEndereco(dataEnderecoEntrega).subscribe(response => {
          console.log("Endereço de entrega adicionado com sucesso")
          this.atualizarPagina();
        },
        (error) => {
          console.log("Erro ao adicionar endereço de entrega", error)
        });
      } else {
        console.log('Estado selecionado não está na lista de estados válidos.');
      }
    }
    
  }

  atualizarEnderecoEntrega(){

    if (this.estadoSelecionadoEntrega) {
      const estadoEncontrado = this.estadosAPI.find(
        (estado) => estado.UfId === this.estadoSelecionadoEntrega!.uf
      );
      if (estadoEncontrado) {

        const endId = this.enderecoFiltradoSelecionado.endId

        const dataNovoEnderecoEntrega = {
          identificacao: this.identificacaoEndereco,
          cep: this.cepEntrega,
          cidade: this.cidadeEntrega,
          UfId: this.estadoSelecionadoEntrega!.uf,
          bairro: this.bairroEntrega,
          endereco: this.ruaEntrega,
          numeroresidencia: this.numeroResidenciaEntrega,
          complemento: this.complementoEntrega
        }

        this.enderecosAPIService.atualizarEnderecos(endId, dataNovoEnderecoEntrega).subscribe((response) => {
          console.log("Endereço de entrega atualizado com sucesso", response)
          this.atualizarPagina();
        },
        (error) => {
          console.log("Erro ao atualizar endereço de entrega", error)
        })

      } else {
        console.log('Estado selecionado não está na lista de estados válidos.');
      }
    }


    

    
  }

  async excluirTodosEnderecos() {
    console.log("2");
    for (let i = 0; i < this.enderecosFiltradosEntrega.length; i++) {
        console.log(this.enderecosFiltradosEntrega[i].endId);
        try {
            await this.enderecosAPIService.excluirEnderecos(this.enderecosFiltradosEntrega[i].endId).toPromise();
            console.log("Endereço de entrega excluído com sucesso");
        } catch (error) {
            console.log("Erro ao excluir o endereço de entrega", error);
            // Trate o erro ou rejeite a Promise, se necessário
        }
    }

    console.log("Endereço de Cobrança:");
    for (let i = 0; i < this.enderecosFiltradosCobranca.length; i++) {
        console.log(this.enderecosFiltradosCobranca[i].endId);
        try {
            await this.enderecosAPIService.excluirEnderecos(this.enderecosFiltradosCobranca[i].endId).toPromise();
            console.log("Endereço de cobrança excluído com sucesso");
        } catch (error) {
            console.log("Erro ao excluir o endereço de cobrança", error);
            // Trate o erro ou rejeite a Promise, se necessário
        }
    }
  }

  excluirUnicoEnderecoEntrega(){

    const endId = this.enderecoFiltradoSelecionado.endId

    this.enderecosAPIService.excluirEnderecos(endId).subscribe((response) => {
      console.log("Endereço de entrega excluído com sucesso", response)
      this.atualizarPagina();
    },
    (error) => {
      console.log("Erro ao excluir endereço de entrega", error)
    })

  }

  // ========================================================= //

}
