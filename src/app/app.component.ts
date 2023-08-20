import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'r-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @HostListener('document:contextmenu', ['$event'])
  onContextMenu(ev: MouseEvent) {
    ev.preventDefault();
  }
}
