import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[rIconButton]'
})
export class IconButtonDirective implements OnChanges {

  @Input('rIconButton')
  icon: string = '';

  @Input('rotate')
  rotate = false;

  private readonly button: HTMLButtonElement;

  constructor(element: ElementRef<HTMLButtonElement>) {
    this.button = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.icon !== '') {
      this.button.innerHTML = `<img src="assets/buttons/${this.icon}.png">`;
    } else {
      this.button.innerHTML = '';
    }
    if (this.rotate) {
      this.button.classList.add('animate-rotate');
    } else {
      this.button.classList.remove('animate-rotate');
    }
  }

}
