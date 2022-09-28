import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { concatMap, Subscription, map, tap } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { Product } from 'src/app/models/product.model';
import { ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements OnInit, OnDestroy {

  constructor(private storageService: StorageService, private renderer: Renderer2) { }

  @ViewChild('main_img', { static: false }) main_img!: ElementRef;

  zoomed:boolean = false;
  productImages: Product[] = []
  imagesSub!: Subscription;
  currentIndexSub!: Subscription;

  currentIndex: number = 0;
  ngOnInit(): void {


    this.currentIndexSub = this.storageService.currentIndex.subscribe(res=>{
      this.currentIndex = res;
    })
 

    this.imagesSub = this.storageService.loadedProduct
    .pipe(
      concatMap(isLoaded=> this.storageService.productImages),
      map(product=> Object.values(product[0]["images"]))
      ).subscribe(
      (res: any[])=>{
        this.productImages = res;
        console.log(this.productImages);
      }
    )
 
  }

  onBackwards() {
    this.currentIndex--;

    this.storageService.currentIndex.next(this.currentIndex);

    if (this.currentIndex === -1) {
      this.renderer.setAttribute(
        this.main_img.nativeElement,
        'src',
        this.productImages[this.productImages.length - 1].toString()
      );
      this.currentIndex = this.productImages.length - 1;
      this.storageService.currentIndex.next(this.currentIndex);
    } else {
      this.renderer.setAttribute(
        this.main_img.nativeElement,
        'src',
        this.productImages[this.currentIndex].toString()
      );
    }
  }

  onForwards() {
    this.currentIndex++;
    this.storageService.currentIndex.next(this.currentIndex);
    if (this.currentIndex > this.productImages.length - 1) {
      this.currentIndex = 0;
      this.storageService.currentIndex.next(this.currentIndex);
    } else {
      this.renderer.setAttribute(
        this.main_img.nativeElement,
        'src',
        this.productImages[this.currentIndex].toString()
      );
    }
  }


  onZoomOut(){
    this.zoomed = !this.zoomed;
    this.storageService.zoomedIn.next(this.zoomed);
 
  }

  onChangeSrc(id: number){
    this.renderer.setAttribute(
        this.main_img.nativeElement,
        'src',
        this.productImages[id].toString()
      );
      this.currentIndex = id;
      this.storageService.currentIndex.next(this.currentIndex);
  }


  closeLightbox(){
    this.storageService.zoomedIn.next(false);
  }



  ngOnDestroy(): void {
   // this.zoomSub.unsubscribe();
    this.imagesSub.unsubscribe();
    this.currentIndexSub.unsubscribe();
  }

}
