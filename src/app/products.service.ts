import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
}

interface Labels {
  id: string;
  image: string;
  labels: string[];
  nome_arquivo: string;
}
@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private collectionName = 'products';

  constructor(private firestore: AngularFirestore) { }

  getProducts(): Observable<Product[]> {
    return this.firestore.collection<Product>(this.collectionName).valueChanges();
  }

  getProduct(id: number): Observable<Product | undefined> {
    return this.firestore.collection<Product>(this.collectionName, ref => ref.where('id', '==', id))
      .valueChanges({ idField: 'id' })
      .pipe(
        map(products => products[0]),
        catchError(error => {
          console.error('Error fetching product:', error);
          return of(undefined);
        })
      );
  }

  getProductByName(name: string): Observable<number[]> {
    return this.firestore.collection<Product>(
      this.collectionName, 
      ref => ref.where('arquivo_nome', '==', name)
    )
    .valueChanges({ id: 'id' })
    .pipe(
      map(products => {
        if (products.length === 0) {
          console.log('Nenhum produto encontrado com o nome:', name);
          return [];
        }
        return products.map(product => product.id);
      })
    );
  }

  getLabelByName(name: string): Observable<string[]> {
    return this.firestore.collection<any>(
      'labels',
      ref => ref.where('nome_arquivo', '==', name)
    ).valueChanges({ idField: 'id' }).pipe(
      map(labels => {
        if (labels.length === 0) {
          console.log('Nenhum rótulo encontrado com o nome do arquivo:', name);
          return [];
        }
        return labels.map(label => label.labels);
      })
    );
  }
}