import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
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

  navigateToCreateProduct() {
    this.navCtrl.navigateForward('/cadastro-produto');
  }
}
