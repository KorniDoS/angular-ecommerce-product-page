import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './services/storage.service';
import { Product } from './models/product.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  storageSub!: Subscription;

  zoomedInSub!: Subscription;
  zoomed: boolean = false;
  ngOnInit(){
    this.storageSub = this.storageService.fetchProducts().subscribe(
      (res: Product[])=>{
        this.storageService.setProducts(res);
        this.storageSub.unsubscribe();
      }
    )

    this.zoomedInSub = this.storageService.zoomedIn.subscribe(
      res=>{
        this.zoomed = res;
        console.log(res);
      }
    )


  
  }

  ngOnDestroy(): void {
    this.storageSub.unsubscribe();
    this.zoomedInSub.unsubscribe();
  }

  constructor(private storageService: StorageService){}
}
