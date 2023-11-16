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
  cor4: string = ''; 
  cor5: string = '';
  cor6: string = '';
  cor7: string = ''; 
  cor8: string = '';
  cor9: string = '';
  cor10: string = '';
  cor11: string = '';

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
      estilo.setProperty('--scrollbar', novaCor);
    });

    this.colorService.ton4$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--textos-e-icones-botoes', novaCor);
    });

    this.colorService.ton5$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--background-botoes', novaCor);
    });

    this.colorService.ton6$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--hover-background-botoes', novaCor);
    });

    this.colorService.ton7$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--container-externo-cards-produtos', novaCor);
    });

    this.colorService.ton8$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--container-interno-cards-produtos', novaCor);
    });

    this.colorService.ton9$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--borda-dos-containers', novaCor);
    });

    this.colorService.ton10$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--background-das-divs-da-categoria', novaCor);
    });

    this.colorService.ton11$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--cor-valor-total', novaCor);
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

  atualizarCor4(novaCor: any) {
    if (novaCor && novaCor.value) {
      const corSelecionada = novaCor.value;
      this.colorService.atualizarTon4(corSelecionada);

    }
  }

  atualizarCor5(novaCor: any) {
    if (novaCor && novaCor.value) {
      const corSelecionada = novaCor.value;
      this.colorService.atualizarTon5(corSelecionada);

    }
  }

  atualizarCor6(novaCor: any) {
    if (novaCor && novaCor.value) {
      const corSelecionada = novaCor.value;
      this.colorService.atualizarTon6(corSelecionada);

    }
  }

  atualizarCor7(novaCor: any) {
    if (novaCor && novaCor.value) {
      const corSelecionada = novaCor.value;
      this.colorService.atualizarTon7(corSelecionada);

    }
  }

  atualizarCor8(novaCor: any) {
    if (novaCor && novaCor.value) {
      const corSelecionada = novaCor.value;
      this.colorService.atualizarTon8(corSelecionada);

    }
  }

  atualizarCor9(novaCor: any) {
    if (novaCor && novaCor.value) {
      const corSelecionada = novaCor.value;
      this.colorService.atualizarTon9(corSelecionada);

    }
  }

  atualizarCor10(novaCor: any) {
    if (novaCor && novaCor.value) {
      const corSelecionada = novaCor.value;
      this.colorService.atualizarTon10(corSelecionada);

    }
  }

  atualizarCor11(novaCor: any) {
    if (novaCor && novaCor.value) {
      const corSelecionada = novaCor.value;
      this.colorService.atualizarTon11(corSelecionada);

    }
  }

}
