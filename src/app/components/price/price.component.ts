import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {

  @Input() product!: Product;

  noOfProducts: number = 0;
  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
  }

  onDecreaseProductQuantity(){
    if(this.noOfProducts === 0){
      return;
    } else this.noOfProducts--;
  }

  onIncreaseProductQuantity(){
    this.noOfProducts++;
  }

  sendToCart(){
    this.storageService.cart.next(this.product);
    this.storageService.noOfItems.next(this.noOfProducts);
  }

}
