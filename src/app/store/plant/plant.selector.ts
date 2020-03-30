import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromPlant from './plant.reducer';

export interface State {
  plants: fromPlant.State;
}

export const reducers: ActionReducerMap<State> = {
  plants: fromPlant.reducer,
};

export const selectPlantState = createFeatureSelector<fromPlant.State>('plant');

export const selectPlantIds = createSelector(
  selectPlantState,
  fromPlant.selectPlantIds // shorthand for plantsState => fromPlant.selectPlantIds(plantsState)
);
export const selectPlantEntities = createSelector(
  selectPlantState,
  fromPlant.selectPlantEntities
);
export const selectAllPlants = createSelector(
  selectPlantState,
  fromPlant.selectAllPlants
);
export const selectPlantTotal = createSelector(
  selectPlantState,
  fromPlant.selectPlantTotal
);
export const selectCurrentPlantId = createSelector(
  selectPlantState,
  fromPlant.getSelectedPlantId
);

export const selectCurrentPlant = createSelector(
  selectPlantEntities,
  selectCurrentPlantId,
  (plantEntities, plantId) => plantEntities[plantId]
);