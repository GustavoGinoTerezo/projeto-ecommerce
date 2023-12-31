import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { ServiceBannerService } from 'src/app/services/serviceBanner/service-banner.service';
import { ServiceColorPickerService } from 'src/app/services/serviceColorPicker/service-color-picker.service';
import { ServiceApiBannerService } from 'src/app/services/servicesAPI/serviceAPI-Banner/service-api-banner.service';
import { ServiceApiCoresService } from 'src/app/services/servicesAPI/serviceAPI-Cores/service-api-cores.service';
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
    private colorAPIService: ServiceApiCoresService,
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

    this.colorService.buscarCoresDaAPI()
      .then(() => {
        return this.colorService.getCores().toPromise();
      })
      .then((coresAPI) => {
        if (coresAPI !== undefined && coresAPI.length > 0) {
          const cores = JSON.parse(coresAPI[0].cor) as any;

          this.cor1 = cores.cor1;
          this.cor2 = cores.cor2;
          this.cor3 = cores.cor3;
          this.cor4 = cores.cor4;
          this.cor5 = cores.cor5;
          this.cor6 = cores.cor6;
          this.cor7 = cores.cor7;
          this.cor8 = cores.cor8;
          this.cor9 = cores.cor9;
          this.cor10 = cores.cor10;
          this.cor11 = cores.cor11;

        } else {
          console.error("getCores retornou undefined");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar cores da API:", error);
      });

    this.bannerService.inicializacaoConcluida$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.carregarBanners();
      });
  }

  ngOnDestroy() {

    this.destroy$.next();
    this.destroy$.complete();

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

  atualizarCores() {

    const coresObj = {
      cor: {
        cor1: this.cor1,
        cor2: this.cor2,
        cor3: this.cor3,
        cor4: this.cor4,
        cor5: this.cor5,
        cor6: this.cor6,
        cor7: this.cor7,
        cor8: this.cor8,
        cor9: this.cor9,
        cor10: this.cor10,
        cor11: this.cor11
      }
    };
  
    this.colorAPIService.atualizarCor(1,coresObj).subscribe((response) => {
      console.log("Cores atualizadas com sucesso", response);
    }, 
    (error) => {
      console.log("Erro ao atualizar as cores", error)
    })

  
  }
  

}
