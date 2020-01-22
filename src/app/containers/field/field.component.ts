import { Component, OnInit } from '@angular/core';
import { IField, IPlant, IDevice } from '../../model';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from "../../store/";
import { NaasService } from '../../services/naas.service';

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
  
  fields: Observable<IField[]> = this.naas.getFields();
  devices: Observable<IDevice[]> = this.naas.readDevices();
  plants: Observable<IPlant[]>;
  
  /* fieldArray: Dictionary<IFile>;
  fileEntities$ = this.store.select(fileSelector.getFileEntities);
  fileEntities$$ = this.fileEntities$.subscribe((fileEntities: Dictionary<IFile>) => {
    this.fileEntities = fileEntities;
  }); */
  
  constructor(private store: Store<fromRoot.State>, private naas: NaasService) { }

  ngOnInit() {
  }

}
