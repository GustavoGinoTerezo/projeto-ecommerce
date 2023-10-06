import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceApiRegistrarService } from 'src/app/services/servicesAPI/serviceAPI-Registrar/service-api-registrar.service';

interface Estado {
  nome: string;
  uf: string;
  icms: number;
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
  cpfOuCnpj!: number;
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



      // Supondo que a resposta contenha o ID do login

      // const dataUf = {
      //   UfId: this.estadoSelecionado.uf,
      //   icms: this.estadoSelecionado.icms,
      //   nome: this.estadoSelecionado.nome
      // }

      // this.registrar.registrarUf(dataUf).subscribe(response => {

        // const ufId = response.UfId;

        const dataEnderecoCobranca = {
          LoginId: LoginId,
          tpcadastro: "1",
          endereco: this.endereco,
          cidade: this.cidade,
          bairro: this.bairro,
          // UfId: ufId
        }

        this.registrar.registrarEndereco(dataEnderecoCobranca).subscribe(response => {
          console.log("Endereço de cobrança adicionado com sucesso")
        });

        const dataEnderecoEntrega = {
          LoginId: LoginId,
          tpcadastro: "2",
          endereco: this.endereco,
          cidade: this.cidade,
          bairro: this.bairro,
          // UfId: ufId
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

    });
  }

  removeFormatoTelefone(telefone: string): string {
    return telefone.replace(/\D/g, '');
  }

  checkedRegex(email: string): boolean {
    const regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
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

}
