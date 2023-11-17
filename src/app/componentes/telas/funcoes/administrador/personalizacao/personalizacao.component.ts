import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { ServiceColorPickerService } from 'src/app/services/serviceColorPicker/service-color-picker.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-personalizacao',
  templateUrl: './personalizacao.component.html',
  styleUrls: ['./personalizacao.component.css']
})
export class PersonalizacaoComponent {

  private subscriptions: Subscription[] = [];

  @ViewChild('banners') banners!: Table;

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

  uploadedFiles: any[] = [];

  tipoBanner!: any[]
  tipoBannerSelecionado: any;

  bannersAPI!: any[]

  constructor(private colorService: ServiceColorPickerService ) {}

  //ligando a cor escolhida até styles.css
  ngOnInit() {

    this.tipoBanner = [
      {
        tipo: 0,
        nome: "Principal"
      },
      {
        tipo: 1,
        nome: "Intermediário"
      },
      {
        tipo: 2,
        nome: "Pequeno"
      }
    ]

    this.subscriptions.push(this.colorService.ton1$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--background', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton2$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--background', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton3$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--background', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton4$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--background', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton5$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--background', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton6$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--background', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton7$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--background', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton8$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--background', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton9$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--background', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton10$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--background', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton11$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--background', novaCor);
    }));
  }

  ngOnDestroy() {
    // Cancela a inscrição ao destruir o componente
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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

  onUpload(event:UploadEvent) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
  }
  
  bannerSelecionado(event: any) {
    this.tipoBannerSelecionado = event.value;
  }

  filterTableBanners(event: any) {
    const filterValue = event.target.value.toLowerCase(); // Obtém o valor do campo de pesquisa em minúsculas
    this.banners.filter(filterValue, 'nome', 'contains'); // Aplica o filtro na coluna 'nome' que contém o valor
  }

  
  atualizarInputComBannerSelecionado (banner: any) {
    
    // this.nfEntradaId = nota.NfEntradaID
    // this.numeroNotaFiscalGerenciamento = nota.numeroNota

    // this.ativarBotoes = false
  }

}
