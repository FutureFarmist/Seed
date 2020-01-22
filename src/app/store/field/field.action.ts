import { Action } from '@ngrx/store';

export enum FieldActionTypes {
    Y = '[field] Y',
  }

export class Y implements Action {
  readonly type = FieldActionTypes.Y;
}

export type FieldActions =
  | Y;
