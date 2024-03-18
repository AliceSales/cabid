import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ProductsService } from 'src/app/products.service';

interface Labels {
  id: string;
  image: string;
  labels: string[];
  nome_arquivo: string;
}

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.page.html',
  styleUrls: ['./cadastro-produto.page.scss'],
})
export class CadastroProdutoPage implements OnInit {
  selectedImage: File | null = null;
  imagePreviewUrl: string | null = null;
  labels: string[] = [];
  item: any = {
    id: null,
    nome: '',
    preco_venda: null,
    imagens: [],
    cor: '',
    preco_compra: null,
    descricao_peca: '',
    tamanho: '',
    tags: []
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  navigateToPerfil() {
    this.item = {
      id: null,
      nome: '',
      preco_venda: null,
      imagens: [],
      cor: '',
      preco_compra: null,
      descricao_peca: '',
      tamanho: '',
      tags: []
    };
    this.selectedImage = null;
    this.navCtrl.navigateForward('/perfil');
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    this.imagePreviewUrl = this.selectedImage ? URL.createObjectURL(this.selectedImage) : null;
  }

  onSubmit() {
    if (this.selectedImage) {
      this.productService.getLabelByName(this.selectedImage.name).subscribe(
        (labels: { label: string, descricao: string, nome: string }[]) => {
          this.labels = labels.map(label => label.label);
          this.item.tags = this.labels;
          this.item.descricao_peca = labels[0].descricao;
          this.item.nome = labels[0].nome;
        },
        () => {}
      );
  
      this.item = {
        id: null,
        nome: '',
        preco_venda: null,
        imagens: [],
        cor: '',
        preco_compra: null,
        descricao_peca: '',
        tamanho: ''
      };
      this.selectedImage = null;
    } else {
      console.error('Nenhuma imagem selecionada.');
    }
  }
  
}
