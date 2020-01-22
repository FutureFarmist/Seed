/*import { createSelector, createFeatureSelector } from '@ngrx/store';

// from Feature
import * as fromDeskIndex from './../index';
import * as fromSyntax from './syntax.reducer';

export const getSyntaxState = createSelector(
  fromDeskIndex.getDeskState,
  (state: fromDeskIndex.DeskState) => state.syntax
);

// export const getSyntaxEntitiesState = createSelector(
//   fromDeskIndex.getDeskState,
//   state => state.syntax
// );

export const {
  // select the array of ids
  selectIds: getDeskIds,

  // select the dictionary of entities
  selectEntities: getDeskEntities,

  // select the array of the entity
  selectAll: getAllDesks,

  // select the total count
  selectTotal: getDeskTotal
} = fromSyntax.adapter.getSelectors(getSyntaxState);*/

/* 
export const getXState = createSelector(
  fromX.getY,
  (state: fromF.FState) => state.x
);

export const getY = createSelector(
  getXState,
  fromX.getY
); */
