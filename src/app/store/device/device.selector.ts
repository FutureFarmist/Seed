import { createSelector, createFeatureSelector } from '@ngrx/store';

// from Feature
import * as fromIndex from './../index';
import * as fromDevice from './device.reducer';

/* export const getSyntaxState = createSelector(
  fromDeskIndex.getDeskState,
  (state: fromDeskIndex.DeskState) => state.syntax
); */

// export const getSyntaxEntitiesState = createSelector(
//   fromDeskIndex.getDeskState,
//   state => state.syntax
// );

export const {
  // select the array of ids
  selectIds: getDeviceIds,

  // select the dictionary of entities
  selectEntities: getDeviceEntities,

  // select the array of the entity
  selectAll: getAllDevices,

  // select the total count
  selectTotal: getDeviceTotal
} = fromDevice.adapter.getSelectors(); // fromIndex.getDeviceState

/* 
export const getXState = createSelector(
  fromX.getY,
  (state: fromF.FState) => state.x
);

export const getY = createSelector(
  getXState,
  fromX.getY
); */
