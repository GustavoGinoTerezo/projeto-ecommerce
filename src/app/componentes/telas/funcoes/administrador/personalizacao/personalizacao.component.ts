import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { ServiceBannerService } from 'src/app/services/serviceBanner/service-banner.service';
import { ServiceColorPickerService } from 'src/app/services/serviceColorPicker/service-color-picker.service';
import { ServiceApiBannerService } from 'src/app/services/servicesAPI/serviceAPI-Banner/service-api-banner.service';
import { ServiceUrlGlobalService } from 'src/app/services/servicesAPI/serviceUrlGlobal/service-url-global.service';

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

  private destroy$ = new Subject<void>();

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

  bannersFotos: any[] = [];

  tipoBanner!: any[]
  tipoBannerSelecionado: any;

  tpbanner!: string;

  bannersAPI!: any[]

  constructor(
    private colorService: ServiceColorPickerService,
    private bannerService: ServiceBannerService,
    private bannerServiceAPI: ServiceApiBannerService,
    private urlGlobal: ServiceUrlGlobalService,
    private appToast: AppComponent,
    ) {}

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
      estilo.setProperty('--header-rodape', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton3$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--scrollbar', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton4$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--textos-e-icones-botoes', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton5$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--background-botoes', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton6$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--hover-background-botoes', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton7$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--container-externo-cards-Banners', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton8$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--container-interno-cards-Banners', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton9$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--borda-dos-containers', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton10$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--background-das-divs-da-categoria', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton11$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--cor-valor-total', novaCor);
    }));

    this.bannerService.inicializacaoConcluida$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.carregarBanners();
      });
  }

  ngOnDestroy() {
    
    this.subscriptions.forEach(subscription => subscription.unsubscribe());

    this.destroy$.next();
    this.destroy$.complete();

  }

  private atualizarPagina() {
    //RECARREGAR PÁGINA PARA ATUALIZAR VALORES DO ARRAY
    setTimeout(() => {
      location.reload();
    }, 2000);
  }

  carregarBanners() {
    this.bannerService.getBanners().subscribe(banners => {
      this.bannersAPI = banners

      console.log(this.bannersAPI)
    });
  }

  getImagemBanner(imagem: any): string {
    const url = this.urlGlobal.url;
    const endpoint = 'fotos/';
    return `${url}${endpoint}${imagem.nomefoto}`;
  }

  getTipoBanner(tipo: string): string {
    const tipoEncontrado = this.tipoBanner.find(t => t.tipo.toString() === tipo);
    return tipoEncontrado ? tipoEncontrado.nome : ''; 
  }

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

  getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  onUpload(event: UploadEvent) {
    for (let file of event.files) {
      this.getBase64(file).then((base64Data: string) => {
        const imageData = {
          name: file.name,
          base64: base64Data,
          file: file, 
        };
        this.bannersFotos.push(imageData);
      });
    }
  }

  adicionarBanner(){

    for (const imageData of this.bannersFotos) {
      const dataFotosBanner = new FormData();
      dataFotosBanner.append('nome', imageData.name);
      dataFotosBanner.append('file', imageData.file);
      dataFotosBanner.append('tpbanner', this.tpbanner);
  
      this.bannerServiceAPI.cadastrarFotosBanner(dataFotosBanner).subscribe(
        (response) => {
          const tipo = 'success'
          const titulo = ''
          const mensagem = 'Banner cadastrado com sucesso.'
          const icon = 'fa-solid fa-check'

          this.appToast.toast(tipo, titulo, mensagem, icon);

          this.atualizarPagina();
        }, 
        (error) => {
          const tipo = 'error'
          const titulo = ''
          const mensagem = 'Erro ao cadastrar Banner.'
          const icon = 'fa-solid fa-face-frown'

          this.appToast.toast(tipo, titulo, mensagem, icon);
        }
      );
    }
  }

  excluirBannerPorID(banner: any): void {

    this.bannerServiceAPI.excluirFotosBanner(banner.bannerId).subscribe(
      (response) => {

        this.bannersAPI = this.bannersAPI.filter(foto => foto.bannerId !== banner.bannerId);

        const tipo = 'success'
        const titulo = ''
        const mensagem = 'Banner excluído com sucesso.'
        const icon = 'fa-solid fa-check'

        this.appToast.toast(tipo, titulo, mensagem, icon);
      },
      (error) => {
        
        const tipo = 'error'
        const titulo = ''
        const mensagem = 'Erro ao excluir banner.'
        const icon = 'fa-solid fa-face-frown'

        this.appToast.toast(tipo, titulo, mensagem, icon);

      }
    );

  }

  bannerSelecionado(event: any) {
    this.tipoBannerSelecionado = event.value;
    this.tpbanner = event.value.tipo
  }

}
