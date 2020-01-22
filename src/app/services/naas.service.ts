import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IField, IDevice } from '../model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as fromRoot from "../store";
import * as fieldSelector from "../store/field/field.selector";

@Injectable({
  providedIn: 'root'
})
export class NaasService {
  host = window.location.hostname;
  prefix = "http://"+ this.host + ":3030/api/";
  fieldPrefix = this.prefix + "field/";
  devicePrefix = this.prefix + "device/";
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // 'Authorization': 'my-auth-token',
    })
  };
  
  fieldArray: Array<IField>;
  fieldArray$ = this.store.select(fieldSelector.getAllFields);
  fieldArray$$ = this.fieldArray$.subscribe((fieldArray: Array<IField>) => {
    this.fieldArray = fieldArray;
  });
  
  constructor(private http: HttpClient, private store: Store<fromRoot.State>) { }
 
  getFields(): Observable<Array<IField>> {
    return this.fieldArray$;
  }
  
  readFields(): Observable<Array<IField>> {
    console.log('readFields');
    return this.http.post<Array<IField>>(this.fieldPrefix + 'list', 
    {} , this.httpOptions);
  }
  
  readDevices(): Observable<Array<IDevice>> {
    console.log('readDevices');
    return this.http.post<Array<IDevice>>(this.devicePrefix + 'list', 
    {} , this.httpOptions);
  }
  
  pinOn(pin: number): Observable<string> {
    if (pin) {
      console.log('pinOn');
      return this.http.post<string>(this.devicePrefix + 'on/' + pin, 
      {} , this.httpOptions);
    }
  }
  
  pinOff(pin: number): Observable<string> {
    if (pin) {
      console.log('pinOff');
      return this.http.post<string>(this.devicePrefix + 'off/' + pin, 
      {} , this.httpOptions);
    }
  }
  
}
