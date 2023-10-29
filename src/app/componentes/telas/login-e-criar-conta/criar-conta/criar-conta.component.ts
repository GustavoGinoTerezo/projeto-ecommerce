import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Estado, ServiceEstadosService } from 'src/app/services/serviceEstados/service-estados.service';
import { ServiceApiRegistrarService } from 'src/app/services/servicesAPI/serviceAPI-Registrar/service-api-registrar.service';

interface EstadoLocal {
  nome: string;
  uf: string;
}

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent {

  private estadosSubscription!: Subscription;

  emailCadastroPrincipal!: string;
  emailCadastroSecundario!: string;
  nomeCompleto!: string;
  telefonePrincipal!: string;
  telefoneSecundario!: string;
  cpfOuCnpj!: string;
  endereco!: string;
  bairro!: string;
  cidade!: string;
  passwordCadastro!: string;
  passwordCadastroRepetir!: string;
  checked: boolean = false;
  cep!: number | null
  checkbox: boolean = false
  checkboxTelefone: boolean = false
  numeroResidencia!: number;
  estado!: EstadoLocal[];
  estadoSelecionado!: EstadoLocal;
  complemento!: string;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  estadosAPI: Estado[] = []

  constructor(
    private registrar: ServiceApiRegistrarService,
    private router: Router,
    private serviceEstado: ServiceEstadosService,
    private messageService: MessageService,
    private appToast: AppComponent
  ){}

  ngOnInit() {

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

    if (this.estadosSubscription) {
      this.estadosSubscription.unsubscribe();
    }

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

  cadastrar(){

    if (this.estadoSelecionado) {
      const estadoEncontrado = this.estadosAPI.find(
        (estado) => estado.UfId === this.estadoSelecionado.uf
      );

      if (estadoEncontrado) {
        
        const dataLogin = {
          nome: this.nomeCompleto,
          senha: this.passwordCadastro,
          tpusuario: "0",
          emailprinc: this.emailCadastroPrincipal,
          cpf: this.cpfOuCnpj,
        }
    
        this.registrar.registrar(dataLogin).subscribe(response => {
    
          console.log("Usuário cadastrado com sucesso")
    
          const LoginId = response.LoginId;
          const access_token = response.access_token;
    
          console.log(access_token)
          console.log(LoginId)
    
          if (this.emailCadastroSecundario) {
            const dataEmailAlternativo = {
              LoginId: LoginId,
              email: this.emailCadastroSecundario
            };
    
            this.registrar.registrarEmails(dataEmailAlternativo).subscribe(
              (response) => {
                console.log("Email alternativo cadastrado com sucesso", response);
              },
              (error) => {
                console.log("Erro ao cadastrar email alternativo");
              }
            );
          } else {
            console.log("O campo emailCadastroSecundario está vazio, email alternativo não cadastrado.");
          }
    
    
            const dataEnderecoCobranca = {
              LoginId: LoginId,
              tpcadastro: "1",
              cep: this.cep,
              bairro: this.bairro,
              cidade: this.cidade,
              UfId: this.estadoSelecionado.uf,
              endereco: this.endereco,
              complemento: this.complemento,
              numeroresidencia: this.numeroResidencia,
              identificacao: "Endereço de Cobrança"
            }
    
            this.registrar.registrarEndereco(dataEnderecoCobranca).subscribe(response => {
              console.log("Endereço de cobrança adicionado com sucesso")
            });
    
            const dataEnderecoEntrega = {
              LoginId: LoginId,
              tpcadastro: "2",
              cep: this.cep,
              bairro: this.bairro,
              cidade: this.cidade,
              UfId: this.estadoSelecionado.uf,
              endereco: this.endereco,
              complemento: this.complemento,
              numeroresidencia: this.numeroResidencia,
              identificacao: "Endereço de Entrega Padrão"
            }
    
            this.registrar.registrarEndereco(dataEnderecoEntrega).subscribe(response => {
              console.log("Endereço de entrega adicionado com sucesso")
            });
        
          const telefonePrincipal = this.removeFormatoTelefone(this.telefonePrincipal);
    
          const dataTelefone = {
            LoginId: LoginId,
            telefone: telefonePrincipal,
          }
    
          this.registrar.registrarTelefone(dataTelefone).subscribe(result => {
            console.log("Telefone adicionado com sucesso")
          },
          (error) => {
            console.log("Erro ao cadastrar telefone principal")
          }
          );
    
          if (this.telefoneSecundario) {
    
          const telefoneAlternativo = this.removeFormatoTelefone(this.telefoneSecundario);
    
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
    
        }, (error) => {
          console.log(error)

          const tipo = 'error'
          const titulo = ''
          const mensagem = 'Problema ao cadastrar. Tente novamente mais tarde.'
          const icon = 'fa-solid fa-face-frown'

          this.appToast.toast(tipo, titulo, mensagem, icon);
        });
      } else {
        const tipo = 'error'
        const titulo = ''
        const mensagem = 'O estado selecionado ainda não está disponível para atendimento. Entre em contato conosco para mais informações.'
        const icon = 'fa-solid fa-face-frown'

        this.appToast.toast(tipo, titulo, mensagem, icon);
      }
    }


    const tipo = 'success'
    const titulo = ''
    const mensagem = 'Cadastro efetuado com sucesso'
    const icon = 'fa-solid fa-check'

    this.appToast.toast(tipo, titulo, mensagem, icon);

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000); 


  }

  removeFormatoTelefone(telefone: string): string {
    return telefone.replace(/\D/g, '');
  }

  checkedRegex(email: string): boolean {
    const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  navigateLogin(){
    this.router.navigate(['/login']);
  }

  onKeyPressWord(event: KeyboardEvent): void {
    const allowedCharacters = /[A-Za-zÀ-ÿ'\- ]/; // Permitir letras, acentos, apóstrofos e espaços
    const inputChar = event.key;

    if (!allowedCharacters.test(inputChar)) {
      event.preventDefault();
    }
  }

  onKeyPress(event: KeyboardEvent) {
    const allowedChars = /[0-9]/g; // Expressão regular para permitir apenas números

    const inputChar = event.key;

    if (!inputChar.match(allowedChars)) {
      event.preventDefault(); // Impede a entrada de caracteres não numéricos
    }
  }

  isValid(): boolean {
    // Lógica para verificar todas as condições
    if (
      !this.emailCadastroPrincipal ||
      !this.nomeCompleto ||
      !this.cpfOuCnpj ||
      !this.telefonePrincipal ||
      !this.endereco ||
      !this.bairro ||
      !this.cidade ||
      !this.estado ||
      (this.passwordCadastro !== this.passwordCadastroRepetir) ||
      !this.passwordCadastro ||
      !this.passwordCadastroRepetir ||
      !this.checked
    ) {
      return false;
    }

    if (this.checkbox) {
      if (!this.checkedRegex(this.emailCadastroSecundario)) {
        return false;
      }
    }

    if (this.checkboxTelefone) {
      if (!this.telefoneSecundario) {
        return false;
      }
    }

    return true;
  }




}
