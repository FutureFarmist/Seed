import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';

import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  CommonModule
} from '@angular/common';

import {
  StoreModule
} from '@ngrx/store';
import {
  EffectsModule
} from '@ngrx/effects';
// import { DBModule } from '@ngrx/db';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import {
  StoreDevtoolsModule
} from '@ngrx/store-devtools';

import {
  CookieService
} from 'ngx-cookie-service';

import {
  reducers,
  metaReducers
} from './store';
import {
  CORE_EFFECTS
} from './store/effects';

import {
  AppRoutingModule
} from './utils/app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './utils/material.module';

import {
  CustomRouterStateSerializer
} from './utils/CustomRouterStateSerializer'

import { AuthInterceptor } from './auth.interceptor';

import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import {
  environment
} from '../environments/environment';

import {
  AppComponent
} from './app.component';
import {
  RouterModule
} from '@angular/router';
import { FieldComponent } from './containers/field/field.component';
import { DeviceComponent } from './containers/device/device.component';
import { CameraComponent } from './containers/camera/camera.component';
import { NaasService } from './services/naas.service';
import { PinsComponent } from './containers/pins/pins.component';

@NgModule({
  declarations: [
    AppComponent, 
    FieldComponent, DeviceComponent, CameraComponent, PinsComponent
  ],
  imports: [
    BrowserModule,

    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers, {
      metaReducers
    }),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot(),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    !environment.production ?
    StoreDevtoolsModule.instrument({
      // name: 'NgRx Book Store DevTools',
    }) :
    [],

    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forRoot(CORE_EFFECTS),

    /* RouterModule.forRoot([], {
      initialNavigation: 'enabled'
    }), */

    AppRoutingModule,

    NoopAnimationsModule,
    
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    
  ],
  providers: [
    /**
     * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
     * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
     * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
     */
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    CookieService,
    NaasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
