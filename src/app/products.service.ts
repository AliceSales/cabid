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
  tags: string[];
}

interface Labels {
  id: string;
  image: string;
  nome: string;
  labels: string[];
  nome_arquivo: string;
  descricao: string
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

  getProductName(name: string): Observable<Product | undefined> {
    return this.firestore.collection<Product>(this.collectionName, ref => ref.where('nome', '==', name))
      .valueChanges({ nameField: 'nome' })
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
      this.collectionName
    )
    .valueChanges({ id: 'id' })
    .pipe(
      map(products => {
        const matchingProducts = products.filter(product => {
          if (!product.arquivo_nome) return false;
          const filenamesWithoutExtensions: string[] = [];
          for (const filename of product.arquivo_nome) {
            const filenameWithoutExtension = filename.split('.')[0];
            filenamesWithoutExtensions.push(filenameWithoutExtension);
          }
          return filenamesWithoutExtensions.includes(name.split('.')[0]);
        });
  
        if (matchingProducts.length === 0) {
          console.log('Nenhum produto encontrado com o nome:', name);
          return [];
        }
  
        return matchingProducts.map(product => product.id);
      })
    );
  }

  getLabelByName(name: string): Observable<{ label: string, descricao: string, nome: string }[]> {
    return this.firestore.collection<Labels>('labels').valueChanges({ idField: 'id' }).pipe(
      map(labels => {
        const matchingLabels = labels.filter(label => {
          return label.nome_arquivo && label.nome_arquivo.split('.')[0] === name.split('.')[0];
        });
  
        if (matchingLabels.length === 0) {
          console.log('Nenhum rótulo encontrado com o nome do arquivo:', name);
          return [];
        }
  
        const result: { label: string, descricao: string, nome: string }[] = [];
        for (const label of matchingLabels) {
          for (let i = 0; i < label.labels.length; i++) {
            result.push({ label: label.labels[i], descricao: label.descricao, nome: label.nome });
          }
        }
        return result;
      })
    );
  }
  
}