import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ParcourService, SavedParcourInfo } from 'src/app/parcour.service';
import { ParcourJson } from 'src/model/parcour/parcour-json';

@Component({
  selector: 'r-load-parcour',
  templateUrl: './load-parcour.component.html',
  styleUrls: ['./load-parcour.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadParcourComponent {

  parcours: SavedParcourInfo[] = [];

  constructor(private readonly parcourService: ParcourService, private readonly appService: AppService, private readonly router: Router) {
    this.updateParcours();
  }

  load(key: string, builtin: boolean) {
    let p: ParcourJson | undefined;
    if (builtin) {
      p = this.parcourService.loadBuiltinParcourAsJson(key);
    } else {
      p = this.parcourService.loadCustomParcourAsJson(key);
    }
    if (p !== undefined) {
      this.appService.loadParcourFromJson(p);
      this.router.navigateByUrl('/parcour');
    }
  }

  remove(key: string) {
    this.parcourService.removeCustomParcour(key);
    this.updateParcours();
  }

  private updateParcours() {
    this.parcours = this.parcourService.listParcours();
    this.parcours.sort((p1, p2) => p1.name.localeCompare(p2.name));
  }
}
