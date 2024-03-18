import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ProductsService } from 'src/app/products.service';

interface Product {
  arquivo_nome: string;
  id: number;
  nome: string;
  imagens: string[];
  preco_venda: number;
  cor: string;
  preco_compra: number;
  descricao_peca: string;
  tamanho: string;
  id_semelhantes: number[];
  tags: string[];
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  selectedSegment: string = 'all';
  products: Product[] = [];
  constructor(private router: Router, private navCtrl: NavController, private productService: ProductsService) {}

  ngOnInit() {
    this.getProducts();
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  redirect_to_details(id: number) {
    this.router.navigate(['/details', id]);
  }

  navigateToStatsChart() {
    this.navCtrl.navigateForward('/stats-chart');
  }

  navigateToHome() {
    this.navCtrl.navigateForward('/home');
  }

  navigateToPerfil() {
    this.navCtrl.navigateForward('/perfil');
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Erro ao obter os produtos:', error);
      }
    );
  }
  
}
