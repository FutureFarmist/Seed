import { Component } from '@angular/core';

@Component({
  selector: 'seed',
  template: `
  <div [ngStyle]="{display: 'block', width: '100%'}">Seed for NAAS @{{host}}</div>
  <div>
  <mat-tab-group [ngStyle]="{width: '100%'}">
    <mat-tab label="Pins"> 
      <pins></pins>
    </mat-tab>
    <mat-tab label="Field"> 
      <field-com></field-com>
      </mat-tab>
    <mat-tab label="Device"> 
      <device></device>
    </mat-tab>
    <mat-tab label="Camera">
      <camera></camera>
    </mat-tab>
  </mat-tab-group>
  </div>
  `,
  /*   <mat-sidenav-container class="example-container">
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
    'width' : '200px',
    'background': '#eee'/*'#efefef'*/
  };
  
}
