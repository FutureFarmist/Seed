import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NaasService } from '../../services/naas.service';
import * as models from '../../models';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ctls',
  template: `
  <button mat-raised-button color="primary" (click)="addController()">
    Add Controller
  </button>

  <mat-accordion>
    <mat-expansion-panel *ngFor="let ctl of ctls; let i = index">
      <mat-expansion-panel-header>
        <mat-panel-title>{{ ctl.Id }}:
          {{ ctl.Name ? ctl.Name : ctl.Id }}
        </mat-panel-title>
        <mat-panel-description>
          {{ ctl.Desc }}
        </mat-panel-description>
      </mat-expansion-panel-header>

      <controller [(ctl)]="ctl"></controller>
      <button mat-button (click)="deleteController(ctl.Id)">Delete</button>
    </mat-expansion-panel>
    <mat-accordion> </mat-accordion>
  </mat-accordion>
  <br /><br />
  <button mat-raised-button (click)="updateControllers()">Save</button>
  <pre>{{ ctls | json }}</pre>
  <br /><br />
  <pre>{{ this.naasSv.controllerArray | json }}</pre>`,
  // <cron *ngIf="testCron" [(cron)]="testCron"></cron>
  // templateUrl: './ctls.component.html',
  styleUrls: ['./ctls.component.scss']
})
export class CtlsComponent implements OnInit, OnDestroy, AfterViewInit {
  // buffer for cron editing
  ctls: Array<models.Controller> = [];

  /* ctls$: BehaviorSubject<Array<Controller>> = new BehaviorSubject<
    Array<Controller>
  >([]); */

  // ctls$: Observable<Array<Controller>>;

  ctls$$: Subscription;
  // testCron: Cron = this.naasSv.newCron();

  

  constructor(private naasSv: NaasService) {
    // this.ctls$ = this.naasSv.controllerArray$;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.ctls$$ = this.naasSv.controllerArray$.subscribe(
      (r_ctls: Array<models.Controller>) => {
        console.log('new controller');
        this.ctls = JSON.parse(JSON.stringify(r_ctls));
        // this.ctls$.next(r_ctls);
      }
    );
    
    // this.testCron = this.naasSv.newCron();
    /* this.testCron = {
      Minute: '*',
      Dom: '*',
      Month: '1,2,3',
      Dow: '4,5,6'
    }; */
    // this.addController();
    console.log('this.naasSv.newControllerDefault()');
    console.log([this.naasSv.newControllerDefault()]);
    this.naasSv.readControllers().subscribe((r_ctls: string) => {
      let ctls = JSON.parse(r_ctls);
      console.log('ctls');
      console.log(ctls);
      this.naasSv.addControllers(ctls);
    });
  }

  ngOnDestroy(): void {
    this.ctls$$.unsubscribe();
  }

  addController() {
    console.log('controllerComponent: addController');
    this.naasSv.addController();
  }

  /* getSchemeDesc(ctlId: number) {
    // if (this.ctlsthis.ctls.find((ctls) => {ctls.Id === ctlId}).ControlScheme
  } */

  updateControllers() {
    this.naasSv.updateControllers(this.ctls);
  }

  

  deleteController(id) {
    if (id) {
      this.naasSv.deleteController(id);
    }
  }
}
