import { Component, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { ImageUploadPage } from 'src/app/pages/image-upload/image-upload.page';

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
      component: ImageUploadPage,
      cssClass: 'image-upload-modal'
    });
    return await modal.present();
  }
}
