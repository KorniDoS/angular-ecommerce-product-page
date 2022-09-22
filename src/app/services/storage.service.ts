import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) { }

   private products: Product[] = [];
   cart = new BehaviorSubject<Product[]>([]);


   loadedProduct = new Subject<boolean>();

  fetchProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('assets/products.json')
  }

  setProducts(products: Product[]){
    this.products = products;
    this.loadedProduct.next(true);

  }

  getProducts(){
    return this.products;
  }
}
