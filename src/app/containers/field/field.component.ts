import { Component, OnInit } from '@angular/core';
import { Field, Plant, Device } from '../../models';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from "../../store/";
import { NaasService } from '../../services/naas.service';
import { of } from 'rxjs';

@Component({
  selector: 'field-com',
  template: `
  <mat-accordion *ngIf="this.fields">
    <mat-expansion-panel *ngFor="let field of this.fields | async">
      <mat-expansion-panel-header>
        <mat-panel-title>
          {{field.Name}}
        </mat-panel-title>
        <mat-panel-description>
        </mat-panel-description>
      </mat-expansion-panel-header>

      <div *ngIf="this.fields">Field</div>


      <div *ngIf="this.plants">Plant</div>


    </mat-expansion-panel>
  </mat-accordion>
  `,
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  fields: Observable<Field[]> = of([]);
  // fields: Observable<Field[]> = this.naas.getFields();
  devices: Observable<Device[]> = this.naas.readDevices();
  plants: Observable<Plant[]>;

  /* fieldArray: Dictionary<IFile>;
  fileEntities$ = this.store.select(fileSelector.getFileEntities);
  fileEntities$$ = this.fileEntities$.subscribe((fileEntities: Dictionary<IFile>) => {
    this.fileEntities = fileEntities;
  }); */

  constructor(private store: Store<fromRoot.State>, private naas: NaasService) { }

  ngOnInit() {
  }

}
