import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  selectedSegment: string = 'all';
  productId: number;
  productName: string;
  product: Product | undefined;
  dataLoaded: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductsService, private navCtrl: NavController) { }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  ngOnInit() {}
  
  ionViewDidEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productId = id ? parseInt(id, 10) : 0;
    if (!Number.isNaN(this.productId)) {
      this.productService.getProduct(this.productId).subscribe(
        (product: Product | undefined) => {
          this.product = product;
          this.dataLoaded = true;
        },
        (error) => {
          console.error('Erro ao obter o produto:', error);
        }
      );
    } else {
      const name = this.route.snapshot.paramMap.get('id');
      this.productName = name ? name : '';
      this.productService.getProductName(this.productName).subscribe(
        (product: Product | undefined) => {
          this.product = product;
          this.dataLoaded = true;
        },
        (error) => {
          console.error('Erro ao obter o produto:', error);
        }
      );
    }
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
