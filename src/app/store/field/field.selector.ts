import { createSelector, createFeatureSelector } from '@ngrx/store';

// from Feature
import * as fromRoot from './../index';
import * as fromField from './field.reducer';

/* export const getFieldState = createSelector(
  fromRoot.getFieldState,
  (state: fromRoot.State) => state.field
); */

// export const getSyntaxEntitiesState = createSelector(
//   fromDeskIndex.getDeskState,
//   state => state.syntax
// );

export const {
  // select the array of ids
  selectIds: getFieldIds,

  // select the dictionary of entities
  selectEntities: getFieldEntities,

  // select the array of the entity
  selectAll: getAllFields,

  // select the total count
  selectTotal: getFieldTotal
} = fromField.adapter.getSelectors(fromRoot.getFieldState);

/* 
export const getXState = createSelector(
  fromX.getY,
  (state: fromF.FState) => state.x
);

export const getY = createSelector(
  getXState,
  fromX.getY
); */
