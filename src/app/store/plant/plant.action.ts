import { Action } from '@ngrx/store';

export enum PlantActionTypes {
    Y = '[plant] Y',
  }

export class Y implements Action {
  readonly type = PlantActionTypes.Y;
}

export type PlantActions =
  | Y;
