import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IField, IDevice, Controller, Cron } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as fromRoot from "../store";
import * as fieldSelector from "../store/field/field.selector";
import * as deviceSelector from "../store/device/device.selector";
import * as controllerSelector from "../store/controller/controller.selector";
import * as controllerAction from "../store/controller/controller.action";
import * as plantSelector from "../store/plant/plant.selector";
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NaasService {
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

  controllerArray: Array<Controller>;
  controllerArray$: Observable<Array<Controller>>;
  controllerArray$$: Subscription;
  
  deviceArray: Array<IDevice>;
  /* deviceArray$ = this.store.select(deviceSelector.getAllDevices);
  deviceArray$$ = this.deviceArray$.subscribe((deviceArray: Array<IDevice>) => {
    this.deviceArray = deviceArray;
  }); */

  fieldArray: Array<IField>;
  /* fieldArray$ = this.store.select(fieldSelector.getAllFields);
  fieldArray$$ = this.fieldArray$.subscribe((fieldArray: Array<IField>) => {
    this.fieldArray = fieldArray;
  }); */

  plantArray: Array<IField>;
  /* plantArray$ = this.store.select(plantSelector.getAllPlants);
  plantArray$$ = this.plantArray$.subscribe((plantArray: Array<IField>) => {
    this.plantArray = plantArray;
  }); */

  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {
    /* this.controllerArray$ = this.store.select(controllerSelector.getAllControllers);
    this.controllerArray$$ = this.controllerArray$.subscribe(
      (controllerArray: Array<Controller>) => {
        this.controllerArray = controllerArray;
      }
    ); */
  }

  readDevices(): Observable<any> {
    console.log('readDevices');
    return this.http.post<any>(
      this.devicePrefix + 'list',
      {},
      this.httpOptions
    );
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

  setupPins(pins: Array<IDevice>): Observable<string> {
    if (pins) {
      console.log('setupPins');
      return this.http.post<string>(
        this.prefix + 'setup-pins',
        pins,
        this.httpOptions
      );
    }
  }

  // getFields(): Observable<Array<IField>> {
  //   return this.fieldArray$;
  // }

  readFields(): Observable<Array<IField>> {
    console.log('readFields');
    return this.http.post<Array<IField>>(
      this.fieldPrefix + 'list',
      {},
      this.httpOptions
    );
  }

  readControllers(): Observable<Array<Controller>> {
    console.log('readControllers');
    return this.http.post<Array<Controller>>(
      this.controllerPrefix + 'list',
      {},
      this.httpOptions
    );
  }

  setControllers(): Observable<string> {
    console.log('setControllers');
    return this.http.post<string>(
      this.controllerPrefix + 'set',
      {},
      this.httpOptions
    );
  }

  newControllerDefault(): Controller {
    return {
      Id: 0,
      Active: true,
      Sensors: '',
      Policy: 0,
      ControlScheme: 0,

      // TIME_POLICY + TIME_VALUE_POLICY

      Cron: null,
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
      PreferredState: false,

      BoolTrueDevices: [],
      BoolFalseDevices: []
    };
  }
  
  addNewController() {
    this.store.dispatch(new controllerAction.NewController);
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
