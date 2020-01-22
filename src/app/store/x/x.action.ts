import { Action } from '@ngrx/store';

export enum XActionTypes {
    Y = '[x] Y',
  }

export class Y implements Action {
  readonly type = XActionTypes.Y;
}

export type XActions =
  | Y;
