import { Injectable, OnInit, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Field, Device, Controller, Cron, Plant, PIN_GROUND, PIN_MODE_OUTPUT, PIN_MODE_INPUT, DeviceInfo, SensorValue, ResponseResult, PIN_GPIO } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as fromRoot from "../store/index";
import * as fieldSelector from "../store/field/field.selector";
import * as deviceSelector from "../store/device/device.selector";
import * as controllerSelector from "../store/controller/controller.selector";
import * as controllerAction from "../store/controller/controller.action";
import * as plantSelector from "../store/plant/plant.selector";
import { Subscription } from 'rxjs';
import { Update, EntityMap, Dictionary } from '@ngrx/entity';
// import { UpdateStr, UpdateNum } from '@ngrx/entity';
import * as deviceActions from '../store/device/device.action';

@Injectable({
  providedIn: 'root'
})
export class NaasService implements OnInit {
  host = window.location.hostname;
  prefix = 'http://' + this.host + ':3030/api/';
  fieldPrefix = this.prefix + 'field/';
  devicePrefix = this.prefix + 'device/';
  controllerPrefix = this.prefix + 'controller/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Authorization': 'my-auth-token',
    })
  };

  controllerArray: Array<Controller> = [];
  /* controllerArray$: Observable<Array<Controller>>;
  controllerArray$$: Subscription; */
  controllerArray$ = this.store.select(controllerSelector.selectAllControllers);
  controllerArray$$ = this.controllerArray$.subscribe(
    (controllerArray: Array<Controller>) => {
      console.log('f1 controller updated');
      this.controllerArray = JSON.parse(JSON.stringify(controllerArray));
    },
    error => {
      console.log('f1error controller update' + error);
    },
    () => {
      console.log('f1controller completed');
    }
  );

  deviceEntities: Array<Device>;
  // deviceArray$: Observable<Array<Device>>;
  // deviceArray$$: Subscription;
  deviceEntities$ = this.store.select(deviceSelector.selectDeviceEntities);
  deviceEntities$$ = this.deviceEntities$.subscribe((deviceEntities: Dictionary<Device>) => {
    this.deviceEntities = JSON.parse(JSON.stringify(deviceEntities));
  });

  deviceArray: Array<Device>;
  // deviceArray$: Observable<Array<Device>>;
  // deviceArray$$: Subscription;
  deviceArray$ = this.store.select(deviceSelector.selectAllDevices);
  deviceArray$$ = this.deviceArray$.subscribe((deviceArray: Array<Device>) => {
    this.deviceArray = JSON.parse(JSON.stringify(deviceArray));
    this.sensors = this.deviceArray.filter(device => {
      return (
        device.Name && device.Name.length &&
        device.PinType == PIN_GPIO &&
        device.PinMode === PIN_MODE_INPUT
        );
      });
      console.log("sensors");
      console.log(this.sensors);
    this.actuators = this.deviceArray.filter(device => {
      return (
          device.Name && device.Name.length &&
        device.PinType == PIN_GPIO &&
        device.PinMode === PIN_MODE_OUTPUT
      );
    });
  });

  device_info: Array<DeviceInfo> = [];
  sensor_values: Array<SensorValue> = [];

  fieldArray: Array<Field>;
  fieldArray$: Observable<Array<Field>> = this.store.select(
    fieldSelector.selectAllFields
  );
  fieldArray$$: Subscription = this.fieldArray$.subscribe(
    (fieldArray: Array<Field>) => {
      this.fieldArray = fieldArray;
    }
  );

  plantArray: Array<Plant>;
  plantArray$: Observable<Array<Plant>> = this.store.select(
    plantSelector.selectAllPlants
  );
  plantArray$$: Subscription = this.plantArray$.subscribe(
    (plantArray: Array<Plant>) => {
      this.plantArray = plantArray;
    }
  );

  sensors: Array<Device>;
  /* sensors$: Observable<Array<Device>> = this.store.select(
    deviceSelector.selectSensors
  );
  sensors$$: Subscription = this.sensors$.subscribe(
    (sensors: Array<Device>) => {
      this.sensors = sensors;
    }
  ); */

  actuators: Array<Device>;
  /* actuators$: Observable<Array<Device>> = this.store.select(
    deviceSelector.selectActuators
  );
  actuators$$: Subscription = this.actuators$.subscribe(
    (actuators: Array<Device>) => {
      this.actuators = actuators;
    }
  ); */

  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    
  }

  getDeviceInfo(Id: string): DeviceInfo {
    return this.device_info.find((dv_info) => {
      if (dv_info.DeviceId && this.deviceEntities[Id] && dv_info.DeviceId == this.deviceEntities[Id].DeviceId) {
        return true;
      }
    });
  }

  readDeviceInfo(): Observable<Array<DeviceInfo>> {
    console.log('readDeviceInfo');
    return this.http.post<Array<DeviceInfo>>(
      this.devicePrefix + 'device-info',
      {},
      this.httpOptions
    );
  }

  readDeviceList(): Observable<Array<Device>> {
    console.log('readDeviceList');
    return this.http.post<Array<Device>>(
      this.devicePrefix + 'list',
      {},
      this.httpOptions
    );
  }

  readDeviceValue(): Observable<Array<SensorValue>> {
    console.log('readDeviceValue');
    return this.http.post<Array<SensorValue>>(
      this.devicePrefix + 'device-value',
      {},
      this.httpOptions
    );
  }

  callDevice() {
    this.readDeviceList().subscribe((device_list: Device[]) => {
      console.log("readDeviceList res");
      if (device_list) {
        console.log("device_value");
        console.log(device_list);
        this.upsertDevices(device_list);
        this.conciliateDevices();
      }
    });
  }
  
  callDeviceValues() {
    console.log('updateDeviceValues');
    this.readDeviceValue().subscribe((sensor_vals: SensorValue[]) => {
      console.log('updateDeviceValues 1');
      if (sensor_vals) {
        console.log('sensor_vals');
        this.sensor_values = sensor_vals;
        console.log("device_value");
        console.log(sensor_vals);
        this.conciliateDevices();
      }
    });
  }
  
  callDeviceInfo() {
    this.readDeviceInfo().subscribe((devices_info: Array<DeviceInfo>) => {
      if (devices_info) {
        this.device_info = devices_info;
        console.log("device_info");
        console.log(devices_info);
      }
    });
  }
  
  conciliateDevices() {
    console.log('conciliateDevices');
    if (this.deviceArray.length > 0 && this.sensor_values.length > 0) {
      console.log('1');
      let devices = JSON.parse(JSON.stringify(this.deviceArray));
      for ( let device of devices ) {
        for ( let ssVal of this.sensor_values ) {
          console.log(ssVal);
          if (ssVal.Device_id == device.Id) {
            console.log("2");
            if (device.SensorValues) {
              if (device.SensorValues.length > 0) {
                console.log("3");
                var updated = false;
                for (let sensorVal of device.SensorValues) {
                  if (sensorVal.Factor == ssVal.Factor) {
                    console.log("4");
                    sensorVal = ssVal
                    updated = true;
                  }
                }
                if (!updated) {
                  console.log("5");
                  device.SensorValues.push(ssVal);
                }
              } else {
                console.log("6");
                device.SensorValues.push(ssVal);
              }
            } else {
              device.SensorValues = [ssVal];
            }
            
          }
        }
      } 
      this.upsertDevices(devices);
    }
  }

  addDevices(devices: Device[]) {
    console.log('add devices');
    if (devices) {
      this.store.dispatch(deviceActions.addDevices({ Devices: devices }));
    }
  }
  
  upsertDevices(devices: Device[]) {
    console.log('upsertDevices');
    if (devices) {
      this.store.dispatch(deviceActions.upsertDevices({ Devices: devices }));
    }
  }
  

  pinOn(pin: number): Observable<ResponseResult> {
    console.log('pinOff', pin);
    if (pin) {
      console.log('pinOn');
      return this.http.post<ResponseResult>(
        this.devicePrefix + 'on/' + pin,
        {},
        this.httpOptions
      );
    }
  }

  pinOff(pin: number): Observable<ResponseResult> {
    console.log('pinOff', pin);
    if (pin) {
      console.log('pinOff');
      return this.http.post<ResponseResult>(
        this.devicePrefix + 'off/' + pin,
        {},
        this.httpOptions
      );
    }
  }

  setupPins(pins: Array<Device>): Observable<string> {
    if (pins) {
      console.log('setupPins');
      return this.http.post<string>(
        this.prefix + 'setup-pins',
        pins,
        this.httpOptions
      );
    }
  }

  // getFields(): Observable<Array<Field>> {
  //   return this.fieldArray$;
  // }


  readFields(): Observable<Array<Field>> {
    console.log('readFields');
    return this.http.post<Array<Field>>(
      this.fieldPrefix + 'list',
      {},
      this.httpOptions
    );
  }

  readControllers(): Observable<string> {
    console.log('readControllers');
    return this.http.post<any>(
      this.controllerPrefix + 'list',
      {},
      this.httpOptions
    );
  }

  dbUpdateControllers(): Observable<string> {
    console.log('dbUpdateControllers');
    return this.http.post<string>(
      this.controllerPrefix + 'update',
      this.controllerArray,
      this.httpOptions
    );
  }

  newControllerDefault(): Controller {
    return {
      Id: Math.floor(Math.random() * Math.floor(10)),
      Name: 'Controller',
      Desc: '',
      Active: true,
      Factor: 0,
      Sensor: '',
      ControlScheme: 0,
      Policy: 0,
      // TIME_POLICY + TIME_MEASUREMENT_POLICY

      Cron: this.newCron(),
      // SessionStartDate: "",
      // SeasonEndDate: "",

      /* ActiveDaily: false,


      ActiveWeekDayRanges: [],
      ActiveMonthDayRanges: [],
      ActiveMonthRanges: [],
      TimePeriods: [], */

      // VALUE_CONTROL scheme

      OptimalVal: null,
      PreferredMin: null,
      PreferredMax: null,

      IncreasingDevices: [],
      DecreasingDevices: [],

      // BOOLEAN_CONTROL scheme
      // PreferredState: false,

      BoolTrueDevices: [],
      BoolFalseDevices: []
    };
  }

  addController() {
    console.log('naas addController');
    let ctl = this.newControllerDefault();
    console.log(ctl);
    this.store.dispatch(controllerAction.addController({ Controller: ctl }));
  }

  addControllers(ctls: Controller[]) {
    console.log('naasSv addControllers');
    console.log(ctls);
    this.store.dispatch(controllerAction.addControllers({ Controllers: ctls }));
  }

  updateControllers(ctls: Array<Controller>) {
    let ctls_changes: Array<Update<Controller>> = [];
    if (ctls) {
      for (let ctl of ctls) {
        ctls_changes.push({
          id: ctl.Id,
          changes: ctl
        });
      }
    }
    this.store.dispatch(
      controllerAction.updateControllers({ Controllers: ctls_changes })
    );
  }

  deleteController(id: string) {
    this.store.dispatch(controllerAction.deleteController({ id: id }));
  }

  newCron(second?: Boolean, year?: Boolean): Cron {
    let cron: Cron = {
      // every based. This will translate into */10 every 10 seconds in cron
      Second: '10',
      Minute: '*',
      Hour: '*',
      Dom: '*',
      Month: '*',
      Dow: '*'
    };
    if (second) {
      cron.Second = '*';
    }
    if (year) {
      cron.Year = '*';
    }
    return cron;
  }
}
