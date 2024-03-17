import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ImageUploadModalComponent } from './image-upload-modal.component';

@NgModule({
  declarations: [ImageUploadModalComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ImageUploadModalComponent]
})
export class ImageUploadModalModule { }
