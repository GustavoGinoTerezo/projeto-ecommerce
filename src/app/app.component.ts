import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceCategoriasService } from './services/serviceCategorias/service-categorias.service';
import { ServiceUsuarioLogadoService } from './services/serviceUsuarioLogado/service-usuario-logado.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce';

  usuario: boolean = false;
  administrador: boolean = false;

  mostrarLateralUsuario: boolean = false;
  mostrarLateralAdministrador: boolean = false;

  constructor(
    private router: Router,
    private categoriasService: ServiceCategoriasService,
    private mostrarLateraisService: ServiceUsuarioLogadoService,
  ) {}

  ngOnInit(){

    this.categoriasService.atualizarCategoriasDaAPI();

    this.ativarLateral()
  }

  ativarLateral(){
    const tpusuario = sessionStorage.getItem('tpu')

    if(tpusuario === "0"){
      console.log("Aqui é o tpusuario", tpusuario)
      this.mostrarLateraisService.getMostrarLateralUsuario().subscribe((value: boolean) => {
        this.mostrarLateralUsuario = value;
      });
    } else if (tpusuario === "1"){
      this.mostrarLateraisService.getMostrarLateralAdministrador().subscribe((value: boolean) => {
        this.mostrarLateralAdministrador = value;
      });
      this.mostrarLateraisService.getMostrarLateralUsuario().subscribe((value: boolean) => {
        this.mostrarLateralUsuario = value;
      });
    }
  }

  acaoDoBotao() {
    window.open('https://api.whatsapp.com/send?phone=5519989937300', '_blank');
  }
}
