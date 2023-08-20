import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[rIconImg]'
})
export class IconImgDirective implements OnChanges {

  @Input('rIconImg')
  icon: string = '';

  private readonly img: HTMLImageElement;

  constructor(element: ElementRef<HTMLImageElement>) {
    this.img = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.icon !== '') {
      this.img.src = `assets/buttons/${this.icon}.png`;
    } else {
      this.img.src = '';
    }
  }

}
