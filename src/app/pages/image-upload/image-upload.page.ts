import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/products.service';
import { map } from 'rxjs/operators'; // Importe o operador map corretamente

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
  selector: 'app-image-upload',
  templateUrl: './image-upload.page.html',
  styleUrls: ['./image-upload.page.scss'],
})

export class ImageUploadPage implements OnInit {
  selectedImage: File;
  imagePreviewUrl: string | null = null;
  productId: number;
  products: Product[] = []; // Inicialize products como um array vazio

  constructor(
    private router: Router,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    this.imagePreviewUrl = this.selectedImage ? URL.createObjectURL(this.selectedImage) : null;
  }

  onUpload() {
    this.productService.getProductByName(this.selectedImage.name).subscribe(
      (productIds: number[]) => {
        const stringProductIds = productIds.map(id => id.toString());
        console.log(productIds)
        for (const id of stringProductIds) {
          this.productService.getProduct(Number(id)).subscribe(
            (product: Product | undefined) => {
              if (product !== undefined) {
                this.products.push(product);
              } else {
                console.error('Produto com ID', id, 'não encontrado');
              }
            },
            (error) => {
              console.error('Erro ao obter o produto com o ID:', id, error);
            }
          );
        }
      },
      (error) => {
        console.error('Erro ao obter os IDs dos produtos:', error);
      }
    );
  }

  redirect_to_details_nome(nome: string) {
    this.dismiss();
    this.router.navigate(['/details', nome]);
  }
}
