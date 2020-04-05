import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Device, DEVICE_INFO, PIN_GROUND, PIN_GPIO, PIN_POWER3v3, PIN_POWER5v } from '../../models';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NaasService } from '../../services/naas.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'setup-pin',
  template: `
    <button (click)="setupPins()" mat-raised-button color="primary">
      Setup
    </button>
    <table class="padding20 marginAuto">
      <tr *ngFor="let pin of pinsState$ | async">
        <td>PIN {{ pin.Pin }}</td>
        <td>
          <input
            *ngIf="pin.PinType == PIN_GPIO"
            (keyup.enter)="updateName(pin.Pin, $event.target.value)"
            (blur)="updateName(pin.Pin, $event.target.value)"
            value="{{ pin.Name }}"
            placeholder="Pin name"
            matInput
          />
          <div *ngIf="pin.PinType == PIN_GROUND">Ground</div>
          <div *ngIf="pin.PinType == PIN_POWER3v3">POWER 3v3</div>
          <div *ngIf="pin.PinType == PIN_POWER5v">POWER 5v</div>
        </td>
        <td>
          <mat-form-field *ngIf="pin.PinType == PIN_GPIO">
            <mat-label>Device</mat-label>
            <mat-select
              (selectionChange)="selectDevice(pin.Pin, $event.value)"
              [value]="pin.DeviceId"
            >
              <mat-option
                *ngFor="let device of device_info"
                [value]="device.DeviceId"
              >
                {{ device.Name }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </td>
      </tr>
      <table></table>
    </table>
  `,
  styleUrls: ['./setup-pin.component.scss']
})
export class SetupPinComponent implements OnInit, AfterContentInit {
  pins: Array<Device> = [];
  pinsState$: BehaviorSubject<Array<Device>> = new BehaviorSubject<
    Array<Device>
  >([]);
  device_info = [];
  device_info$ = this.naasSv.device_info$.subscribe((devices_info) => {
    this.device_info = devices_info;
  });
  devices$$: Subscription;
  PIN_GROUND = PIN_GROUND;
  PIN_GPIO = PIN_GPIO;
  PIN_POWER3v3 = PIN_POWER3v3;
  PIN_POWER5v = PIN_POWER5v;
  constructor(private naasSv: NaasService) {}
  ngOnInit(): void {
    // this.devices_info = this.naasSv.device_info;
    console.log("setupPinInit");
    this.pins = [
      {
        Id: '1',
        Pin: 1,
        Name: '',
        PinType: PIN_POWER3v3,
        PinMode: PIN_GPIO,
        DeviceId: '',
        BoolState: false,
      },
      {
        Id: '2',
        Pin: 2,
        Name: '',
        PinType: PIN_POWER5v,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '3',
        Pin: 3,
        GPIO: 2,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '4',
        Pin: 4,
        Name: '',
        PinType: PIN_POWER5v,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '5',
        Pin: 5,
        GPIO: 3,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '6',
        Pin: 6,
        Name: '',
        PinType: 1,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      }, // ground
      {
        Id: '7',
        Pin: 7,
        GPIO: 4,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '8',
        Pin: 8,
        GPIO: 14,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '9',
        Pin: 9,
        Name: '',
        PinType: 1,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      }, // ground
      {
        Id: '10',
        Pin: 10,
        GPIO: 15,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '11',
        Pin: 11,
        GPIO: 17,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '12',
        Pin: 12,
        GPIO: 18,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '13',
        Pin: 13,
        GPIO: 27,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '14',
        Pin: 14,
        Name: '',
        PinType: 1,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      }, // ground
      {
        Id: '15',
        Pin: 15,
        GPIO: 22,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '16',
        Pin: 16,
        GPIO: 23,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '17',
        Pin: 17,
        Name: '',
        PinType: PIN_POWER3v3,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '18',
        Pin: 18,
        GPIO: 24,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '19',
        Pin: 19,
        GPIO: 10,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '20',
        Pin: 20,
        Name: '',
        PinType: 1,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      }, // ground
      {
        Id: '21',
        Pin: 21,
        GPIO: 9,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '22',
        Pin: 22,
        GPIO: 25,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '23',
        Pin: 23,
        GPIO: 11,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '24',
        Pin: 24,
        GPIO: 8,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '25',
        Pin: 25,
        Name: '',
        PinType: 1,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      }, // ground
      {
        Id: '26',
        Pin: 26,
        GPIO: 7,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '27',
        Pin: 27,
        GPIO: 0,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '28',
        Pin: 28,
        GPIO: 1,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '29',
        Pin: 29,
        GPIO: 5,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '30',
        Pin: 30,
        Name: '',
        PinType: 1,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      }, // ground
      {
        Id: '31',
        Pin: 31,
        GPIO: 6,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '32',
        Pin: 32,
        GPIO: 12,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '33',
        Pin: 33,
        GPIO: 13,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '34',
        Pin: 34,
        Name: '',
        PinType: 1,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      }, // ground
      {
        Id: '35',
        Pin: 35,
        GPIO: 19,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '36',
        Pin: 36,
        GPIO: 16,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '37',
        Pin: 37,
        GPIO: 26,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '38',
        Pin: 38,
        GPIO: 20,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      },
      {
        Id: '39',
        Pin: 39,
        Name: '',
        PinType: 1,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      }, // ground
      {
        Id: '40',
        Pin: 40,
        GPIO: 21,
        Name: '',
        PinType: PIN_GPIO,
        PinMode: 0,
        DeviceId: '',
        BoolState: false
      }
    ];

    this.pinsState$.next(this.pins);
    console.log('pin');
    
  }
  
  ngAfterContentInit() {
  this.devices$$ = this.naasSv.deviceArray$.subscribe((devices: Device[]) => {
    this.pins.forEach((pin, i, pins) => {
      // let newDevices: Device[] = JSON.parse(JSON.stringify(devices));
      if (devices && devices.length) {
        devices.forEach(device => {
          if (device && device.Name && pin.Pin == device.Pin) {
            pins[i] = JSON.parse(JSON.stringify(device));
          }
        });
      }
    });
    this.pinsState$.next(this.pins);
    
    console.log("this.pinsState$.next(this.pins);");
    console.log(this.pins);
  });
  }

  updateName(pin: number, name: string) {
    if (pin) {
      this.pins
        .filter(value => value.Pin == pin)
        .forEach(value => {
          console.log('assign ' + name + ' to ' + value.Name);
          value.Name = name;
        });
    }
  }

  /* toggleActive(pinNo: number) {
    if (pinNo > 0) {
      this.pins
        .filter(value => value.Pin == pinNo)
        .forEach(value => {
          if (value.Active) {
            value.Active = false;
          } else {
            value.Active = true;
          }
          console.log('change ' + value.Pin + '.Active to ' + value.Active);
        });
    }
  } */

  setupPins() {
    // sanitize before setup
    this.naasSv.setupPins(this.pins).subscribe((result: string) => {
      console.log('setup pins result: ' + result);
    });
  }

  selectDevice(pinNo: number, matSelect: string) {
    if (pinNo > 0) {
      console.log('matSelect: ' + matSelect);
      this.pins
        .filter(value => value.Pin == pinNo)
        .forEach(value => {
          value.DeviceId = matSelect;
          for (let device of this.device_info) {
            if (device.DeviceId === matSelect) {
              console.log('found ' + device.DeviceId);
              value.PinMode = device.PinMode;
              value.PinType = device.PinType;
              break;
            } else {
              console.log('not found' + matSelect);
            }
          }
          console.log('select Device: ' + JSON.stringify(value));
        });
    }
  }
}
