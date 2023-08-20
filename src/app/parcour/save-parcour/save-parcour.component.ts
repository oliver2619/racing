import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ParcourService } from 'src/app/parcour.service';

interface SaveParcourValue {
  name: string;
}

@Component({
  selector: 'r-save-parcour',
  templateUrl: './save-parcour.component.html',
  styleUrls: ['./save-parcour.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaveParcourComponent {

  readonly formGroup: FormGroup;

  get canSave(): boolean {
    return this.formGroup.valid && !this.doesParcourExist;
  }

  get doesParcourExist(): boolean {
    return this.parcourService.hasCustomParcour(this.value.name);
  }

  private get value(): SaveParcourValue {
    return this.formGroup.value;
  }

  constructor(private readonly appService: AppService, private readonly parcourService: ParcourService, private readonly router: Router, formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({});
    this.formGroup.addControl('name', formBuilder.control(appService.parcourName, [Validators.required, Validators.maxLength(20)]))
  }

  onSave() {
    this.appService.parcourName = this.value.name;
    this.parcourService.saveCustomParcourJson(this.appService.saveParcourAsJson());
    this.router.navigateByUrl('/parcour');
  }
}
