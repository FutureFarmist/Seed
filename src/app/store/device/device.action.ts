import { Action } from '@ngrx/store';

export enum DeviceActionTypes {
    Y = '[device] Y',
  }

export class Y implements Action {
  readonly type = DeviceActionTypes.Y;
}

export type DeviceActions =
  | Y;
