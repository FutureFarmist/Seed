import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as PlantActions from './plant.action';
import { Plant } from '../../models';

export interface State extends EntityState<Plant> {
  // additional entities state properties
  selectedPlantId: number | null;
}
export function selectPlantId(device: Plant): string {
  //In this case this would be optional since primary key is id
  return device.Id;
};
export function sortByName(a: Plant, b: Plant): number {
  return a.Id.localeCompare(b.Id);
}
export const adapter: EntityAdapter<Plant> = createEntityAdapter<Plant>({
  selectId: selectPlantId,
  sortComparer: sortByName,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedPlantId: null,
});

const PlantReducer = createReducer(
  initialState,
  on(PlantActions.addPlant, (state, { Plant }) => {
    return adapter.addOne(Plant, state)
  }),
  on(PlantActions.setPlant, (state, { Plant }) => {
    return adapter.setOne(Plant, state)
  }),
  on(PlantActions.upsertPlant, (state, { Plant }) => {
    return adapter.upsertOne(Plant, state);
  }),
  on(PlantActions.addPlants, (state, { Plants }) => {
    return adapter.addMany(Plants, state);
  }),
  on(PlantActions.upsertPlants, (state, { Plants }) => {
    return adapter.upsertMany(Plants, state);
  }),
  on(PlantActions.updatePlant, (state, { Plant }) => {
    return adapter.updateOne(Plant, state);
  }),
  on(PlantActions.updatePlants, (state, { Plants }) => {
    return adapter.updateMany(Plants, state);
  }),
  on(PlantActions.mapPlants, (state, { entityMap }) => {
    return adapter.map(entityMap, state);
  }),
  on(PlantActions.deletePlant, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(PlantActions.deletePlants, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(PlantActions.deletePlantsByPredicate, (state, { predicate }) => {
    return adapter.removeMany(predicate, state);
  }),
  on(PlantActions.loadPlants, (state, { Plants }) => {
    return adapter.addAll(Plants, state);
  }),
  on(PlantActions.clearPlants, state => {
    return adapter.removeAll({ ...state, selectedPlantId: null });
  })
);

export function reducer(state: State | undefined, action: Action) {
  return PlantReducer(state, action);
}

export const getSelectedPlantId = (state: State) => state.selectedPlantId;

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of Plant ids
export const selectPlantIds = selectIds;

// select the dictionary of Plant entities
export const selectPlantEntities = selectEntities;

// select the array of Plants
export const selectAllPlants = selectAll;

// select the total Plant count
export const selectPlantTotal = selectTotal;