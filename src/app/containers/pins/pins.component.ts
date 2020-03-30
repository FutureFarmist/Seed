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
    this.devices = [];
    // this.devices = [
    //   { Pin: 1, Status: false, PinType: 0, Name: 'Sensor X' },
    //   { Pin: 2, Status: false, PinType: 0 },
    //   { Pin: 3, Status: false, PinType: 0 },
    //   { Pin: 4, Status: false, PinType: 0 },
    //   { Pin: 5, Status: false, PinType: 0 },
    //   { Pin: 6, Status: false, PinType: 1 }, // ground
    //   { Pin: 7, Status: false, PinType: 0 },
    //   { Pin: 8, Status: false, PinType: 0 },
    //   { Pin: 9, Status: false, PinType: 1 }, // ground
    //   { Pin: 10, Status: false, PinType: 0 },
    //   { Pin: 11, Status: false, PinType: 0 },
    //   { Pin: 12, Status: false, PinType: 0 },
    //   { Pin: 13, Status: false, PinType: 0 },
    //   { Pin: 14, Status: false, PinType: 0 }, // ground
    //   { Pin: 15, Status: false, PinType: 0 },
    //   { Pin: 16, Status: false, PinType: 0 },
    //   { Pin: 17, Status: false, PinType: 0 },
    //   { Pin: 18, Status: false, PinType: 0 },
    //   { Pin: 19, Status: false, PinType: 0 },
    //   { Pin: 20, Status: false, PinType: 1 }, // ground
    //   { Pin: 21, Status: false, PinType: 0 },
    //   { Pin: 22, Status: false, PinType: 0 },
    //   { Pin: 23, Status: false, PinType: 0 },
    //   { Pin: 24, Status: false, PinType: 0 },
    //   { Pin: 25, Status: false, PinType: 1 }, // ground
    //   { Pin: 26, Status: false, PinType: 0 },
    //   { Pin: 27, Status: false, PinType: 0 },
    //   { Pin: 28, Status: false, PinType: 0 },
    //   { Pin: 29, Status: false, PinType: 0 },
    //   { Pin: 30, Status: false, PinType: 1 }, // ground
    //   { Pin: 31, Status: false, PinType: 0 },
    //   { Pin: 32, Status: false, PinType: 0 },
    //   { Pin: 33, Status: false, PinType: 0 },
    //   { Pin: 34, Status: false, PinType: 1 }, // ground
    //   { Pin: 35, Status: false, PinType: 0 },
    //   { Pin: 36, Status: false, PinType: 0 },
    //   { Pin: 37, Status: false, PinType: 0 },
    //   { Pin: 38, Status: false, PinType: 0 },
    //   { Pin: 39, Status: false, PinType: 1 }, // ground
    //   { Pin: 40, Status: false, PinType: 0 }
    // ];

    this.devicesState$.next(this.devices);
    console.log('pin');

    this.devices$$ = this.naasSv.readDevices().subscribe(r_devices => {
      let devices = JSON.parse(r_devices);
      this.naasSv.addDevices(devices);
      this.devicesState$.next(devices.filter(val => val.Name));
    });
  }
  readDevices() {}
  togglePin(pinNo: number) {
    if (pinNo > 0) {
      for (let pin of this.devices) {
        if (pin.Pin === pinNo) {
          if (pin.BoolState) {
            this.naasSv.pinOff(pin.Pin).subscribe((result: string) => {
              pin.BoolState = false;
              this.emitDevices(this.devices);
            });

            // this.naasSv.pinOff(pin.Pin).subscribe(this.handledevicesState);
            break;
          } else {
            this.naasSv.pinOn(pin.Pin).subscribe((result: string) => {
              pin.BoolState = true;
              this.emitDevices(this.devices);
            });
            // this.naasSv.pinOn(pin.Pin).subscribe(this.handledevicesState);
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
    let name = this.deviceList.find(val => {
      return val.DeviceId == deviceId;
    }).Name;
    if (name) {
      return name;
    } else {
      return 'Device';
    }
  }
}
