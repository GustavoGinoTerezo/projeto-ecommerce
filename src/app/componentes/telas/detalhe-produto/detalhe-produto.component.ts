import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ServiceCarrinhoDeComprasService } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Categorias, Imagens, Produtos, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';
import { AES } from 'crypto-ts';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-detalhe-produto',
  templateUrl: './detalhe-produto.component.html',
  styleUrls: ['./detalhe-produto.component.css']
})
export class DetalheProdutoComponent implements OnInit {

  categorias: Categorias[] = [];
  produtos: Produtos[] = [];
  produto: Produtos | undefined;

  nomeProduto: string | null = null;

  nomeProdutoFormatado: string | null = null;
  produtoDaCategoria!: Produtos;
  cep!: string;
  novoComentario: string = '';

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private produtoService: ServiceCategoriasService,
    private categoriasService: ServiceCategoriasService,
    private carrinhoService: ServiceCarrinhoDeComprasService,
  ) {}

  ngOnInit() {

    setTimeout(() => {

    this.categoriasService.getCategorias().subscribe(
      (categoriasAPI) => {
        this.categorias = categoriasAPI;
      }
    );

    this.categoriasService.getProdutos().subscribe(
      (produtosAPI) => {
        this.produtos = produtosAPI
      }
    );

    this.route.params.subscribe((params) => {
      this.nomeProduto = params['nome'];

      if (this.nomeProduto) {
        const nomeOriginal = this.nomeProduto.replace(/-/g, ' ');
        this.produto = this.produtoService.obterProdutoPorNome(nomeOriginal);

        this.nomeProdutoFormatado = this.produtoService.formatarNomeProduto(this.nomeProduto);
      }
    })

    }, 1500)

  }

  getProdutoImages(): string[] {
    if (this.produto) {
      return this.produto.imagem?.map((imagem: Imagens) => imagem.imagem!) || [];
    } else if (this.produtoDaCategoria) {
      return this.produtoDaCategoria.imagem?.map((imagem: Imagens) => imagem.imagem!) || [];
    } else {
      return [];
    }
  }

  adicionarAoCarrinho(produto: Produtos): void {
    // Recupere o carrinho criptografado do sessionStorage
    const encryptedCarrinhoFromStorage = sessionStorage.getItem('c');
    const secretKeyCarrinho = 'carrinho';

    let carrinho: number[] = [];

    if (encryptedCarrinhoFromStorage) {
      // Descriptografe o carrinho se ele existir
      const decryptedCarrinho = AES.decrypt(encryptedCarrinhoFromStorage, secretKeyCarrinho);

      // Verifique se a descriptografia foi bem-sucedida
      if (decryptedCarrinho.sigBytes > 0) {
        try {
          // Converta o resultado descriptografado de volta em um array
          carrinho = JSON.parse(decryptedCarrinho.toString(CryptoJS.enc.Utf8));
        } catch (error) {
          // Em caso de erro na análise JSON, inicialize o carrinho como um array vazio
          carrinho = [];
        }
      }
    }

    // Verifique se o produto possui um ID válido antes de adicioná-lo ao carrinho
    if (produto.prodId !== undefined) {
      // Adicione o ID do produto ao carrinho
      carrinho.push(produto.prodId);

      // Criptografe o carrinho atualizado e converta para string antes de salvar no sessionStorage
      const encryptedCarrinho = AES.encrypt(JSON.stringify(carrinho), secretKeyCarrinho).toString();

      // Salve o carrinho criptografado no sessionStorage
      sessionStorage.setItem('c', encryptedCarrinho);

      // Exiba uma mensagem ou realize outras ações necessárias
      this.showProdutoAdicionadoAoCarrinho();
    }
  }

  showProdutoAdicionadoAoCarrinho() {
    this.messageService.add({
      severity: 'success',
      icon: 'pi pi-shopping-cart',
      detail: 'Produto adicionado ao carrinho!' });
  }

  adicionarComentario() {
    // Verifique se o novoComentario não está vazio
    if (!this.novoComentario.trim()) {
      this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Digite um comentário.' });
      return;
    }

    // Adicione o comentário pendente ao array de comentários pendentes do produto
    if (this.produto) {
      if (!this.produto.comentariosPendentes) {
        this.produto.comentariosPendentes = [];
      }

      this.produto.comentariosPendentes.push({ comentario: this.novoComentario });
    }

    // Limpe o campo de entrada
    this.novoComentario = '';
  }

}


