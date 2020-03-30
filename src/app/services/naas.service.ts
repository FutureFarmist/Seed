import { Injectable, OnInit, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Field, Device, Controller, Cron, Plant, PIN_GROUND, PIN_OUTPUT, PIN_INPUT } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as fromRoot from "../store/index";
import * as fieldSelector from "../store/field/field.selector";
import * as deviceSelector from "../store/device/device.selector";
import * as controllerSelector from "../store/controller/controller.selector";
import * as controllerAction from "../store/controller/controller.action";
import * as plantSelector from "../store/plant/plant.selector";
import { Subscription } from 'rxjs';
import { Update } from '@ngrx/entity';
import { UpdateStr, UpdateNum } from '@ngrx/entity/src/models';
import { addDevice, addDevices } from '../store/device/device.action';

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

  deviceArray: Array<Device>;
  // deviceArray$: Observable<Array<Device>>;
  // deviceArray$$: Subscription;
  deviceArray$ = this.store.select(deviceSelector.selectAllDevices);
  deviceArray$$ = this.deviceArray$.subscribe((deviceArray: Array<Device>) => {
    this.deviceArray = deviceArray;
    this.sensors = deviceArray.filter((device) => {
      /* console.log("sensor filter");
      console.log(device); */
      return (
        device.Name != "" &&
        device.PinType !== PIN_GROUND &&
        device.PinMode === PIN_INPUT
      );
    });

    this.actuators = deviceArray.filter((device) => {
      return (
        device.Name != '' &&
        device.PinType !== PIN_GROUND &&
        device.PinMode === PIN_OUTPUT
      );
    });
    /* console.log('sensors');
    console.log(deviceArray);
    console.log(this.sensors);
    console.log(this.actuators); */
  });

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
    (plantArray: Array<Field>) => {
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

  ngOnInit() {}

  readDevices(): Observable<any> {
    console.log('readDevices');
    return this.http.post<any>(
      this.devicePrefix + 'list',
      {},
      this.httpOptions
    );
  }

  addDevices(devices: Device[]) {
    console.log("add devices");
    this.store.dispatch(addDevices({Devices: devices}));
  }

  pinOn(pin: number): Observable<string> {
    if (pin) {
      console.log('pinOn');
      return this.http.post<string>(
        this.devicePrefix + 'on/' + pin,
        {},
        this.httpOptions
      );
    }
  }

  pinOff(pin: number): Observable<string> {
    if (pin) {
      console.log('pinOff');
      return this.http.post<string>(
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
      Sensors: [],
      Policy: 0,
      ControlScheme: 0,
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
    let ctls_changes: Array<UpdateNum<Controller>> = [];
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
