import { Component, Input, OnInit } from '@angular/core';
import { map, switchMap, combineLatest, of, shareReplay } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  constructor(private storageService: StorageService) {}

  @Input() toggledCart: boolean = false;

  cart: Product[] = [];

  noOfProducts: number = 0;

  ngOnInit(): void {
    this.storageService.cart
      .pipe(
        switchMap((cart) => {
          return combineLatest(of(cart), this.storageService.noOfItems);
        }),
        shareReplay(),
        map(([cart, number]) => {
          return [cart, number];
        })
      )
      .subscribe((res) => {
        for (let i = 0; i < res[1]; i++) {
          this.cart.push(res[0]);
        }
      });
  }

  deleteProducts() {
    this.cart.length = 0;
  }
}
