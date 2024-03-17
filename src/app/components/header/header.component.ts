import { Component, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { ImageUploadModalComponent } from '../image-upload-modal.component/image-upload-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  @ViewChild('searchBar') searchBar: IonSearchbar;
  
  constructor(private modalController: ModalController) { }

  showModal() {
    this.presentModal();
  }

  clearSearch() {
    this.searchBar.value = '';
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ImageUploadModalComponent,
      cssClass: 'image-upload-modal'
    });
    return await modal.present();
  }
}
