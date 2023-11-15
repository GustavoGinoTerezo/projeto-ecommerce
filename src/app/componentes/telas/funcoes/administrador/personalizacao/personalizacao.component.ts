import { Component } from '@angular/core';
import { ServiceColorPickerService } from 'src/app/services/serviceColorPicker/service-color-picker.service';

@Component({
  selector: 'app-personalizacao',
  templateUrl: './personalizacao.component.html',
  styleUrls: ['./personalizacao.component.css']
})
export class PersonalizacaoComponent {

  cor1: string = ''; 
  cor2: string = '';
  cor3: string = '';

  constructor(private colorService: ServiceColorPickerService ) {}

  //ligando a cor escolhida até styles.css
  ngOnInit() {
    this.colorService.ton1$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--background', novaCor);
    });

    this.colorService.ton2$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--header-rodape', novaCor);
    });

    this.colorService.ton3$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--textos-e-icones-botoes', novaCor);
    });
  }

  //Atualizando cores
  atualizarCor1(novaCor: any) {
    if (novaCor && novaCor.value) {
      const corSelecionada = novaCor.value;
      this.colorService.atualizarTon1(corSelecionada);

    }
  }

  atualizarCor2(novaCor: any) {
    if (novaCor && novaCor.value) {
      const corSelecionada = novaCor.value;
      this.colorService.atualizarTon2(corSelecionada);

    }
  }

  atualizarCor3(novaCor: any) {
    if (novaCor && novaCor.value) {
      const corSelecionada = novaCor.value;
      this.colorService.atualizarTon3(corSelecionada);

    }
  }

}
