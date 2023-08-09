import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../settings.service';

interface SettingsValue {
  name: string;
}

@Component({
  selector: 'r-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {

  formGroup: FormGroup;

  get soundLevel(): number {
    return this.settingsService.audioLevel;
  }

  set soundLevel(s: number) {
    this.settingsService.audioLevel = s;
  }

  private get value(): SettingsValue {
    const ret: SettingsValue = this.formGroup.value;
    return ret;
  }

  constructor(formBuilder: FormBuilder, private settingsService: SettingsService) {
    this.formGroup = formBuilder.group({});
    this.formGroup.addControl('name', formBuilder.control(this.settingsService.name, Validators.required));
  }

  onChangeName() {
    if (this.formGroup.valid) {
      this.settingsService.name = this.value.name;
    }
  }
}
