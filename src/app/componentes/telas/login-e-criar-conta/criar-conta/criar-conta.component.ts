import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceApiRegistrarService } from 'src/app/services/servicesAPI/serviceAPI-Registrar/service-api-registrar.service';

interface Estado {
  nome: string;
  uf: string;
}

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent {

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
  estado!: Estado[];
  estadoSelecionado!: Estado;
  complemento!: string;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
    
  }

  constructor(
    private registrar: ServiceApiRegistrarService,
    private router: Router,
  ){}

  cadastrar(){

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
          // UfId: this.estadoSelecionado.uf
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
          // UfId: this.estadoSelecionado.uf
          endereco: this.endereco,
          complemento: this.complemento,
          numeroresidencia: this.numeroResidencia,
          identificacao: "Endereço de Entrega Padrão"
        }

        this.registrar.registrarEndereco(dataEnderecoEntrega).subscribe(response => {
          console.log("Endereço de entrega adicionado com sucesso")
        });


      // })

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
    });
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
