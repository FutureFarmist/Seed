import {
  Component,
  OnInit,
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
  Device, DEVICE_INFO, CONTROLLING_FACTORS, DeviceInfo, ResponseResult
} from '../../models';

// TODO: update status of actuator for realtime status of control
// this would be automator safety

@Component({
  selector: 'pins',
  template: `
    <button (click)="callDeviceValues()" matInput>Read values</button>
    <mat-grid-list cols="5" rowHeight="200px">
      <mat-grid-tile *ngFor="let device of devices">
        <mat-card class="card">
          <mat-card-header>
            <div mat-card-avatar class="header-image"></div>
            <mat-card-title>{{
              device.Name ? device.Name : 'PIN ' + device.Pin
            }}</mat-card-title>
            <mat-card-subtitle>{{getDeviceName(device.DeviceId)}}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <sensor-values [SensorValues]="device.SensorValues"></sensor-values>
          </mat-card-content>
          <mat-card-actions>
            <mat-slide-toggle
              *ngIf="device.PinMode == 1"
              (change)="togglePin(device.Pin)"
              [checked]="device.BoolState"
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
  deviceList = DEVICE_INFO;

  FACTORS = CONTROLLING_FACTORS;
  constructor(private naasSv: NaasService) {}

  ngOnInit() {
    // this.devices = [];
    // this.devicesState$.next(this.devices);
    console.log('pin');
    this.devices$$ = this.naasSv.deviceArray$.subscribe((r_devices: Device[]) => {
      console.log("update devices on pins");
      console.log(r_devices);
      this.devices = JSON.parse(JSON.stringify(r_devices)).filter(this._filterName);
      this.updateDevices();
    });
    
    this.naasSv.callDeviceInfo();
    this.naasSv.callDevice();
    this.naasSv.callDeviceValues();
    
  }
  
  _filterName(val) {
    return val.Name;
  }
  
  callDeviceValues() {
    this.naasSv.callDeviceValues()
  }

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
            this.naasSv.pinOff(pin.Pin).subscribe((result: ResponseResult) => {
              pin.BoolState = false;
              this.updateDevices();
              console.log('pinOff result:', result);
            });
            
            // this.naasSv.pinOff(pin.Pin).subscribe(this.handleDevicesState);
            break;
          } else {
            console.log('pinOn');
            this.naasSv.pinOn(pin.Pin).subscribe((result: ResponseResult) => {
              pin.BoolState = true;
              this.updateDevices();
              console.log('pinOn result:', result);
            });
            // this.naasSv.pinOn(pin.Pin).subscribe(this.handleDevicesState);
            break;
          }
        }
      }
    }
  }

  updateDevices() {
    if (this.devices && this.devices.length) {
      console.log("updateDevices");
      this.devicesState$.next(this.devices.filter(val => val.Name));
    }
  }
  
  handleDevicesState(devicesState: string) {
    if (devicesState) {
      console.log('handledevicesState');
      let ps = JSON.parse(devicesState);
      let devices: Device[] = [];

      // push to devicesState$
      this.updateDevices();
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
