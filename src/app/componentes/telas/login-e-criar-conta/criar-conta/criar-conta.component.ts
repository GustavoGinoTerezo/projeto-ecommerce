import { Component } from '@angular/core';
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
  cpfOuCnpj!: number;
  telefonePrincipal!: string;
  telefoneSecundario!: string;
  endereco!: string;
  bairro!: string;
  cidade!: string;
  passwordCadastro!: string;
  passwordCadastroRepetir!: string;
  checked: boolean = false;

  checkbox: boolean = false
  checkboxTelefone: boolean = false

  estado!: Estado[];
  estadoSelecionado!: Estado;

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

      // Supondo que a resposta contenha o ID do login

      // const dataUf = {
      //   UfId: this.estadoSelecionado.uf,
      //   icms: this.estadoSelecionado.icms,
      //   nome: this.estadoSelecionado.nome
      // }

      // this.registrar.registrarUf(dataUf).subscribe(response => {

        // const ufId = response.UfId;

        const dataEndereco = {
          LoginId: LoginId,
          tpcadastro: "0",
          endereco: this.endereco,
          cidade: this.cidade,
          bairro: this.bairro,
          // UfId: ufId
        }

        this.registrar.registrarEndereco(dataEndereco).subscribe(response => {
          console.log("Endereço adicionado com sucesso")
        });

      // })



      const telefonePrincipalSemFormato = this.removeFormatoTelefone(this.telefonePrincipal);

      const dataTelefone = {
        LoginId: LoginId,
        telefone: telefonePrincipalSemFormato,
      }

      this.registrar.registrarTelefone(dataTelefone).subscribe(result => {
        console.log("Telefone adicionado com sucesso")
      });

    });
  }

  removeFormatoTelefone(telefone: string): string {
    return telefone.replace(/\D/g, '');
  }

  onKeyPress(event: KeyboardEvent) {
    const allowedChars = /[0-9]/g; // Expressão regular para permitir apenas números

    const inputChar = event.key;

    if (!inputChar.match(allowedChars)) {
      event.preventDefault(); // Impede a entrada de caracteres não numéricos
    }
  }


}
