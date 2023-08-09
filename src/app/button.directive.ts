import { Directive, ElementRef, HostListener } from '@angular/core';
import { AudioService } from './audio.service';

@Directive({
  selector: 'button'
})
export class ButtonDirective {

  private readonly button: HTMLButtonElement;

  constructor(element: ElementRef<HTMLButtonElement>, private readonly soundService: AudioService) {
    this.button = element.nativeElement;
  }

  @HostListener('mousedown')
  onMouseDown() {
    const cl = this.button.classList;
    if (cl.contains('silent') || cl.contains('active')) {
      return;
    }
    this.soundService.click();
  }
}
