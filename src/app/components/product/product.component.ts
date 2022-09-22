import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Product } from 'src/app/models/product.model';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(private storageService: StorageService) {}

  product: Product[] = [];
  ngOnInit(): void {
    this.storageService.loadedProduct.subscribe((res) => {
      this.product = this.storageService.getProducts();
      console.log(this.product);
    });
  }
}
