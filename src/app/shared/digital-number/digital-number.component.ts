import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'r-digital-number',
  templateUrl: './digital-number.component.html',
  styleUrls: ['./digital-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigitalNumberComponent {

  @Input('value')
  value = 0;

  @Input('digits')
  digits = 1;

  @Input('width')
  width = 0;

  @Input('animating')
  animating = false;

  @Input('size')
  size = 'm';

  @Output('refresh')
  readonly onRefresh = new EventEmitter<void>();

  get format(): string {
    return `1.${this.digits}-${this.digits}`;
  }

  get style(): {[key: string]: string} {
    const ret: {[key: string]: string} = {};
    if(this.width > 0) {
      ret['width'] = `${this.width}ch`;
    }
    return ret;
  }

  onClick() {
    this.onRefresh.emit();
  }
}
