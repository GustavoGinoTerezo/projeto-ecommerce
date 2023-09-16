import { Component } from '@angular/core';
import { ServiceRegistrarService } from 'src/app/services/servicesAPI/serviceRegistrar/service-registrar.service';

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
      { nome: 'Acre', uf: 'AC' },
      { nome: 'Alagoas', uf: 'AL' },
      { nome: 'Amapá', uf: 'AP' },
      { nome: 'Amazonas', uf: 'AM' },
      { nome: 'Bahia', uf: 'BA' },
      { nome: 'Ceará', uf: 'CE' },
      { nome: 'Distrito Federal', uf: 'DF' },
      { nome: 'Espírito Santo', uf: 'ES' },
      { nome: 'Goiás', uf: 'GO' },
      { nome: 'Maranhão', uf: 'MA' },
      { nome: 'Mato Grosso', uf: 'MT' },
      { nome: 'Mato Grosso do Sul', uf: 'MS' },
      { nome: 'Minas Gerais', uf: 'MG' },
      { nome: 'Pará', uf: 'PA' },
      { nome: 'Paraíba', uf: 'PB' },
      { nome: 'Paraná', uf: 'PR' },
      { nome: 'Pernambuco', uf: 'PE' },
      { nome: 'Piauí', uf: 'PI' },
      { nome: 'Rio de Janeiro', uf: 'RJ' },
      { nome: 'Rio Grande do Norte', uf: 'RN' },
      { nome: 'Rio Grande do Sul', uf: 'RS' },
      { nome: 'Rondônia', uf: 'RO' },
      { nome: 'Roraima', uf: 'RR' },
      { nome: 'Santa Catarina', uf: 'SC' },
      { nome: 'São Paulo', uf: 'SP' },
      { nome: 'Sergipe', uf: 'SE' },
      { nome: 'Tocantins', uf: 'TO' }
    ];

  }

  constructor(
    private registrar: ServiceRegistrarService,
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

      const ufSelecionado = this.estadoSelecionado.uf;

      const dataEndereco = {
        LoginId: LoginId,
        tpcadastro: "1",
        endereco: this.endereco,
        cidade: this.cidade,
        bairro: this.bairro,
        Uf: ufSelecionado,
      }

      this.registrar.registrarEndereco(dataEndereco).subscribe(result => {
        console.log("Endereço adicionado com sucesso")
      });

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
