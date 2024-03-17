import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import Chart from 'chart.js/auto';
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
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  @ViewChild('myChart') myChart: any;
  chart: any;
  products: Product[] = [];
  constructor(private navCtrl: NavController, private productService: ProductsService) { }

  ionViewDidEnter() {
    this.chart = new Chart(this.myChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [{
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(138, 69, 80)',
          }]
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

    this.getProducts()
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

  ngOnInit() {
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
