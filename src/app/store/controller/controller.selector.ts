import { createSelector, createFeatureSelector } from '@ngrx/store';

// from Feature
import * as fromIndex from './../index';
import * as fromController from './controller.reducer';

/* export const getSyntaxState = createSelector(
  fromIndex.getControllerState,
  (state: fromController.State) => state.controller
);
 */
// export const getSyntaxEntitiesState = createSelector(
//   fromDeskIndex.getDeskState,
//   state => state.syntax
// );

export const {
  // select the array of ids
  selectIds: getControllerIds,

  // select the dictionary of entities
  selectEntities: getControllerEntities,

  // select the array of the entity
  selectAll: getAllControllers,

  // select the total count
  selectTotal: getControllerTotal
} = fromController.adapter.getSelectors(); // fromIndex.getControllerState



/* 
export const getXState = createSelector(
  fromX.getY,
  (state: fromF.FState) => state.x
);

export const getY = createSelector(
  getXState,
  fromX.getY
); */
