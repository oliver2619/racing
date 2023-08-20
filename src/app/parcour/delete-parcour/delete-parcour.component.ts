import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'r-delete-parcour',
  templateUrl: './delete-parcour.component.html',
  styleUrls: ['./delete-parcour.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteParcourComponent {

  constructor(private readonly appService: AppService, private readonly router: Router) {}

  onOk() {
    this.appService.clearParcour();
    this.router.navigateByUrl('/parcour');
  }
}
