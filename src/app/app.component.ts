import { Component } from '@angular/core';

@Component({
  selector: 'seed',
  template: `
    <div [ngStyle]="{ display: 'block', width: '100%' }">
      Seed for NAAS @{{ host }}
    </div>
    <div>
      <mat-tab-group [ngStyle]="{ width: '100%' }">
        <mat-tab label="Controller" origin="1">
          <controllers></controllers>
        </mat-tab>
        <mat-tab label="Status" origin="2">
          <pins></pins>
        </mat-tab>
        <mat-tab label="Setup" origin="3">
          <setup-pin></setup-pin>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  /*   
    <mat-tab label="Device"> 
      <device></device>
    </mat-tab>
    <mat-tab label="Camera">
      <camera></camera>
    </mat-tab>
        
    <mat-sidenav-container class="example-container">
      <mat-sidenav mode="side" opened>
        <div [ngStyle]="mxNavStyle">
        
      </div>
      </mat-sidenav>
      <mat-sidenav-content [class]="mainContent">
        Seed 2
      </mat-sidenav-content>
    </mat-sidenav-container> */
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'seed';
  host = window.location.host;
  mxNavStyle = {
    width: '200px',
    background: '#eee' /*'#efefef'*/
  };
}
