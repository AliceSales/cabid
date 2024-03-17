import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ProductsService } from 'src/app/products.service';

interface Product {
  id: number;
  nome: string;
  imagens: string[];
  preco_venda: number;
  cor: string;
  preco_compra: number;
  descricao_peca: string;
  tamanho: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  selectedSegment: string = 'all';
  productId: number;
  product: Product;
  dataLoaded: boolean = false; // Variável para controlar se os dados foram carregados

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductsService, private navCtrl: NavController) { }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  ngOnInit() {}
  
  ionViewDidEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productId = id ? parseInt(id, 10) : 0;
    this.productService.getProduct(this.productId).subscribe(
      (product: Product) => {
        this.product = product;
        this.dataLoaded = true; // Define como true quando os dados são carregados com sucesso
      },
      (error) => {
        console.error('Erro ao obter o produto:', error);
      }
    );
  }  
  
  navigateToStatsChart() {
    this.navCtrl.navigateForward('/stats-chart');
  }

  navigateToPerfil() {
    this.navCtrl.navigateForward('/perfil');
  }

  navigateToHome() {
    this.navCtrl.navigateForward('/home');
  }
}
