import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import {
  Cron
} from '../../models';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

// This component doesn't support cron.Second and cron.Year yet
@Component({
  selector: 'cron',
  template: `
    <mat-slide-toggle
      (change)="toggleEveryMinute()"
      [checked]="cronEvery.Minute"
    >
      {{
        cronEvery.Minute ? 'Every Minute' : 'Particular Minute'
      }}</mat-slide-toggle
    >
    <div *ngIf="!EveryMinute()">
      <input
        matInput
        (keyup.enter)="updateMinute($event.target.value)"
        (blur)="updateMinute($event.target.value)"
        value="{{ cron.Minute }}"
        placeholder="Minute range or target"
      />{{ minuteMessage }}
      <p>
        <b>Example</b><br />
        8-17 = Work from XX:00 - XX:00<br />
        16 = Every XX:16
      </p>
    </div>
    <br />

    <mat-slide-toggle (change)="toggleEveryHour()" [checked]="cronEvery.Hour">
      {{ cronEvery.Hour ? 'Every Hour' : 'Particular Hour' }}</mat-slide-toggle
    >
    <div *ngIf="!EveryHour()">
      <input
        matInput
        (keyup.enter)="updateHour($event.target.value)"
        (blur)="updateHour($event.target.value)"
        value="{{ cron.Hour }}"
        placeholder="Hour range or target"
      />
      {{ hourMessage }}
      <p>
        <b>Example</b><br />
        8-17 = Work from 8:00 - 17:00<br />
        16 = Every 16:00
      </p>
    </div>
    <br />

    <mat-slide-toggle (change)="toggleEveryDom()" [checked]="cronEvery.Dom">
      {{
        cronEvery.Dom ? 'Every Day of Month' : 'Particular Day of Month'
      }}</mat-slide-toggle
    >
    <div *ngIf="!EveryDom()">
      <input
        matInput
        (keyup.enter)="updateDom($event.target.value)"
        (blur)="updateDom($event.target.value)"
        value="{{ cron.Dom }}"
        placeholder="Month day range or target"
      />
      {{ domMessage }}
      <p>
        <b>Example</b><br />
        3-6 = Every day 3 - 6 of month<br />
        5 = Target every day 1 of month
      </p>
    </div>
    <br />

    <mat-slide-toggle (change)="toggleEveryMonth()" [checked]="cronEvery.Month">
      {{
        cronEvery.Month ? 'Every Month' : 'Particular Month'
      }}</mat-slide-toggle
    >
    <div *ngIf="!EveryMonth()">
      <mat-form-field>
        <mat-label>Month</mat-label>
        <mat-select
          [formControl]="monthVal"
          (selectionChange)="updateMonth($event.value)"
          multiple
        >
          <mat-option *ngFor="let month of monthList" [value]="month.code">{{
            month.month
          }}</mat-option>
        </mat-select>
      </mat-form-field>
      {{ monthMessage }}
      <p>
        <b>Example</b>
      </p>
    </div>
    <br />

    <mat-slide-toggle (change)="toggleEveryDow()" [checked]="cronEvery.Dow">
      {{
        cronEvery.Dow ? 'Every Week Day' : 'Particular Week Day'
      }}</mat-slide-toggle
    >
    <div *ngIf="!EveryDow()">
      <mat-form-field>
        <mat-label>Week Day</mat-label>
        <mat-select
          [formControl]="dowVal"
          (selectionChange)="updateDow($event.value)"
          multiple
        >
          <mat-option *ngFor="let dow of dowList" [value]="dow.code">{{
            dow.weekday
          }}</mat-option>
        </mat-select> </mat-form-field
      >{{ dowMessage }}
      <p></p>
    </div>

    <br /><br />
    cron<br />
    {{ cron | json }}
    <br />cronEvery:<br />
  `,
  /* 
  Minute Period + Work from minute X to Y [ ] every Z minute Hour Period +
    Work from hour X to Y [ ] every Z hour Work every day of month | work in
    3,8,9 Work every month | work in JAN, FEB Work every week day | work in SUN,
    MON, FRI
    
    {{cronEvery | json}}
  <br>dowVal:<br>
    {{dowVal | json}}
    <br>monthVal:<br>
    {{monthVal | json}} */
  styleUrls: ['./cron.component.scss']
})
export class CronComponent implements OnInit, AfterViewInit {
  @Input() cron: Cron;
  @Output() cronChange = new EventEmitter<Cron>();

  cronEvery = {
    // second: false,
    Minute: false,
    Hour: false,
    Dom: false,
    Month: false,
    Dow: false
    // year: false,
  };

  dowVal = new FormControl();
  monthVal = new FormControl();

  minuteMessage = '';
  hourMessage = '';
  domMessage = '';
  monthMessage = '';
  dowMessage = '';

  constructor() {}

  ngOnInit(): void {
    console.log('this.cron');
    console.log(this.cron);
    if (this.cron) {
      if (this.cron.Minute === '*') {
        this.cronEvery.Minute = true;
      } else {
        this.cronEvery.Minute = false;
      }
      if (this.cron.Hour === '*') {
        this.cronEvery.Hour = true;
      } else {
        this.cronEvery.Hour = false;
      }
      if (this.cron.Dom === '*') {
        this.cronEvery.Dom = true;
      } else {
        this.cronEvery.Dom = false;
      }
      if (this.cron.Month === '*') {
        this.cronEvery.Month = true;
      } else {
        this.cronEvery.Month = false;
      }
      if (this.cron.Dow === '*') {
        this.cronEvery.Dow = true;
      } else {
        this.cronEvery.Dow = false;
      }
    }
    if (this.cron.Month && this.cron.Month !== '*') {
      this.monthVal.setValue(this.cron.Month.split(','));
    }
    if (this.cron.Dow && this.cron.Dow !== '*') {
      this.dowVal.setValue(this.cron.Dow.split(','));
    }
    console.log('cronEvery');
  }

  ngAfterViewInit() {}

  EveryMinute(): Boolean {
    if (this.cron && this.cron.Minute == '*') {
      this.cronEvery.Minute = true;
      return true;
    }
    this.cronEvery.Minute = false;
    return false;
  }

  EveryHour(): Boolean {
    if (this.cron && this.cron.Hour == '*') {
      this.cronEvery.Hour = true;
      return true;
    }
    this.cronEvery.Hour = false;
    return false;
  }

  EveryDom(): Boolean {
    if (this.cron && this.cron.Dom == '*') {
      this.cronEvery.Dom = true;
      return true;
    }
    this.cronEvery.Dom = false;
    return false;
  }

  EveryMonth(): Boolean {
    if (this.cron && this.cron.Month == '*') {
      this.cronEvery.Month = true;
      return true;
    }
    this.cronEvery.Month = false;
    return false;
  }

  EveryDow(): Boolean {
    if (this.cron && this.cron.Dow == '*') {
      this.cronEvery.Dow = true;
      return true;
    }
    this.cronEvery.Dow = false;
    return false;
  }

  toggleEveryMinute() {
    if (this.cronEvery.Minute) {
      this.cronEvery.Minute = false;
      this.cron.Minute = '0';
    } else {
      this.cronEvery.Minute = true;
      this.cron.Minute = '*';
    }
    this.emitCron();
  }

  toggleEveryHour() {
    if (this.cronEvery.Hour) {
      this.cronEvery.Hour = false;
      this.cron.Hour = '0';
    } else {
      this.cronEvery.Hour = true;
      this.cron.Hour = '*';
    }
    this.emitCron();
  }

  toggleEveryDom() {
    if (this.cronEvery.Dom) {
      this.cronEvery.Dom = false;
      this.cron.Dom = '1';
    } else {
      this.cronEvery.Dom = true;
      this.cron.Dom = '*';
    }
    this.emitCron();
  }

  toggleEveryMonth() {
    if (this.cronEvery.Month) {
      this.cronEvery.Month = false;
      this.cron.Month = '1';
      if (this.monthVal.value) {
        this.cron.Month = this.monthVal.value.join(',');
      } else {
        this.monthVal.setValue(['1']);
      }
    } else {
      this.cronEvery.Month = true;
      this.cron.Month = '*';
    }
    console.log('toggleEveryMonth');
    this.emitCron();
  }

  toggleEveryDow() {
    if (this.cronEvery.Dow) {
      this.cronEvery.Dow = false;
      this.cron.Dow = '0';
      if (this.dowVal.value) {
        this.cron.Dow = this.dowVal.value.join(',');
      } else {
        this.dowVal.setValue(['1']);
      }
    } else {
      this.cronEvery.Dow = true;
      this.cron.Dow = '*';
    }
    console.log('toggleEveryDow');
    this.emitCron();
  }

  emitCron() {
    this.cronChange.emit(this.cron);
    console.log('emit(this.cron)');
    console.log(this.cron);
  }

  updateMinute(min: string) {
    if (min) {
      this.cron.Minute = min;
    }
    this.emitCron();
  }

  updateHour(hour: string) {
    if (hour) {
      this.cron.Hour = hour;
    }
    this.emitCron();
  }

  updateDom(dom: string) {
    if (dom) {
      this.cron.Dom = dom;
    }
    this.emitCron();
  }

  updateMonth(change: Array<string>) {
    console.log('updateMonth');
    console.log(change);
    if (change) {
      this.cron.Month = change.join(',');
    }
    this.emitCron();
  }

  updateDow(change: Array<string>) {
    console.log('updateDow');
    console.log(change);
    if (change) {
      this.cron.Dow = change.join(',');
    }
    this.emitCron();
  }

  /* limiter(inStr: string, min: number, max: number): Boolean {
    
    // let reg = /(?:\d{3}|\(\d{3}\))([-\/\.])\d{3}\1\d{4}/
    let reg = /(\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*|\?/
    console.log("1");
    console.log(reg.exec("1"));
    console.log("1-2");
    console.log(reg.exec("1-2"));
    console.log("2,3");
    console.log(reg.exec("2,3"));
    console.log("*");
    console.log(reg.exec("*"));
    console.log("?");
    console.log(reg.exec("?"));
    
    if (!inStr.match(reg)) {
      return false;
    } else if (inStr.includes(',') && inStr.includes('/') && inStr.includes('-')) {
      return false;
    } else if (inStr.includes(',') && inStr.includes('/')) {
      return false;
    } else if (inStr.includes('-') && inStr.includes(',')) {
      return false;
    } else {
      
    }
    return false;
  } */

  dowList = [
    {
      weekday: 'Sunday',
      code: '0'
    },
    {
      weekday: 'Monday',
      code: '1'
    },
    {
      weekday: 'Tuesday',
      code: '2'
    },
    {
      weekday: 'Wednesday',
      code: '3'
    },
    {
      weekday: 'Thursday',
      code: '4'
    },
    {
      weekday: 'Friday',
      code: '5'
    },
    {
      weekday: 'Saturday',
      code: '6'
    }
  ];

  monthList = [
    {
      month: 'January',
      code: '1'
    },
    {
      month: 'February',
      code: '2'
    },
    {
      month: 'March',
      code: '3'
    },
    {
      month: 'April',
      code: '4'
    },
    {
      month: 'May',
      code: '5'
    },
    {
      month: 'June',
      code: '6'
    },
    {
      month: 'July',
      code: '7'
    },
    {
      month: 'August',
      code: '8'
    },
    {
      month: 'September',
      code: '9'
    },
    {
      month: 'October',
      code: '10'
    },
    {
      month: 'November',
      code: '11'
    },
    {
      month: 'December',
      code: '12'
    }
  ];
}
