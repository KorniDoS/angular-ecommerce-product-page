import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './services/storage.service';
import { Product } from './models/product.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  storageSub!: Subscription;
  ngOnInit(){
    this.storageSub = this.storageService.fetchProducts().subscribe(
      (res: Product[])=>{
        this.storageService.setProducts(res);
        this.storageSub.unsubscribe();
      }
    )


  
  }

  constructor(private storageService: StorageService){}
}
