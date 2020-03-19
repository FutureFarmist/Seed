import { createSelector, createFeatureSelector } from '@ngrx/store';

// from Feature
import * as fromIndex from './../index';
import * as fromPlant from './plant.reducer';

/* export const getSyntaxState = createSelector(
  fromIndex.getDeskState,
  (state: fromPlant.PlantState) => state.plant
); */

// export const getSyntaxEntitiesState = createSelector(
//   fromDeskIndex.getDeskState,
//   state => state.syntax
// );

export const {
  // select the array of ids
  selectIds: getPlantIds,

  // select the dictionary of entities
  selectEntities: getPlantEntities,

  // select the array of the entity
  selectAll: getAllPlants,

  // select the total count
  selectTotal: getPlantTotal
} = fromPlant.adapter.getSelectors(); // fromIndex.getPlantState;

/* 
export const getXState = createSelector(
  fromX.getY,
  (state: fromF.FState) => state.x
);

export const getY = createSelector(
  getXState,
  fromX.getY
); */
