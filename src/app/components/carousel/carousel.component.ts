import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2, private storageService: StorageService) {}

  @ViewChild('main_img', { static: false }) main_img!: ElementRef;
  @Input() productImages: string[] = [];

  currentIndex: number = 0;
  zoomed: boolean = false;

  zoomedInSub!: Subscription;
  currentIndexSub!: Subscription;

  currentThumbnail?: any;

  thumbnails: any[] = [];

  noOfHighlightedThumbnails: number = 0;


  ngOnInit(): void {

    this.zoomedInSub = this.storageService.zoomedIn.subscribe(
      res=>{
           this.zoomed = res;
      }
   
    )


    this.currentIndexSub = this.storageService.currentIndex.subscribe(
      res=>{
        this.currentIndex = res;
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


  ngOnDestroy(): void {
    this.zoomedInSub.unsubscribe();
    this.currentIndexSub.unsubscribe();
  }
}
