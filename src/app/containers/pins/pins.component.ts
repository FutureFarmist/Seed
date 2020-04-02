import {
  Component,
  OnInit
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subscription
} from 'rxjs';
import {
  NaasService
} from '../../services/naas.service';
import {
  MatSlideToggleChange
} from '@angular/material/slide-toggle';
import {
  Device, DEVICE_LIST
} from '../../models';

@Component({
  selector: 'pins',
  template: `
    <button (click)="readDevices()" matInput>read devices</button>
    <mat-grid-list cols="5" rowHeight="200px">
      <mat-grid-tile *ngFor="let pin of devicesState$ | async">
        <mat-card class="card">
          <mat-card-header>
            <div mat-card-avatar class="header-image"></div>
            <mat-card-title>{{
              pin.Name ? pin.Name : 'PIN ' + pin.Pin
            }}</mat-card-title>
            <mat-card-subtitle>{{getDeviceName(pin.DeviceId)}}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            content
          </mat-card-content>
          <mat-card-actions>
            <mat-slide-toggle
              *ngIf="pin.PinMode == 1"
              (change)="togglePin(pin.Pin)"
              [checked]="pin.OutputActive"
              >Output</mat-slide-toggle
            >
          </mat-card-actions>
        </mat-card>
      </mat-grid-tile>
    </mat-grid-list>
  `,
  styleUrls: ['./pins.component.scss']
})
export class PinsComponent implements OnInit {
  devices: Array<Device> = [];
  devicesState$: BehaviorSubject<Array<Device>> = new BehaviorSubject<
    Array<Device>
  >([]);
  devices$$: Subscription;
  deviceList = DEVICE_LIST;
  constructor(private naasSv: NaasService) {}

  ngOnInit() {
    // this.devices = [];
    // this.devicesState$.next(this.devices);
    console.log('pin');

    this.devices$$ = this.naasSv.readDevices().subscribe(r_devices => {
      // let deviceList = JSON.parse(r_devices);
      this.devices = JSON.parse(r_devices);
      this.naasSv.upsertDevices(this.devices);
      this.devicesState$.next(this.devices.filter(val => val.Name));
    });
  }
  readDevices() {}
  togglePin(pinNo: number) {
    console.log('togglePin');
    console.log(pinNo);
    if (pinNo > 0) {
      console.log('pinNO > 0');
      for (let pin of this.devices) {
        console.log(pin);
        if (pin.Pin == pinNo) {
          console.log('pin = pinNO');
          if (pin.BoolState) {
            console.log('pinOff');
            this.naasSv.pinOff(pin.Pin).subscribe((result: string) => {
              pin.BoolState = false;
              this.emitDevices(this.devices);
              console.log('pinOff result:', result);
            });
            
            // this.naasSv.pinOff(pin.Pin).subscribe(this.handleDevicesState);
            break;
          } else {
            console.log('pinOn');
            this.naasSv.pinOn(pin.Pin).subscribe((result: string) => {
              pin.BoolState = true;
              this.emitDevices(this.devices);
              console.log('pinOn result:', result);
            });
            // this.naasSv.pinOn(pin.Pin).subscribe(this.handleDevicesState);
            break;
          }
        }
      }
    }
  }

  emitDevices(devices: Device[]) {
    this.devicesState$.next(devices);
  }

  handleDevicesState(devicesState: string) {
    if (devicesState) {
      console.log('handledevicesState');
      let ps = JSON.parse(devicesState);
      let devices: Device[] = [];

      // push to devicesState$
      this.emitDevices(devices);
    }
  }

  getDeviceName(deviceId: string): string {
    let name = this.devices.find(val => {
      return val.DeviceId == deviceId;
    });
    if (name) {
      return name.Name;
    } else {
      return 'Device';
    }
  }
  
}
