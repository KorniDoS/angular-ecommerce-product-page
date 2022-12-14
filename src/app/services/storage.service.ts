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
   
   cart = new BehaviorSubject<any>('');
   noOfItems = new Subject<number>();
   productImages = new Subject<Product[]>();
   zoomedIn = new Subject<boolean>();
   currentIndex = new Subject<number>();
   loadedProduct = new Subject<boolean>();



  fetchProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('assets/products.json')
  }

  setProducts(products: Product[]){
    this.products = products;
    this.loadedProduct.next(true);
    this.productImages.next(this.getProducts());
  }

  getProducts(){
    return this.products;
  }
}
