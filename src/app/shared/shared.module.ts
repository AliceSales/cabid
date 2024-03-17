import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { ProductsService } from '../products.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
  ],
  providers: [ProductsService],
})
export class SharedModule { }
