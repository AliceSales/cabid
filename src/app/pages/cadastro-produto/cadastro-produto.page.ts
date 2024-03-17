import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.page.html',
  styleUrls: ['./cadastro-produto.page.scss'],
})
export class CadastroProdutoPage implements OnInit {
  selectedImage: File | null = null;
  imagePreviewUrl: string | null = null;
  item: any = {
    id: null,
    nome: '',
    preco_venda: null,
    imagens: [],
    cor: '',
    preco_compra: null,
    descricao_peca: '',
    tamanho: ''
  };

  constructor(private navCtrl: NavController) { }

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
      tamanho: ''
    };
    this.selectedImage = null;
    this.navCtrl.navigateForward('/perfil');
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    this.imagePreviewUrl = this.selectedImage ? URL.createObjectURL(this.selectedImage) : null;
  }

  onSubmit() {
    console.log('Dados do formulário:', this.item);
    console.log('Imagem selecionada:', this.selectedImage);

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
  }
}