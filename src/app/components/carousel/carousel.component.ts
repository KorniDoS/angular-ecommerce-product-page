import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  @ViewChild('main_img', { static: false }) main_img!: ElementRef;
  @Input() productImages: string[] = [];

  currentIndex: number = 0;
  ngOnInit(): void {}

  onBackwards() {
    this.currentIndex--;

    if (this.currentIndex === -1) {
      this.renderer.setAttribute(
        this.main_img.nativeElement,
        'src',
        this.productImages[this.productImages.length - 1].toString()
      );
      this.currentIndex = this.productImages.length - 1;
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

    if (this.currentIndex > this.productImages.length - 1) {
      this.currentIndex = 0;
      this.renderer.setAttribute(
        this.main_img.nativeElement,
        'src',
        this.productImages[this.currentIndex].toString()
      );
    } else {
      this.renderer.setAttribute(
        this.main_img.nativeElement,
        'src',
        this.productImages[this.currentIndex].toString()
      );
    }
  }
}
