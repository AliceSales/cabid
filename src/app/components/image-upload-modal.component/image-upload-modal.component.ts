import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-upload-modal',
  templateUrl: './image-upload-modal.component.html',
  styleUrls: ['./image-upload-modal.component.scss'],
})
export class ImageUploadModalComponent {
  selectedImage: File;
  imagePreviewUrl: string | null = null;
  constructor(private modalController: ModalController, private http: HttpClient) {}

  dismiss() {
    this.modalController.dismiss();
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    this.imagePreviewUrl = this.selectedImage ? URL.createObjectURL(this.selectedImage) : null;
  }

  onUpload() {
    const formData = new FormData();
    formData.append('image', this.selectedImage);

    this.http.post<any>('YOUR_API_ENDPOINT', formData).subscribe(
      (response) => {
        // Handle response from the API
        console.log(response);
      },
      (error) => {
        console.error('Error uploading image:', error);
      }
    );
  }
}
