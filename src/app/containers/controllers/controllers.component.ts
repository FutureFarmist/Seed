import { Component, OnInit, OnDestroy } from '@angular/core';
import { NaasService } from '../../services/naas.service';
import { Controller, Cron } from '../../models';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'controllers',
  template: `
    <cron [(cron)]="testCron"></cron>
    <mat-accordion>
      <mat-expansion-panel *ngFor="let ctl of ctls$ | async">
        <mat-expansion-panel-header>
          <mat-panel-title>
            {{ ctl.Name ? ctl.Name : ctl.Id }}
          </mat-panel-title>
          <mat-panel-description>
            {{ ctl.Desc }}
          </mat-panel-description>
        </mat-expansion-panel-header>

        Id: Name: Description:

        <mat-slide-toggle (change)="toggleActive(ctl.Id)" [checked]="ctl.Active"
          >Active</mat-slide-toggle
        >

        Sensors: Controlling Factor: Control Policy: Scheme: Value, Boolean
        Optimal Value: Preferred Minimum Value: Preferred Maximum Value: Device
        Increasing the Factor: Device Decreasing the Factor: --- Device work at
        True State Device work at False State Minute Period + Work from minute X
        to Y [ ] every Z minute Hour Period + Work from hour X to Y [ ] every Z
        hour Work every day of month | work in 3,8,9 Work every month | work in
        JAN, FEB Work every week day | work in SUN, MON, FRI
      </mat-expansion-panel>
      <mat-accordion> </mat-accordion
    ></mat-accordion>
  `,
  styleUrls: ['./controllers.component.scss']
})
export class ControllersComponent implements OnInit, OnDestroy {
  
  ctls$: BehaviorSubject<Array<Controller>> = new BehaviorSubject<
    Array<Controller>
  >([]);
  
  controller$$: Subscription;
  testCron: Cron;

  constructor(private naasSv: NaasService) {
    this.controller$$ = this.naasSv
      .readControllers()
      .subscribe((r_controllers: Array<Controller>) => {
        this.ctls$.next(r_controllers);
      });
    // this.testCron = this.naasSv.newCron();
    this.testCron = 
    {
      Minute: '*',
      Hour: '*',
      Dom: '*',
      Month: '1,2,3',
      Dow: '4,5,6'
    };
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.controller$$.unsubscribe();
  }
  
  newController() {
    this.naasSv.addNewController();
  }
  
}
