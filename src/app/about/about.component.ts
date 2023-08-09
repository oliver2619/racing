import { ChangeDetectionStrategy, Component } from '@angular/core';
import json from '../../../package.json';

@Component({
  selector: 'r-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {

  get version(): string {
    return json.version;
  }
}
